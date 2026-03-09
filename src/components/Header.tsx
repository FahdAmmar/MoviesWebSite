// مكون شريط التنقل العلوي
// يحتوي على الشعار وروابط التنقل

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';

const Header: React.FC = () => {
    // الحصول على حالة المفضلة من السياق
    const { state } = useMovieContext();

    // الحصول على المسار الحالي
    const location = useLocation();

    return (
        // شريط التنقل العلوي
        <header className="fixed top-0 left-0 right-0 z-50 bg-netflix-black/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* شعار Netflix */}
                    <Link to="/" className="text-netflix-red text-3xl font-bold tracking-wider">
                        NETFLIX
                    </Link>

                    {/* روابط التنقل */}
                    <nav className="flex items-center gap-6">
                        {/* رابط الصفحة الرئيسية */}
                        <Link
                            to="/"
                            className={`text-sm font-medium transition-colors ${location.pathname === '/'
                                ? 'text-white'
                                : 'text-netflix-gray hover:text-white'
                                }`}
                        >
                            Home
                        </Link>

                        {/* رابط صفحة المفضلة مع عداد */}
                        <Link
                            to="/favorites"
                            className={`text-sm font-medium transition-colors flex items-center gap-2 ${location.pathname === '/favorites'
                                ? 'text-white'
                                : 'text-netflix-gray hover:text-white'
                                }`}
                        >
                            <span>My List</span>
                            {/* عرض عدد الأفلام في المفضلة */}
                            {state.favorites.length > 0 && (
                                <span className="bg-netflix-red text-white text-xs px-2 py-0.5 rounded-full">
                                    {state.favorites.length}
                                </span>
                            )}
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;