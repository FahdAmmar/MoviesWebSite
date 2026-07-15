import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
    Film,
    Mail,
    MapPin,
    Phone,
    Github,
    Twitter,
    Instagram,
    Youtube,
    Heart,
    ArrowRight,
    Sparkles,
    Shield,
    Zap,
    Headphones
} from 'lucide-react';

const Footer: React.FC = () => {
    // Current year for copyright
    const currentYear = new Date().getFullYear();

    // حالة نموذج النشرة البريدية (بريد المستخدم ورسالة التأكيد)
    // ملاحظة: لا يوجد خادم فعلي حالياً لاستقبال الاشتراكات، لذا هذا
    // النموذج يقدّم تجربة واجهة كاملة (تحقق + تأكيد) بانتظار ربطه
    // بخدمة بريدية حقيقية مستقبلاً بدل أن يبقى بلا أي استجابة للمستخدم
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleNewsletterSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!newsletterEmail.trim()) return;

        setSubscribed(true);
        setNewsletterEmail('');
        // إخفاء رسالة التأكيد بعد فترة قصيرة
        setTimeout(() => setSubscribed(false), 4000);
    };

    // Quick navigation links
    // ملاحظة: تم إبقاء هذه القائمة مقتصرة على المسارات (Routes) الموجودة
    // فعلياً في App.tsx فقط. كانت تحتوي سابقاً على روابط لصفحات غير
    // معرّفة (/movies, /series, /new-releases) تؤدي لصفحة فارغة عند
    // النقر عليها لعدم وجود أي Route مطابق لها
    const quickLinks = [
        { to: '/', label: 'Home', icon: Film },
        { to: '/favorites', label: 'Favorites', icon: Heart },
    ];

    // Help links
    const helpLinks = [
        { label: 'Help Center', href: '#' },
        { label: 'FAQ', href: '#' },
        { label: 'Terms of Use', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Contact Us', href: '#' },
    ];

    // Social media links
    const socialLinks = [
        { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-sky-500' },
        { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-500' },
        { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-500' },
        { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-white' },
    ];

    // Site features
    const features = [
        { icon: Zap, label: 'Fast Streaming', desc: 'High quality without waiting' },
        { icon: Shield, label: 'Secure & Safe', desc: 'Safe browsing for your data' },
        { icon: Headphones, label: '24/7 Support', desc: 'Support team ready to help' },
    ];

    return (
        <footer className="relative bg-black border-t border-white/10">
            {/* Decorative top line */}
            <div className="h-1 bg-linear-to-r from-rose-500 via-orange-500 to-rose-500" />

            <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
                {/* === Main Section === */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                    {/* Column 1: Logo & Description */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4 group">
                            <div className="p-2 rounded-lg bg-linear-to-br from-rose-500/20 to-orange-500/20 group-hover:from-rose-500/30 group-hover:to-orange-500/30 transition-all duration-300">
                                <Film size={28} className="text-rose-500 group-hover:text-rose-400 transition-colors" />
                            </div>
                            <span className="text-2xl font-bold bg-linear-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                                FILMIX
                            </span>
                        </Link>

                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Your ultimate destination for watching movies and series in high quality.
                            A huge library of exclusive and premium content.
                        </p>

                        {/* Site Features */}
                        <div className="space-y-3">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="p-1.5 rounded-lg bg-rose-500/10 shrink-0">
                                            <Icon size={16} className="text-rose-500" />
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-medium">{feature.label}</p>
                                            <p className="text-gray-500 text-xs">{feature.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <Sparkles size={18} className="text-rose-500" />
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link, index) => {
                                const Icon = link.icon;
                                return (
                                    <li key={index}>
                                        <Link
                                            to={link.to}
                                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                                        >
                                            <Icon size={16} className="text-gray-500 group-hover:text-rose-500 transition-colors" />
                                            <span className="text-sm group-hover:translate-x-1 transition-transform duration-200">
                                                {link.label}
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Column 3: Help */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <Headphones size={18} className="text-rose-500" />
                            Help
                        </h3>
                        <ul className="space-y-2">
                            {helpLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                                    >
                                        <ArrowRight size={14} className="text-gray-500 group-hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                                        <span className="text-sm">{link.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Newsletter & Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <Mail size={18} className="text-rose-500" />
                            Follow Us
                        </h3>

                        {/* Newsletter Form */}
                        <div className="mb-6">
                            <p className="text-gray-400 text-sm mb-3">
                                Subscribe to our newsletter to get the latest updates
                            </p>
                            <form className="flex gap-2" onSubmit={handleNewsletterSubmit}>
                                <input
                                    type="email"
                                    required
                                    value={newsletterEmail}
                                    onChange={(e) => setNewsletterEmail(e.target.value)}
                                    placeholder="Your email"
                                    aria-label="Email address for newsletter"
                                    className="flex-1 px-4 py-2.5 bg-gray-900 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/20 transition-all duration-200"
                                />
                                <button
                                    type="submit"
                                    aria-label="Subscribe to newsletter"
                                    className="px-4 py-2.5 bg-linear-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-rose-500/25 active:scale-95"
                                >
                                    <ArrowRight size={18} />
                                </button>
                            </form>
                            {subscribed && (
                                <p role="status" className="text-emerald-400 text-xs mt-2">
                                    Thanks! You&apos;re subscribed.
                                </p>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-gray-400">
                                <MapPin size={18} className="text-rose-500 shrink-0" />
                                <span className="text-sm">Riyadh, Saudi Arabia</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400">
                                <Phone size={18} className="text-rose-500 shrink-0" />
                                <span className="text-sm">+966 50 000 0000</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400">
                                <Mail size={18} className="text-rose-500 shrink-0" />
                                <span className="text-sm">support@filmix.com</span>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        aria-label={social.label}
                                        className={`p-2.5 rounded-lg bg-gray-900 border border-white/10 text-gray-400 ${social.color} hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
                                    >
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* === Divider Line === */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Film size={16} className="text-rose-500" />
                            <span>© {currentYear} FILMIX. All rights reserved</span>
                        </div>

                        {/* Additional Links */}
                        <div className="flex items-center gap-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                Terms of Service
                            </a>
                            <span className="w-1 h-1 bg-gray-600 rounded-full" />
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                Privacy
                            </a>
                            <span className="w-1 h-1 bg-gray-600 rounded-full" />
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                Cookies
                            </a>
                        </div>

                        {/* Made with Love */}
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                            <span>Made with</span>
                            <Heart size={14} className="text-rose-500 fill-rose-500 animate-pulse" />
                            <span>in Saudi Arabia</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* === Bottom Glow Effect (Optional) === */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-rose-950/10 to-transparent pointer-events-none" />
        </footer>
    );
};

export default Footer;