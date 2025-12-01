import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

import { useTheme } from '../../context/ThemeContext';

const steps = ["Olá", "Hello", "Hola", "logo"];

const Preloader = () => {
    const [index, setIndex] = useState(0);
    const { theme } = useTheme();
    const logoSrc = theme === 'dark' ? '/logo-gray.webp' : '/logo-blue.webp';

    useEffect(() => {
        if (index === steps.length - 1) return;

        // AJUSTE: Aumentado para 700ms.
        // Isso dá tempo suficiente para ler cada palavra com calma.
        const delay = 700;

        const timeout = setTimeout(() => {
            setIndex((prev) => prev + 1);
        }, delay);
        return () => clearTimeout(timeout);
    }, [index]);

    const slideUp = {
        initial: { y: 0 },
        exit: {
            y: "-100vh",
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.2
            }
        }
    };

    const logoAnimation = {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1.3, transition: { duration: 0.8, ease: "easeOut" } },
        exit: {
            scale: 20,
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    return (
        <motion.div
            variants={slideUp}
            initial="initial"
            exit="exit"
            className="preloader-overlay"
        >
            <div className="preloader-content">
                <AnimatePresence mode="wait">
                    {steps[index] === "logo" ? (
                        <motion.img
                            key="logo"
                            src={logoSrc}
                            alt="Logo"
                            className="preloader-logo"
                            width="180"
                            height="180"
                            variants={logoAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        />
                    ) : (
                        <motion.p
                            key={steps[index]}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }} // Transição um pouco mais suave
                            className="preloader-text"
                        >
                            {steps[index]}
                            <span className="dot">.</span>
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Preloader;