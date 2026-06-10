import React, { Suspense } from 'react';

import Header from '@/components/Header/Header';
import Hero from '@/sections/Hero/Hero';

import ScrollProgress from '@/components/ScrollProgress/ScrollProgress';
import EasterEgg from '@/components/EasterEgg/EasterEgg';
import PrintRedirect from '@/components/PrintRedirect/PrintRedirect';
import Analytics from '@/components/Analytics/Analytics';
import Seo from '@/components/Seo/Seo';

const About = React.lazy(() => import('@/sections/About/About'));
const Projects = React.lazy(() => import('@/sections/Projects/Projects'));
const Footer = React.lazy(() => import('@/components/Footer/Footer'));
const WhatsAppButton = React.lazy(() => import('@/components/WhatsAppButton/WhatsAppButton'));
const BackToTop = React.lazy(() => import('@/components/BackToTop/BackToTop'));
const NotFound = React.lazy(() => import('@/pages/NotFound/NotFound'));

const Home = () => {
  return (
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
  );
};

function App() {
  const pathname =
    typeof window === 'undefined' ? '/' : window.location.pathname;
  const isHome = pathname === '/' || pathname === '/index.html';

  return (
    <>
      <Analytics />
      <Seo />
      <ScrollProgress />
      <EasterEgg />
      <PrintRedirect />

      {isHome ? (
        <Home />
      ) : (
        <Suspense fallback={null}>
          <NotFound />
        </Suspense>
      )}
    </>
  );
}

export default App;