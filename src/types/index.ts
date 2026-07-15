// =============================================================
// تعريف الأنواع (Types) المستخدمة في المشروع
// =============================================================
// ملاحظة: كانت هذه الملفات تحتوي سابقاً على أنواع خاصة بتطبيق
// كان يعتمد على Context API + useReducer (MovieState, MovieAction,
// MovieContextType, MovieProviderProps). بعد الانتقال إلى Zustand
// (انظر src/store/useMovieStore.ts) لم تعد هذه الأنواع مستخدمة في
// أي مكان بالمشروع، لذلك تمت إزالتها هنا (كود ميت / Dead Code)
// حفاظاً على وضوح الكود وسهولة صيانته.
// =============================================================

/** نوع بيانات الفيلم الأساسي كما تُعيده نتائج البحث من OMDb API */
export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
}

/** نوع بيانات تفاصيل الفيلم الكاملة (صفحة تفاصيل الفيلم) */
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

// =============================================================
// أنواع استجابة OMDb API الخام (قبل التأكد من نجاح الطلب)
// تُستخدم هذه الأنواع في طبقة الـ store للتحقق الآمن من نوع
// الاستجابة القادمة من الشبكة بدلاً من التعامل معها كـ `any`
// =============================================================

/** الشكل المشترك بين كل استجابات OMDb (حقل النجاح/الفشل) */
interface OmdbBaseResponse {
    Response: 'True' | 'False';
    Error?: string;
}

/** استجابة نقطة البحث (s=) في OMDb API */
export interface OmdbSearchResponse extends OmdbBaseResponse {
    Search?: Movie[];
    totalResults?: string;
}

/** استجابة نقطة تفاصيل الفيلم (i=) في OMDb API */
export type OmdbDetailsResponse = OmdbBaseResponse & Partial<MovieDetails>;
