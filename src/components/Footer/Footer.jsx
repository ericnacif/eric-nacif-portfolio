import { useState, useEffect, useRef } from 'react';
import './Footer.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { SiLinkedin, SiInstagram, SiGithub } from 'react-icons/si';
import { FiLoader, FiCheck, FiMapPin } from 'react-icons/fi';

// REMOVIDO: Imports de imagem (agora estão na public)

// Content translations moved outside component to avoid re-creation on each render
const content = {
  pt: {
    greetings: {
      morning: "Bom dia! Vamos construir algo?",
      afternoon: "Boa tarde! Vamos construir algo?",
      evening: "Boa noite! Vamos construir algo?"
    },
    subtitle: "Deixe sua mensagem abaixo e entrarei em contato.",
    labels: { name: "Seu Nome", email: "Seu E-mail", message: "Sua Mensagem" },
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

const Footer = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState("idle");
  const [greetingKey, setGreetingKey] = useState("morning");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // CORREÇÃO: Caminhos absolutos (strings)
  const logoSrc = theme === 'dark' ? '/logo-gray.webp' : '/logo-blue.webp';

  const suggestionsRef = useRef(null);

  const commonDomains = ["gmail.com", "outlook.com", "hotmail.com", "icloud.com", "yahoo.com"];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreetingKey("morning");
    else if (hour >= 12 && hour < 18) setGreetingKey("afternoon");
    else setGreetingKey("evening");
  }, []);

  const t = content[language] || content.pt;

  useEffect(() => {
    const currentIsDefault = Object.values(content).some(c => c.defaultMessage === message) || message === "";
    if (currentIsDefault) {
      setMessage(t.defaultMessage);
    }
  }, [language, message, t.defaultMessage]);

  const socialLinks = [
    { href: "https://www.linkedin.com/in/eric-nacif-956930324/", icon: <SiLinkedin />, alt: "LinkedIn" },
    { href: "https://github.com/ericnacif", icon: <SiGithub />, alt: "GitHub" },
    { href: "https://www.instagram.com/nacif_/", icon: <SiInstagram />, alt: "Instagram" },
  ];

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);

    if (val.includes('@')) {
      const [, domainPart] = val.split('@');
      const filtered = commonDomains.filter(d => d.startsWith(domainPart));

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
        setName("");
        setEmail("");
        setMessage(t.defaultMessage);
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const textContainerVariants = {
    visible: {
      transition: { staggerChildren: 0.015 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <footer id="contato" className="main-footer">
      <div className="container footer-container">

        <motion.div
          className="footer-cta-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="section-title greeting-title"
            key={language + greetingKey}
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {Array.from(t.greetings[greetingKey]).map((char, index) => (
              <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h2>

          <AnimatePresence mode="wait">
            <motion.p
              key={language}
              className="footer-subtitle"
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {t.subtitle}
            </motion.p>
          </AnimatePresence>

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

                <AnimatePresence mode="wait">
                  <motion.label
                    htmlFor="name"
                    key={language}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {t.labels.name}
                  </motion.label>
                </AnimatePresence>
                <span className="underline-bar"></span>
              </div>

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
                  autoComplete="off"
                />

                <AnimatePresence mode="wait">
                  <motion.label
                    htmlFor="email"
                    key={language}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {t.labels.email}
                  </motion.label>
                </AnimatePresence>
                <span className="underline-bar"></span>

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
              <AnimatePresence mode="wait">
                <motion.textarea
                  key={language}
                  name="message"
                  id="message"
                  rows="1"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={status === "sending" || status === "success"}
                  placeholder=" "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.label
                  htmlFor="message"
                  key={language}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {t.labels.message}
                </motion.label>
              </AnimatePresence>
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
                    <motion.span
                      key={`text-${language}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
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
                      <motion.span
                        key={`success-${language}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {t.button.success}
                      </motion.span>
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.span key={`error-${language}`}>{t.error}</motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </form>
        </motion.div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="footer-brand">
            {/* CORREÇÃO: Uso da variável com o caminho da public */}
            <img src={logoSrc} alt="Logo" className="footer-logo" />

            <AnimatePresence mode="wait">
              <motion.p
                className="footer-location"
                key={language}
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <FiMapPin style={{ marginRight: '6px' }} />
                {t.location}
              </motion.p>
            </AnimatePresence>
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

        <div className="footer-copyright">
          <AnimatePresence mode="wait">
            <motion.p
              key={language}
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              © {new Date().getFullYear()} Eric Nacif. {t.copyright}
            </motion.p>
          </AnimatePresence>
        </div>

      </div>
    </footer>
  );
};

export default Footer;