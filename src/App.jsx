import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Header from '@/components/Header/Header';
import Hero from '@/sections/Hero/Hero';
import Preloader from '@/components/Preloader/Preloader';

import ScrollProgress from '@/components/ScrollProgress/ScrollProgress';
import EasterEgg from '@/components/EasterEgg/EasterEgg';
import PrintRedirect from '@/components/PrintRedirect/PrintRedirect';
import NotFound from '@/pages/NotFound/NotFound';

const About = React.lazy(() => import('@/sections/About/About'));
const Projects = React.lazy(() => import('@/sections/Projects/Projects'));
const Footer = React.lazy(() => import('@/components/Footer/Footer'));
const WhatsAppButton = React.lazy(() => import('@/components/WhatsAppButton/WhatsAppButton'));
const BackToTop = React.lazy(() => import('@/components/BackToTop/BackToTop'));

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Header />
          <main>
            <Hero />

            <Suspense fallback={<div style={{ height: '100px' }} />}>
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
        </>
      )}
    </>
  );
};

function App() {

  return (
    <Router>
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