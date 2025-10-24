import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                {/* SEU NOME ADICIONADO AQUI */}
                <a href="#home" className="header-logo-name">eric nacif</a>

                <nav>
                    <motion.a href="#home" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>Home</motion.a>
                    <motion.a href="#projetos" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>Projetos</motion.a>
                    <motion.a href="#sobre" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>Sobre</motion.a>
                    <motion.a href="#contato" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>Contato</motion.a>
                </nav>

                {/* Espaço vazio para empurrar a navegação para o centro */}
                <div className="header-right-spacer"></div>
            </div>
        </header>
    );
};

export default Header;