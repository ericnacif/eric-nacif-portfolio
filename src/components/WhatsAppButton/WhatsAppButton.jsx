import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { useBackToTopVisible } from '../../hooks/useBackToTopVisible';

const WhatsAppButton = () => {
    const { t } = useLanguage();
    const backToTopVisible = useBackToTopVisible();

    const phoneNumber = "5533997088999";

    const encodedMessage = encodeURIComponent(t.whatsapp.message);

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
            <span className="whatsapp-tooltip">{t.whatsapp.tooltip}</span>
        </motion.a>
    );
};

export default WhatsAppButton;