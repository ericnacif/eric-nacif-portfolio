import React from 'react';
import './About.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
// Importamos o hook do tema
import { useTheme } from '../../context/ThemeContext';
import {
  SiInstagram, SiGithub, SiLinkedin, SiGmail
} from 'react-icons/si';

import logoBlue from '../../assets/images/logo-blue.png';
// IMPORTANTE: Certifique-se de que esta imagem existe
import logoGray from '../../assets/images/logo-gray.png';

const structuredStack = {
  // ... (conteúdo do structuredStack permanece igual) ...
  pt: {
    title: "Sobre Mim",
    paragraph1: "Olá, sou o Eric. Desenvolvedor Full Stack focado em interfaces simples e eficientes.",
    paragraph2: "Com base sólida em PHP e JavaScript, crio produtos digitais completos — do banco de dados à experiência mobile. Valorizo código limpo, performance e, acima de tudo, soluções que funcionam.",
    cta: "Vamos construir algo juntos?",
  },
  en: {
    title: "About Me",
    paragraph1: "Hi, I'm Eric. Full Stack Developer focused on simple and efficient interfaces.",
    paragraph2: "With a solid foundation in PHP and JavaScript, I build complete digital products — from database to mobile experience. I value clean code, performance, and above all, solutions that work.",
    cta: "Let's build something together?",
  },
  es: {
    title: "Sobre Mí",
    paragraph1: "Hola, soy Eric. Desarrollador Full Stack enfocado en interfaces simples y eficientes.",
    paragraph2: "Con una base sólida en PHP y JavaScript, creo productos digitales completos. Valoro el código limpio, el rendimiento y, sobre todo, las soluciones que funcionan.",
    cta: "¿Construimos algo juntos?",
  }
};

const About = () => {
  const { language } = useLanguage();
  // Usamos o hook para saber qual é o tema atual
  const { theme } = useTheme();
  const t = structuredStack[language] || structuredStack.pt;

  // Lógica para escolher a logo correta
  const logoSrc = theme === 'dark' ? logoGray : logoBlue;

  const socialLinks = [
    // ... (socialLinks permanecem iguais) ...
    { name: "LinkedIn", url: "https://www.linkedin.com/in/eric-nacif-956930324/", icon: <SiLinkedin /> },
    { name: "GitHub", url: "https://github.com/ericnacif", icon: <SiGithub /> },
    { name: "Instagram", url: "https://www.instagram.com/nacif_/", icon: <SiInstagram /> },
    { name: "Email", url: "mailto:naciferic7@gmail.com", icon: <SiGmail /> }
  ];

  // ... (variants permanecem iguais) ...
  const textContainerVariants = {
    visible: {
      transition: { staggerChildren: 0.04 }
    }
  };
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.3 }
    }
  };
  // ... (fim das variants) ...

  return (
    <section id="sobre" className="about-section">
      <div className="container about-container">

        <motion.h2
          className="section-title"
          key={language}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={textContainerVariants}
        >
          {Array.from(t.title).map((char, index) => (
            <motion.span key={index} variants={textVariants} style={{ display: 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h2>

        <div className="about-text-area">
          <div className="about-content-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={language}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <p className="intro-text">{t.paragraph1}</p>
                <p className="detail-text">{t.paragraph2}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="about-image-right">
            {/* Usamos a variável logoSrc aqui */}
            <motion.img
              src={logoSrc}
              alt="Eric Nacif Logo"
              className="about-logo"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={imageVariants}
            />
          </div>
        </div>

        <div className="about-footer">
          <AnimatePresence mode="wait">
            <motion.span
              className="cta-text"
              key={language}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {t.cta}
            </motion.span>
          </AnimatePresence>

          <div className="social-icons-row">
            {socialLinks.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label={link.name}>
                {link.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;