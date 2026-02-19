import React from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import './RedirectLoader.css';

const RedirectLoader = ({ text }) => {
    const content = (
        <motion.div
            className="redirect-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
        >
            {/* Barra de progresso no topo */}
            <motion.div
                className="redirect-progress"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
            />

            <div className="redirect-content">
                {/* Logo estática */}
                <motion.img
                    src="/logo-blue.webp"
                    alt="Logo"
                    className="redirect-logo"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                />

                {/* Texto + dots animados */}
                <motion.div
                    className="redirect-text-row"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <span className="redirect-text">{text}</span>
                    <span className="redirect-dots">
                        <span /><span /><span />
                    </span>
                </motion.div>
            </div>
        </motion.div>
    );

    return ReactDOM.createPortal(content, document.body);
};

export default RedirectLoader;