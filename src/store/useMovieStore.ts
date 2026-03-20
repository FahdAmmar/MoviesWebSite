import { create } from 'zustand';
import axios from 'axios';
import type { Movie, MovieDetails } from '../types';

const API_KEY = '68f0f041'
if (!API_KEY) throw new Error('OMDB API key is missing');

interface MovieStore {
    movies: Movie[];
    favorites: Movie[];
    searchQuery: string;
    loading: boolean;
    error: string | null;
    selectedMovie: MovieDetails | null;
    // Actions
    searchMovies: (query: string) => Promise<void>;
    getMovieDetails: (imdbID: string) => Promise<void>;
    toggleFavorite: (movie: Movie) => void;
    isFavorite: (imdbID: string) => boolean;
    loadFavoritesFromStorage: () => void;
}

export const useMovieStore = create<MovieStore>((set, get) => ({
    movies: [],
    favorites: [],
    searchQuery: '',
    loading: false,
    error: null,
    selectedMovie: null,

    // Load favorites from localStorage on initial creation
    loadFavoritesFromStorage: () => {
        const stored = localStorage.getItem('favorites');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                set({ favorites: parsed });
            } catch (e) {
                console.error('Failed to parse favorites from localStorage', e);
            }
        }
    },

    searchMovies: async (query: string) => {
        // Cancel previous request if any (using AbortController in axios)
        const source = axios.CancelToken.source();
        // Store cancel token in a ref or just rely on new request overwriting? We'll handle cancel in store by checking if query changed.
        // For simplicity, we'll implement cancellation by storing the last query and ignoring stale responses.
        const currentQuery = get().searchQuery;
        if (currentQuery === query) return; // Avoid duplicate same query searches

        set({ loading: true, error: null, searchQuery: query });

        try {
            const response = await axios.get('https://www.omdbapi.com/', {
                params: { s: query, apikey: API_KEY },
                cancelToken: source.token,
            });
            const data = response.data;
            if (data.Response === 'False') {
                set({ error: data.Error || 'No results found', movies: [], loading: false });
            } else {
                set({ movies: data.Search || [], loading: false });
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else {
                set({ error: 'An error occurred while searching.', loading: false });
            }
        }
    },

    getMovieDetails: async (imdbID: string) => {
        const source = axios.CancelToken.source();
        set({ loading: true });

        try {
            const response = await axios.get('https://www.omdbapi.com/', {
                params: { i: imdbID, plot: 'full', apikey: API_KEY },
                cancelToken: source.token,
            });
            const data: MovieDetails = response.data;
            set({ selectedMovie: data, loading: false });
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else {
                set({ error: 'Failed to load movie details.', loading: false });
            }
        }
    },

    toggleFavorite: (movie: Movie) => {
        const { favorites } = get();
        const exists = favorites.some((fav) => fav.imdbID === movie.imdbID);
        let newFavorites: Movie[];
        if (exists) {
            newFavorites = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
        } else {
            newFavorites = [...favorites, movie];
        }
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        set({ favorites: newFavorites });
    },

    isFavorite: (imdbID: string) => {
        return get().favorites.some((fav) => fav.imdbID === imdbID);
    },
}));

// Initialize favorites from localStorage
useMovieStore.getState().loadFavoritesFromStorage();