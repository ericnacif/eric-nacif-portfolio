import React, { useEffect, useRef, useState } from 'react';
import './Header.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes, FaGlobe, FaDownload } from 'react-icons/fa';

import logoBlue from '../../assets/images/logo-blue.png';
import cvPt from '../../assets/docs/cv-pt.pdf';
import cvEn from '../../assets/docs/cv-en.pdf';

import { useLanguage } from '../../context/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { language, changeLanguage, t } = useLanguage();
  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);

  // DEFINIÇÃO DOS ITENS DO MENU (Nova Ordem: Sobre -> Projetos -> Contato)
  const navItems = [
    { id: 'sobre', label: t.nav?.about || "Sobre" },
    { id: 'projetos', label: t.nav?.projects || "Projetos" },
    { id: 'contato', label: t.nav?.contact || "Contato" }
  ];

  const getCvLink = () => {
    if (language === 'pt') return cvPt;
    return cvEn;
  };

  useEffect(() => {
    const header = document.querySelector('.main-header');
    const onScroll = () => {
      if (!header) return;
      if (window.scrollY > 8) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // --- SCROLL SPY (Detector de Seção) ---
  useEffect(() => {
    // Observa sections E o footer
    const sections = document.querySelectorAll('section[id], footer#contato');

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Ajuste para trocar o foco mais no meio da tela
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Se for Hero, remove a pílula ou marca hero
          if (entry.target.id === 'hero') setActiveSection('hero');
          else setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const initial = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    const onPointerDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && !menuBtnRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown, { capture: true });
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown, { capture: true });
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  // Variants para o menu mobile
  const panelVariants = {
    hidden: { opacity: 0, y: -12, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 24 } },
    exit: { opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.15 } },
  };

  return (
    <header className="main-header" role="banner">
      <div className="header-container">

        <button
          ref={menuBtnRef}
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* LOGO */}
        <a href="#hero" className="header-logo-link" onClick={() => { setActiveSection('hero'); closeMenu(); }}>
          <img src={logoBlue} alt="Logo" className="header-logo-img" />
          <span className="header-logo-text">Eric Nacif</span>
        </a>

        {/* --- DESKTOP NAV (COM ANIMAÇÃO DE PÍLULA) --- */}
        <nav className="desktop-nav">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                {isActive && (
                  <motion.div
                    className="nav-pill-bg"
                    layoutId="navPill"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="nav-text">{item.label}</span>
              </a>
            )
          })}
        </nav>

        <div className="header-controls">
          <div className="lang-switcher" onMouseEnter={() => setShowLangMenu(true)} onMouseLeave={() => setShowLangMenu(false)}>
            <button className="lang-btn">
              <FaGlobe /> <span className="current-lang">{language.toUpperCase()}</span>
            </button>
            <AnimatePresence>
              {showLangMenu && (
                <motion.div
                  className="lang-dropdown"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                >
                  <button onClick={() => changeLanguage('pt')} className={language === 'pt' ? 'active' : ''}>PT</button>
                  <button onClick={() => changeLanguage('en')} className={language === 'en' ? 'active' : ''}>EN</button>
                  <button onClick={() => changeLanguage('es')} className={language === 'es' ? 'active' : ''}>ES</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button className="theme-toggle" onClick={toggleTheme} aria-label="Alterar Tema">
            {theme === 'dark' ? <FaMoon /> : <FaSun />}
          </button>

          <a href={getCvLink()} download className="cv-button" title={t.cvBtn}>
            <span className="cv-text">{t.cvBtn}</span>
            <FaDownload className="cv-icon" />
          </a>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu-floating"
            ref={menuRef}
            initial="hidden" animate="visible" exit="exit" variants={panelVariants}
          >
            {/* MAP DO MOBILE COM A MESMA ORDEM */}
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={closeMenu}
                className={activeSection === item.id ? 'active' : ''}
              >
                {item.label}
              </a>
            ))}

            <div className="mobile-divider"></div>
            <div className="mobile-controls">
              <div className="mobile-lang">
                <button onClick={() => changeLanguage('pt')} className={language === 'pt' ? 'active' : ''}>PT</button>
                <button onClick={() => changeLanguage('en')} className={language === 'en' ? 'active' : ''}>EN</button>
                <button onClick={() => changeLanguage('es')} className={language === 'es' ? 'active' : ''}>ES</button>
              </div>
              <a href={getCvLink()} download className="mobile-cv-btn">
                {t.cvBtn} <FaDownload />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;