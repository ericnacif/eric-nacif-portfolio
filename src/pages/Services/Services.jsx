import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import './Services.css'; // Certifique-se de criar este arquivo

// 1. ESTRUTURA DE TRADUÇÃO LOCAL (Padrão do About.jsx)
const servicesData = {
    pt: {
        title: "Meus Serviços",
        description: "Ofereço soluções completas de desenvolvimento, focadas em performance e escalabilidade.",
        items: [
            { title: "Desenvolvimento Web", desc: "Sites institucionais, Landing Pages e Sistemas Web completos." },
            { title: "Apps Mobile", desc: "Aplicativos nativos e híbridos para Android e iOS." },
            { title: "APIs & Backend", desc: "Construção de APIs robustas e integração de sistemas." }
        ]
    },
    en: {
        title: "My Services",
        description: "I offer complete development solutions focused on performance and scalability.",
        items: [
            { title: "Web Development", desc: "Institutional sites, Landing Pages, and complete Web Systems." },
            { title: "Mobile Apps", desc: "Native and hybrid applications for Android and iOS." },
            { title: "APIs & Backend", desc: "Building robust APIs and system integration." }
        ]
    },
    es: {
        title: "Mis Servicios",
        description: "Ofrezco soluciones completas de desarrollo enfocadas en rendimiento y escalabilidad.",
        items: [
            { title: "Desarrollo Web", desc: "Sitios institucionales, Landing Pages y Sistemas Web completos." },
            { title: "Apps Móviles", desc: "Aplicaciones nativas e híbridas para Android y iOS." },
            { title: "APIs & Backend", desc: "Construcción de APIs robustas e integración de sistemas." }
        ]
    }
};

const Services = () => {
    const { language } = useLanguage();
    // Seleciona o texto baseado na língua atual (fallback para PT)
    const t = servicesData[language] || servicesData.pt;

    return (
        <motion.div
            className="services-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <div className="services-content">

                {/* Título com AnimatePresence para troca suave de idioma */}
                <AnimatePresence mode="wait">
                    <motion.h1
                        key={`title-${language}`}
                        className="services-title"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {t.title}
                    </motion.h1>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <motion.p
                        key={`desc-${language}`}
                        className="services-desc"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        {t.description}
                    </motion.p>
                </AnimatePresence>

                {/* Lista de Serviços (Exemplo Visual) */}
                <div className="services-grid">
                    {t.items.map((item, index) => (
                        <motion.div
                            key={index}
                            className="service-card"
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </motion.div>
    );
};

export default Services;