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

// Imports Lazy (Carregamento sob demanda)
const About = React.lazy(() => import('./sections/About/About'));
const Projects = React.lazy(() => import('./sections/Projects/Projects'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));
const WhatsAppButton = React.lazy(() => import('./components/WhatsAppButton/WhatsAppButton'));
const BackToTop = React.lazy(() => import('./components/BackToTop'));

// IMPORTANTE: Adicionando a página de Serviços aqui
const Services = React.lazy(() => import('./pages/Services/Services'));

function App() {

  // O componente Home fica responsável apenas pelo conteúdo da página inicial e o Preloader
  const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
        window.scrollTo(0, 0);
      }, 2300);

      return () => clearTimeout(timer);
    }, []);

    return (
      <>
        <AnimatePresence mode="wait">
          {isLoading && <Preloader key="preloader" />}
        </AnimatePresence>

        <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
          <main>
            <Hero />
            <Suspense fallback={<div style={{ height: '100px' }}></div>}>
              <About />
              <Projects />
            </Suspense>
          </main>
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

      {/* HEADER: Movido para cá para aparecer em TODAS as páginas */}
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* ROTA DE SERVIÇOS: Adicionada com Suspense para carregamento */}
        <Route
          path="/servicos"
          element={
            <Suspense fallback={<div style={{ height: '100vh' }}></div>}>
              <Services />
            </Suspense>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* FOOTER E BOTÕES: Movidos para cá para aparecerem também em Serviços */}
      <Suspense fallback={null}>
        <Footer />
        <BackToTop />
        <WhatsAppButton />
      </Suspense>

    </Router>
  );
}

export default App;