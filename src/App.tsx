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
    <MovieProvider>
      <Router>
        <div className="min-h-screen min-w-screen bg-black ">
          <Header />

          <main  >
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/favorites" element={<Favorites />} />

              <Route path="/movie/:imdbID" element={<MovieDetails />} />
            </Routes>
            <Footer />
          </main>

        </div>
      </Router>
    </MovieProvider>
  );
};

export default App;