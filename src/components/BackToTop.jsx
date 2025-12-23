import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import './BackToTop.css';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRaised, setIsRaised] = useState(false);

  // Função de scroll
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Função para mostrar/esconder
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility);

    // Observer para levantar o botão quando chegar no footer
    const observer = new IntersectionObserver(
      ([entry]) => setIsRaised(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const footer = document.querySelector('footer');
    if (footer) observer.observe(footer);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      if (footer) observer.unobserve(footer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={`back-to-top ${isRaised ? 'raised' : ''}`}
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Voltar ao topo"
        >
          <FaArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;