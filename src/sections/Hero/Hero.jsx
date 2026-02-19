import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';
import { useLanguage } from '../../context/LanguageContext';

const Hero = () => {
  const { language } = useLanguage();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const content = {
    pt: {
      title: 'desenvolvedor full stack',
      name: 'Eric Nacif',
      available: 'disponível para projetos',
      cta1: 'Ver projetos',
      cta2: 'Falar comigo',
    },
    en: {
      title: 'full stack developer',
      name: 'Eric Nacif',
      available: 'available for projects',
      cta1: 'View projects',
      cta2: 'Get in touch',
    },
    es: {
      title: 'desarrollador full stack',
      name: 'Eric Nacif',
      available: 'disponible para proyectos',
      cta1: 'Ver proyectos',
      cta2: 'Hablemos',
    },
  };

  const t = content[language] || content.pt;
  const letters = Array.from(t.title);

  const delay = isInitialLoad ? 2.3 : 0.1;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.035, delayChildren: delay } },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 48 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: 'spring', damping: 14, stiffness: 120 },
    },
  };

  const fadeUp = (d = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: delay + d } },
  });

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">

        {/* Badge disponibilidade */}
        <motion.div
          className="hero-badge"
          key={`badge-${language}`}
          variants={fadeUp(-0.1)}
          initial="hidden"
          animate="visible"
        >
          <span className="hero-badge-dot" aria-hidden="true" />
          <AnimatePresence mode="wait">
            <motion.span
              key={language}
              className="hero-badge-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {t.available}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Título animado */}
        <motion.h1
          className="hero-title"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={`title-${language}`}
          aria-label={t.title}
          style={{ willChange: 'opacity, transform' }}
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              aria-hidden="true"
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Nome */}
        <motion.p
          className="hero-name"
          key={`name-${language}`}
          variants={fadeUp(0.25)}
          initial="hidden"
          animate="visible"
        >
          {t.name}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="hero-ctas"
          key={`ctas-${language}`}
          variants={fadeUp(0.45)}
          initial="hidden"
          animate="visible"
        >
          <button className="hero-cta hero-cta--primary" onClick={() => handleScroll('projetos')}>
            <AnimatePresence mode="wait">
              <motion.span key={language} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                {t.cta1}
              </motion.span>
            </AnimatePresence>
          </button>
          <button className="hero-cta hero-cta--secondary" onClick={() => handleScroll('contato')}>
            <AnimatePresence mode="wait">
              <motion.span key={language} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                {t.cta2}
              </motion.span>
            </AnimatePresence>
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator com mouse */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 1, duration: 0.6 }}
      >
        <div className="hero-scroll-mouse" aria-hidden="true">
          <div className="hero-scroll-wheel" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;