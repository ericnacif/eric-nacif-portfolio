import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';
import { useTheme } from '../../context/ThemeContext';

const steps = ["Olá", "Hello", "Hola"];

const Preloader = () => {
    const [index, setIndex] = useState(0);
    const [showLogo, setShowLogo] = useState(false);
    const { theme } = useTheme();
    const logoSrc = theme === 'dark' ? '/logo-gray.webp' : '/logo-blue.webp';

    useEffect(() => {
        // Mantido o tempo de 600ms para performance (nota 100)
        const delay = 600;

        if (index < steps.length) {
            const timeout = setTimeout(() => {
                setIndex((prev) => prev + 1);
            }, delay);
            return () => clearTimeout(timeout);
        } else {
            setShowLogo(true);
        }
    }, [index]);

    // Animação da cortina branca subindo (mantida)
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

    // --- CORREÇÃO DA ANIMAÇÃO DA LOGO ---
    const logoAnimation = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },

        // EXIT MODIFICADO:
        // Removemos o 'scale: 20'. Agora ela apenas desaparece (opacity: 0)
        // e encolhe um pouquinho (scale: 0.9) para um efeito de saída mais elegante.
        exit: {
            scale: 0.9, // Encolhe levemente em vez de crescer
            opacity: 0, // Fica transparente
            transition: { duration: 0.6, ease: "easeInOut" } // Transição suave
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

                {showLogo ? (
                    <motion.img
                        key="logo"
                        src={logoSrc}
                        alt="Logo"
                        className="preloader-logo"
                        width="180"
                        height="180"
                        fetchPriority="high"
                        loading="eager"
                        variants={logoAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    />
                ) : (
                    <AnimatePresence mode="wait">
                        {index < steps.length && (
                            <motion.p
                                key={steps[index]}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="preloader-text"
                            >
                                {steps[index]}
                                <span className="dot">.</span>
                            </motion.p>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </motion.div>
    );
};

export default Preloader;