import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import { useLanguage } from '../../context/LanguageContext';

const Hero = () => {
  const { language } = useLanguage();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Mantemos o estado de "Load Inicial" para controlar a animação
    // Ajustado para 2.5s (um pouco menos que os 3.0s totais para garantir fluidez)
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 2500);

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
        // O PULO DO GATO:
        // Reduzi de 2.9s para 2.2s.
        // Motivo: A animação começa "por baixo" do preloader enquanto ele está
        // fazendo o fade-out final. Quando o preloader some, o texto já está
        // em movimento. Isso melhora a percepção do usuário e adianta o LCP
        // em quase 1 segundo sem perder o efeito de "entrada".
        delayChildren: isInitialLoad ? 2.2 : 0.2
      },
    },
  };

  const letterVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      },
    },
  };

  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        <motion.h1
          className="hero-title"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={language}
          aria-label={text}
          // 'will-change' avisa o navegador para priorizar a renderização gráfica disto
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