import React, { useState, useEffect, useRef } from 'react';
import './Footer.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { SiLinkedin, SiInstagram, SiGithub } from 'react-icons/si';
import { FiLoader, FiCheck, FiMapPin, FiSend } from 'react-icons/fi';

const Footer = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [greetingKey, setGreetingKey] = useState('morning');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const logoSrc = theme === 'dark' ? '/logo-gray.webp' : '/logo-blue.webp';
  const suggestionsRef = useRef(null);
  const commonDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'yahoo.com'];

  useEffect(() => {
    const h = new Date().getHours();
    setGreetingKey(h >= 5 && h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening');
  }, []);

  const content = {
    pt: {
      greetings: { morning: 'Bom dia! Vamos construir algo?', afternoon: 'Boa tarde! Vamos construir algo?', evening: 'Boa noite! Vamos construir algo?' },
      subtitle: 'Deixe sua mensagem abaixo e entrarei em contato em breve.',
      labels: { name: 'Seu Nome', email: 'Seu E-mail', message: 'Sua Mensagem' },
      defaultMessage: 'Olá Eric! Vi seu portfólio e gostaria de conversar sobre um projeto...',
      button: { default: 'Enviar Mensagem', success: 'Enviado com sucesso!' },
      error: 'Erro ao enviar. Tente novamente.',
      location: 'Brasil',
      copyright: 'Todos os direitos reservados.',
    },
    en: {
      greetings: { morning: "Good morning! Let's build something?", afternoon: "Good afternoon! Let's build something?", evening: "Good evening! Let's build something?" },
      subtitle: "Leave your message below and I'll get in touch soon.",
      labels: { name: 'Your Name', email: 'Your Email', message: 'Your Message' },
      defaultMessage: "Hi Eric! I saw your portfolio and would like to talk about a project...",
      button: { default: 'Send Message', success: 'Message sent!' },
      error: 'Error sending. Please try again.',
      location: 'Brazil',
      copyright: 'All rights reserved.',
    },
    es: {
      greetings: { morning: '¡Buenos días! ¿Construimos algo?', afternoon: '¡Buenas tardes! ¿Construimos algo?', evening: '¡Buenas noches! ¿Construimos algo?' },
      subtitle: 'Deja tu mensaje abajo y me pondré en contacto pronto.',
      labels: { name: 'Tu Nombre', email: 'Tu Correo', message: 'Tu Mensaje' },
      defaultMessage: '¡Hola Eric! Vi tu portafolio y me gustaría hablar sobre un proyecto...',
      button: { default: 'Enviar Mensaje', success: '¡Mensaje enviado!' },
      error: 'Error al enviar. Inténtalo de nuevo.',
      location: 'Brasil',
      copyright: 'Todos los derechos reservados.',
    },
  };

  const t = content[language] || content.pt;

  useEffect(() => {
    const isDefault = Object.values(content).some((c) => c.defaultMessage === message) || message === '';
    if (isDefault) setMessage(t.defaultMessage);
  }, [language]);

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (val.includes('@')) {
      const [, domainPart] = val.split('@');
      const filtered = commonDomains.filter((d) => d.startsWith(domainPart));
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0 && !commonDomains.includes(domainPart));
    } else setShowSuggestions(false);
  };

  const handleDomainSelect = (domain) => {
    setEmail(`${email.split('@')[0]}@${domain}`);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const data = new FormData();
    data.append('name', name); data.append('email', email); data.append('message', message);
    try {
      const res = await fetch('https://formspree.io/f/movpajdd', { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (res.ok) {
        setStatus('success');
        setName(''); setEmail(''); setMessage(t.defaultMessage);
        setTimeout(() => setStatus('idle'), 3500);
      } else { setStatus('error'); setTimeout(() => setStatus('idle'), 3000); }
    } catch { setStatus('error'); setTimeout(() => setStatus('idle'), 3000); }
  };

  const socialLinks = [
    { href: 'https://www.linkedin.com/in/eric-nacif-956930324/', icon: <SiLinkedin />, label: 'LinkedIn' },
    { href: 'https://github.com/ericnacif', icon: <SiGithub />, label: 'GitHub' },
    { href: 'https://www.instagram.com/nacif_/', icon: <SiInstagram />, label: 'Instagram' },
  ];

  const isDisabled = status === 'sending' || status === 'success';

  return (
    <footer id="contato" className="main-footer">

      {/* Seção de contato */}
      <div className="footer-contact">
        <div className="footer-contact-inner">

          {/* Cabeçalho */}
          <motion.div
            className="footer-heading"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.h2
                className="footer-greeting"
                key={`${language}-${greetingKey}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
              >
                {t.greetings[greetingKey]}
              </motion.h2>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                className="footer-subtitle"
                key={language}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {t.subtitle}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Formulário em card */}
          <motion.div
            className="form-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                {/* Nome */}
                <div className="field">
                  <AnimatePresence mode="wait">
                    <motion.label htmlFor="name" key={language}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.16 }}
                    >
                      {t.labels.name}
                    </motion.label>
                  </AnimatePresence>
                  <input
                    type="text" id="name" name="name"
                    value={name} onChange={(e) => setName(e.target.value)}
                    required disabled={isDisabled} placeholder="João Silva"
                  />
                </div>

                {/* Email */}
                <div className="field" ref={suggestionsRef} style={{ position: 'relative' }}>
                  <AnimatePresence mode="wait">
                    <motion.label htmlFor="email" key={language}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.16 }}
                    >
                      {t.labels.email}
                    </motion.label>
                  </AnimatePresence>
                  <input
                    type="email" id="email" name="email"
                    value={email} onChange={handleEmailChange}
                    required disabled={isDisabled} placeholder="joao@email.com" autoComplete="off"
                  />
                  <AnimatePresence>
                    {showSuggestions && (
                      <motion.ul className="email-suggestions"
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      >
                        {suggestions.map((domain) => (
                          <li key={domain} onClick={() => handleDomainSelect(domain)}>
                            <span className="sug-user">{email.split('@')[0]}@</span>
                            <span className="sug-domain">{domain}</span>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Mensagem */}
              <div className="field field--full">
                <AnimatePresence mode="wait">
                  <motion.label htmlFor="message" key={language}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.16 }}
                  >
                    {t.labels.message}
                  </motion.label>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.textarea
                    key={language} id="message" name="message" rows="4"
                    value={message} onChange={(e) => setMessage(e.target.value)}
                    required disabled={isDisabled}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.16 }}
                  />
                </AnimatePresence>
              </div>

              {/* Submit */}
              <div className="form-submit">
                <motion.button
                  type="submit"
                  className={`submit-btn submit-btn--${status}`}
                  disabled={isDisabled}
                  layout
                  transition={{ duration: 0.3, type: 'spring', stiffness: 120 }}
                >
                  <AnimatePresence mode="wait">
                    {status === 'idle' && (
                      <motion.span key={`idle-${language}`} className="btn-inner"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.span key={language} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {t.button.default}
                          </motion.span>
                        </AnimatePresence>
                        <FiSend size={15} />
                      </motion.span>
                    )}
                    {status === 'sending' && (
                      <motion.span key="sending" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <FiLoader className="spin-icon" size={20} />
                      </motion.span>
                    )}
                    {status === 'success' && (
                      <motion.span key="success" className="btn-inner" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <FiCheck size={18} />
                        <motion.span key={`s-${language}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          {t.button.success}
                        </motion.span>
                      </motion.span>
                    )}
                    {status === 'error' && (
                      <motion.span key={`err-${language}`}>{t.error}</motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-inner">
          <div className="footer-brand">
            <img src={logoSrc} alt="Logo" className="footer-logo" />
            <p className="footer-location">
              <FiMapPin size={12} />
              {t.location}
            </p>
          </div>

          <div className="footer-socials">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="footer-social" aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-copyright">
          <AnimatePresence mode="wait">
            <motion.p key={language}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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