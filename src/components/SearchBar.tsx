import { useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { useMovieStore } from '../store/useMovieStore';
import { Search, X, Loader2 } from 'lucide-react';

// ملاحظة: تمت إزالة الخاصية onSearch التي كانت معرّفة سابقاً في هذا
// المكوّن لكنها لم تكن مستخدمة في أي مكان (لا يتم استدعاؤها داخلياً،
// ولا يمرّرها أي مكوّن أب) — كود ميت تمت إزالته لتوضيح الواجهة الفعلية
const SearchBar: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const searchMovies = useMovieStore((state) => state.searchMovies);
    const searchQuery = useMovieStore((state) => state.searchQuery);
    const loading = useMovieStore((state) => state.loading);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const trimmedQuery = searchText.trim();
        if (trimmedQuery) {
            searchMovies(trimmedQuery);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit(e as unknown as FormEvent);
        }
    };

    const handleClear = () => {
        setSearchText('');
    };

    return (
        // حاوية مرنة تمتد بعرض العنصر الأب بدلاً من عرض ثابت (w-96) كان
        // يسبب مشاكل استجابة على الشاشات الصغيرة
        <div className="w-full mx-auto mb-10">
            <form
                onSubmit={handleSubmit}
                role="search"
                aria-label="Movie search"
                className="flex justify-center"
            >
                <div className="relative w-full max-w-xl">
                    <button
                        type="submit"
                        disabled={loading}
                        aria-label="Search"
                        className="absolute left-1.5 top-1/2 -translate-y-1/2 z-10
              bg-netflix-red hover:bg-netflix-red-dark disabled:opacity-60 text-white
              p-2 rounded-lg font-medium
              transition-colors duration-200"
                    >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
                    </button>
                    <input
                        type="search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search for a movie or show..."
                        className="w-full h-12
              pl-14 pr-10
              bg-white/5
              border border-white/15
              rounded-xl text-white
              placeholder-gray-500
              focus:outline-none focus:border-netflix-red focus:ring-2 focus:ring-netflix-red/20
              transition-colors text-base"
                        aria-label="Search input"
                    />
                    {searchText && (
                        <button
                            type="button"
                            onClick={handleClear}
                            aria-label="Clear search"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>
            </form>
            {/* aria-live تُعلم قارئ الشاشة بتحديث نتيجة البحث دون الحاجة لإعادة التركيز */}
            <p aria-live="polite" className="text-netflix-gray text-sm mt-4 text-center min-h-[1.25rem]">
                {searchQuery && (
                    <>
                        Results for: <span className="text-white">{searchQuery}</span>
                    </>
                )}
            </p>
        </div>
    );
};

export default SearchBar;
