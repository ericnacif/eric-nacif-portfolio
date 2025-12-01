import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import { useLanguage } from '../../context/LanguageContext';

const Hero = () => {
  const { language } = useLanguage();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Sincronia: O Preloader agora leva cerca de 3 segundos no total.
    // Aumentamos o timer para 3.2s para garantir.
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 3200);

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
        // Delay Ajustado: 2.9s
        // O texto começa a aparecer logo quando o logo explode e a cortina sobe.
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
    <section id="home" className="hero-section">
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