import React, { useEffect, useRef, useState } from 'react';
import './Header.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes, FaGlobe, FaDownload } from 'react-icons/fa';

import logoBlue from '../../assets/images/logo-blue.png';
import logoGray from '../../assets/images/logo-gray.png';
import cvPt from '../../assets/docs/cv-pt.pdf';
import cvEn from '../../assets/docs/cv-en.pdf';

import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const { language, changeLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);
  const observerRef = useRef(null);

  const logoSrc = theme === 'dark' ? logoGray : logoBlue;

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
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'hero') setActiveSection('hero');
          else setActiveSection(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, observerOptions);

    const observeSections = () => {
      const sections = document.querySelectorAll('section[id], footer#contato');
      sections.forEach((section) => {
        observerRef.current.observe(section);
      });
    };

    observeSections();

    const mutationObserver = new MutationObserver(() => {
      observeSections();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const handleScrollTo = (e, id) => {
    e.preventDefault(); 
    let targetId = id;
    if (id === 'home') targetId = 'hero'; 

    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      setActiveSection(targetId);
      setIsMenuOpen(false); 
    }
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

  const panelVariants = {
    hidden: { opacity: 0, y: -12, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 24 } },
    exit: { opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.15 } },
  };

  // Variantes copiadas do About.jsx
  const textContainerVariants = {
    visible: { transition: { staggerChildren: 0.04 } }
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const navTextVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -5 }
  };

  const iconSwitchVariants = {
    initial: { scale: 0.5, opacity: 0, rotate: -90 },
    animate: { scale: 1, opacity: 1, rotate: 0 },
    exit: { scale: 0.5, opacity: 0, rotate: 90 }
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

        <a
          href="#hero"
          className="header-logo-link"
          onClick={(e) => handleScrollTo(e, 'hero')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={logoSrc} alt="Logo" className="header-logo-img" />
            
            {/* Efeito de letras cascata no nome */}
            <motion.span 
              className="header-logo-text"
              key={language} // Reinicia animação ao mudar idioma (mesmo que o nome não mude, faz o efeito acontecer)
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
              style={{ display: 'flex' }} // Importante para manter as letras na linha
            >
              {Array.from("ERIC NACIF").map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.span>
          </div>
        </a>

        <nav className="desktop-nav">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={(e) => handleScrollTo(e, item.id)}
              >
                {isActive && (
                  <motion.div
                    className="nav-pill-bg"
                    layoutId="navPill"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <AnimatePresence mode="wait">
                  <motion.span
                    key={language}
                    className="nav-text"
                    variants={navTextVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                </AnimatePresence>
              </a>
            )
          })}
        </nav>

        <div className="header-controls">
          <div className="lang-switcher" onMouseEnter={() => setShowLangMenu(true)} onMouseLeave={() => setShowLangMenu(false)}>
            <motion.button 
                className="lang-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
              <FaGlobe />
              <AnimatePresence mode="wait">
                <motion.span
                  key={language}
                  className="current-lang"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {language.toUpperCase()}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <AnimatePresence>
              {showLangMenu && (
                <motion.div
                  className="lang-dropdown"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <button onClick={() => changeLanguage('pt')} className={language === 'pt' ? 'active' : ''}>PT</button>
                  <button onClick={() => changeLanguage('en')} className={language === 'en' ? 'active' : ''}>EN</button>
                  <button onClick={() => changeLanguage('es')} className={language === 'es' ? 'active' : ''}>ES</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!isMobile && (
            <motion.button 
                className="theme-toggle" 
                onClick={toggleTheme} 
                aria-label="Alterar Tema"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    variants={iconSwitchVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    {theme === 'dark' ? <FaMoon /> : <FaSun />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          )}

          <motion.a 
            href={getCvLink()} 
            download 
            className="cv-button" 
            title={t.cvBtn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={language}
                className="cv-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {t.cvBtn}
              </motion.span>
            </AnimatePresence>
            <FaDownload className="cv-icon" />
          </motion.a>
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
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(e, item.id)}
                className={activeSection === item.id ? 'active' : ''}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={language}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                </AnimatePresence>
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
                <AnimatePresence mode="wait">
                  <motion.span key={language} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {t.cvBtn}
                  </motion.span>
                </AnimatePresence>
                <FaDownload />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;