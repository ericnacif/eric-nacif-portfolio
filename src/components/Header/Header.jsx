import React, { useEffect, useRef, useState } from 'react';
import './Header.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);

  // Estado de scroll do header (classe scrolled)
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

  // Tema
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const initial =
      stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  // Fecha com ESC quando o menu estiver aberto
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  // Clique/touch fora do painel fecha o menu (sem overlay e sem travar scroll)
  useEffect(() => {
    if (!isMenuOpen) return;
    const onPointerDown = (e) => {
      const menuEl = menuRef.current;
      const btnEl = menuBtnRef.current;
      const target = e.target;
      if (!menuEl || !btnEl) return;
      if (!menuEl.contains(target) && !btnEl.contains(target)) {
        setIsMenuOpen(false);
      }
    };
    // Captura em nível de documento para pegar qualquer clique fora
    document.addEventListener('pointerdown', onPointerDown, { capture: true });
    return () => document.removeEventListener('pointerdown', onPointerDown, { capture: true });
  }, [isMenuOpen]);

  // Variantes do painel mobile
  const panelVariants = {
    hidden: { opacity: 0, y: -12, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 260, damping: 24 },
    },
    exit: { opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.15 } },
  };
  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.05 * i, type: 'spring', stiffness: 400, damping: 26 },
    }),
    exit: { opacity: 0, y: 10, transition: { duration: 0.15 } },
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="main-header" role="banner">
      <div className="header-container">
        <button
          ref={menuBtnRef}
          className="mobile-menu-btn"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <a href="#home" className="header-logo-link" onClick={closeMenu}>
          <span className="header-logo-text">eric nacif</span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#home">Home</a>
          <a href="#projetos">Projetos</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>

        <div className="header-controls">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema">
            {theme === 'dark' ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>

      {/* Painel mobile flutuante (sem overlay, não bloqueia scroll) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu-floating"
            aria-label="Navegação mobile"
            ref={menuRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
          >
            {/* Removido "Home" conforme solicitado */}
            <motion.a href="#projetos" onClick={closeMenu} custom={1} variants={linkVariants}>
              Projetos
            </motion.a>
            <motion.a href="#sobre" onClick={closeMenu} custom={2} variants={linkVariants}>
              Sobre
            </motion.a>
            <motion.a href="#contato" onClick={closeMenu} custom={3} variants={linkVariants}>
              Contato
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;