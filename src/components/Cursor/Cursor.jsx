import React, { useEffect, useState } from 'react';
import './Cursor.css';
import { motion, useMotionValue } from 'framer-motion';

const isCoarsePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  (window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches);

const Cursor = () => {
  // Desktop only
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Posição 1:1 sem lag (MotionValue)
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Detecta se deve habilitar (somente desktop/mouse)
  useEffect(() => {
    const compute = () => setEnabled(!isCoarsePointer());
    compute();
    const onResize = () => compute();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Atualiza posição diretamente (sem spring) para resposta imediata
  useEffect(() => {
    if (!enabled) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [enabled, x, y]);

  // Hover em elementos interativos altera tamanho/cor do anel
  useEffect(() => {
    if (!enabled) return;
    const selectors = 'a, button, .project-card, .skill-card, .back-to-top, [role="button"], .mobile-menu a';
    const interactive = Array.from(document.querySelectorAll(selectors));
    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    return () => {
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      className="custom-cursor"
      style={{ x, y }}
      animate={{
        height: hovering ? 40 : 28,
        width: hovering ? 40 : 28,
        borderColor: hovering ? 'var(--accent-color)' : 'var(--text-color)',
        backgroundColor: hovering ? 'rgba(138,43,226,0.08)' : 'transparent',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
    />
  );
};

export default Cursor;