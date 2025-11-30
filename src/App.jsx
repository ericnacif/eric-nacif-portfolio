import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Componentes Críticos (Carregados Imediatamente para LCP rápido)
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

// Lazy Loading: Carrega estas seções apenas quando necessário (Reduz Payload)
const About = React.lazy(() => import('./sections/About/About'));
const Projects = React.lazy(() => import('./sections/Projects/Projects'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));

function App() {

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
          
          {/* Suspense protege o carregamento das partes pesadas sem travar a tela */}
          <Suspense fallback={<div style={{ height: '100px' }}></div>}>
            <About />
            <Projects />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        
        <BackToTop />
        <WhatsAppButton />
      </>
    );
  };

  return (
    <Router>
      <Cursor />
      <ScrollProgress />
      <EasterEgg />

      {/* 2. ADICIONAR AQUI (Funciona em todo o site) */}
      <PrintRedirect />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </Router>
  );
}

export default App;