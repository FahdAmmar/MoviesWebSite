// مكون تذييل الصفحة
// يحتوي على معلومات حقوق النشر

import React from 'react';

const Footer: React.FC = () => {
    return (
        // تذييل الصفحة
        <footer className="bg-netflix-black border-t border-netflix-gray/20 mt-16">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    {/* شعار Netflix الصغير */}
                    <p className="text-netflix-red text-xl font-bold mb-4">NETFLIX</p>

                    {/* روابط المساعدة */}
                    <div className="flex flex-wrap justify-center gap-6 mb-6">
                        <a href="#" className="text-netflix-gray text-sm hover:text-white transition-colors">
                            FAQ
                        </a>
                        <a href="#" className="text-netflix-gray text-sm hover:text-white transition-colors">
                            Help Center
                        </a>
                        <a href="#" className="text-netflix-gray text-sm hover:text-white transition-colors">
                            Terms of Use
                        </a>
                        <a href="#" className="text-netflix-gray text-sm hover:text-white transition-colors">
                            Privacy
                        </a>
                    </div>

                    {/* حقوق النشر */}
                    <p className="text-netflix-gray text-xs">
                        © {new Date().getFullYear()} Netflix Clone. Built with React & OMDB API.
                    </p>

                    {/* معلومات API */}
                    <p className="text-netflix-gray text-xs mt-2">
                        Movie data provided by OMDB API
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;