import React, { useState, useEffect } from 'react';
import './Cursor.css';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const interactiveElements = document.querySelectorAll(
      'a, button, .project-card, .skill-card, .back-to-top'
    );

    const handleMouseEnter = () => setCursorVariant('hover');
    const handleMouseLeave = () => setCursorVariant('default');

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // --- CORREÇÃO AQUI ---
  // Diga explicitamente ao Framer Motion para animar as cores
  // usando as variáveis CSS.
  const variants = {
    default: {
      height: 30,
      width: 30,
      borderColor: 'var(--text-color)', // <-- Adicionado
      backgroundColor: 'transparent',   // <-- Adicionado
    },
    hover: {
      height: 50,
      width: 50,
      borderColor: 'var(--accent-color)',
      backgroundColor: 'rgba(138, 43, 226, 0.1)',
    }
  };
  // --- FIM DA CORREÇÃO ---

  return (
    <motion.div
      className="custom-cursor"
      style={{
        left: position.x,
        top: position.y,
      }}
      variants={variants}
      animate={cursorVariant}
      // Esta transição agora controla o tamanho E as cores
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    />
  );
};

export default Cursor;