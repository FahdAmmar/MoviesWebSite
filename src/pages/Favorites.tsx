// صفحة المفضلة
// تعرض الأفلام المضافة للقائمة

import React from 'react';
import MovieList from '../components/MovieList';
import { useMovieContext } from '../context/MovieContext';

const Favorites: React.FC = () => {
    // الحصول على حالة المفضلة من السياق
    const { state } = useMovieContext();

    return (
        // حاوية صفحة المفضلة
        <div className="min-h-screen pt-20">
            <div className="container mx-auto px-4 py-8">
                {/* عنوان الصفحة */}
                <h1 className="text-4xl font-bold text-white mb-2">My List</h1>
                <p className="text-netflix-gray mb-8">
                    Your favorite movies and TV shows
                </p>

                {/* عرض رسالة عند عدم وجود مفضلة */}
                {state.favorites.length === 0 ? (
                    <div className="text-center py-16">
                        {/* أيقونة قائمة فارغة */}
                        <div className="text-6xl mb-4">📋</div>
                        <h2 className="text-2xl font-medium text-white mb-2">
                            Your list is empty
                        </h2>
                        <p className="text-netflix-gray mb-6">
                            Start adding movies to your list to see them here
                        </p>
                        {/* رابط للصفحة الرئيسية */}
                        <a
                            href="/"
                            className="inline-block bg-netflix-red hover:bg-red-700 
                         text-white px-6 py-3 rounded-md font-medium 
                         transition-colors"
                        >
                            Browse Movies
                        </a>
                    </div>
                ) : (
                    // عرض قائمة المفضلة
                    <MovieList
                        movies={state.favorites}
                        title={`My List (${state.favorites.length})`}
                    />
                )}
            </div>
        </div>
    );
};

export default Favorites;