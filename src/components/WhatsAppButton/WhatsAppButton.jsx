import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const WhatsAppButton = () => {
    const { language } = useLanguage();
    const [backToTopVisible, setBackToTopVisible] = useState(false);

    const phoneNumber = "5533997088999";

    const messages = {
        pt: "Olá Eric, vi seu portfólio e gostaria de conversar!",
        en: "Hi Eric, I saw your portfolio and would like to chat!",
        es: "Hola Eric, vi tu portafolio y me gustaría charlar!",
    };

    const tooltips = {
        pt: "Fale comigo!",
        en: "Chat with me!",
        es: "¡Hablemos!",
    };

    useEffect(() => {
        const onScroll = () => setBackToTopVisible(window.scrollY > 600);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const encodedMessage = encodeURIComponent(messages[language] || messages.pt);
    const tooltip = tooltips[language] || tooltips.pt;

    return (
        <motion.a
            href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float"
            aria-label="WhatsApp"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: 1,
                scale: 1,
                bottom: backToTopVisible ? 88 : 32,
            }}
            transition={{
                opacity: { type: 'spring', stiffness: 260, damping: 20, delay: 1.5 },
                scale: { type: 'spring', stiffness: 260, damping: 20, delay: 1.5 },
                bottom: { type: 'spring', stiffness: 200, damping: 28 },
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
        >
            <FaWhatsapp className="whatsapp-icon" />
            <span className="whatsapp-tooltip">{tooltip}</span>
        </motion.a>
    );
};

export default WhatsAppButton;