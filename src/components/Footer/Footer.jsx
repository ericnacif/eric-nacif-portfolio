import React, { useState, useEffect, useRef } from 'react';
import './Footer.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/i18n/translations';
import { SiLinkedin, SiInstagram, SiGithub } from 'react-icons/si';
import {
  FiLoader, FiCheck, FiMapPin, FiArrowUpRight, FiArrowUp, FiArrowRight,
  FiMail, FiClock, FiLock,
} from 'react-icons/fi';

const MESSAGE_MAX = 600;
const CONTACT_ENDPOINT = '/api/contato';
const FORMSPREE_FALLBACK = 'https://formspree.io/f/movpajdd';

const Footer = () => {
  const { t, language } = useLanguage();
  const content = t.footer;
  const phoneDisplay = language === 'pt' ? '(33) 99708-8999' : '+55 (33) 99708-8999';
  const locationDisplay = language === 'pt' ? 'Brasil - MG' : 'Brazil';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [touched, setTouched] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestionsRef = useRef(null);
  const honeypotRef = useRef(null);
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

  const sendViaBackend = async () => {
    const res = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        message,
        website: honeypotRef.current?.value || '',
      }),
    });
    if (!res.ok) return false;
    const data = await res.json().catch(() => ({}));
    return data.ok === true;
  };

  const sendViaFormspree = async () => {
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('message', message);
    const res = await fetch(FORMSPREE_FALLBACK, {
      method: 'POST', body: data, headers: { Accept: 'application/json' },
    });
    return res.ok;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    let delivered = false;
    try {
      delivered = await sendViaBackend();
    } catch {
      delivered = false;
    }

    // Fallback: usa o Formspree caso o backend novo falhe ou esteja indisponível (ex.: dev local sem Netlify).
    if (!delivered) {
      try {
        delivered = await sendViaFormspree();
      } catch {
        delivered = false;
      }
    }

    if (delivered) {
      setStatus('success');
      setName(''); setEmail(''); setMessage(content.defaultMessage); setTouched({});
      setTimeout(() => setStatus('idle'), 3500);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
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
    <>
      <section id="contato" className="cta-section">
        <div className="footer-inner">

          <div className="footer-top">
          {/* Lead — contexto + colunas de links */}
          <div className="footer-lead">
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
            {/* Honeypot anti-spam: invisível para usuários, preenchido só por bots */}
            <input
              ref={honeypotRef}
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
            />

            <motion.div className="form-head" variants={formItem}>
              <h3 className="form-title">{content.formTitle}</h3>
              <p className="form-subtitle">{content.subtitle}</p>
            </motion.div>

            <motion.div className="form-row" variants={formItem}>
              <div className={`form-field ${errors.name ? 'has-error' : ''}`}>
                <label htmlFor="name">{content.labels.name}</label>
                <input
                  type="text" name="name" id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => markTouched('name')}
                  required disabled={isDisabled}
                />
                {errors.name && <span className="field-error">{content.errors.name}</span>}
              </div>

              <div className={`form-field ${errors.email ? 'has-error' : ''}`} ref={suggestionsRef}>
                <label htmlFor="email">{content.labels.email}</label>
                <input
                  type="email" name="email" id="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => markTouched('email')}
                  required disabled={isDisabled} autoComplete="off"
                />
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
              <textarea
                name="message" id="message" rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, MESSAGE_MAX))}
                onBlur={() => markTouched('message')}
                required disabled={isDisabled}
              />
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
      </section>

      {/* ── Footer (faixa azul, wordmark gigante estilo assinatura) ── */}
      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="site-footer-top">
            <div className="site-footer-brand">
              <a
                href="#home"
                className="site-footer-logo"
                onClick={(e) => handleNav(e, "home")}
                aria-label="Eric Nacif"
              >
                <img src="/logo-gray.webp" alt="Eric Nacif" width="46" height="46" loading="lazy" />
              </a>

              <div className="site-footer-contact">
                <span className="site-footer-loc">{locationDisplay}</span>
                <a href="tel:+5533997088999" className="site-footer-contact-link">{phoneDisplay}</a>
                <a href="mailto:naciferic7@gmail.com" className="site-footer-contact-link">naciferic7@gmail.com</a>
              </div>
            </div>

            <nav className="site-footer-cols" aria-label="Footer">
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
            </nav>
          </div>

          <div className="site-footer-meta">
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

        <svg
          className="site-footer-wordmark"
          viewBox="0 0 1000 190"
          preserveAspectRatio="xMidYMax meet"
          aria-hidden="true"
        >
          <text
            x="500"
            y="168"
            textAnchor="middle"
            textLength="945"
            lengthAdjust="spacingAndGlyphs"
          >
            naciferic
          </text>
        </svg>
      </footer>
    </>
  );
};

export default Footer;
