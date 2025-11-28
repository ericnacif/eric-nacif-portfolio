import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import NotFound from './pages/NotFound/NotFound';

function App() {

  // Componente interno para agrupar a página Home e sua lógica de Load
  const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
        window.scrollTo(0, 0);
      }, 2800);
      return () => clearTimeout(timer);
    }, []);

    return (
      <>
        <AnimatePresence mode="wait">
          {isLoading && <Preloader key="preloader" />}
        </AnimatePresence>

        <Header />

        <main>
          <Hero />
          <About />
          <Projects />
        </main>

        <Footer />
        <BackToTop />
        <WhatsAppButton />
      </>
    );
  };

  return (
    <Router>
      {/* Componentes Globais que rodam em tudo (não visualmente intrusivos) */}
      <Cursor />
      <ScrollProgress />
      <EasterEgg />

      <Routes>
        {/* ROTA HOME: Contém Header, Whats, Preloader, etc. */}
        <Route path="/" element={<Home />} />

        {/* ROTA 404: Limpa, só com o conteúdo do NotFound.jsx */}
        <Route path="*" element={<NotFound />} />
      </Routes>

    </Router>
  );
}

export default App;