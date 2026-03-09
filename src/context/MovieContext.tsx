// سياق إدارة حالة الأفلام باستخدام ContextAPI و useReducer

import React, {
    createContext,
    useReducer,
    useContext,
    useEffect,
    ReactNode
} from 'react';
import {
    MovieState,
    MovieAction,
    MovieContextType,
    Movie,
    MovieDetails
} from '../types';

// الحالة الابتدائية للتطبيق
const initialState: MovieState = {
    movies: [],
    favorites: [],
    searchQuery: '',
    loading: false,
    error: null,
    selectedMovie: null,
};

// دالة الـ Reducer لإدارة الحالة
// هذه الدالة تستقبل الحالة الحالية والإجراء وتُرجع الحالة الجديدة
const movieReducer = (state: MovieState, action: MovieAction): MovieState => {
    switch (action.type) {
        // تعيين قائمة الأفلام المستلمة من API
        case 'SET_MOVIES':
            return { ...state, movies: action.payload };

        // تعيين نص البحث
        case 'SET_SEARCH_QUERY':
            return { ...state, searchQuery: action.payload };

        // تعيين حالة التحميل
        case 'SET_LOADING':
            return { ...state, loading: action.payload };

        // تعيين رسالة الخطأ
        case 'SET_ERROR':
            return { ...state, error: action.payload };

        // إضافة فيلم إلى المفضلة
        case 'ADD_FAVORITE':
            // التحقق من عدم تكرار الفيلم في المفضلة
            const exists = state.favorites.some(
                (fav) => fav.imdbID === action.payload.imdbID
            );
            if (exists) return state;

            // حفظ المفضلة في localStorage
            const newFavorites = [...state.favorites, action.payload];
            localStorage.setItem('favorites', JSON.stringify(newFavorites));

            return { ...state, favorites: newFavorites };

        // إزالة فيلم من المفضلة
        case 'REMOVE_FAVORITE':
            const filteredFavorites = state.favorites.filter(
                (fav) => fav.imdbID !== action.payload
            );
            localStorage.setItem('favorites', JSON.stringify(filteredFavorites));

            return { ...state, favorites: filteredFavorites };

        // تعيين الفيلم المحدد للتفاصيل
        case 'SET_SELECTED_MOVIE':
            return { ...state, selectedMovie: action.payload };

        // تحميل المفضلة من localStorage عند بدء التطبيق
        case 'LOAD_FAVORITES':
            return { ...state, favorites: action.payload };

        // الحالة الافتراضية
        default:
            return state;
    }
};

// إنشاء السياق
const MovieContext = createContext<MovieContextType | undefined>(undefined);

// مكون المزود للسياق
// هذا المكون يغلف التطبيق ويوفر الوصول للحالة والدوال
interface MovieProviderProps {
    children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
    // استخدام useReducer لإدارة الحالة
    const [state, dispatch] = useReducer(movieReducer, initialState);

    // تحميل المفضلة من localStorage عند بدء التطبيق
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            try {
                const parsed = JSON.parse(savedFavorites);
                dispatch({ type: 'LOAD_FAVORITES', payload: parsed });
            } catch (error) {
                console.error('خطأ في تحميل المفضلة:', error);
            }
        }
    }, []);

    // دالة البحث عن الأفلام باستخدام OMDB API
    const searchMovies = async (query: string) => {
        // تعيين حالة التحميل
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });
        dispatch({ type: 'SET_SEARCH_QUERY', payload: query });

        try {
            // طلب البيانات من API
            const response = await fetch(
                `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=68f0f041`
            );

            const data = await response.json();

            // التحقق من وجود أخطاء في الاستجابة
            if (data.Response === 'False') {
                dispatch({ type: 'SET_ERROR', payload: data.Error || 'لا توجد نتائج' });
                dispatch({ type: 'SET_MOVIES', payload: [] });
            } else {
                // تعيين الأفلام المستلمة
                dispatch({ type: 'SET_MOVIES', payload: data.Search || [] });
            }
        } catch (error) {
            // معالجة أخطاء الشبكة
            dispatch({
                type: 'SET_ERROR',
                payload: 'حدث خطأ في الاتصال بالخادم'
            });
        } finally {
            // إنهاء حالة التحميل
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    // دالة الحصول على تفاصيل فيلم معين
    const getMovieDetails = async (imdbID: string) => {
        dispatch({ type: 'SET_LOADING', payload: true });

        try {
            const response = await fetch(
                `https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=68f0f041`
            );

            const data: MovieDetails = await response.json();
            dispatch({ type: 'SET_SELECTED_MOVIE', payload: data });
        } catch (error) {
            dispatch({
                type: 'SET_ERROR',
                payload: 'حدث خطأ في تحميل التفاصيل'
            });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    // دالة التبديل بين الإضافة والحذف من المفضلة
    const toggleFavorite = (movie: Movie) => {
        // التحقق مما إذا كان الفيلم موجودًا في المفضلة
        const exists = state.favorites.some(
            (fav) => fav.imdbID === movie.imdbID
        );

        if (exists) {
            // حذف من المفضلة
            dispatch({ type: 'REMOVE_FAVORITE', payload: movie.imdbID });
        } else {
            // إضافة إلى المفضلة
            dispatch({ type: 'ADD_FAVORITE', payload: movie });
        }
    };

    // دالة التحقق مما إذا كان الفيلم في المفضلة
    const isFavorite = (imdbID: string): boolean => {
        return state.favorites.some((fav) => fav.imdbID === imdbID);
    };

    // قيمة السياق التي سيتم توفيرها للمكونات
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

// هوك مخصص للوصول للسياق
// هذا الهوك يسهل الوصول للسياق في أي مكون
export const useMovieContext = (): MovieContextType => {
    const context = useContext(MovieContext);

    // التحقق من استخدام الهوك داخل المزود
    if (!context) {
        throw new Error('useMovieContext يجب استخدامه داخل MovieProvider');
    }

    return context;
};

export default MovieContext;