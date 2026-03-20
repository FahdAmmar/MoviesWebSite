import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { useMovieStore } from '../store/useMovieStore';
import type { Movie } from '../types';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = memo(({ movie }) => {
    const toggleFavorite = useMovieStore((state) => state.toggleFavorite);
    const isFavorite = useMovieStore((state) => state.isFavorite);
    const favorite = isFavorite(movie.imdbID);

    // State لإدارة تحميل الصورة (لتحسين UX)
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // منع تفعيل الرابط عند الضغط على القلب
        toggleFavorite(movie);
    };

    return (
        <div className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 ease-out hover:-translate-y-2 border border-gray-800/50">
            <Link to={`/movie/${movie.imdbID}`} className="block h-full flex flex-col">

                {/* منطقة الصورة مع Skeleton Loader */}
                <div className="aspect-[2/3] relative overflow-hidden bg-gray-800">
                    {!imgLoaded && !imgError && (
                        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-800 to-gray-700 z-0" />
                    )}

                    {movie.Poster !== 'N/A' && !imgError ? (
                        <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className={`w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                            loading="lazy"
                            onLoad={() => setImgLoaded(true)}
                            onError={() => {
                                setImgError(true);
                                setImgLoaded(true);
                            }}
                        />
                    ) : (
                        // Fallback Design أفضل من مجرد نص
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-gray-600">
                            <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                            </svg>
                            <span className="text-xs font-medium tracking-wider">NO POSTER</span>
                        </div>
                    )}

                    {/* تدرج لوني يظهر عند الهوفر لتحسين قراءة النص */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                </div>

                {/* منطقة المعلومات */}
                <div className="p-4 flex-1 flex flex-col justify-between relative z-10">
                    <div>
                        <h3 className="text-white font-bold text-base mb-2 line-clamp-2 leading-tight group-hover:text-red-500 transition-colors duration-300">
                            {movie.Title}
                        </h3>

                        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                            <span className="bg-gray-800/80 px-2 py-1 rounded-md border border-gray-700">
                                {movie.Year}
                            </span>
                            <span className="capitalize tracking-wide">
                                {movie.Type}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>

            {/* زر المفضلة بتصميم Glassmorphism */}
            <button
                onClick={handleFavoriteClick}
                className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 z-20 shadow-lg
                    ${favorite
                        ? 'bg-red-500/20 border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white'
                        : 'bg-black/40 border-white/10 text-white hover:bg-white hover:text-black'
                    }
                    active:scale-90
                `}
                aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                <svg
                    className={`w-5 h-5 transition-transform duration-300 ${favorite ? 'scale-110' : 'scale-100'}`}
                    viewBox="0 0 24 24"
                    fill={favorite ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
            </button>
        </div>
    );
});

export default MovieCard;