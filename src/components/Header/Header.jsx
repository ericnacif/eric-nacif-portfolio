import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

// --- 1. IMPORTE O LOGO PNG ---
import logoImage from '../../assets/logo/logo.png'; 
// --- FIM DA IMPORTAÇÃO ---


const NavLinks = ({ onClick }) => (
  <>
    <motion.a href="#home" onClick={onClick} whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>Home</motion.a>
    <motion.a href="#projetos" onClick={onClick} whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>Projetos</motion.a>
    <motion.a href="#sobre" onClick={onClick} whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>Sobre</motion.a>
    <motion.a href="#contato" onClick={onClick} whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>Contato</motion.a>
  </>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        
        {/* --- 2. SUBSTITUA O SVG PELO IMG --- */}
        <a href="#home" className="header-logo-link" aria-label="Voltar para o início">
          {/* Usamos a tag <img> agora */}
          <img 
            src={logoImage} 
            alt="Eric Nacif Logo" 
            className="header-logo-img" 
          /> 
        </a>
        {/* --- FIM DA SUBSTITUIÇÃO --- */}

        {/* NAVEGAÇÃO DESKTOP */}
        <nav className="desktop-nav">
          <NavLinks />
        </nav>

        <div className="header-controls">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Trocar tema">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          <button onClick={() => setIsMenuOpen(true)} className="mobile-menu-btn" aria-label="Abrir menu">
            <FaBars />
          </button>
        </div>
      </div>

      {/* OVERLAY DO MENU MOBILE */}
      {isMenuOpen && (
        <motion.div 
          className="mobile-nav-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button onClick={() => setIsMenuOpen(false)} className="mobile-close-btn" aria-label="Fechar menu">
            <FaTimes />
          </button>
          <nav className="mobile-nav">
            <NavLinks onClick={() => setIsMenuOpen(false)} />
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;