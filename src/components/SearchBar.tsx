
import React, { useState, FormEvent, KeyboardEvent } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { Search } from 'lucide-react';
// تعريف أنواع Props (للإمتداد المستقبلي)
interface SearchBarProps {
    onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = () => {
    const [searchText, setSearchText] = useState('');
    const { searchMovies, state } = useMovieContext();


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

    return (
        <div className="min-w-screen  mx-auto mb-10 py-10">
            <form
                onSubmit={handleSubmit}
                role="search"
                aria-label="Movie search"
                className="flex justify-center"
            >
                {/* حاوية الإدخال والزر معاً */}
                <div className="relative w-96">
                    {/* زر البحث (تم وضعه على اليسار) */}
                    <button
                        type="submit"
                        aria-label="Search button"
                        className="
          absolute left-1 top-1/2 -translate-y-1/2 z-10 
          bg-netflix-red hover:bg-red-700 text-white 
          px-4 py-2 rounded-md font-medium 
          transition-colors duration-200 text-base
        "
                    >
                        <Search />

                    </button>

                    {/* حقل الإدخال */}
                    <input
                        type="search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder='search'
                        className="indent-0 md:indent-6
          w-3/4 md:w-full h-10 
          pl-15 pr-4
          border border-gray-300/30 
          rounded-lg text-white 
          placeholder-gray-400
          focus:outline-none focus:border-red-600 
          transition-colors text-lg
        "
                        aria-label="Search input"
                    />
                </div>
            </form>

            {/* عرض نص البحث الحالي */}
            {state.searchQuery && searchText && (
                <p className="text-netflix-gray text-sm mt-10 text-center">
                    Results for: <span className="text-white">{state.searchQuery}</span>
                </p>
            )}
        </div>
    );
};

export default SearchBar;