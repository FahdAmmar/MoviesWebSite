import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMovieStore } from '../store/useMovieStore';
import { Movie } from '../types';

const MovieDetails: React.FC = () => {
    const { imdbID } = useParams<{ imdbID: string }>();
    const navigate = useNavigate();

    const selectedMovie = useMovieStore((state) => state.selectedMovie);
    const loading = useMovieStore((state) => state.loading);
    const getMovieDetails = useMovieStore((state) => state.getMovieDetails);
    const toggleFavorite = useMovieStore((state) => state.toggleFavorite);
    const isFavorite = useMovieStore((state) => state.isFavorite);

    useEffect(() => {
        if (imdbID) {
            getMovieDetails(imdbID);
        }
    }, [imdbID, getMovieDetails]);

    const favorite = imdbID ? isFavorite(imdbID) : false;

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="loading text-netflix-red text-2xl">Loading...</div>
            </div>
        );
    }

    if (!selectedMovie) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-netflix-gray text-lg mb-4">Movie not found</p>
                    <Link to="/" className="text-netflix-red hover:underline">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const movie = selectedMovie;

    return (
        <div className="min-h-screen pt-20">
            <div
                className="relative h-[50vh] bg-cover bg-center"
                style={{
                    backgroundImage: movie.Poster !== 'N/A' ? `url(${movie.Poster})` : 'none',
                }}
            >
                <div className="absolute inset-0 bg-linear-to-t from-netflix-black via-netflix-black/50 to-transparent" />
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 text-white hover:text-netflix-red 
            transition-colors flex items-center gap-2"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
            </div>

            <div className="container mx-auto px-4 -mt-32 relative z-10">
                <div className="bg-netflix-dark/95 backdrop-blur-sm rounded-lg p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="shrink-0">
                            {movie.Poster !== 'N/A' ? (
                                <img
                                    src={movie.Poster}
                                    alt={movie.Title}
                                    className="w-64 rounded-lg shadow-2xl"
                                />
                            ) : (
                                <div className="w-64 h-96 bg-netflix-gray/20 rounded-lg 
                  flex items-center justify-center">
                                    <span className="text-netflix-gray text-6xl">🎬</span>
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-white mb-4">{movie.Title}</h1>

                            <div className="flex flex-wrap gap-4 mb-6 text-sm">
                                {movie.Year && <span className="text-netflix-gray">{movie.Year}</span>}
                                {movie.Rated && (
                                    <span className="bg-netflix-gray/30 px-3 py-1 rounded">{movie.Rated}</span>
                                )}
                                {movie.Runtime && <span className="text-netflix-gray">{movie.Runtime}</span>}
                                {movie.imdbRating && (
                                    <span className="flex items-center gap-1">
                                        <span className="text-yellow-500">★</span>
                                        {movie.imdbRating}
                                    </span>
                                )}
                            </div>

                            <div className="flex gap-4 mb-8">
                                <button
                                    className="bg-white text-black px-8 py-3 rounded-md 
                    font-medium hover:bg-gray-200 transition-colors 
                    flex items-center gap-2"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    Play
                                </button>
                                <button
                                    onClick={() => {
                                        if (imdbID) {
                                            toggleFavorite({
                                                imdbID,
                                                Title: movie.Title,
                                                Year: movie.Year,
                                                Type: movie.Type,
                                                Poster: movie.Poster,
                                            } as Movie);
                                        }
                                    }}
                                    className={`px-8 py-3 rounded-md font-medium transition-colors 
                    flex items-center gap-2 ${favorite
                                            ? 'bg-netflix-red text-white'
                                            : 'bg-netflix-gray/30 text-white hover:bg-netflix-gray/50'
                                        }`}
                                >
                                    <svg
                                        className="w-6 h-6"
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
                                    {favorite ? 'In List' : 'Add to List'}
                                </button>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-white mb-2">Plot</h3>
                                <p className="text-netflix-gray leading-relaxed">
                                    {movie.Plot || 'No plot available'}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {movie.Genre && (
                                    <div>
                                        <span className="text-netflix-gray">Genre: </span>
                                        <span className="text-white">{movie.Genre}</span>
                                    </div>
                                )}
                                {movie.Director && (
                                    <div>
                                        <span className="text-netflix-gray">Director: </span>
                                        <span className="text-white">{movie.Director}</span>
                                    </div>
                                )}
                                {movie.Actors && (
                                    <div className="col-span-2">
                                        <span className="text-netflix-gray">Cast: </span>
                                        <span className="text-white">{movie.Actors}</span>
                                    </div>
                                )}
                                {movie.Language && (
                                    <div>
                                        <span className="text-netflix-gray">Language: </span>
                                        <span className="text-white">{movie.Language}</span>
                                    </div>
                                )}
                                {movie.Country && (
                                    <div>
                                        <span className="text-netflix-gray">Country: </span>
                                        <span className="text-white">{movie.Country}</span>
                                    </div>
                                )}
                                {movie.Awards && (
                                    <div className="col-span-2">
                                        <span className="text-netflix-gray">Awards: </span>
                                        <span className="text-white">{movie.Awards}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;