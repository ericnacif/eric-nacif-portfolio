import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';
import { useTheme } from '../../context/ThemeContext';

const steps = ['Olá', 'Hello', 'Hola'];

const Preloader = () => {
    const [index, setIndex] = useState(0);
    const [showLogo, setShowLogo] = useState(false);
    const { theme } = useTheme();
    const logoSrc = theme === 'dark' ? '/logo-gray.webp' : '/logo-blue.webp';

    useEffect(() => {
        if (index < steps.length) {
            const t = setTimeout(() => setIndex((p) => p + 1), 480);
            return () => clearTimeout(t);
        } else {
            setShowLogo(true);
        }
    }, [index]);

    const slideUp = {
        initial: { y: 0 },
        exit: {
            y: '-100vh',
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.15 },
        },
    };

    const wordVariants = {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.22, ease: 'easeIn' } },
    };

    const logoVariants = {
        initial: { opacity: 0, scale: 0.88 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
        exit: { opacity: 0, scale: 0.92, transition: { duration: 0.5, ease: 'easeInOut' } },
    };

    return (
        <motion.div
            className="preloader-overlay"
            variants={slideUp}
            initial="initial"
            exit="exit"
        >
            {/* Linha de progresso */}
            <motion.div
                className="preloader-progress"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: showLogo ? 1 : (index + 1) / (steps.length + 1) }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            />

            <div className="preloader-content">
                <AnimatePresence mode="wait">
                    {showLogo ? (
                        <motion.div
                            key="logo"
                            className="preloader-logo-wrap"
                            variants={logoVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <img
                                src={logoSrc}
                                alt="Logo"
                                className="preloader-logo"
                                width="140"
                                height="140"
                                fetchPriority="high"
                                loading="eager"
                            />
                        </motion.div>
                    ) : (
                        index < steps.length && (
                            <motion.p
                                key={steps[index]}
                                className="preloader-text"
                                variants={wordVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                {steps[index]}
                                <span className="preloader-dot">.</span>
                            </motion.p>
                        )
                    )}
                </AnimatePresence>
            </div>

            {/* Counter */}
            <motion.span
                className="preloader-counter"
                animate={{ opacity: showLogo ? 0 : 1 }}
                transition={{ duration: 0.2 }}
            >
                {String(Math.round(((index) / steps.length) * 100)).padStart(2, '0')}
            </motion.span>
        </motion.div>
    );
};

export default Preloader;