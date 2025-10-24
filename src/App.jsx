import React from 'react';
import Header from './components/Header/Header';
import Hero from './sections/Hero/Hero';
import Projects from './sections/Projects/Projects';
import About from './sections/About/About';
import Footer from './components/Footer/Footer';
import Cursor from './components/Cursor/Cursor';
// CORREÇÃO: O caminho foi simplificado.
// (Isto assume que 'BackToTop.jsx' está em 'src/components/')
import BackToTop from './components/BackToTop.jsx';

function App() {
  return (
    <>
      <Cursor />
      <Header />
      <main>
        <Hero />
        <Projects />
        <About />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;