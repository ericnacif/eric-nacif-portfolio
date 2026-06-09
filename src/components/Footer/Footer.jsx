import React, { useState, useEffect, useRef } from 'react';
import './Footer.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/i18n/translations';
import { SiLinkedin, SiInstagram, SiGithub } from 'react-icons/si';
import {
  FiLoader, FiCheck, FiMapPin, FiArrowUpRight, FiArrowUp, FiArrowRight,
  FiMail, FiUser, FiMessageSquare, FiClock, FiLock,
} from 'react-icons/fi';

const MESSAGE_MAX = 600;

const Footer = () => {
  const { language, t } = useLanguage();
  const content = t.footer;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [touched, setTouched] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const logoSrc = '/logo-blue.webp';
  const suggestionsRef = useRef(null);
  const commonDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'yahoo.com'];

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
        setName(''); setEmail(''); setMessage(content.defaultMessage); setTouched({});
        setTimeout(() => setStatus('idle'), 3500);
      } else { setStatus('error'); setTimeout(() => setStatus('idle'), 3000); }
    } catch { setStatus('error'); setTimeout(() => setStatus('idle'), 3000); }
  };

  const emailAddress = 'naciferic7@gmail.com';

  const socialLinks = [
    { href: 'https://www.linkedin.com/in/eric-nacif-956930324/', icon: <SiLinkedin />, label: 'LinkedIn' },
    { href: 'https://github.com/ericnacif', icon: <SiGithub />, label: 'GitHub' },
    { href: 'https://www.instagram.com/nacif_/', icon: <SiInstagram />, label: 'Instagram' },
  ];

  const navLinks = [
    { id: 'sobre', label: t.nav.about },
    { id: 'projetos', label: t.nav.projects },
    { id: 'contato', label: t.nav.contact },
  ];

  const handleNav = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const isDisabled = status === 'sending' || status === 'success';
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const markTouched = (field) => setTouched((prev) => ({ ...prev, [field]: true }));
  const errors = {
    name: touched.name && !name.trim(),
    email: touched.email && !emailValid,
    message: touched.message && !message.trim(),
  };

  const formContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
  };
  const formItem = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <footer id="contato" className="main-footer">
      <div className="footer-inner">

        <div className="footer-top">
          {/* Lead — contexto + colunas de links */}
          <div className="footer-lead">
            <span className="footer-eyebrow">{content.letsTalk}</span>
            <h2 className="footer-heading">{content.heading}</h2>

            <div className="footer-badges">
              <span className="footer-badge footer-badge--status">
                <span className="footer-badge-dot" aria-hidden="true" />
                {content.statusAvailable}
              </span>
              <span className="footer-badge">
                <FiClock className="footer-badge-icon" />
                {content.responseTime}
              </span>
            </div>

            <a className="footer-contact-email" href={`mailto:${emailAddress}`}>
              <FiMail className="footer-contact-icon" />
              {emailAddress}
            </a>

            <div className="footer-cols">
              <div className="footer-col">
                <span className="footer-col-title">{content.navTitle}</span>
                {navLinks.map((link) => (
                  <a key={link.id} href={`#${link.id}`} onClick={(e) => handleNav(e, link.id)} className="footer-col-link">
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="footer-col">
                <span className="footer-col-title">{content.socialTitle}</span>
                {socialLinks.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="footer-col-link">
                    {link.label}
                    <FiArrowUpRight className="footer-col-link-arrow" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Formulário profissional */}
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            variants={formContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="form-head" variants={formItem}>
              <h3 className="form-title">{content.formTitle}</h3>
              <p className="form-subtitle">{content.subtitle}</p>
            </motion.div>

            <motion.div className="form-row" variants={formItem}>
              <div className={`form-field ${errors.name ? 'has-error' : ''}`}>
                <label htmlFor="name">{content.labels.name}</label>
                <div className="input-wrap">
                  <FiUser className="input-icon" aria-hidden="true" />
                  <input
                    type="text" name="name" id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => markTouched('name')}
                    required disabled={isDisabled}
                  />
                </div>
                {errors.name && <span className="field-error">{content.errors.name}</span>}
              </div>

              <div className={`form-field ${errors.email ? 'has-error' : ''}`} ref={suggestionsRef}>
                <label htmlFor="email">{content.labels.email}</label>
                <div className="input-wrap">
                  <FiMail className="input-icon" aria-hidden="true" />
                  <input
                    type="email" name="email" id="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => markTouched('email')}
                    required disabled={isDisabled} autoComplete="off"
                  />
                </div>
                {errors.email && <span className="field-error">{content.errors.email}</span>}
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
            </motion.div>

            <motion.div className={`form-field ${errors.message ? 'has-error' : ''}`} variants={formItem}>
              <label htmlFor="message">{content.labels.message}</label>
              <div className="input-wrap input-wrap--textarea">
                <FiMessageSquare className="input-icon" aria-hidden="true" />
                <textarea
                  name="message" id="message" rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, MESSAGE_MAX))}
                  onBlur={() => markTouched('message')}
                  required disabled={isDisabled}
                />
              </div>
              <div className="field-meta">
                <span className="field-error">{errors.message ? content.errors.message : ''}</span>
                <span className="char-count">{message.length}/{MESSAGE_MAX}</span>
              </div>
            </motion.div>

            <motion.div className="form-actions" variants={formItem}>
              <span className="form-privacy">
                <FiLock className="form-privacy-icon" aria-hidden="true" />
                {content.privacy}
              </span>

              <button
                type="submit"
                className={`submit-btn ${status}`}
                disabled={isDisabled}
              >
                {status === 'idle' && (
                  <span className="submit-default">
                    {content.button.default}
                    <FiArrowRight className="submit-arrow" />
                  </span>
                )}
                {status === 'sending' && <FiLoader className="spinner-icon" />}
                {status === 'success' && (
                  <span className="success-content">
                    <FiCheck size={20} />
                    {content.button.success}
                  </span>
                )}
                {status === 'error' && <span>{content.error}</span>}
              </button>
            </motion.div>
          </motion.form>
        </div>

      </div>

      {/* Faixa escura — wordmark + barra inferior */}
      <div className="footer-dark">
        <div className="footer-dark-inner">
          <div className="footer-wordmark" aria-hidden="true">
            <img src={logoSrc} alt="" className="footer-wordmark-logo" width="48" height="48" loading="lazy" />
            <span>Eric Nacif</span>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">© {new Date().getFullYear()} Eric Nacif. {content.copyright}</p>
            <div className="footer-bottom-right">
              <span className="footer-loc">
                <FiMapPin size={13} />
                {content.location}
              </span>
              <button type="button" className="footer-top-btn" onClick={scrollToTop}>
                {content.backToTop}
                <FiArrowUp />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
