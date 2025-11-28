import React, { useState, useEffect } from 'react'; // Adicionado 'useState' e 'useEffect'
import { motion } from 'framer-motion';
import './Hero.css';
import { useLanguage } from '../../context/LanguageContext';

const HERO_ENTRY_DELAY_SECONDS = 3.0; // Definimos o atraso para 3.0s, que é maior que 2.8s do Preloader.

const Hero = () => {
  const { language } = useLanguage();
  const [isMounted, setIsMounted] = useState(false); // Novo estado para rastrear se o componente já foi montado

  useEffect(() => {
    // Roda apenas uma vez no carregamento inicial do componente
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

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

  // Condição: Se for a primeira montagem, aplica o delay (Ex: 3.0s). Se não for, o delay é 0.
  const currentDelay = isMounted ? 0 : HERO_ENTRY_DELAY_SECONDS;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      // Aplicamos o delay de forma CONDICIONAL
      transition: { staggerChildren: 0.04, delayChildren: currentDelay },
    }),
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
          // O key={language} garante que a animação seja reexecutada a cada troca de idioma
          animate="visible"
          key={language}
          aria-label={text}
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