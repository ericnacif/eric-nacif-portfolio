import React from 'react';
import './Footer.css';
import { motion } from 'framer-motion';

// Importando os SVGs como arquivos
import figmaIcon from '../../assets/icons/figma.svg';
import linkedinIcon from '../../assets/icons/linkedin.svg';
import instagramIcon from '../../assets/icons/instagram.svg';
import githubIcon from '../../assets/icons/github.svg';

const socialLinks = [
    { href: "https://www.figma.com/@nacif_eric", icon: figmaIcon, alt: "Figma" },
    { href: "https://linkedin.com/in/eric-nacif", icon: linkedinIcon, alt: "LinkedIn" },
    { href: "https://www.instagram.com/nacif_/", icon: instagramIcon, alt: "Instagram" },
    { href: "https://github.com/ericnacif", icon: githubIcon, alt: "GitHub" },
];

const Footer = () => {
    return (
        <footer id="contato" className="container main-footer">
            <h2 className="section-title">Contato</h2>
            <div className="social-icons">
                {socialLinks.map((link, index) => (
                    <motion.a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, opacity: 0.8 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                    >
                        <img src={link.icon} alt={link.alt} />
                    </motion.a>
                ))}
            </div>
        </footer>
    );
};

export default Footer;