// تعريف الأنواع المستخدمة في المشروع

// نوع بيانات الفيلم من API
export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
}

// نوع بيانات تفاصيل الفيلم
export interface MovieDetails extends Movie {
    Rated?: string;
    Released?: string;
    Runtime?: string;
    Genre?: string;
    Director?: string;
    Writer?: string;
    Actors?: string;
    Plot?: string;
    Language?: string;
    Country?: string;
    Awards?: string;
    Ratings?: Array<{
        Source: string;
        Value: string;
    }>;
    Metascore?: string;
    imdbRating?: string;
    imdbVotes?: string;
}

// نوع حالة التطبيق
export interface MovieState {
    movies: Movie[];
    favorites: Movie[];
    searchQuery: string;
    loading: boolean;
    error: string | null;
    selectedMovie: MovieDetails | null;
}

// نوع الإجراءات المتاحة
export type MovieAction =
    | { type: 'SET_MOVIES'; payload: Movie[] }
    | { type: 'SET_SEARCH_QUERY'; payload: string }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'ADD_FAVORITE'; payload: Movie }
    | { type: 'REMOVE_FAVORITE'; payload: string }
    | { type: 'SET_SELECTED_MOVIE'; payload: MovieDetails | null }
    | { type: 'LOAD_FAVORITES'; payload: Movie[] };

// نوع سياق الأفلام
export interface MovieContextType {
    state: MovieState;
    dispatch: React.Dispatch<MovieAction>;
    searchMovies: (query: string) => Promise<void>;
    getMovieDetails: (imdbID: string) => Promise<void>;
    toggleFavorite: (movie: Movie) => void;
    isFavorite: (imdbID: string) => boolean;
}