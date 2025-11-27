import React, { useEffect, useRef, useState } from 'react';
import './Header.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes, FaGlobe, FaDownload } from 'react-icons/fa';

// CORREÇÃO AQUI: O nome do arquivo agora bate com sua pasta (logo-blue.png)
import logoBlue from '../../assets/images/logo-blue.png';

// Imports dos PDFs
import cvPt from '../../assets/docs/cv-pt.pdf';
import cvEn from '../../assets/docs/cv-en.pdf';

// Importando o contexto de idioma
import { useLanguage } from '../../context/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [showLangMenu, setShowLangMenu] = useState(false);

  // Hook do Contexto de Idioma
  const { language, changeLanguage, t } = useLanguage();

  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);

  // Seleção do arquivo de CV baseado no idioma
  const getCvLink = () => {
    if (language === 'pt') return cvPt;
    return cvEn;
  };

  // Scroll Header Logic
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

  // Theme Logic
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

  // Fechar menu ao clicar fora
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

  // Variantes de Animação
  const panelVariants = {
    hidden: { opacity: 0, y: -12, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 24 } },
    exit: { opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.15 } },
  };

  return (
    <header className="main-header" role="banner">
      <div className="header-container">

        {/* Mobile Menu Button */}
        <button
          ref={menuBtnRef}
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* LOGO */}
        <a href="#home" className="header-logo-link" onClick={closeMenu}>
          <img src={logoBlue} alt="Eric Nacif" className="header-logo-img" />
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <a href="#projetos">{t.nav.projects}</a>
          <a href="#sobre">{t.nav.about}</a>
          <a href="#contato">{t.nav.contact}</a>
        </nav>

        {/* Controls */}
        <div className="header-controls">

          {/* Language Switcher */}
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

          {/* Theme Toggle */}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Alterar Tema">
            {theme === 'dark' ? <FaMoon /> : <FaSun />}
          </button>

          {/* CV Button */}
          <a href={getCvLink()} download className="cv-button" title={t.cvBtn}>
            <span className="cv-text">{t.cvBtn}</span>
            <FaDownload className="cv-icon" />
          </a>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu-floating"
            ref={menuRef}
            initial="hidden" animate="visible" exit="exit" variants={panelVariants}
          >
            <a href="#projetos" onClick={closeMenu}>{t.nav.projects}</a>
            <a href="#sobre" onClick={closeMenu}>{t.nav.about}</a>
            <a href="#contato" onClick={closeMenu}>{t.nav.contact}</a>

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