// مكون شريط البحث
// يسمح للمستخدم بالبحث عن الأفلام

import React, { useState, FormEvent } from 'react';
import { useMovieContext } from '../context/MovieContext';

const SearchBar: React.FC = () => {
    // حالة نص البحث المحلي
    const [searchText, setSearchText] = useState('');

    // الحصول على دالة البحث من السياق
    const { searchMovies, state } = useMovieContext();

    // دالة معالجة إرسال النموذج
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // التحقق من وجود نص بحث
        if (searchText.trim()) {
            searchMovies(searchText.trim());
        }
    };

    return (
        // حاوية شريط البحث
        <div className="w-full max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSubmit} className="relative">
                {/* حقل إدخال البحث */}
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search for movies, TV shows..."
                    className="w-full px-6 py-4 bg-netflix-dark border border-netflix-gray/30 
                     rounded-lg text-white placeholder-netflix-gray
                     focus:outline-none focus:border-netflix-red transition-colors
                     text-lg"
                />

                {/* زر البحث */}
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 
                     bg-netflix-red hover:bg-red-700 text-white 
                     px-6 py-2 rounded-md font-medium transition-colors"
                >
                    Search
                </button>
            </form>

            {/* عرض نص البحث الحالي */}
            {state.searchQuery && (
                <p className="text-netflix-gray text-sm mt-3 text-center">
                    Results for: <span className="text-white">{state.searchQuery}</span>
                </p>
            )}
        </div>
    );
};

export default SearchBar;