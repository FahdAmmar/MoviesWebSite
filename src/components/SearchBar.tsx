import { useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { useMovieStore } from '../store/useMovieStore';
import { Search } from 'lucide-react';

interface SearchBarProps {
    onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = () => {
    const [searchText, setSearchText] = useState('');
    const searchMovies = useMovieStore((state) => state.searchMovies);
    const searchQuery = useMovieStore((state) => state.searchQuery);

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
        <div className="min-w-screen mx-auto mb-10 py-10">
            <form
                onSubmit={handleSubmit}
                role="search"
                aria-label="Movie search"
                className="flex justify-center"
            >
                <div className="relative w-96">
                    <button
                        type="submit"
                        aria-label="Search button"
                        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 
              bg-netflix-red hover:bg-red-700 text-white 
              px-4 py-2 rounded-md font-medium 
              transition-colors duration-200 text-base"
                    >
                        <Search />
                    </button>
                    <input
                        type="search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="search"
                        className="indent-0 md:indent-6
              w-3/4 md:w-full h-10 
              pl-15 pr-4
              border border-gray-300/30 
              rounded-lg text-white 
              placeholder-gray-400
              focus:outline-none focus:border-red-600 
              transition-colors text-lg"
                        aria-label="Search input"
                    />
                </div>
            </form>
            {searchQuery && searchText && (
                <p className="text-netflix-gray text-sm mt-10 text-center">
                    Results for: <span className="text-white">{searchQuery}</span>
                </p>
            )}
        </div>
    );
};

export default SearchBar;