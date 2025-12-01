import React from 'react';
import './About.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import {
  SiInstagram, SiGithub, SiLinkedin, SiGmail,
  SiPhp, SiLaravel, SiJavascript, SiReact, SiTypescript,
  SiNodedotjs, SiDocker, SiMysql, SiGit, SiTailwindcss,
  SiMongodb, SiNextdotjs, SiVuedotjs
} from 'react-icons/si';

// REMOVIDO: Imports de imagem

const structuredStack = {
  pt: {
    title: "Sobre Mim",
    paragraph1: "Desenvolvedor Full Stack com sólida expertise em PHP, Laravel e JavaScript, especializado em arquiteturas web escaláveis e aplicações móveis com React Native.",
    paragraph2: "Possuo forte proficiência em gestão de dados (SQL e MongoDB) e foco em boas práticas de código para entregar soluções robustas em projetos desafiadores.",
    cta: "Vamos construir algo juntos?",
    techTitle: "Minha Tech Stack"
  },
  en: {
    title: "About Me",
    paragraph1: "Full Stack Developer with solid expertise in PHP, Laravel, and JavaScript, specializing in scalable web architectures and mobile applications with React Native.",
    paragraph2: "I have strong proficiency in data management (SQL and MongoDB) and focus on code best practices to deliver robust solutions in challenging projects.",
    cta: "Let's build something together?",
    techTitle: "My Tech Stack"
  },
  es: {
    title: "Sobre Mí",
    paragraph1: "Desarrollador Full Stack con sólida experiencia en PHP, Laravel y JavaScript, especializado en arquitecturas web escalables y aplicaciones móviles con React Native.",
    paragraph2: "Tengo una fuerte competencia en gestión de datos (SQL y MongoDB) y me enfoco en las mejores prácticas de código para entregar soluciones robustas.",
    cta: "¿Construimos algo juntos?",
    techTitle: "Mi Tech Stack"
  }
};

const technologies = [
  { name: "PHP", icon: <SiPhp /> },
  { name: "Laravel", icon: <SiLaravel /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "React / Native", icon: <SiReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Vue.js", icon: <SiVuedotjs /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "SQL", icon: <SiMysql /> },
  { name: "Docker", icon: <SiDocker /> },
  { name: "Git", icon: <SiGit /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
];

const About = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = structuredStack[language] || structuredStack.pt;

  // CORREÇÃO: Caminhos absolutos (strings)
  const logoSrc = theme === 'dark' ? '/logo-gray.webp' : '/logo-blue.webp';

  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/eric-nacif-956930324/", icon: <SiLinkedin /> },
    { name: "GitHub", url: "https://github.com/ericnacif", icon: <SiGithub /> },
    { name: "Instagram", url: "https://www.instagram.com/nacif_/", icon: <SiInstagram /> },
    { name: "Email", url: "mailto:naciferic7@gmail.com", icon: <SiGmail /> }
  ];

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

        <h3 className="tech-stack-title">{t.techTitle}</h3>

        <div className="tech-marquee-wrapper">
          <div className="tech-track">
            {[...technologies, ...technologies].map((tech, index) => (
              <div className="tech-item" key={index}>
                <span className="tech-icon">{tech.icon}</span>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
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