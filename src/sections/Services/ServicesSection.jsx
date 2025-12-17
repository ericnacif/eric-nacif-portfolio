import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { HiOutlineRocketLaunch, HiOutlineBriefcase, HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './ServicesSection.css';

// ESTRUTURA DE TRADUÇÃO LOCAL COM ÍCONES
const servicesData = {
    pt: {
        ctaTitle: "Quer um projeto assim?",
        ctaSubtitle: "Descubra como posso ajudar a transformar sua ideia em realidade.",
        ctaButton: "Ver meus serviços",
        ctaButtonClose: "Fechar serviços",
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
        ctaTitle: "Want a project like this?",
        ctaSubtitle: "Discover how I can help transform your idea into reality.",
        ctaButton: "See my services",
        ctaButtonClose: "Close services",
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
        ctaTitle: "¿Quieres un proyecto así?",
        ctaSubtitle: "Descubre cómo puedo ayudar a transformar tu idea en realidad.",
        ctaButton: "Ver mis servicios",
        ctaButtonClose: "Cerrar servicios",
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

// Animation variants for the expandable section
const sectionVariants = {
    hidden: {
        height: 0,
        opacity: 0,
        transition: {
            height: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.3, ease: 'easeOut' }
        }
    },
    visible: {
        height: 'auto',
        opacity: 1,
        transition: {
            height: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.4, delay: 0.2, ease: 'easeIn' }
        }
    }
};

// Animation variants for cards
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 80, damping: 15 }
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

// Constants for scroll behavior
const SCROLL_DELAY_MS = 100;
const SCROLL_OFFSET_PX = -100;

const ServicesSection = () => {
    const { language } = useLanguage();
    const t = servicesData[language] || servicesData.pt;
    const [isExpanded, setIsExpanded] = useState(false);
    const sectionRef = useRef(null);

    const toggleServices = () => {
        setIsExpanded(!isExpanded);
    };

    // Scroll to services section when expanded
    useEffect(() => {
        if (isExpanded && sectionRef.current) {
            setTimeout(() => {
                const element = sectionRef.current;
                const y = element.getBoundingClientRect().top + window.pageYOffset + SCROLL_OFFSET_PX;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }, SCROLL_DELAY_MS);
        }
    }, [isExpanded]);

    return (
        <section id="servicos" className="services-section-wrapper">
            {/* CTA AREA - Always visible */}
            <div className="services-cta-area">
                <div className="container services-cta-container">
                    <motion.div
                        className="services-cta-content"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.h3
                                key={`cta-title-${language}`}
                                className="services-cta-title"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {t.ctaTitle}
                            </motion.h3>
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                            <motion.p
                                key={`cta-subtitle-${language}`}
                                className="services-cta-subtitle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                {t.ctaSubtitle}
                            </motion.p>
                        </AnimatePresence>

                        <motion.button
                            className={`services-cta-button ${isExpanded ? 'expanded' : ''}`}
                            onClick={toggleServices}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={`cta-btn-${language}-${isExpanded}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="cta-button-text"
                                >
                                    {isExpanded ? t.ctaButtonClose : t.ctaButton}
                                </motion.span>
                            </AnimatePresence>
                            <motion.span
                                className="cta-button-icon"
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                            </motion.span>
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* EXPANDABLE SERVICES CONTENT */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        ref={sectionRef}
                        className="services-expandable"
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div className="services-content">
                            <div className="container">
                                {/* Título com efeito cascata */}
                                <motion.h2
                                    className="services-title section-title"
                                    variants={titleContainerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {Array.from(t.title).map((char, index) => (
                                        <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>
                                            {char === ' ' ? '\u00A0' : char}
                                        </motion.span>
                                    ))}
                                </motion.h2>

                                <motion.p
                                    className="services-desc"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4, delay: 0.3 }}
                                >
                                    {t.description}
                                </motion.p>

                                {/* Grid de Cards de Serviços */}
                                <motion.div
                                    className="services-grid"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
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
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ServicesSection;
