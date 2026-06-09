import React, { useState, useEffect, useRef } from 'react';
import './Footer.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/i18n/translations';
import { SiLinkedin, SiInstagram, SiGithub } from 'react-icons/si';
import { FiLoader, FiCheck, FiMapPin, FiArrowUpRight } from 'react-icons/fi';

const Footer = () => {
  const { language, t } = useLanguage();
  const content = t.footer;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [greetingKey, setGreetingKey] = useState('morning');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const logoSrc = '/logo-blue.webp';
  const suggestionsRef = useRef(null);
  const commonDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'yahoo.com'];

  useEffect(() => {
    const h = new Date().getHours();
    setGreetingKey(h >= 5 && h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening');
  }, []);

  useEffect(() => {
    const isDefault = Object.values(translations).some(({ footer }) => footer.defaultMessage === message) || message === '';
    if (isDefault) setMessage(content.defaultMessage);
  }, [content.defaultMessage, message]);

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (val.includes('@')) {
      const [, domainPart] = val.split('@');
      const filtered = commonDomains.filter((d) => d.startsWith(domainPart));
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0 && !commonDomains.includes(domainPart));
    } else {
      setShowSuggestions(false);
    }
  };

  const handleDomainSelect = (domain) => {
    setEmail(`${email.split('@')[0]}@${domain}`);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target))
        setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('message', message);
    try {
      const res = await fetch('https://formspree.io/f/movpajdd', {
        method: 'POST', body: data, headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        setName(''); setEmail(''); setMessage(content.defaultMessage);
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
  const fadeVariants = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

  return (
    <footer id="contato" className="main-footer">
      <div className="footer-inner">

        <div className="footer-grid">

          {/* Coluna esquerda — intro + contato */}
          <motion.div
            className="footer-intro"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.h2
                className="footer-greeting"
                key={`${language}-${greetingKey}`}
                variants={fadeVariants}
                initial="initial" animate="animate" exit="exit"
                transition={{ duration: 0.22 }}
              >
                {content.greetings[greetingKey]}
              </motion.h2>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                className="footer-subtitle"
                key={language}
                variants={fadeVariants}
                initial="initial" animate="animate" exit="exit"
                transition={{ duration: 0.2 }}
              >
                {content.subtitle}
              </motion.p>
            </AnimatePresence>

            <div className="footer-brand">
              <img src={logoSrc} alt="Eric Nacif" className="footer-logo" width="40" height="40" loading="lazy" />
              <div className="footer-brand-info">
                <span className="footer-brand-name">Eric Nacif</span>
                <AnimatePresence mode="wait">
                  <motion.span className="footer-location" key={language}
                    variants={fadeVariants} initial="initial" animate="animate" exit="exit"
                    transition={{ duration: 0.2 }}
                  >
                    <FiMapPin size={13} style={{ marginRight: 5 }} />
                    {content.location}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <nav className="footer-links" aria-label="Social">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="footer-link"
                >
                  <span className="footer-link-icon">{link.icon}</span>
                  <span className="footer-link-label">{link.label}</span>
                  <FiArrowUpRight className="footer-link-arrow" />
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Coluna direita — formulário */}
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="form-field">
              <label htmlFor="name">{content.labels.name}</label>
              <input
                type="text" name="name" id="name"
                value={name} onChange={(e) => setName(e.target.value)}
                required disabled={isDisabled}
              />
            </div>

            <div className="form-field" ref={suggestionsRef}>
              <label htmlFor="email">{content.labels.email}</label>
              <input
                type="email" name="email" id="email"
                value={email} onChange={handleEmailChange}
                required disabled={isDisabled} autoComplete="off"
              />
              <AnimatePresence>
                {showSuggestions && (
                  <motion.ul
                    className="email-suggestions"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
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

            <div className="form-field">
              <label htmlFor="message">{content.labels.message}</label>
              <textarea
                name="message" id="message" rows="3"
                value={message} onChange={(e) => setMessage(e.target.value)}
                required disabled={isDisabled}
              />
            </div>

            <button
              type="submit"
              className={`submit-btn ${status}`}
              disabled={isDisabled}
            >
              {status === 'idle' && <span>{content.button.default}</span>}
              {status === 'sending' && <FiLoader className="spinner-icon" />}
              {status === 'success' && (
                <span className="success-content">
                  <FiCheck size={20} />
                  {content.button.success}
                </span>
              )}
              {status === 'error' && <span>{content.error}</span>}
            </button>
          </motion.form>

        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>© {new Date().getFullYear()} Eric Nacif. {content.copyright}</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;