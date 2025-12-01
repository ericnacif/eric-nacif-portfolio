import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Header from './components/Header/Header';
import Hero from './sections/Hero/Hero';
import Preloader from './components/Preloader/Preloader';

import Cursor from './components/Cursor/Cursor';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import EasterEgg from './components/EasterEgg/EasterEgg';
import PrintRedirect from './components/PrintRedirect/PrintRedirect';
import GoogleAnalyticsTracker from './components/GoogleAnalyticsTracker';
import NotFound from './pages/NotFound/NotFound';

const About = React.lazy(() => import('./sections/About/About'));
const Projects = React.lazy(() => import('./sections/Projects/Projects'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));
const WhatsAppButton = React.lazy(() => import('./components/WhatsAppButton/WhatsAppButton'));
const BackToTop = React.lazy(() => import('./components/BackToTop'));

function App() {

  const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // TIMER FINAL: 2.7 segundos
      // Dá tempo suficiente para o ciclo de 600ms rodar e a saída acontecer suavemente.
      const timer = setTimeout(() => {
        setIsLoading(false);
        window.scrollTo(0, 0);
      }, 2700);

      return () => clearTimeout(timer);
    }, []);

    return (
      <>
        <AnimatePresence mode="wait">
          {isLoading && <Preloader key="preloader" />}
        </AnimatePresence>

        <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
          <Header />
          <main>
            <Hero />

            <Suspense fallback={<div style={{ height: '100px' }}></div>}>
              <About />
              <Projects />
            </Suspense>
          </main>

          <Suspense fallback={null}>
            <Footer />
          </Suspense>

          <Suspense fallback={null}>
            <BackToTop />
            <WhatsAppButton />
          </Suspense>
        </div>
      </>
    );
  };

  return (
    <Router>
      <GoogleAnalyticsTracker />

      <Cursor />
      <ScrollProgress />
      <EasterEgg />
      <PrintRedirect />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </Router>
  );
}

export default App;