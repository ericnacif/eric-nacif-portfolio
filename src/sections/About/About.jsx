import React from 'react';
import './About.css';
import { useLanguage } from '../../context/LanguageContext';
import { SiInstagram, SiGithub, SiLinkedin, SiGmail } from 'react-icons/si';

const About = () => {
  const { language } = useLanguage();

  const content = {
    pt: {
      // Texto curto e direto. Foca no "Valor" que você entrega, não apenas ferramentas.
      paragraph1: "Olá, sou o Eric. Desenvolvedor Full Stack focado em transformar problemas complexos em interfaces simples e eficientes.",
      paragraph2: "Com base sólida em PHP e JavaScript, crio produtos digitais completos — do banco de dados à experiência mobile. Valorizo código limpo, performance e, acima de tudo, soluções que funcionam.",
      cta: "Vamos construir algo juntos?"
    },
    en: {
      paragraph1: "Hi, I'm Eric. A Full Stack Developer focused on turning complex problems into simple, efficient interfaces.",
      paragraph2: "With a solid foundation in PHP and JavaScript, I build complete digital products — from database to mobile experience. I value clean code, performance, and above all, solutions that work.",
      cta: "Let's build something together?"
    },
    es: {
      paragraph1: "Hola, soy Eric. Desarrollador Full Stack enfocado en transformar problemas complejos en interfaces simples y eficientes.",
      paragraph2: "Con una base sólida en PHP y JavaScript, creo productos digitales completos. Valoro el código limpio, el rendimiento y, sobre todo, las soluciones que funcionan.",
      cta: "¿Construimos algo juntos?"
    }
  };

  const t = content[language] || content.pt;

  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/eric-nacif-956930324/", icon: <SiLinkedin /> },
    { name: "GitHub", url: "https://github.com/ericnacif", icon: <SiGithub /> },
    { name: "Instagram", url: "https://www.instagram.com/nacif_/", icon: <SiInstagram /> },
    { name: "Email", url: "mailto:naciferic7@gmail.com", icon: <SiGmail /> }
  ];

  return (
    <section id="sobre" className="about-section">
      <div className="container about-container">
        
        <div className="about-text-area">
          <p className="intro-text">{t.paragraph1}</p>
          <p className="detail-text">{t.paragraph2}</p>
        </div>

        <div className="about-footer">
          <span className="cta-text">{t.cta}</span>
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