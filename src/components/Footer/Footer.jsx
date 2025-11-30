import React, { useState, useEffect } from 'react';
import './Footer.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { SiLinkedin, SiInstagram, SiGithub } from 'react-icons/si';
import { FiLoader, FiCheck, FiMapPin } from 'react-icons/fi';

import logoBlue from '../../assets/images/logo-blue.png';
import logoGray from '../../assets/images/logo-gray.png';

const Footer = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [status, setStatus] = useState("idle");
  const [greetingKey, setGreetingKey] = useState("morning");

  const logoSrc = theme === 'dark' ? logoGray : logoBlue;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreetingKey("morning");
    else if (hour >= 12 && hour < 18) setGreetingKey("afternoon");
    else setGreetingKey("evening");
  }, []);

  const content = {
    pt: {
      greetings: {
        morning: "Bom dia! Vamos construir algo?",
        afternoon: "Boa tarde! Vamos construir algo?",
        evening: "Boa noite! Vamos construir algo?"
      },
      subtitle: "Deixe sua mensagem abaixo e entrarei em contato.",
      labels: { name: "Seu Nome", email: "Seu E-mail", message: "Sua Mensagem" },
      button: { default: "Enviar Mensagem", sending: "", success: "Enviado!" },
      error: "Erro ao enviar. Tente novamente.",
      location: "Brasil 🇧🇷",
      copyright: "Todos os direitos reservados."
    },
    en: {
      greetings: {
        morning: "Good morning! Let's build something?",
        afternoon: "Good afternoon! Let's build something?",
        evening: "Good evening! Let's build something?"
      },
      subtitle: "Leave your message below and I'll get in touch.",
      labels: { name: "Your Name", email: "Your Email", message: "Your Message" },
      button: { default: "Send Message", sending: "", success: "Sent!" },
      error: "Error sending. Please try again.",
      location: "Brazil 🇧🇷",
      copyright: "All rights reserved."
    },
    es: {
      greetings: {
        morning: "¡Buenos días! ¿Construimos algo?",
        afternoon: "¡Buenas tardes! ¿Construimos algo?",
        evening: "¡Buenas noches! ¿Construimos algo?"
      },
      subtitle: "Deja tu mensaje abajo y me pondré en contacto.",
      labels: { name: "Tu Nombre", email: "Tu Correo", message: "Tu Mensaje" },
      button: { default: "Enviar Mensaje", sending: "", success: "¡Enviado!" },
      error: "Error al enviar. Inténtalo de nuevo.",
      location: "Brasil 🇧🇷",
      copyright: "Todos los derechos reservados."
    }
  };

  const t = content[language] || content.pt;

  // Removido o ícone de e-mail conforme solicitado
  const socialLinks = [
    { href: "https://www.linkedin.com/in/eric-nacif-956930324/", icon: <SiLinkedin />, alt: "LinkedIn" },
    { href: "https://github.com/ericnacif", icon: <SiGithub />, alt: "GitHub" },
    { href: "https://www.instagram.com/nacif_/", icon: <SiInstagram />, alt: "Instagram" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/movpajdd", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <footer id="contato" className="main-footer">
      <div className="container footer-container">
        
        {/* --- SESSÃO DO FORMULÁRIO (CTA) --- */}
        <motion.div
          className="footer-cta-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <motion.h2
              className="section-title greeting-title"
              key={language + greetingKey}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {t.greetings[greetingKey]}
            </motion.h2>
          </AnimatePresence>

          <p className="footer-subtitle">{t.subtitle}</p>

          <form className="contact-form minimal-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-group-minimal">
                <input type="text" name="name" id="name" required disabled={status === "sending" || status === "success"} placeholder=" " />
                <label htmlFor="name">{t.labels.name}</label>
                <span className="underline-bar"></span>
              </div>
              <div className="input-group-minimal">
                <input type="email" name="email" id="email" required disabled={status === "sending" || status === "success"} placeholder=" " />
                <label htmlFor="email">{t.labels.email}</label>
                <span className="underline-bar"></span>
              </div>
            </div>

            <div className="input-group-minimal full-width">
              <textarea name="message" id="message" rows="1" required disabled={status === "sending" || status === "success"} placeholder=" "></textarea>
              <label htmlFor="message">{t.labels.message}</label>
              <span className="underline-bar"></span>
            </div>

            <div className="button-wrapper">
              <motion.button
                type="submit"
                className={`morph-btn ${status}`}
                disabled={status === "sending" || status === "success"}
                layout
                transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
              >
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {t.button.default}
                    </motion.span>
                  )}
                  {status === "sending" && (
                    <motion.div key="loader" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <FiLoader className="spinner-icon" />
                    </motion.div>
                  )}
                  {status === "success" && (
                    <motion.div key="success" className="success-content" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <FiCheck size={24} />
                      <span>{t.button.success}</span>
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.span key="error">{t.error}</motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* --- DIVISOR --- */}
        <div className="footer-divider"></div>

        {/* --- SESSÃO INFERIOR (Sem Links de Navegação) --- */}
        <div className="footer-bottom">
            <div className="footer-brand">
                <img src={logoSrc} alt="Logo" className="footer-logo" />
                <p className="footer-location">
                    <FiMapPin style={{ marginRight: '6px' }} /> 
                    {t.location}
                </p>
            </div>

            <div className="footer-socials-bottom">
                {socialLinks.map((link, index) => (
                <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label={link.alt}
                >
                    {link.icon}
                </a>
                ))}
            </div>
        </div>

        {/* --- COPYRIGHT (Colado no fim) --- */}
        <div className="footer-copyright">
          <p>© {new Date().getFullYear()} Eric Nacif. {t.copyright}</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;