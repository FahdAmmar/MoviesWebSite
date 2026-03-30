import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMovieStore } from '../store/useMovieStore';
import { Movie } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

// --- Constants ---
const MAX_FAVORITES = 10; // Define your application's limit

// --- Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
    exit: { opacity: 0, y: -20 }
};

const imageVariants = {
    hover: { scale: 1.05, rotate: 1, transition: { duration: 0.3 } },
    tap: { scale: 0.95 }
};

// --- Notification Component (Toast) ---
const Notification: React.FC<{ message: string; type: 'error' | 'success'; onClose: () => void }> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className={`fixed bottom-8 left-1/2 px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-3 border ${type === 'error'
                ? 'bg-red-900/90 border-red-500 text-white'
                : 'bg-green-900/90 border-green-500 text-white'
                } backdrop-blur-md`}
        >
            <span className="text-lg">{type === 'error' ? '⚠️' : '✅'}</span>
            <span className="font-medium text-sm">{message}</span>
        </motion.div>
    );
};

const MovieDetails: React.FC = () => {
    const { imdbID } = useParams<{ imdbID: string }>();
    const navigate = useNavigate();

    // Store Selectors
    const selectedMovie = useMovieStore((state) => state.selectedMovie);
    const loading = useMovieStore((state) => state.loading);
    const getMovieDetails = useMovieStore((state) => state.getMovieDetails);
    const toggleFavorite = useMovieStore((state) => state.toggleFavorite);
    const isFavorite = useMovieStore((state) => state.isFavorite);
    // We need the actual list to check length
    const favoritesList = useMovieStore((state) => state.favorites);

    // Local State for UI Logic
    const [isProcessing, setIsProcessing] = useState(false);
    const [notification, setNotification] = useState<{ message: string; type: 'error' | 'success' } | null>(null);

    useEffect(() => {
        if (imdbID) {
            getMovieDetails(imdbID);
        }
    }, [imdbID, getMovieDetails]);

    const favorite = imdbID ? isFavorite(imdbID) : false;

    // --- Core Logic Handler ---
    const handleToggleFavorite = useCallback(() => {
        if (!imdbID || !selectedMovie || isProcessing) return;

        // Scenario 1: Removing from favorites (Always allowed)
        if (favorite) {
            setIsProcessing(true);
            toggleFavorite({
                imdbID,
                Title: selectedMovie.Title,
                Year: selectedMovie.Year,
                Type: selectedMovie.Type,
                Poster: selectedMovie.Poster,
            } as Movie);

            // Simulate slight delay for UX feel, then release lock
            setTimeout(() => setIsProcessing(false), 300);
            return;
        }

        // Scenario 2: Adding to favorites (Check Capacity)
        if (favoritesList.length >= MAX_FAVORITES) {
            setNotification({
                message: `Favorites list is full (Max ${MAX_FAVORITES}). Remove a movie to add a new one.`,
                type: 'error'
            });
            // Do not update state or call toggleFavorite
            return;
        }

        // Scenario 3: Successful Add
        setIsProcessing(true);
        toggleFavorite({
            imdbID,
            Title: selectedMovie.Title,
            Year: selectedMovie.Year,
            Type: selectedMovie.Type,
            Poster: selectedMovie.Poster,
        } as Movie);

        setTimeout(() => {
            setIsProcessing(false);
            setNotification({ message: 'Added to favorites!', type: 'success' });
        }, 300);

    }, [imdbID, selectedMovie, favorite, favoritesList.length, isProcessing, toggleFavorite]);

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="loading text-netflix-red text-2xl font-bold tracking-widest"
                >
                    LOADING...
                </motion.div>
            </div>
        );
    }

    if (!selectedMovie) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                    <p className="text-netflix-gray text-lg mb-4">Movie not found</p>
                    <Link to="/" className="text-netflix-red hover:underline font-medium">Back to Home</Link>
                </motion.div>
            </div>
        );
    }

    const movie = selectedMovie;

    return (
        <div className="min-h-screen pt-20 bg-netflix-black overflow-hidden relative">
            {/* Notification Toast */}
            <AnimatePresence>
                {notification && (
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification(null)}
                    />
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-[50vh] bg-cover bg-center"
                style={{ backgroundImage: movie.Poster !== 'N/A' ? `url(${movie.Poster})` : 'none' }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/60 to-transparent" />
                <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6 text-white/80 hover:text-white transition-colors flex items-center gap-2 z-20 backdrop-blur-md bg-white/10 px-4 py-2 rounded-full border border-white/10"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-medium text-sm">Back</span>
                </motion.button>
            </motion.div>

            {/* Main Content */}
            <div className="container mx-auto px-4 -mt-32 relative z-10 pb-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    layout
                    className="bg-dark/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/5"
                >
                    <div className="flex flex-col md:flex-row gap-10">
                        {/* Poster */}
                        <motion.div className="shrink-0 flex justify-center md:justify-start" layout>
                            <motion.div variants={imageVariants} whileHover="hover" whileTap="tap" className="relative group">
                                {movie.Poster !== 'N/A' ? (
                                    <img src={movie.Poster} alt={movie.Title} className="w-64 md:w-72 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10" />
                                ) : (
                                    <div className="w-64 h-96 bg-netflix-gray/20 rounded-xl flex items-center justify-center border border-white/10">
                                        <span className="text-netflix-gray text-6xl">🎬</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </motion.div>
                        </motion.div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-center">
                            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                {movie.Title}
                            </motion.h1>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-3 mb-8 text-sm font-medium">
                                {movie.Year && <span className="px-3 py-1 rounded-full bg-white/10 text-white border border-white/5">{movie.Year}</span>}
                                {movie.Rated && <span className="px-3 py-1 rounded-full bg-netflix-red/20 text-netflix-red border border-netflix-red/30">{movie.Rated}</span>}
                                {movie.Runtime && <span className="px-3 py-1 rounded-full bg-white/10 text-white border border-white/5">{movie.Runtime}</span>}
                                {movie.imdbRating && (
                                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                        <span className="text-yellow-500">★</span>{movie.imdbRating}
                                    </span>
                                )}
                            </motion.div>

                            <div className="flex flex-wrap gap-4 mb-10">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white text-black px-8 py-3.5 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center gap-2 shadow-lg shadow-white/10"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    Play Movie
                                </motion.button>

                                {/* --- Enhanced Heart Button Logic --- */}
                                <motion.button
                                    layout
                                    onClick={handleToggleFavorite}
                                    whileHover={{ scale: isProcessing ? 1 : 1.05 }}
                                    whileTap={{ scale: isProcessing ? 1 : 0.9 }}
                                    animate={isProcessing ? { scale: 0.95, opacity: 0.7 } : { scale: 1, opacity: 1 }}
                                    className={`relative px-6 py-3.5 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 overflow-hidden group
                                    ${favorite
                                            ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/30'
                                            : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                                        } ${isProcessing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    <motion.svg
                                        className="w-6 h-6"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        animate={{
                                            scale: favorite ? [1, 1.3, 1] : 1,
                                            rotate: favorite ? [0, -15, 15, 0] : 0,
                                        }}
                                        transition={{ duration: 0.4, type: "spring" }}
                                    >
                                        <defs>
                                            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#ff4b4b" />
                                                <stop offset="100%" stopColor="#ff0055" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                            fill={favorite ? "url(#heartGradient)" : "none"}
                                            stroke={favorite ? "none" : "currentColor"}
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </motion.svg>
                                    <span className="relative z-10">
                                        {isProcessing ? 'Processing...' : (favorite ? 'In List' : 'Add to List')}
                                    </span>
                                </motion.button>
                            </div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-netflix-red rounded-full"></span>Plot
                                    </h3>
                                    <p className="text-netflix-gray leading-relaxed text-lg">{movie.Plot || 'No plot available'}</p>
                                </div>
                                {/* Additional Details Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 pt-4 border-t border-white/10">
                                    {movie.Genre && <div className="flex flex-col"><span className="text-xs uppercase tracking-wider text-netflix-gray mb-1">Genre</span><span className="text-white font-medium">{movie.Genre}</span></div>}
                                    {movie.Director && <div className="flex flex-col"><span className="text-xs uppercase tracking-wider text-netflix-gray mb-1">Director</span><span className="text-white font-medium">{movie.Director}</span></div>}
                                    {movie.Actors && <div className="sm:col-span-2 flex flex-col"><span className="text-xs uppercase tracking-wider text-netflix-gray mb-1">Cast</span><span className="text-white font-medium">{movie.Actors}</span></div>}
                                    {movie.Language && <div className="flex flex-col"><span className="text-xs uppercase tracking-wider text-netflix-gray mb-1">Language</span><span className="text-white font-medium">{movie.Language}</span></div>}
                                    {movie.Country && <div className="flex flex-col"><span className="text-xs uppercase tracking-wider text-netflix-gray mb-1">Country</span><span className="text-white font-medium">{movie.Country}</span></div>}
                                    {movie.Awards && <div className="sm:col-span-2 flex flex-col"><span className="text-xs uppercase tracking-wider text-netflix-gray mb-1">Awards</span><span className="text-white font-medium">{movie.Awards}</span></div>}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MovieDetails;