import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import './Hero.css';
import { useLanguage } from '../../context/LanguageContext';
import { SiReact, SiPhp, SiLaravel, SiTypescript } from 'react-icons/si';

const ICONS = [
  { icon: <SiTypescript />, label: 'TypeScript', color: '#3178c6', pos: 'top' },
  { icon: <SiReact />, label: 'React', color: '#61dafb', pos: 'right' },
  { icon: <SiPhp />, label: 'PHP', color: '#8892be', pos: 'bottom' },
  { icon: <SiLaravel />, label: 'Laravel', color: '#ff2d20', pos: 'left' },
];

const CODE_LINES = [
  { text: 'const dev = {', indent: 0 },
  { text: "  name: 'Eric Nacif',", indent: 1 },
  { text: "  role: 'Full Stack',", indent: 1 },
  { text: "  passion: 'craft',", indent: 1 },
  { text: '  build: () => {', indent: 1 },
  { text: '    return greatWork();', indent: 2 },
  { text: '  }', indent: 1 },
  { text: '};', indent: 0 },
];

const Hero = () => {
  const { language } = useLanguage();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [typedLines, setTypedLines] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setIsInitialLoad(false), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setTypedLines(0);
    const interval = setInterval(() => {
      setTypedLines((prev) => {
        if (prev >= CODE_LINES.length) { clearInterval(interval); return prev; }
        return prev + 1;
      });
    }, 220);
    return () => clearInterval(interval);
  }, []);

  const content = {
    pt: {
      available: 'Disponível para projetos',
      role: 'desenvolvedor',
      role2: 'full stack.',
      sub: 'Construo interfaces e sistemas que unem design e performance — do front ao back.',
      cta1: 'Ver projetos',
      cta2: 'Falar comigo',
    },
    en: {
      available: 'Available for projects',
      role: 'full stack',
      role2: 'developer.',
      sub: 'I build interfaces and systems that combine design and performance — front to back.',
      cta1: 'View projects',
      cta2: 'Get in touch',
    },
    es: {
      available: 'Disponible para proyectos',
      role: 'desarrollador',
      role2: 'full stack.',
      sub: 'Construyo interfaces y sistemas que combinan diseño y rendimiento — de punta a punta.',
      cta1: 'Ver proyectos',
      cta2: 'Hablemos',
    },
  };

  const t = content[language] || content.pt;
  const delay = isInitialLoad ? 2.3 : 0.05;

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
  };

  const fadeUp = (d = 0) => ({
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: delay + d } },
  });

  return (
    <section id="home" className="hero-section">
      <div className="hero-layout">

        {/* Coluna esquerda */}
        <div className="hero-left">
          <motion.div className="hero-badge" variants={fadeUp(-0.1)} initial="hidden" animate="visible" key={`badge-${language}`}>
            <span className="hero-badge-dot" />
            <AnimatePresence mode="wait">
              <motion.span key={language} className="hero-badge-text"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
              >
                {t.available}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.h1 className="hero-title" key={`title-${language}`}>
            <motion.span className="hero-title-line" variants={fadeUp(0.05)} initial="hidden" animate="visible">
              {t.role}
            </motion.span>
            <motion.span className="hero-title-line hero-title-accent" variants={fadeUp(0.15)} initial="hidden" animate="visible">
              {t.role2}
            </motion.span>
          </motion.h1>

          <motion.p className="hero-sub" key={`sub-${language}`} variants={fadeUp(0.28)} initial="hidden" animate="visible">
            <AnimatePresence mode="wait">
              <motion.span key={language} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                {t.sub}
              </motion.span>
            </AnimatePresence>
          </motion.p>

          <motion.div className="hero-ctas" variants={fadeUp(0.4)} initial="hidden" animate="visible" key={`ctas-${language}`}>
            <button className="hero-cta hero-cta--primary" onClick={() => handleScroll('projetos')}>
              <AnimatePresence mode="wait">
                <motion.span key={language} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                  {t.cta1}
                </motion.span>
              </AnimatePresence>
            </button>
            <button className="hero-cta hero-cta--secondary" onClick={() => handleScroll('contato')}>
              <AnimatePresence mode="wait">
                <motion.span key={language} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                  {t.cta2}
                </motion.span>
              </AnimatePresence>
            </button>
          </motion.div>
        </div>

        {/* Coluna direita */}
        <motion.div className="hero-right" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: delay + 0.3 }}>
          <div className="orbit-scene">
            <div className="orbit-ring orbit-ring--1" />
            <div className="orbit-ring orbit-ring--2" />

            {/* 4 ícones fixos via CSS — topo, direita, baixo, esquerda */}
            {!prefersReduced && ICONS.map((item, i) => (
              <motion.div
                key={item.label}
                className={`orbit-icon orbit-icon--${item.pos}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 0.5 + i * 0.1, duration: 0.35, ease: 'backOut' }}
                title={item.label}
              >
                <span style={{ color: item.color }}>{item.icon}</span>
              </motion.div>
            ))}

            {/* Bloco de código */}
            <div className="code-block">
              <div className="code-block__bar">
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
              </div>
              <div className="code-block__body">
                {CODE_LINES.slice(0, typedLines).map((line, i) => (
                  <motion.div key={i} className="code-line" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
                    <span className="code-num">{i + 1}</span>
                    <span
                      className="code-text"
                      style={{ paddingLeft: line.indent * 12 }}
                      dangerouslySetInnerHTML={{
                        __html: line.text
                          .replace(/(const|return)/g, '<span class="kw">$1</span>')
                          .replace(/('.*?')/g, '<span class="str">$1</span>')
                          .replace(/(\(\))/g, '<span class="fn">$1</span>')
                      }}
                    />
                    {i === typedLines - 1 && <span className="cursor-blink" />}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div className="hero-scroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 1.1, duration: 0.6 }}>
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;