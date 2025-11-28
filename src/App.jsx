import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // <--- Importante
import { AnimatePresence } from 'framer-motion';

import Header from './components/Header/Header';
import Hero from './sections/Hero/Hero';
import Projects from './sections/Projects/Projects';
import About from './sections/About/About';
import Footer from './components/Footer/Footer';
import Cursor from './components/Cursor/Cursor';
import BackToTop from './components/BackToTop';
import Preloader from './components/Preloader/Preloader';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import EasterEgg from './components/EasterEgg/EasterEgg';
import NotFound from './pages/NotFound/NotFound'; // <--- Importante

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Cursor />
      <ScrollProgress />
      <EasterEgg />
      <WhatsAppButton />
      <BackToTop />

      {/* Componentes Globais que aparecem em TODAS as páginas */}
      <Header />

      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      <Routes>
        {/* ROTA DA PÁGINA PRINCIPAL */}
        <Route path="/" element={
          <main>
            <Hero />
            <About />
            <Projects />
            <Footer /> {/* Footer só na home se quiser, ou tire daqui e ponha fora do Routes */}
          </main>
        } />

        {/* ROTA DE PÁGINA 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

    </Router>
  );
}

export default App;