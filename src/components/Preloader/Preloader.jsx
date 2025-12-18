import { useEffect, useState } from 'react';
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
        // AJUSTE FINAL: 500ms
        // Matemática: 3 palavras * 0.5s = 1.5s de texto.
        // Com o tempo de carregamento da página (~0.5s), totalizamos 2.0s.
        // Isso coloca o LCP dentro da meta verde (< 2.5s) com folga.
        const delay = 500;

        if (index < steps.length) {
            const timeout = setTimeout(() => {
                setIndex((prev) => prev + 1);
            }, delay);
            return () => clearTimeout(timeout);
        } else {
            setShowLogo(true);
        }
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
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }, // Animação mais rápida (0.5s)
        exit: {
            scale: 0.9,
            opacity: 0,
            transition: { duration: 0.6, ease: "easeInOut" }
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
                                transition={{ duration: 0.3 }} // Transição de texto mais ágil
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