import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Contexts
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

// Components
import Header from './components/Header/Header';
import Hero from './sections/Hero/Hero';
import Preloader from './components/Preloader/Preloader';
import Cursor from './components/Cursor/Cursor';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import EasterEgg from './components/EasterEgg/EasterEgg';
import PrintRedirect from './components/PrintRedirect/PrintRedirect';
import GoogleAnalyticsTracker from './components/GoogleAnalyticsTracker';
import NotFound from './pages/NotFound/NotFound';

// Lazy Imports
const About = React.lazy(() => import('./sections/About/About'));
const Projects = React.lazy(() => import('./sections/Projects/Projects'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));
const WhatsAppButton = React.lazy(() => import('./components/WhatsAppButton/WhatsAppButton'));
const BackToTop = React.lazy(() => import('./components/BackToTop'));
const Services = React.lazy(() => import('./pages/Services/Services'));

// --- COMPONENTE HOME INTERNO ---
// Removemos o Preloader daqui para ele não repetir
const Home = () => {
  return (
    <main>
      <Hero />
      <Suspense fallback={<div style={{ height: '100px' }}></div>}>
        <About />
        <Projects />
      </Suspense>
    </main>
  );
};

// --- CONTEÚDO PRINCIPAL DO APP ---
// Este componente fica DENTRO do Router, então pode usar useLocation
function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation(); // Hook necessário para detectar mudança de rota

  useEffect(() => {
    // Timer roda apenas UMA vez quando o site carrega
    const timer = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 2300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <GoogleAnalyticsTracker />
      <Cursor />
      <ScrollProgress />
      <EasterEgg />
      <PrintRedirect />

      {/* 1. PRELOADER GLOBAL */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      {/* 2. CONTEÚDO DO SITE (Só aparece suavemente após preloader) */}
      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}>

        <Header />

        {/* 3. ROTAS COM TRANSIÇÃO SUAVE */}
        {/* O AnimatePresence detecta a mudança da location.key */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />

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
        </AnimatePresence>

        <Suspense fallback={null}>
          <Footer />
          <BackToTop />
          <WhatsAppButton />
        </Suspense>
      </div>
    </>
  );
}

// --- APP RAIZ ---
function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;