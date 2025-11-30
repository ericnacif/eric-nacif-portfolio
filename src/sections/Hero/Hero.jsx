import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import { useLanguage } from '../../context/LanguageContext';

const Hero = () => {
  const { language } = useLanguage();
  // Estado para controlar se é o carregamento inicial ou apenas troca de idioma
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // O Preloader dura 2.8s. Definimos 3.0s aqui para garantir que 
    // a flag só mude depois que a animação inicial tiver começado/terminado.
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const texts = {
    pt: "desenvolvedor full stack",
    en: "full stack developer",
    es: "desarrollador full stack"
  };

  const text = texts[language] || texts.pt;
  const letters = Array.from(text);

  let breakIndex = text.indexOf(' ');
  if (language === 'en') {
    const secondSpace = text.indexOf(' ', breakIndex + 1);
    if (secondSpace !== -1) breakIndex = secondSpace;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.04, 
        // LÓGICA DE DELAY INTELIGENTE:
        // Se for o load inicial (com preloader), espera 2.9s.
        // Se for navegação/troca de idioma, espera apenas 0.2s.
        delayChildren: isInitialLoad ? 2.9 : 0.2 
      },
    },
  };

  const letterVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 50,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <section id="home" className="hero-section" style={{ minHeight: '100vh' }}>
      <div className="container hero-container">

        <motion.h1
          className="hero-title"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={language}
          aria-label={text}
          style={{ willChange: 'opacity, transform' }} 
        >
          {letters.map((letter, index) => (
            <React.Fragment key={index}>
              <motion.span variants={letterVariants} aria-hidden="true">
                {letter}
              </motion.span>
              {index === breakIndex && (
                <br className="mobile-break" />
              )}
            </React.Fragment>
          ))}
        </motion.h1>
      </div>
    </section>
  );
};

export default Hero;