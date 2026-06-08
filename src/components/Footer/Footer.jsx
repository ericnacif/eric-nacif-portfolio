import React, { useState, useEffect, useRef } from 'react';
import './Footer.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../i18n/translations';
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

        {/* Headline editorial */}
        <motion.div
          className="footer-top"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              className="footer-eyebrow"
              key={language}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {content.eyebrow}
            </motion.span>
          </AnimatePresence>
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
        </motion.div>

        {/* Formulário em coluna única */}
        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="form-row">
            <div className="form-field">
              <AnimatePresence mode="wait">
                <motion.label htmlFor="name" key={language}
                  variants={fadeVariants} initial="initial" animate="animate" exit="exit"
                  transition={{ duration: 0.18 }}
                >
                  {content.labels.name}
                </motion.label>
              </AnimatePresence>
              <input
                type="text" name="name" id="name"
                value={name} onChange={(e) => setName(e.target.value)}
                required disabled={isDisabled}
              />
            </div>

            <div className="form-field" ref={suggestionsRef}>
              <AnimatePresence mode="wait">
                <motion.label htmlFor="email" key={language}
                  variants={fadeVariants} initial="initial" animate="animate" exit="exit"
                  transition={{ duration: 0.18 }}
                >
                  {content.labels.email}
                </motion.label>
              </AnimatePresence>
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
          </div>

          <div className="form-field form-field--full">
            <AnimatePresence mode="wait">
              <motion.label htmlFor="message" key={language}
                variants={fadeVariants} initial="initial" animate="animate" exit="exit"
                transition={{ duration: 0.18 }}
              >
                {content.labels.message}
              </motion.label>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.textarea
                key={language} name="message" id="message" rows="3"
                value={message} onChange={(e) => setMessage(e.target.value)}
                required disabled={isDisabled}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              />
            </AnimatePresence>
          </div>

          <motion.button
            type="submit"
            className={`submit-btn ${status}`}
            disabled={isDisabled}
            layout
            transition={{ duration: 0.35, type: 'spring', stiffness: 100 }}
          >
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.span key={`idle-${language}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span key={language}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      {content.button.default}
                    </motion.span>
                  </AnimatePresence>
                </motion.span>
              )}
              {status === 'sending' && (
                <motion.div key="loader"
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                >
                  <FiLoader className="spinner-icon" />
                </motion.div>
              )}
              {status === 'success' && (
                <motion.div key="success" className="success-content"
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                >
                  <FiCheck size={22} />
                  <motion.span key={`s-${language}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.18 }}
                  >
                    {content.button.success}
                  </motion.span>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.span key={`err-${language}`}>{content.error}</motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.form>

        {/* Seção de conexão abaixo do formulário */}
        <div className="footer-connect">
          <div className="footer-brand">
            <img src={logoSrc} alt="Eric Nacif" className="footer-logo" />
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
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <AnimatePresence mode="wait">
            <motion.p key={language}
              variants={fadeVariants} initial="initial" animate="animate" exit="exit"
              transition={{ duration: 0.2 }}
            >
              © {new Date().getFullYear()} Eric Nacif. {content.copyright}
            </motion.p>
          </AnimatePresence>
        </div>

      </div>
    </footer>
  );
};

export default Footer;