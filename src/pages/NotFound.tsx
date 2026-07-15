import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

// =============================================================
// NotFound
// صفحة تُعرض عند زيارة أي رابط غير معرّف في التطبيق. سابقاً لم يكن
// هناك أي مسار احتياطي (Catch-all Route)، فكان أي رابط خاطئ يعرض
// منطقة محتوى فارغة تماماً بين الرأس والتذييل دون أي رسالة توضيحية
// =============================================================
const NotFound: React.FC = () => {
    useDocumentTitle('Page Not Found');

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-2xl bg-netflix-red/10 border border-netflix-red/20">
                        <Film size={40} className="text-netflix-red" />
                    </div>
                </div>
                <h1 className="text-6xl font-bold text-white mb-2">404</h1>
                <p className="text-netflix-gray text-lg mb-8">
                    This page doesn&apos;t exist or may have been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-netflix-red hover:bg-netflix-red-dark
            text-white px-6 py-3 rounded-md font-medium
            transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
