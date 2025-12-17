import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { HiOutlineRocketLaunch, HiOutlineBriefcase, HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import './Services.css';

// ESTRUTURA DE TRADUÇÃO LOCAL COM ÍCONES
const servicesData = {
    pt: {
        title: "Meus Serviços",
        description: "Ofereço soluções completas de desenvolvimento, focadas em performance, conversão e escalabilidade.",
        items: [
            {
                id: 'landing',
                icon: HiOutlineRocketLaunch,
                title: "Landing Pages",
                desc: "Páginas de alta conversão com design estratégico. Foco em performance, SEO e experiência do usuário para maximizar resultados.",
                features: ["Alta conversão", "SEO otimizado", "Design estratégico"]
            },
            {
                id: 'portfolio',
                icon: HiOutlineBriefcase,
                title: "Portfólios Pessoais",
                desc: "Sites personalizados para desenvolvedores e criativos. Destaque seu trabalho com um design moderno e profissional.",
                features: ["Design único", "Responsivo", "Performance otimizada"]
            },
            {
                id: 'imobiliaria',
                icon: HiOutlineBuildingOffice2,
                title: "Plataformas Imobiliárias",
                desc: "Sites completos com listagem de imóveis, filtros avançados, integração com CRM e painel administrativo.",
                features: ["Listagem dinâmica", "Filtros avançados", "Painel admin"]
            }
        ]
    },
    en: {
        title: "My Services",
        description: "I offer complete development solutions focused on performance, conversion, and scalability.",
        items: [
            {
                id: 'landing',
                icon: HiOutlineRocketLaunch,
                title: "Landing Pages",
                desc: "High-conversion pages with strategic design. Focus on performance, SEO, and user experience to maximize results.",
                features: ["High conversion", "SEO optimized", "Strategic design"]
            },
            {
                id: 'portfolio',
                icon: HiOutlineBriefcase,
                title: "Personal Portfolios",
                desc: "Custom websites for developers and creatives. Showcase your work with a modern and professional design.",
                features: ["Unique design", "Responsive", "Optimized performance"]
            },
            {
                id: 'imobiliaria',
                icon: HiOutlineBuildingOffice2,
                title: "Real Estate Platforms",
                desc: "Complete websites with property listings, advanced filters, CRM integration, and admin panel.",
                features: ["Dynamic listings", "Advanced filters", "Admin panel"]
            }
        ]
    },
    es: {
        title: "Mis Servicios",
        description: "Ofrezco soluciones completas de desarrollo enfocadas en rendimiento, conversión y escalabilidad.",
        items: [
            {
                id: 'landing',
                icon: HiOutlineRocketLaunch,
                title: "Landing Pages",
                desc: "Páginas de alta conversión con diseño estratégico. Enfoque en rendimiento, SEO y experiencia de usuario para maximizar resultados.",
                features: ["Alta conversión", "SEO optimizado", "Diseño estratégico"]
            },
            {
                id: 'portfolio',
                icon: HiOutlineBriefcase,
                title: "Portafolios Personales",
                desc: "Sitios personalizados para desarrolladores y creativos. Destaque su trabajo con un diseño moderno y profesional.",
                features: ["Diseño único", "Responsivo", "Rendimiento optimizado"]
            },
            {
                id: 'imobiliaria',
                icon: HiOutlineBuildingOffice2,
                title: "Plataformas Inmobiliarias",
                desc: "Sitios completos con listado de propiedades, filtros avanzados, integración CRM y panel administrativo.",
                features: ["Listado dinámico", "Filtros avanzados", "Panel admin"]
            }
        ]
    }
};

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
};

const titleContainerVariants = {
    visible: {
        transition: { staggerChildren: 0.04 }
    }
};

const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

const Services = () => {
    const { language } = useLanguage();
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

                {/* Título com efeito cascata */}
                <AnimatePresence mode="wait">
                    <motion.h1
                        key={`title-${language}`}
                        className="services-title"
                        variants={titleContainerVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                    >
                        {Array.from(t.title).map((char, index) => (
                            <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
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

                {/* Grid de Cards de Serviços */}
                <motion.div
                    className="services-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    key={`grid-${language}`}
                >
                    {t.items.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <motion.div
                                key={item.id}
                                className="service-card"
                                variants={cardVariants}
                                whileHover={{
                                    scale: 1.03,
                                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                                }}
                            >
                                <div className="service-icon-wrapper">
                                    <IconComponent className="service-icon" />
                                </div>
                                <h3 className="service-card-title">{item.title}</h3>
                                <p className="service-card-desc">{item.desc}</p>
                                <ul className="service-features">
                                    {item.features.map((feature, idx) => (
                                        <li key={idx} className="service-feature-item">
                                            <span className="feature-dot"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </motion.div>
    );
};

export default Services;