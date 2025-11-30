import React, { useState, useEffect, useRef } from 'react';
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
  
  // Estados do Formulário Controlado
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  // Estados de UI
  const [status, setStatus] = useState("idle");
  const [greetingKey, setGreetingKey] = useState("morning");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const logoSrc = theme === 'dark' ? logoGray : logoBlue;
  const suggestionsRef = useRef(null);

  // Lista de domínios comuns
  const commonDomains = ["gmail.com", "outlook.com", "hotmail.com", "icloud.com", "yahoo.com"];

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
      // Mensagem padrão inicial
      defaultMessage: "Olá Eric! Vi seu portfólio e gostaria de conversar sobre um projeto...",
      button: { default: "Enviar Mensagem", sending: "", success: "Enviado!" },
      error: "Erro ao enviar. Tente novamente.",
      location: "Brasil",
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
      defaultMessage: "Hi Eric! I saw your portfolio and would like to talk about a project...",
      button: { default: "Send Message", sending: "", success: "Sent!" },
      error: "Error sending. Please try again.",
      location: "Brazil",
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
      defaultMessage: "¡Hola Eric! Vi tu portafolio y me gustaría hablar sobre un proyecto...",
      button: { default: "Enviar Mensaje", sending: "", success: "¡Enviado!" },
      error: "Error al enviar. Inténtalo de nuevo.",
      location: "Brasil",
      copyright: "Todos los derechos reservados."
    }
  };

  const t = content[language] || content.pt;

  // Atualiza a mensagem padrão quando troca o idioma (se o usuário ainda não digitou nada diferente)
  useEffect(() => {
    // Verifica se a mensagem atual é vazia ou igual a uma mensagem padrão de outro idioma
    const currentIsDefault = Object.values(content).some(c => c.defaultMessage === message) || message === "";
    if (currentIsDefault) {
      setMessage(t.defaultMessage);
    }
  }, [language]);

  const socialLinks = [
    { href: "https://www.linkedin.com/in/eric-nacif-956930324/", icon: <SiLinkedin />, alt: "LinkedIn" },
    { href: "https://github.com/ericnacif", icon: <SiGithub />, alt: "GitHub" },
    { href: "https://www.instagram.com/nacif_/", icon: <SiInstagram />, alt: "Instagram" },
  ];

  // --- LÓGICA DE AUTOCOMPLETE DE E-MAIL ---
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);

    if (val.includes('@')) {
      const [user, domainPart] = val.split('@');
      // Filtra domínios que combinam com o que foi digitado após o @
      const filtered = commonDomains.filter(d => d.startsWith(domainPart));
      
      // Só mostra se houver sugestões e se o domínio ainda não estiver completo
      if (filtered.length > 0 && !commonDomains.includes(domainPart)) {
        setSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const handleDomainSelect = (domain) => {
    const user = email.split('@')[0];
    setEmail(`${user}@${domain}`);
    setShowSuggestions(false);
  };

  // Fecha sugestões ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    
    // Cria FormData manualmente para garantir que os estados controlados sejam enviados
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("message", message);

    try {
      const response = await fetch("https://formspree.io/f/movpajdd", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus("success");
        // Limpa campos, mas mantendo a mensagem padrão após o reset
        setName("");
        setEmail("");
        setMessage(t.defaultMessage); 
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
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                  disabled={status === "sending" || status === "success"} 
                  placeholder=" " 
                />
                <label htmlFor="name">{t.labels.name}</label>
                <span className="underline-bar"></span>
              </div>

              {/* Input de Email com Autocomplete */}
              <div className="input-group-minimal" ref={suggestionsRef}>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  value={email}
                  onChange={handleEmailChange}
                  required 
                  disabled={status === "sending" || status === "success"} 
                  placeholder=" " 
                  autoComplete="off" // Desativa autocomplete do navegador para usar o nosso
                />
                <label htmlFor="email">{t.labels.email}</label>
                <span className="underline-bar"></span>
                
                {/* Dropdown de Sugestões */}
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.ul 
                      className="email-suggestions"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {suggestions.map((domain) => (
                        <li key={domain} onClick={() => handleDomainSelect(domain)}>
                          <span className="suggestion-user">{email.split('@')[0]}@</span>
                          <span className="suggestion-domain">{domain}</span>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="input-group-minimal full-width">
              <textarea 
                name="message" 
                id="message" 
                rows="1" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required 
                disabled={status === "sending" || status === "success"} 
                placeholder=" "
              ></textarea>
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

        {/* --- SESSÃO INFERIOR --- */}
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

        {/* --- COPYRIGHT --- */}
        <div className="footer-copyright">
          <p>© {new Date().getFullYear()} Eric Nacif. {t.copyright}</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;