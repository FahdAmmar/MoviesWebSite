import React, { useState, memo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMovieStore } from '../store/useMovieStore';
import type { Movie } from '../types';

// --- Constants ---
const MAX_FAVORITES = 10; // Consistent with MovieDetails logic

interface MovieCardProps {
    movie: Movie;
    index?: number;
}

const MovieCard: React.FC<MovieCardProps> = memo(({ movie, index = 0 }) => {
    // --- Store Selectors ---
    const toggleFavorite = useMovieStore((state) => state.toggleFavorite);
    const isFavorite = useMovieStore((state) => state.isFavorite);
    const favoritesList = useMovieStore((state) => state.favorites); // Needed for length check

    // --- Local State ---
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [shouldShake, setShouldShake] = useState(false);

    const favorite = isFavorite(movie.imdbID);

    // --- Clear Error Message after delay ---
    useEffect(() => {
        if (errorMsg) {
            const timer = setTimeout(() => setErrorMsg(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMsg]);

    // --- Core Logic Handler (Matches MovieDetails) ---
    const handleFavoriteClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isProcessing) return;

        // Scenario 1: Removing from favorites (Always allowed)
        if (favorite) {
            setIsProcessing(true);
            toggleFavorite(movie);
            setTimeout(() => setIsProcessing(false), 300);
            return;
        }

        // Scenario 2: Adding to favorites (Check Capacity)
        if (favoritesList.length >= MAX_FAVORITES) {
            setErrorMsg(`Max ${MAX_FAVORITES} items`);
            setShouldShake(true);
            // Trigger shake animation reset
            setTimeout(() => setShouldShake(false), 500);
            return;
        }

        // Scenario 3: Successful Add
        setIsProcessing(true);
        toggleFavorite(movie);
        setTimeout(() => setIsProcessing(false), 300);

    }, [favorite, isProcessing, movie, toggleFavorite, favoritesList.length]);

    // --- Animation Variants ---
    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.4, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }
        },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
        shake: {
            x: [-5, 5, -5, 5, 0],
            transition: { duration: 0.4 }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={shouldShake ? "shake" : "visible"}
            exit="exit"
            whileHover={{ y: -6 }}
            className="group relative"
        >
            {/* Error Tooltip */}
            <AnimatePresence>
                {errorMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.8 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl whitespace-nowrap"
                    >
                        {errorMsg}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-800/60 hover:border-gray-700 transition-all duration-300 h-full flex flex-col">
                <Link
                    to={`/movie/${movie.imdbID}`}
                    className="h-full flex flex-col flex-1"
                >
                    {/* Image Container */}
                    <div className="aspect-2/3 relative overflow-hidden bg-gray-800">
                        <AnimatePresence>
                            {!imgLoaded && !imgError && (
                                <motion.div
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800"
                                >
                                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {movie.Poster !== 'N/A' && !imgError ? (
                            <motion.img
                                src={movie.Poster}
                                alt={`${movie.Title} poster`}
                                className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                                loading="lazy"
                                onLoad={() => setImgLoaded(true)}
                                onError={() => {
                                    setImgError(true);
                                    setImgLoaded(true);
                                }}
                                whileHover={{ scale: 1.08 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-gray-500">
                                <svg className="w-14 h-14 mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                </svg>
                                <span className="text-xs font-semibold tracking-widest uppercase">No Poster</span>
                            </div>
                        )}

                        {/* Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between relative z-10">
                        <div>
                            <motion.h3
                                className="text-white font-bold text-base mb-2.5 line-clamp-2 leading-snug group-hover:text-red-400 transition-colors duration-300"
                                whileHover={{ x: 2 }}
                            >
                                {movie.Title}
                            </motion.h3>

                            <div className="flex items-center gap-2.5 text-xs text-gray-400 font-medium">
                                <span className="bg-gray-800/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-gray-700/50 font-semibold">
                                    {movie.Year}
                                </span>
                                <span className="capitalize tracking-wide bg-gray-800/40 px-2 py-1 rounded-lg">
                                    {movie.Type}
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* --- Advanced Heart Button --- */}
                <motion.button
                    onClick={handleFavoriteClick}
                    whileTap={{ scale: 0.85 }}
                    whileHover={{ scale: 1.15 }}
                    animate={isProcessing ? { scale: 0.95, opacity: 0.7 } : { scale: 1, opacity: 1 }}
                    className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-xl border shadow-lg z-20 transition-all duration-300
                        ${favorite
                            ? 'bg-gradient-to-br from-red-600/25 to-red-900/25 border-red-500/60 text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600'
                            : 'bg-black/50 border-white/20 text-white/90 hover:bg-white hover:text-black hover:border-white'
                        }
                    `}
                    aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                    aria-pressed={favorite}
                    disabled={isProcessing}
                >
                    <motion.svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        // Heartbeat animation on active state
                        animate={favorite ? {
                            scale: [1, 1.3, 1],
                            transition: { duration: 0.4, repeat: 0, ease: 'easeInOut' }
                        } : { scale: 1 }}
                    >
                        <defs>
                            <linearGradient id="cardHeartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ff4b4b" />
                                <stop offset="100%" stopColor="#ff0055" />
                            </linearGradient>
                        </defs>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            fill={favorite ? "url(#cardHeartGradient)" : "none"}
                            stroke={favorite ? "none" : "currentColor"}
                        />
                    </motion.svg>

                    {/* Ripple Effect on Active */}
                    {favorite && (
                        <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute inset-0 rounded-full bg-red-500/30"
                        />
                    )}
                </motion.button>
            </div>
        </motion.div>
    );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;