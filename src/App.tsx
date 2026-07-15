import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// =============================================================
// تقسيم الكود على مستوى المسارات (Route-level Code Splitting)
// =============================================================
// بدلاً من استيراد كل الصفحات بشكل مباشر (مما يضع كل صفحة داخل
// حزمة JavaScript الرئيسية الواحدة)، يتم هنا تحميل كل صفحة بشكل
// كسول (Lazy) فور الحاجة إليها فقط. هذا يقلّل حجم الحزمة الأولية
// التي يجب على المتصفح تحميلها وتفسيرها قبل ظهور أول شاشة، ويحسّن
// مؤشرات الأداء الأساسية مثل Largest Contentful Paint (LCP).
const Home = lazy(() => import('./pages/Home'));
const Favorites = lazy(() => import('./pages/Favorites'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));
const NotFound = lazy(() => import('./pages/NotFound'));

// مؤشر تحميل بسيط يظهر أثناء تحميل ملف الصفحة المطلوبة
const RouteFallback: React.FC = () => (
    <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading page">
        <div className="w-10 h-10 border-2 border-white/20 border-t-netflix-red rounded-full animate-spin" />
    </div>
);

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-black">
                <Header />
                <main className="grow pt-16">
                    <Suspense fallback={<RouteFallback />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/favorites" element={<Favorites />} />
                            <Route path="/movie/:imdbID" element={<MovieDetails />} />
                            {/* مسار احتياطي (Catch-all) لأي رابط غير معرّف بدلاً من ترك المستخدم أمام صفحة فارغة */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
