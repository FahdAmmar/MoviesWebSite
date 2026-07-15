// =============================================================
// useMovieStore
// المخزن المركزي لحالة التطبيق (Zustand) — يدير عمليات البحث عن
// الأفلام، تفاصيل الفيلم المحدد، وقائمة المفضلة مع الحفظ التلقائي
// في LocalStorage.
// =============================================================

import { create } from 'zustand';
import axios from 'axios';
import type { Movie, MovieDetails, OmdbSearchResponse, OmdbDetailsResponse } from '../types';
import { OMDB_BASE_URL } from '../constants';

// مفتاح الوصول إلى OMDb API يُقرأ من متغيرات البيئة (.env) ولا
// يجب أبداً كتابته مباشرة داخل الكود المصدري، حتى لا يظهر في
// أي مستودع عام أو يُستخرج بسهولة من حزمة الإنتاج المبنية.
// راجع ملف .env.example لمعرفة كيفية تجهيزه محلياً.
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

/** مفتاح التخزين المستخدم في localStorage لحفظ قائمة المفضلة */
const FAVORITES_STORAGE_KEY = 'favorites';

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

// وحدات تحكم الإلغاء (AbortController) الخاصة بكل نوع طلب، تُستخدم
// لإلغاء أي طلب سابق لم يكتمل بعد عند بدء طلب جديد من نفس النوع.
// هذا يمنع "حالة السباق" (Race Condition): لو كتب المستخدم بحثاً
// جديداً قبل اكتمال البحث السابق، فقد تصل نتيجة البحث القديم
// متأخرة وتستبدل النتائج الأحدث على الشاشة بشكل خاطئ.
let searchAbortController: AbortController | null = null;
let detailsAbortController: AbortController | null = null;

export const useMovieStore = create<MovieStore>((set, get) => ({
    movies: [],
    favorites: [],
    searchQuery: '',
    loading: false,
    error: null,
    selectedMovie: null,

    // تحميل قائمة المفضلة المحفوظة من localStorage عند بدء التطبيق
    loadFavoritesFromStorage: () => {
        try {
            const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                set({ favorites: parsed });
            }
        } catch (e) {
            // فشل القراءة (بيانات تالفة أو تخزين غير متاح) لا يجب أن
            // يوقف التطبيق، فقط نبدأ بقائمة مفضلة فارغة
            console.error('Failed to load favorites from localStorage', e);
        }
    },

    searchMovies: async (query: string) => {
        // تجاهل تكرار نفس عملية البحث الحالية
        const currentQuery = get().searchQuery;
        if (currentQuery === query) return;

        if (!API_KEY) {
            set({
                error: 'Missing OMDb API key. Please add VITE_OMDB_API_KEY to your .env file.',
                loading: false,
                movies: [],
            });
            return;
        }

        // إلغاء أي طلب بحث سابق لم يكتمل بعد قبل إطلاق طلب جديد
        searchAbortController?.abort();
        const controller = new AbortController();
        searchAbortController = controller;

        set({ loading: true, error: null, searchQuery: query });

        try {
            const response = await axios.get<OmdbSearchResponse>(OMDB_BASE_URL, {
                params: { s: query, apikey: API_KEY },
                signal: controller.signal,
            });
            const data = response.data;
            if (data.Response === 'False') {
                set({ error: data.Error || 'No results found', movies: [], loading: false });
            } else {
                set({ movies: data.Search || [], loading: false });
            }
        } catch (error) {
            if (axios.isCancel(error) || (axios.isAxiosError(error) && error.code === 'ERR_CANCELED')) {
                // تم إلغاء الطلب عمداً لصالح بحث أحدث، لا حاجة لعرض خطأ
                return;
            }
            set({ error: 'An error occurred while searching.', loading: false });
        }
    },

    getMovieDetails: async (imdbID: string) => {
        if (!API_KEY) {
            set({
                error: 'Missing OMDb API key. Please add VITE_OMDB_API_KEY to your .env file.',
                loading: false,
                selectedMovie: null,
            });
            return;
        }

        // إلغاء أي طلب تفاصيل سابق (مثلاً لو انتقل المستخدم بسرعة بين
        // صفحتي فيلمين)، وتصفير الحالة القديمة حتى لا تظهر بيانات
        // فيلم سابق أثناء تحميل فيلم جديد أو في حال فشل الطلب
        detailsAbortController?.abort();
        const controller = new AbortController();
        detailsAbortController = controller;

        set({ loading: true, error: null, selectedMovie: null });

        try {
            const response = await axios.get<OmdbDetailsResponse>(OMDB_BASE_URL, {
                params: { i: imdbID, plot: 'full', apikey: API_KEY },
                signal: controller.signal,
            });
            const data = response.data;

            // OMDb يعيد HTTP 200 حتى عند الفشل (معرّف غير صحيح مثلاً)
            // مع Response: "False"، لذا يجب التحقق من هذا الحقل صراحةً
            // بدلاً من افتراض نجاح أي استجابة تصل بدون خطأ شبكي
            if (data.Response === 'False') {
                set({ error: data.Error || 'Movie not found.', selectedMovie: null, loading: false });
            } else {
                set({ selectedMovie: data as MovieDetails, loading: false });
            }
        } catch (error) {
            if (axios.isCancel(error) || (axios.isAxiosError(error) && error.code === 'ERR_CANCELED')) {
                return;
            }
            set({ error: 'Failed to load movie details.', selectedMovie: null, loading: false });
        }
    },

    toggleFavorite: (movie: Movie) => {
        const { favorites } = get();
        const exists = favorites.some((fav) => fav.imdbID === movie.imdbID);
        const newFavorites = exists
            ? favorites.filter((fav) => fav.imdbID !== movie.imdbID)
            : [...favorites, movie];

        try {
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
        } catch (e) {
            // مثلاً في وضع التصفح الخاص أو عند امتلاء مساحة التخزين
            console.error('Failed to persist favorites to localStorage', e);
        }

        set({ favorites: newFavorites });
    },

    isFavorite: (imdbID: string) => {
        return get().favorites.some((fav) => fav.imdbID === imdbID);
    },
}));

// تحميل المفضلة المحفوظة فور إنشاء المخزن لأول مرة
useMovieStore.getState().loadFavoritesFromStorage();
