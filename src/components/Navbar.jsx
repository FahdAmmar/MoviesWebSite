import React from 'react'
import { Menu, X } from "lucide-react";
import { useState } from 'react';





function Navbar() {
    const [toggleNavbar, setToggleNavbar] = useState(false)


    function mobileDrawerOpen() {
        setToggleNavbar(!toggleNavbar)
    }

    return (
        <header className='flex
         w-full z-50 transition-all duration-300'>
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <a href="/">
                            <span className='text-purple-500 hover:text-white font-bold text-3xl'>Top
                                <span className="text-white hover:text-purple-400">Cima</span>
                            </span>
                        </a>
                    </div>
                    {/*Desktio Navigation*/}
                    <nav className='hidden md:flex items-center space-x-8'>
                        <a href="#home" className='text-white hover:text-pink-300 font-medium transition-all capitalize' >home</a>

                        <a href="#trending" className='capitalize text-white hover:text-pink-300 font-medium transition-all' >trending</a>

                        <a href="#popular" className='capitalize text-white hover:text-pink-300 font-medium transition-all' >popular</a>

                        <a href="#top-rate" className='capitalize text-white hover:text-pink-300 font-medium transition-all' >top rate</a>
                    </nav>
                    {/*input  search*/}
                    <div className="hidden md:block relative input-search">
                        <div className="relative">
                            <input type="text"
                                placeholder='search movie ...'
                                className='px-4 py-2 w-48 focus:w-64 bg-neutral-300 rounded-full
                                text-sm focus:ring-2 focus:ring-pink-400/40 '
                            />
                        </div>
                    </div>
                    <div className="lg:hidden md:flex flex-col justify-end">
                        <button onClick={mobileDrawerOpen}>
                            {toggleNavbar ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
                {/*Mobile Navigation*/}
                {toggleNavbar && (
                    <nav className="lg:hidden w-full bg-neutral-800 z-50 absolute right-0  py-10 flex flex-col
                    justify-center items-center">
                        <ul className=' divide-y divide-red-700 flex flex-col space-y-3'>

                            <a href="#home" className='text-white hover:text-pink-300 font-medium transition-all capitalize' >home</a>

                            <a href="#trending" className='capitalize text-white hover:text-pink-300 font-medium transition-all' >trending</a>

                            <a href="#popular" className='capitalize text-white hover:text-pink-300 font-medium transition-all' >popular</a>

                            <a href="#top-rate" className='capitalize text-white hover:text-pink-300 font-medium transition-all' >top rate</a>

                        </ul>
                        <input type="text"
                            placeholder='search movie ...'
                            className='px-4 py-2 w-48 focus:w-64 bg-neutral-300 rounded-full
                                text-sm focus:ring-2 focus:ring-pink-400/40  mt-3'
                        />

                    </nav>
                )}
            </div>
        </header>

    )
}

export default Navbar