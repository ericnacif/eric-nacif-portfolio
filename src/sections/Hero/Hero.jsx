import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import { useLanguage } from '../../context/LanguageContext';

const Hero = () => {
  const { language } = useLanguage();

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

  // Otimização: Delay reduzido para 0.5s após o Preloader para melhorar a sensação de velocidade
  // (Antes era 3.0s fixo, o que é muito lento para SEO/LCP)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.04, 
        delayChildren: 0.2 // Reduzido para aparecer mais rápido
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
          // will-change ajuda o navegador a preparar a GPU para a animação
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