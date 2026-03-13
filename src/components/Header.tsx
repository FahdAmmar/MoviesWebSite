import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import {
    Menu,
    X,
    Home,
    Heart,
    Film,
    Sparkles
} from 'lucide-react';

const Header: React.FC = () => {
    const { state } = useMovieContext();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // إغلاق القائمة عند تغيير المسار
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // منع التمرير في الخلفية عند فتح القائمة
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    // روابط التنقل مع الأيقونات
    const navLinks = [
        {
            to: '/',
            label: 'Home',
            icon: Home,
            activeIcon: Sparkles
        },
        {
            to: '/favorites',
            label: 'My List',
            icon: Heart,
            showBadge: true
        }
    ];

    return (
        <>
            {/* === شريط التنقل العلوي === */}
            <header className="fixed top-0 left-0 right-0 z-50 w-full  backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">

                    {/* الشعار مع أيقونة */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 group"
                    >
                        <div className="relative p-1.5 rounded-lg bg-linear-to-br from-rose-500/20 to-orange-500/20 group-hover:from-rose-500/30 group-hover:to-orange-500/30 transition-all duration-300">
                            <Film
                                size={24}
                                className="text-rose-500 group-hover:text-rose-400 transition-colors"
                            />
                        </div>
                        <span className="text-2xl sm:text-3xl font-bold tracking-tight bg-linear-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent group-hover:from-rose-400 group-hover:to-orange-400 transition-all duration-300">
                            FILMIX
                        </span>
                    </Link>

                    {/* روابط التنقل للشاشات الكبيرة */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.pathname === link.to;

                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg  `}
                                >
                                    <Icon
                                        size={16}
                                        className={`transition-all duration-200 ${isActive
                                            ? 'text-rose-500 scale-110'
                                            : 'hover:scale-110'
                                            } ${link.showBadge && state.favorites.length > 0 ? 'relative' : ''}`}
                                    />
                                    {link.label}

                                    {/* مؤشر التحديد تحت الرابط النشط */}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-rose-500 rounded-full" />
                                    )}

                                    {/* تأثير الهوفر الخلفي */}
                                    <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* شارة المفضلة */}
                                    {link.showBadge && state.favorites.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-slate-900 animate-pulse">
                                            {state.favorites.length}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* زر القائمة للجوال */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/10 hover:rotate-90 rounded-lg transition-all duration-200 active:scale-95"
                        aria-label="فتح القائمة"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            {/* === القائمة الجانبية للجوال === */}

            {/* خلفية معتمة */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* لوحة القائمة */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-72 max-w-[85vw] bg-slate-900 border-r border-white/10 
                    transform transition-transform duration-300 ease-out md:hidden shadow-2xl shadow-black/50
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-label="قائمة التنقل"
            >
                {/* رأس القائمة */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-900/50">
                    <Link
                        to="/"
                        className="flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <Film size={20} className="text-rose-500" />
                        <span className="text-xl font-bold bg-linear-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                            FILMIX
                        </span>
                    </Link>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 text-slate-400 hover:text-white hover:bg-white/10 hover:rotate-90 rounded-lg transition-all duration-200 active:scale-95"
                        aria-label="إغلاق القائمة"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* روابط التنقل */}
                <nav className="flex flex-col px-3 py-4 gap-2">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.to;

                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center justify-between py-3.5 px-4 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-linear-to-r from-rose-600/20 to-orange-600/20 text-white border border-rose-500/30 shadow-lg shadow-rose-900/20'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5 active:bg-white/10'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon
                                        size={20}
                                        className={`transition-all duration-200 ${isActive
                                            ? 'text-rose-500 scale-110'
                                            : 'group-hover:text-rose-400 group-hover:scale-110'
                                            }`}
                                    />
                                    <span className="font-medium text-base">{link.label}</span>
                                </div>

                                {link.showBadge && state.favorites.length > 0 && (
                                    <span className="bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-full min-w-[24px] text-center border-2 border-slate-900 animate-pulse">
                                        {state.favorites.length}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>



            </aside>
        </>
    );
};

export default Header;