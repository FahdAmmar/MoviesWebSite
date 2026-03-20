import React from 'react';
import MovieList from '../components/MovieList';
import { useMovieStore } from '../store/useMovieStore';
import { Link } from 'react-router-dom';

const Favorites: React.FC = () => {
    const favorites = useMovieStore((state) => state.favorites);

    return (
        <div className="min-h-screen pt-20">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-white mb-2">My List</h1>
                <p className="text-netflix-gray mb-8">
                    Your favorite movies and TV shows
                </p>

                {favorites.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📋</div>
                        <h2 className="text-2xl font-medium text-white mb-2">
                            Your list is empty
                        </h2>
                        <p className="text-netflix-gray mb-6">
                            Start adding movies to your list to see them here
                        </p>
                        <Link
                            to="/"
                            className="inline-block bg-netflix-red hover:bg-red-700 
                text-white px-6 py-3 rounded-md font-medium 
                transition-colors"
                        >
                            Browse Movies
                        </Link>
                    </div>
                ) : (
                    <MovieList movies={favorites} title={`My List (${favorites.length})`} />
                )}
            </div>
        </div>
    );
};

export default Favorites;