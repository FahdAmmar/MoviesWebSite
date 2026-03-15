import React, { createContext, useReducer, useContext, useEffect, ReactNode, useRef } from 'react';
import axios from 'axios';
import type { MovieState, MovieAction, MovieContextType, Movie, MovieDetails, MovieProviderProps } from '../types';

// مفتاح API من متغير البيئة (Vite)
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

if (!API_KEY) {
    throw new Error("OMDB API key is missing");
}

const initialState: MovieState = {
    movies: [],
    favorites: [],
    searchQuery: '',
    loading: false,
    error: null,
    selectedMovie: null,
};

const movieReducer = (state: MovieState, action: MovieAction): MovieState => {
    switch (action.type) {
        case 'SET_MOVIES':
            return { ...state, movies: action.payload };
        case 'SET_SEARCH_QUERY':
            return { ...state, searchQuery: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'ADD_FAVORITE':
            const exists = state.favorites.some((fav) => fav.imdbID === action.payload.imdbID);
            if (exists) return state;
            const newFavorites = [...state.favorites, action.payload];
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            return { ...state, favorites: newFavorites };
        case 'REMOVE_FAVORITE':
            const filteredFavorites = state.favorites.filter((fav) => fav.imdbID !== action.payload);
            localStorage.setItem('favorites', JSON.stringify(filteredFavorites));
            return { ...state, favorites: filteredFavorites };
        case 'SET_SELECTED_MOVIE':
            return { ...state, selectedMovie: action.payload };
        case 'LOAD_FAVORITES':
            return { ...state, favorites: action.payload };
        default:
            return state;
    }
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(movieReducer, initialState);
    // نحتفظ بالـ AbortController لأن Axios يدعمه لإلغاء الطلبات
    const abortControllerRef = useRef<AbortController | null>(null);

    // تحميل المفضلة من localStorage عند بدء التطبيق
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            try {
                const parsed = JSON.parse(savedFavorites);
                dispatch({ type: 'LOAD_FAVORITES', payload: parsed });
            } catch (error) {
                console.error('Error loading favorites from localStorage:', error);
            }
        }
    }, []);

    const searchMovies = async (query: string) => {
        // إلغاء أي طلب سابق
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });
        dispatch({ type: 'SET_SEARCH_QUERY', payload: query });

        try {
            // 2. استخدام Axios بدلاً من fetch
            // Axios يرجع البيانات في خاصية data مباشرة
            const response = await axios.get(
                `https://www.omdbapi.com/`, {
                params: {
                    s: query,
                    apikey: API_KEY
                },
                signal: abortControllerRef.current.signal // تمرير إشارة الإلغاء
            }
            );

            const data = response.data; // البيانات هنا جاهزة ولا تحتاج لـ .json()

            if (data.Response === 'False') {
                dispatch({ type: 'SET_ERROR', payload: data.Error || 'No results found' });
                dispatch({ type: 'SET_MOVIES', payload: [] });
            } else {
                const movies = Array.isArray(data.Search) ? data.Search : [];
                dispatch({ type: 'SET_MOVIES', payload: movies });
            }
        } catch (error: any) {
            // 3. التحقق من خطأ الإلغاء باستخدام دالة Axios الخاصة
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'An error occurred while connecting to the server.' });
            }
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const getMovieDetails = async (imdbID: string) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        dispatch({ type: 'SET_LOADING', payload: true });

        try {
            // 4. استخدام Axios
            const response = await axios.get(
                `https://www.omdbapi.com/`,
                {
                    params: {
                        i: imdbID,
                        plot: 'full',
                        apikey: API_KEY
                    },
                    signal: abortControllerRef.current.signal
                }
            );

            const data: MovieDetails = response.data;
            dispatch({ type: 'SET_SELECTED_MOVIE', payload: data });
        } catch (error: any) {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'An error occurred in loading the details.' });
            }
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const toggleFavorite = (movie: Movie) => {
        const exists = state.favorites.some((fav) => fav.imdbID === movie.imdbID);
        if (exists) {
            dispatch({ type: 'REMOVE_FAVORITE', payload: movie.imdbID });
        } else {
            dispatch({ type: 'ADD_FAVORITE', payload: movie });
        }
    };

    const isFavorite = (imdbID: string): boolean => {
        return state.favorites.some((fav) => fav.imdbID === imdbID);
    };

    const contextValue: MovieContextType = {
        state,
        dispatch,
        searchMovies,
        getMovieDetails,
        toggleFavorite,
        isFavorite,
    };

    return (
        <MovieContext.Provider value={contextValue}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovieContext = (): MovieContextType => {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error('useMovieContext must be used within a MovieProvider');
    }
    return context;
};

export default MovieContext;