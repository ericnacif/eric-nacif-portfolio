import React from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import './RedirectLoader.css';
import logoBlue from '../../assets/images/logo-blue.webp';

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
                    src={logoBlue}
                    alt="Loading..."
                    className="redirect-logo"
                    /* ALTERADO: Agora roda 360 graus */
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1.5, /* Tempo de uma volta completa (ajuste se quiser mais rápido/lento) */
                        repeat: Infinity, /* Repete para sempre */
                        ease: "linear" /* Mantém a velocidade constante (sem frear no final) */
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