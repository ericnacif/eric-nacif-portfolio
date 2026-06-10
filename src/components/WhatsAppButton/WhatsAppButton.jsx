import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { useBackToTopVisible } from '@/hooks/useBackToTopVisible';

const WhatsAppButton = () => {
    const { t } = useLanguage();
    const backToTopVisible = useBackToTopVisible();
    const [atFooter, setAtFooter] = useState(false);
    const [hasEntered, setHasEntered] = useState(false);

    const phoneNumber = "5533997088999";

    const encodedMessage = encodeURIComponent(t.whatsapp.message);

    // Esconde o botão ao chegar no fim real da página (igual ao header)
    useEffect(() => {
        const onScroll = () => {
            const scrollBottom = window.innerHeight + window.scrollY;
            const pageHeight = document.documentElement.scrollHeight;
            setAtFooter(pageHeight - scrollBottom <= 60);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        const enterTimer = setTimeout(() => setHasEntered(true), 1600);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            clearTimeout(enterTimer);
        };
    }, []);

    const appearDelay = hasEntered ? 0 : 1.5;

    return (
        <motion.a
            href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float"
            aria-label="WhatsApp"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: atFooter ? 0 : 1,
                scale: atFooter ? 0 : 1,
                bottom: backToTopVisible ? 88 : 32,
            }}
            style={{ pointerEvents: atFooter ? 'none' : 'auto' }}
            transition={{
                opacity: { type: 'spring', stiffness: 260, damping: 20, delay: appearDelay },
                scale: { type: 'spring', stiffness: 260, damping: 20, delay: appearDelay },
                bottom: { type: 'spring', stiffness: 200, damping: 28 },
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
        >
            <FaWhatsapp className="whatsapp-icon" />
            <span className="whatsapp-tooltip">{t.whatsapp.tooltip}</span>
        </motion.a>
    );
};

export default WhatsAppButton;