// المكون الرئيسي للتطبيق
// يحتوي على إعدادات التوجيه والروتات

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import MovieDetails from './pages/MovieDetails';

const App: React.FC = () => {
  return (
    // مزود السياق لإدارة الحالة
    <MovieProvider>
      // إعدادات التوجيه
      <Router>
        <div className="min-h-screen bg-netflix-black">
          {/* شريط التنقل العلوي */}
          <Header />

          {/* المسارات والصفحات */}
          <main>
            <Routes>
              {/* الصفحة الرئيسية */}
              <Route path="/" element={<Home />} />

              {/* صفحة المفضلة */}
              <Route path="/favorites" element={<Favorites />} />

              {/* صفحة تفاصيل الفيلم */}
              <Route path="/movie/:imdbID" element={<MovieDetails />} />
            </Routes>
          </main>

          {/* تذييل الصفحة */}
          <Footer />
        </div>
      </Router>
    </MovieProvider>
  );
};

export default App;