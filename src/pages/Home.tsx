// صفحة الرئيسية
// تعرض شريط البحث وقائمة الأفلام

import React, { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { useMovieContext } from '../context/MovieContext';

const Home: React.FC = () => {
    // الحصول على الحالة والدوال من السياق
    const { state, searchMovies } = useMovieContext();

    // البحث عن أفلام افتراضية عند تحميل الصفحة
    useEffect(() => {
        // البحث عن كلمة "dark" كافتراضي
        searchMovies('dark');
    }, []);

    return (
        // حاوية الصفحة الرئيسية
        <div className="min-h-screen pt-20">
            {/* قسم البانر الرئيسي */}
            <section className="relative h-[60vh] bg-gradient-to-b from-netflix-red/20 to-netflix-black">
                <div className="container mx-auto px-4 h-full flex items-center justify-center">
                    <div className="text-center">
                        {/* عنوان ترحيبي */}
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                            Welcome to Netflix
                        </h1>
                        <p className="text-netflix-gray text-lg mb-8 max-w-2xl mx-auto">
                            Discover thousands of movies and TV shows. Search for your favorites
                            and add them to your list.
                        </p>
                    </div>
                </div>
            </section>

            {/* قسم البحث */}
            <section className="container mx-auto px-4 py-8">
                <SearchBar />

                {/* عرض حالة التحميل */}
                {state.loading && (
                    <div className="text-center py-12">
                        <div className="loading text-netflix-red text-2xl">Loading...</div>
                    </div>
                )}

                {/* عرض رسالة الخطأ */}
                {state.error && !state.loading && (
                    <div className="text-center py-12">
                        <p className="text-red-500 text-lg">{state.error}</p>
                    </div>
                )}

                {/* عرض قائمة الأفلام */}
                {!state.loading && !state.error && (
                    <MovieList
                        movies={state.movies}
                        title={`Results (${state.movies.length})`}
                    />
                )}
            </section>
        </div>
    );
};

export default Home;