import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import './BackToTop.css';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRaised, setIsRaised] = useState(false);
  const footerRef = useRef(null);
  const observerRef = useRef(null);

  // Mostra o botão se o scroll for maior que 300px
  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 300);
  };

  // Scroll suave para o topo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Detecta quando o footer entra na viewport para "levantar" o botão no mobile
  useEffect(() => {
    footerRef.current = document.querySelector('.main-footer');
    if (!footerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsRaised(entry.isIntersecting);
      },
      { root: null, threshold: 0.01 }
    );

    observerRef.current.observe(footerRef.current);
    return () => observerRef.current && observerRef.current.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={`back-to-top ${isRaised ? 'raised' : ''}`}
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          aria-label="Voltar ao topo"
        >
          <FaArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;