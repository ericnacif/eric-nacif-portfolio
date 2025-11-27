import React from 'react';
import Header from './components/Header/Header';
import Hero from './sections/Hero/Hero';
import Projects from './sections/Projects/Projects';
import About from './sections/About/About';
import Footer from './components/Footer/Footer';
import Cursor from './components/Cursor/Cursor';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <>
      <Cursor />
      <Header />
      <main>
        <Hero />
        <About />    {/* Agora o Sobre vem logo após a apresentação visual */}
        <Projects /> {/* Projetos ficam em destaque logo na sequência */}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;