import React, { useEffect, useRef, useState } from 'react';
import './Header.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes, FaGlobe, FaDownload } from 'react-icons/fa';

// Mantive seus imports de arquivos conforme o original
import cvPt from '../../assets/docs/cv-pt.pdf';
import cvEn from '../../assets/docs/cv-en.pdf';

import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const { language, changeLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);
  const observerRef = useRef(null);

  const logoSrc = theme === 'dark' ? '/logo-gray.webp' : '/logo-blue.webp';

  // --- 1. LISTA DE NAVEGAÇÃO ATUALIZADA ---
  const navItems = [
    { id: 'sobre', label: t.nav?.about || "Sobre", path: '/#sobre', type: 'anchor' },
    { id: 'projetos', label: t.nav?.projects || "Projetos", path: '/#projetos', type: 'anchor' },
    { id: 'servicos', label: "Serviços", path: '/#servicos', type: 'anchor' },
    { id: 'contato', label: t.nav?.contact || "Contato", path: '/#contato', type: 'anchor' }
  ];

  const getCvLink = () => {
    if (language === 'pt') return cvPt;
    return cvEn;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Observer para scroll spy (Só roda se as seções existirem na tela)
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
      // Tenta encontrar as seções
      const sections = document.querySelectorAll('section[id], footer#contato');

      // SEGURANÇA: Se não houver seções (ex: estamos na pág Serviços), não faz nada
      if (sections.length === 0) return;

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

  // --- 2. NOVA LÓGICA DE NAVEGAÇÃO ---
  const handleNavigation = (e, item) => {
    // Se for link de página externa (ex: /servicos), deixa o navegador ir
    if (item.type === 'page') {
      setActiveSection(item.id);
      setIsMenuOpen(false);
      return;
    }

    // Se for âncora (#), verificamos onde estamos
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';

    // Se NÃO estamos na Home, deixa o navegador carregar a home com a âncora (ex: /#sobre)
    if (!isHomePage && item.type === 'anchor') {
      return;
    }

    // Se estamos na Home, prevenimos o reload e fazemos scroll suave
    e.preventDefault();
    let targetId = item.id;
    if (item.id === 'home') targetId = 'hero';

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
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isMenuOpen]);

  // VARIANTES (Animações) mantidas iguais
  const drawerVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: "0%",
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
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

  const textContainerVariants = { visible: { transition: { staggerChildren: 0.04 } } };
  const letterVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

  const navContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <header className="main-header" role="banner">
      <div className="header-container">

        <a
          href="/#hero"
          className="header-logo-link"
          onClick={(e) => handleNavigation(e, { id: 'hero', type: 'anchor', path: '/#hero' })}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={logoSrc}
              alt="Logo"
              className="header-logo-img"
              width="40"
              height="40" />

            <motion.span
              className="header-logo-text"
              key={language}
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
              style={{ display: 'flex' }}
            >
              {Array.from("ERIC NACIF").map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.span>
          </div>
        </a>

        {/* --- DESKTOP NAV --- */}
        <motion.nav
          className="desktop-nav"
          variants={navContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <motion.a
                key={item.id}
                href={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={(e) => handleNavigation(e, item)}
                variants={navItemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
              </motion.a>
            )
          })}
        </motion.nav>

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

        <button
          ref={menuBtnRef}
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Abrir Menu"
        >
          <FaBars />
        </button>

      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              initial="hidden" animate="visible" exit="exit" variants={overlayVariants}
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.nav
              className="mobile-menu-drawer"
              ref={menuRef}
              initial="hidden" animate="visible" exit="exit" variants={drawerVariants}
            >
              <div className="drawer-header">
                <span className="drawer-title">Menu</span>
                <button
                  className="drawer-close-btn"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaTimes />
                </button>
              </div>

              {/* --- MOBILE NAV LINKS --- */}
              <div className="drawer-links">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.path}
                    onClick={(e) => handleNavigation(e, item)}
                    className={`drawer-item ${activeSection === item.id ? 'active' : ''}`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="drawer-footer">
                <div className="drawer-controls-row">
                  <button className="drawer-icon-btn" onClick={toggleTheme}>
                    {theme === 'dark' ? <FaMoon /> : <FaSun />}
                  </button>

                  <div className="drawer-lang">
                    <button onClick={() => changeLanguage('pt')} className={language === 'pt' ? 'active' : ''}>PT</button>
                    <span className="sep">|</span>
                    <button onClick={() => changeLanguage('en')} className={language === 'en' ? 'active' : ''}>EN</button>
                    <span className="sep">|</span>
                    <button onClick={() => changeLanguage('es')} className={language === 'es' ? 'active' : ''}>ES</button>
                  </div>
                </div>

                <a href={getCvLink()} download className="drawer-cv-btn">
                  <FaDownload />
                  <span>{t.cvBtn}</span>
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;