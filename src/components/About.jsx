import { FaFilm, FaPlay, FaStar, FaCalendarAlt, FaTicketAlt, FaHeart } from "react-icons/fa";
import { GiFilmStrip, GiPopcorn } from "react-icons/gi";
import { useState, useEffect } from "react";
const About = () => {

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);


    const API_KEY = "68f0f041"; // ضع مفتاحك هنا
    const QUERY = "Avengers"; // الكلمة المفتاحية للبحث (يمكنك تغييرها)



    const fetchMovies = async () => {
        if (!hasMore) return;
        setLoading(true);

        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${QUERY}&page=${page}`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.Response === "True") {
                setItems(prev => [...prev, ...data.Search]);
                console.log(items)

                // إذا وصلنا إلى 50 عنصر نوقف التحميل
                if (items.length + data.Search.length >= 50) {
                    setHasMore(false);
                }
            } else {
                setHasMore(false);
                console.log("لا توجد نتائج إضافية:", data.Error);
            }
        } catch (error) {
            console.error("خطأ أثناء الجلب:", error);
        }
        setLoading(false);
    };

    // جلب البيانات عند تغيير الصفحة
    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line
    }, [page]);

    // مراقبة النزول
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
                !loading &&
                hasMore
            ) {
                setPage(prev => prev + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]);



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
                            <div className="text-4xl font-bold text-white bg-linear-to-r from-green-500 to-emerald-600 bg-clip-text ">24/7</div>
                            <div className="text-gray-300">Streaming</div>
                        </div>
                    </div>
                </div>

                {/* Film Boxes Grid */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Films</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className={`group relative bg-gray-800/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500 hover:transform hover:scale-105 `}
                            >
                                {/* Film Poster linear */}
                                <div className={`h-48  relative`}>
                                    <div className="absolute inset-0 bg-gray-500/50 flex items-center justify-center object-cover" style={{ backgroundImage: `url(${item.Poster})` }}>
                                        <button className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform group-hover:scale-110">
                                            <FaPlay className="text-white text-2xl" />
                                        </button>
                                    </div>

                                    {/* Rating Badge */}
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                                        <FaStar className="text-yellow-400" />
                                        <span className="text-white font-bold">{"test"}</span>
                                    </div>
                                </div>

                                {/* Film Content */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">{item.Title}</h3>
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <FaFilm className="text-sm" />
                                                <span className="text-sm">{item.Type}</span>
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                                            <FaHeart className="text-xl" />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-gray-400" />
                                            <span className="text-gray-300">{item.Year}</span>
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