import React, { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import SkeletonLoader from '../components/SkeletonLoader';
import { useMovieStore } from '../store/useMovieStore';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { DEFAULT_SEARCH_QUERY } from '../constants';

const Home: React.FC = () => {
    const movies = useMovieStore((state) => state.movies);
    const loading = useMovieStore((state) => state.loading);
    const error = useMovieStore((state) => state.error);
    const searchQuery = useMovieStore((state) => state.searchQuery);
    const searchMovies = useMovieStore((state) => state.searchMovies);

    useDocumentTitle('Home');

    useEffect(() => {
        // نُشغّل البحث الافتراضي فقط عندما لا توجد نتيجة بحث سابقة بعد.
        // في النسخة السابقة كان هذا الاستدعاء يحدث بلا شرط في كل مرة
        // يُعاد فيها تركيب الصفحة (مثلاً عند الرجوع من صفحة المفضلة)،
        // مما كان يمسح بحث المستخدم الفعلي ويستبدله بالبحث الافتراضي
        // "dark" دون أي تنبيه — وهو خلل واضح في تجربة الاستخدام.
        if (!searchQuery) {
            searchMovies(DEFAULT_SEARCH_QUERY);
        }
    }, [searchQuery, searchMovies]);

    return (
        <div className="min-h-screen pt-15 mx-auto">
            <section className="relative h-[60vh] bg-linear-to-b from-red-800/20 to-black w-full">
                <div className="container mx-auto px-4 h-full flex items-center justify-center">
                    <div className="text-center z-10">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
                            Welcome to FILMIX
                        </h1>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                            Discover thousands of movies and TV shows. Search for your favorites
                            and add them to your list.
                        </p>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-8">
                <SearchBar />

                {loading && <SkeletonLoader />}

                {error && !loading && (
                    <div role="alert" className="text-center py-12">
                        <p className="text-error text-lg">{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <div aria-live="polite">
                        <MovieList movies={movies} title={`Results (${movies.length})`} />
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
