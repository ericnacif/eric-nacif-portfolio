import React, { useState, useEffect } from 'react';
import './Cursor.css';
import { motion } from 'framer-motion'; // Importe o motion

const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState('default'); // Estado da variante

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // --- LÓGICA DE INTERAÇÃO ---
        // Seleciona todos os elementos que queremos que o cursor reaja
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');

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

    // Variantes de animação para o cursor
    const variants = {
        default: {
            height: 30,
            width: 30,
            borderColor: '#1a1a1a',
            backgroundColor: 'transparent',
        },
        hover: {
            height: 50,
            width: 50,
            borderColor: '#8A2BE2', // Cor do gradiente do seu H1
            backgroundColor: 'rgba(138, 43, 226, 0.1)',
        }
    };

    return (
        <motion.div
            className="custom-cursor"
            style={{
                left: position.x,
                top: position.y,
            }}
            variants={variants}
            animate={cursorVariant} // Anima o cursor baseado no estado
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
    );
};

export default Cursor;