import React from 'react';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
    return (
        <header className="main-header">
            <div className="header-container">
                <nav>
                    <motion.a href="#home" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>Home</motion.a>
                    <motion.a href="#projetos" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>Projetos</motion.a>
                    <motion.a href="#sobre" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>Sobre</motion.a>
                    <motion.a href="#contato" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>Contato</motion.a>
                </nav>
            </div>
        </header>
    );
};

export default Header;