// مكون قائمة الأفلام
// يعرض شبكة من بطاقات الأفلام

import React from 'react';
import MovieCard from './MovieCard';
import type { Movie } from '../types';

interface MovieListProps {
    movies: Movie[];
    title?: string;
}

const MovieList: React.FC<MovieListProps> = ({ movies, title }) => {
    return (
        // حاوية قائمة الأفلام
        <section className="py-8">
            {/* عنوان القسم */}
            {title && (
                <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
            )}

            {/* عرض رسالة عند عدم وجود أفلام */}
            {movies.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-200 text-lg">No movies found</p>
                </div>
            ) : (
                // شبكة عرض الأفلام
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                        lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {/* تكرار بطاقات الأفلام */}
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default MovieList;