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

const structuredStack = {
  pt: {
    title: 'Sobre Mim',
    paragraph1: 'Desenvolvedor Full Stack com sólida expertise em PHP, Laravel e JavaScript, especializado em arquiteturas web escaláveis e aplicações móveis com React Native.',
    paragraph2: 'Possuo forte proficiência em gestão de dados (SQL e MongoDB) e foco em boas práticas de código para entregar soluções robustas em projetos desafiadores.',
    cta: 'Vamos construir algo juntos?',
    techTitle: 'Minha Tech Stack',
  },
  en: {
    title: 'About Me',
    paragraph1: 'Full Stack Developer with solid expertise in PHP, Laravel, and JavaScript, specializing in scalable web architectures and mobile applications with React Native.',
    paragraph2: 'Strong proficiency in data management (SQL and MongoDB) and code best practices to deliver robust solutions in challenging projects.',
    cta: "Let's build something together?",
    techTitle: 'My Tech Stack',
  },
  es: {
    title: 'Sobre Mí',
    paragraph1: 'Desarrollador Full Stack con sólida experiencia en PHP, Laravel y JavaScript, especializado en arquitecturas web escalables y aplicaciones móviles con React Native.',
    paragraph2: 'Tengo una fuerte competencia en gestión de datos (SQL y MongoDB) y me enfoco en las mejores prácticas para entregar soluciones robustas.',
    cta: '¿Construimos algo juntos?',
    techTitle: 'Mi Tech Stack',
  },
};

const technologies = [
  { name: 'PHP', icon: <SiPhp /> },
  { name: 'Laravel', icon: <SiLaravel /> },
  { name: 'JavaScript', icon: <SiJavascript /> },
  { name: 'React / Native', icon: <SiReact /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'Vue.js', icon: <SiVuedotjs /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'Node.js', icon: <SiNodedotjs /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'SQL', icon: <SiMysql /> },
  { name: 'Docker', icon: <SiDocker /> },
  { name: 'Git', icon: <SiGit /> },
  { name: 'Tailwind', icon: <SiTailwindcss /> },
];

const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/eric-nacif-956930324/', icon: <SiLinkedin /> },
  { name: 'GitHub', url: 'https://github.com/ericnacif', icon: <SiGithub /> },
  { name: 'Instagram', url: 'https://www.instagram.com/nacif_/', icon: <SiInstagram /> },
  { name: 'Email', url: 'mailto:naciferic7@gmail.com', icon: <SiGmail /> },
];

const About = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = structuredStack[language] || structuredStack.pt;
  const logoSrc = theme === 'dark' ? '/logo-gray.webp' : '/logo-blue.webp';

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
    }),
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: (i) => ({
      opacity: 1, scale: 1,
      transition: { duration: 0.3, delay: i * 0.04 },
    }),
  };

  return (
    <section id="sobre" className="about-section">
      <div className="container about-container">

        {/* Título */}
        <motion.h2
          className="section-title"
          key={language}
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          {t.title}
        </motion.h2>

        {/* Layout duas colunas */}
        <div className="about-body">

          {/* Coluna esquerda — logo + socials */}
          <motion.div
            className="about-col-left"
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="about-logo-card">
              <img src={logoSrc} alt="Eric Nacif Logo" className="about-logo" />
            </div>

            <div className="about-socials">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-social-btn"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Coluna direita — texto */}
          <div className="about-col-right">
            <AnimatePresence mode="wait">
              <motion.div
                key={language}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="intro-text">{t.paragraph1}</p>
                <p className="detail-text">{t.paragraph2}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Tech stack */}
        <motion.div
          className="about-stack"
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.h3
              className="tech-stack-title"
              key={language}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {t.techTitle}
            </motion.h3>
          </AnimatePresence>

          <div className="about-chips">
            {technologies.map((tech, i) => (
              <motion.div
                key={tech.name}
                className="about-chip"
                variants={chipVariants}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
              >
                <span className="about-chip-icon">{tech.icon}</span>
                <span className="about-chip-name">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          className="about-footer"
          variants={fadeUp}
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              className="cta-text"
              key={language}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {t.cta}
            </motion.span>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default About;