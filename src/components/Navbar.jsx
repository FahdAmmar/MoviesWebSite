import React, { useState, useEffect } from 'react';
import { Menu, X } from "lucide-react";

function Navbar() {
    const [toggleNavbar, setToggleNavbar] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const input = inputValue.trim();
    const key = "68f0f041";

    function mobileDrawerOpen() {
        setToggleNavbar(!toggleNavbar);
    }

    useEffect(() => {
        const controller = new AbortController();
        const timer = setTimeout(async () => {
            const API = `https://www.omdbapi.com/?s=${input}&apikey=${key}`;
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(API, { signal: controller.signal });
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

                const data = await res.json();
                if (data.Response === "True") {
                    setMovies(data.Search || []);
                } else {
                    setMovies([]);
                    setError(data.Error || "No movies found");
                }
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Error fetching data:", error);
                    setError(error.message);
                    setMovies([]);
                }
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => {
            clearTimeout(timer);
            controller.abort(); // إلغاء الطلب السابق
        };
    }, [input, key]);



    useEffect(() => {
        const handleScroll = () => {

            if (window.scrollY > 700) {
                if (inputValue !== "") {
                    setInputValue("")
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

    }, [inputValue])

    return (
        <header className='flex w-full z-50 transition-all duration-300 sticky  top-0 left-0 bg-neutral-800 '>
            <div className="container mx-auto px-4 py-4 ">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <a href="/">
                            <span className='text-red-500 hover:text-white font-bold text-3xl'>Top
                                <span className="text-white hover:text-red-400">Cima</span>
                            </span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className='hidden md:flex items-center space-x-6'>
                        <a href="#movies" className='text-white hover:text-red-400 hover:bg-white p-2 rounded font-medium transition-all capitalize'>movies</a>
                        <a href="#tvshows" className='capitalize text-white hover:text-red-400 hover:bg-white p-2 rounded font-medium transition-all'>tv shows</a>
                        <a href="#series" className='capitalize text-white  hover:text-red-400 hover:bg-white p-2 rounded font-medium transition-all'>series</a>
                        <a href="#animation" className='capitalize text-white hover:text-red-400 hover:bg-white p-2 rounded font-medium transition-all'>animation</a>
                    </nav>

                    {/* Input search */}
                    <div className="hidden md:block relative input-search">
                        <div className="relative">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder='search movie ...'
                                className='px-4 py-2 w-48 focus:w-55 bg-neutral-300 rounded-full text-2xl text-white'
                            />

                            {inputValue && (
                                <div className='absolute top-12 left-0 w-64 max-h-96 bg-neutral-800 rounded-lg z-50 overflow-y-auto shadow-lg'>
                                    {loading ? (
                                        <div className="p-4 text-white text-center">
                                            <p className="mt-2">Loading...</p>
                                        </div>

                                    ) : error ? (
                                        <div className="p-4 text-red-400 text-center">{error}</div>


                                    ) : movies && movies.length > 0 ? (
                                        movies.map((movie, i) => (
                                            <div
                                                key={movie.imdbID || i}
                                                className="flex items-center p-3 hover:bg-neutral-700 cursor-pointer border-b border-neutral-600"
                                            >
                                                <div className="image-wrapper h-16 w-12 bg-neutral-900 rounded overflow-hidden shrink-0 flex items-center justify-center">
                                                    {movie.Poster && movie.Poster !== "N/A" ? (
                                                        <img
                                                            src={movie.Poster}
                                                            alt={movie.Title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                                                            <span className="text-white text-xs">No Image</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-white text-sm font-medium truncate max-w-[180px]">
                                                        {movie.Title}
                                                    </div>
                                                    <div className="text-neutral-400 text-xs">
                                                        {movie.Year}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-4 text-neutral-400 text-center">
                                            {inputValue.trim() !== "" ? "No movies found" : "Type to search"}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:hidden  md:flex flex-col justify-end">
                        <button onClick={mobileDrawerOpen}>
                            {toggleNavbar ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {toggleNavbar && (
                    <nav className="lg:hidden w-full bg-neutral-800 z-50 absolute right-0 top-12 py-8 flex flex-col justify-center items-center ">
                        <div className="flex flex-col space-y-4 ">
                            <a href="#movies" className='text-white  hover:text-red-400 font-medium transition-all capitalize text-center'>movies</a>
                            <a href="#tvshows" className='capitalize text-white hover:text-red-400 font-medium transition-all text-center'>tv shows</a>
                            <a href="#serios" className='capitalize text-white hover:text-red-400 font-medium transition-all text-center'>serios</a>
                            <a href="#animation" className='capitalize text-white hover:text-red-400 font-medium transition-all text-center'>animation</a>
                        </div>
                        <input
                            type="text"
                            placeholder='search movie ...'
                            className='px-4 py-3 w-64 bg-neutral-700 rounded-lg text-white mt-6 border border-neutral-600 focus:border-pink-500 focus:outline-none'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        {/*Sart search mobile */}
                        {inputValue && (
                            <div className='w-full h-full bg-neutral-800 absolute top-5/6 flex flex-row gap-2 flex-wrap  overflow-y-auto justify-center mb-4'>
                                {loading ? (<p>Loading...</p>)
                                    : error ? (<p className='text-red-300'>Not founde it</p>)
                                        : movies && movies.length > 0 ? (movies.map((movie, i) => (<div className='  border flex justify-between items-center  ' key={i}>





                                            <div className="image-wrapper h-16 w-12 bg-neutral-900 rounded overflow-hidden shrink-0 flex items-center justify-center">
                                                {movie.Poster && movie.Poster !== "N/A" ? (
                                                    <img
                                                        src={movie.Poster}
                                                        alt={movie.Title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                                                        <span className="text-white text-xs">No Image</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-1">
                                                <div className="text-white text-xs  text-wrap  ">
                                                    {movie.Title}
                                                </div>
                                                <div className="text-neutral-400 text-xs">
                                                    {movie.Year}
                                                </div>
                                            </div>

                                        </div>))) : ""}

                            </div>
                        )}



                        {/*End search mobile */}


                    </nav>
                )}
            </div>
        </header>
    );
}

export default Navbar;