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
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import BackToTop from './components/BackToTop';
import NotFound from './pages/NotFound/NotFound';

// Lazy Loading
const About = React.lazy(() => import('./sections/About/About'));
const Projects = React.lazy(() => import('./sections/Projects/Projects'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));

function App() {

  const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Otimização: Remove o preloader assim que a página carregar completamente
      // ou após um timeout máximo de segurança (1.5s em vez de 2.8s)
      const handleLoad = () => {
        setIsLoading(false);
        window.scrollTo(0, 0);
      };

      // Se a página já estiver carregada, remove logo
      if (document.readyState === 'complete') {
        setTimeout(handleLoad, 800); // Pequeno delay só para a animação fluir
      } else {
        window.addEventListener('load', handleLoad);
        // Fallback de segurança: se o load falhar, remove em 2s máximo
        const fallbackTimer = setTimeout(handleLoad, 2000); 
        
        return () => {
          window.removeEventListener('load', handleLoad);
          clearTimeout(fallbackTimer);
        };
      }
    }, []);

    return (
      <>
        <AnimatePresence mode="wait">
          {isLoading && <Preloader key="preloader" />}
        </AnimatePresence>

        {/* Renderiza o Header e Hero imediatamente, mesmo atrás do preloader, 
            para o navegador já ir montando o layout (Melhora LCP) */}
        <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
            <Header />
            <main>
            <Hero />
            
            <Suspense fallback={<div style={{ height: '50px' }}></div>}>
                <About />
                <Projects />
            </Suspense>
            </main>

            <Suspense fallback={null}>
            <Footer />
            </Suspense>
            
            <BackToTop />
            <WhatsAppButton />
        </div>
      </>
    );
  };

  return (
    <Router>
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