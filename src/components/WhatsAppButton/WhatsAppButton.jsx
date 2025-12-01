import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const WhatsAppButton = () => {
    const { language } = useLanguage();
    const [isRaised, setIsRaised] = useState(false);

    const phoneNumber = "5533997088999";

    // Lógica para levantar o botão quando chegar no footer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsRaised(entry.isIntersecting),
            { threshold: 0.1 }
        );

        const footer = document.querySelector('footer');
        if (footer) observer.observe(footer);

        return () => {
            if (footer) observer.unobserve(footer);
        };
    }, []);

    // Dicionário de mensagens para o WhatsApp
    const messages = {
        pt: "Olá Eric, vi seu portfólio e gostaria de conversar!",
        en: "Hi Eric, I saw your portfolio and would like to chat!",
        es: "Hola Eric, vi tu portafolio y me gustaría charlar!"
    };

    // Dicionário para o Tooltip (balãozinho)
    const tooltips = {
        pt: "Fale comigo!",
        en: "Chat with me!",
        es: "¡Hablemos!"
    };

    // Seleciona o texto com base no idioma (ou fallback para PT)
    const currentMessage = messages[language] || messages.pt;
    const currentTooltip = tooltips[language] || tooltips.pt;

    const encodedMessage = encodeURIComponent(currentMessage);

    return (
        <motion.a
            href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            // Adiciona a classe 'raised' condicionalmente
            className={`whatsapp-float ${isRaised ? 'raised' : ''}`}
            aria-label="WhatsApp"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1.5
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <FaWhatsapp className="whatsapp-icon" />
            <span className="whatsapp-tooltip">{currentTooltip}</span>
        </motion.a>
    );
};

export default WhatsAppButton;