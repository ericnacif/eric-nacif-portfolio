import React, { useEffect, useState } from 'react';
import './Cursor.css';
import { motion, useMotionValue } from 'framer-motion';

const isCoarsePointer = () =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    (window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches);

const Cursor = () => {
    const [enabled, setEnabled] = useState(false);
    const [hovering, setHovering] = useState(false);

    const x = useMotionValue(-100);
    const y = useMotionValue(-100);

    useEffect(() => {
        const compute = () => setEnabled(!isCoarsePointer());
        compute();
        const onResize = () => compute();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        if (!enabled) return;
        const move = (e) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };
        window.addEventListener('mousemove', move, { passive: true });
        return () => window.removeEventListener('mousemove', move);
    }, [enabled, x, y]);

    useEffect(() => {
        if (!enabled) return;
        const selectors = 'a, button, input[type="submit"], .project-card, .social-btn, [role="button"]';
        const interactive = Array.from(document.querySelectorAll(selectors));

        const onEnter = () => setHovering(true);
        const onLeave = () => setHovering(false);

        // MutationObserver para detectar novos elementos dinamicamente
        const observer = new MutationObserver(() => {
            const newInteractive = Array.from(document.querySelectorAll(selectors));
            newInteractive.forEach(el => {
                el.removeEventListener('mouseenter', onEnter);
                el.removeEventListener('mouseleave', onLeave);
                el.addEventListener('mouseenter', onEnter);
                el.addEventListener('mouseleave', onLeave);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        interactive.forEach((el) => {
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
        });

        return () => {
            observer.disconnect();
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
            style={{
                x,
                y,
                translateX: '-50%', // Centraliza horizontalmente
                translateY: '-50%'  // Centraliza verticalmente
            }}
            animate={{
                height: hovering ? 48 : 24,
                width: hovering ? 48 : 24,
                borderColor: hovering ? 'var(--accent-color)' : 'var(--text-color)',
                backgroundColor: hovering ? 'rgba(41, 82, 255, 0.1)' : 'transparent',
                borderWidth: hovering ? 2 : 2
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        />
    );
};

export default Cursor;