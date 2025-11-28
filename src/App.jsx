import React, { useState, useEffect } from 'react';
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
// REMOVIDO: import NoiseOverlay from './components/NoiseOverlay/NoiseOverlay';

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
    <>
      <Cursor />

      <ScrollProgress />

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
}

export default App;