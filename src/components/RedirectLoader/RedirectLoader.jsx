import React from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import './RedirectLoader.css';
// REMOVIDO: import logoBlue

const RedirectLoader = ({ text }) => {
    const content = (
        <motion.div
            className="redirect-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="redirect-content">
                <motion.img
                    src="/logo-blue.webp" /* CORREÇÃO: Uso direto da string */
                    alt="Loading..."
                    className="redirect-logo"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.p
                    className="redirect-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {text}
                </motion.p>
            </div>
        </motion.div>
    );

    return ReactDOM.createPortal(content, document.body);
};

export default RedirectLoader;