import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Header from './components/Header/Header';
import Hero from './sections/Hero/Hero';
import Preloader from './components/Preloader/Preloader';
import NotFound from './pages/NotFound/NotFound';

const About = React.lazy(() => import('./sections/About/About'));
const Projects = React.lazy(() => import('./sections/Projects/Projects'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));

function App() {
  const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

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
              <Suspense fallback={null}>
                <About />
                <Projects />
              </Suspense>
            </main>

            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </>
        )}
      </>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
