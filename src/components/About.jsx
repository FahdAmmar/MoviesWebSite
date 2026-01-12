import { FaFilm, FaPlay, FaStar, FaCalendarAlt, FaTicketAlt, FaHeart } from "react-icons/fa";
import { GiFilmStrip, GiPopcorn } from "react-icons/gi";

const About = () => {
    // Sample film data
    const films = [
        { id: 1, title: "Inception", genre: "Sci-Fi", rating: 4.8, year: 2010, color: "from-cyan-500 to-blue-600" },
        { id: 2, title: "Interstellar", genre: "Adventure", rating: 4.9, year: 2014, color: "from-purple-500 to-pink-600" },
        { id: 3, title: "The Matrix", genre: "Action", rating: 4.7, year: 1999, color: "from-orange-500 to-red-600" },
        { id: 4, title: "Parasite", genre: "Thriller", rating: 4.6, year: 2019, color: "from-green-500 to-emerald-600" },
        { id: 5, title: "La La Land", genre: "Musical", rating: 4.5, year: 2016, color: "from-yellow-500 to-orange-600" },
        { id: 6, title: "The Dark Knight", genre: "Action", rating: 4.9, year: 2008, color: "from-gray-700 to-gray-900" },
    ];

    return (
        <div className="relative overflow-hidden">
            {/* Background linear */}
            <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-purple-900 to-blue-900 opacity-90"></div>

            {/* Animated linear Orbs */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <div className="text-center mb-16">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                        <GiFilmStrip className="text-yellow-400 text-2xl" />
                        <span className="text-lg font-semibold text-white">
                            Premium Film Collection
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Discover Our
                        <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400">
                            Cinema Universe
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                        Dive into our curated collection of 10,000+ films from every genre.
                        From classic masterpieces to modern blockbusters, we bring the magic
                        of cinema to your screen.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-2xl mx-auto">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">10K+</div>
                            <div className="text-gray-300">Films</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white bg-linear-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">500+</div>
                            <div className="text-gray-300">Directors</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">4.8★</div>
                            <div className="text-gray-300">Avg Rating</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white bg-linear-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">24/7</div>
                            <div className="text-gray-300">Streaming</div>
                        </div>
                    </div>
                </div>

                {/* Film Boxes Grid */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Films</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {films.map((film) => (
                            <div
                                key={film.id}
                                className="group relative bg-gray-800/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500 hover:transform hover:scale-105"
                            >
                                {/* Film Poster linear */}
                                <div className={`h-48 bg-linear-to-r ${film.color} relative`}>
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                        <button className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform group-hover:scale-110">
                                            <FaPlay className="text-white text-2xl" />
                                        </button>
                                    </div>

                                    {/* Rating Badge */}
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                                        <FaStar className="text-yellow-400" />
                                        <span className="text-white font-bold">{film.rating}</span>
                                    </div>
                                </div>

                                {/* Film Content */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">{film.title}</h3>
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <FaFilm className="text-sm" />
                                                <span className="text-sm">{film.genre}</span>
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                                            <FaHeart className="text-xl" />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-gray-400" />
                                            <span className="text-gray-300">{film.year}</span>
                                        </div>
                                        <button className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all duration-300 transform hover:-translate-y-1">
                                            <FaTicketAlt className="inline mr-2" />
                                            Watch Now
                                        </button>
                                    </div>
                                </div>

                                {/* Hover Effect Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                </div>



            </div>
        </div>
    );
};

export default About;