// مكون بطاقة الفيلم
// يعرض معلومات الفيلم مع إمكانية الإضافة للمفضلة

import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types';
import { useMovieContext } from '../context/MovieContext';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    // الحصول على دوال السياق
    const { toggleFavorite, isFavorite } = useMovieContext();

    // التحقق مما إذا كان الفيلم في المفضلة
    const favorite = isFavorite(movie.imdbID);

    return (
        // بطاقة الفيلم
        <div className="movie-card relative group bg-netflix-dark rounded-lg overflow-hidden">
            {/* رابط لتفاصيل الفيلم */}
            <Link to={`/movie/${movie.imdbID}`} className="block">
                {/* صورة الفيلم */}
                <div className="aspect-[2/3] relative overflow-hidden">
                    {movie.Poster !== 'N/A' ? (
                        <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        // صورة افتراضية في حالة عدم وجود بوستر
                        <div className="w-full h-full bg-netflix-gray/20 flex items-center justify-center">
                            <span className="text-netflix-gray text-4xl">🎬</span>
                        </div>
                    )}

                    {/* طبقة التعتيم عند التمرير */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* معلومات الفيلم */}
                <div className="p-4">
                    {/* عنوان الفيلم */}
                    <h3 className="text-white font-medium text-sm mb-2 line-clamp-2">
                        {movie.Title}
                    </h3>

                    {/* سنة الإصدار والنوع */}
                    <div className="flex items-center justify-between text-xs text-netflix-gray">
                        <span>{movie.Year}</span>
                        <span className="capitalize">{movie.Type}</span>
                    </div>
                </div>
            </Link>

            {/* زر المفضلة */}
            <button
                onClick={() => toggleFavorite(movie)}
                className="absolute top-3 right-3 p-2 bg-black/60 rounded-full 
                   hover:bg-netflix-red transition-colors z-10"
                aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                {/* أيقونة القلب */}
                <svg
                    className={`w-5 h-5 ${favorite ? 'text-netflix-red fill-current' : 'text-white'
                        }`}
                    fill={favorite ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
            </button>
        </div>
    );
};

export default MovieCard;