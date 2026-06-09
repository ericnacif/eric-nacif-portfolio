import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';
import { useLanguage } from '@/hooks/useLanguage';

const Hero = () => {
  const { language, t } = useLanguage();

  const content = t.hero;
  const delay = 0.05;

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
  };

  const fadeUp = (d = 0) => ({
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: delay + d } },
  });

  return (
    <section id="home" className="hero-section">
      {/* Fundo animado */}
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-blob hero-blob--1" />
        <span className="hero-blob hero-blob--2" />
        <span className="hero-blob hero-blob--3" />
        <div className="hero-grid" />
      </div>

      <div className="hero-inner">
        <motion.h1 className="hero-title" variants={fadeUp(0.08)} initial="hidden" animate="visible" key={`title-${language}`}>
          {content.headline}{' '}
          <span className="hero-title-accent">{content.headlineAccent}</span>
        </motion.h1>

        <motion.p className="hero-sub" key={`sub-${language}`} variants={fadeUp(0.18)} initial="hidden" animate="visible">
          <AnimatePresence mode="wait">
            <motion.span key={language} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {content.sub}
            </motion.span>
          </AnimatePresence>
        </motion.p>

        <motion.div className="hero-ctas" variants={fadeUp(0.28)} initial="hidden" animate="visible" key={`ctas-${language}`}>
          <button className="hero-cta hero-cta--primary" onClick={() => handleScroll('projetos')}>
            <AnimatePresence mode="wait">
              <motion.span key={language} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                {content.cta1}
              </motion.span>
            </AnimatePresence>
          </button>
          <button className="hero-cta hero-cta--secondary" onClick={() => handleScroll('contato')}>
            <AnimatePresence mode="wait">
              <motion.span key={language} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                {content.cta2}
              </motion.span>
            </AnimatePresence>
          </button>
        </motion.div>
      </div>

      <motion.div className="hero-scroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.9, duration: 0.6 }}>
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
