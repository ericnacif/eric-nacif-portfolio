import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
    const logoSrc = '/logo-blue.webp';

    const count = useMotionValue(0);
    const barScale = useTransform(count, [0, 100], [0, 1]);

    useEffect(() => {
        const controls = animate(count, 100, {
            duration: 1.8,
            ease: [0.65, 0, 0.35, 1],
            onComplete: () => {
                const t = setTimeout(() => onComplete?.(), 280);
                return () => clearTimeout(t);
            },
        });
        return () => controls.stop();
    }, [count, onComplete]);

    return (
        <motion.div
            className="preloader-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
            <motion.div
                className="preloader-content"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <img
                    src={logoSrc}
                    alt="Eric Nacif"
                    className="preloader-logo"
                    width="140"
                    height="140"
                    fetchPriority="high"
                    loading="eager"
                />

                <div className="preloader-bar">
                    <motion.div className="preloader-bar-fill" style={{ scaleX: barScale }} />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Preloader;
