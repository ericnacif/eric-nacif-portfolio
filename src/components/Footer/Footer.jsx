import React, { useState } from 'react';
import './Footer.css';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { SiFigma, SiLinkedin, SiInstagram, SiGithub } from 'react-icons/si';

const Footer = () => {
  const { language } = useLanguage();
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Traduções
  const content = {
    pt: {
      title: "Contato",
      subtitle: "Gostou do meu trabalho? Vamos conversar.",
      placeholders: {
        name: "Seu nome",
        email: "Seu e-mail",
        message: "Sua mensagem"
      },
      button: {
        default: "Enviar Mensagem",
        sending: "Enviando..."
      },
      status: {
        success: "Mensagem enviada com sucesso!",
        error: "Erro ao enviar. Tente novamente."
      }
    },
    en: {
      title: "Contact",
      subtitle: "Liked my work? Let's talk.",
      placeholders: {
        name: "Your name",
        email: "Your email",
        message: "Your message"
      },
      button: {
        default: "Send Message",
        sending: "Sending..."
      },
      status: {
        success: "Message sent successfully!",
        error: "Error sending. Please try again."
      }
    },
    es: {
      title: "Contacto",
      subtitle: "¿Te gustó mi trabajo? Hablemos.",
      placeholders: {
        name: "Tu nombre",
        email: "Tu correo",
        message: "Tu mensaje"
      },
      button: {
        default: "Enviar Mensaje",
        sending: "Enviando..."
      },
      status: {
        success: "¡Mensaje enviado con éxito!",
        error: "Error al enviar. Inténtalo de nuevo."
      }
    }
  };

  const t = content[language] || content.pt;

  const socialLinks = [
    { href: "https://www.linkedin.com/in/eric-nacif-956930324/", icon: <SiLinkedin />, alt: "LinkedIn" },
    { href: "https://github.com/ericnacif", icon: <SiGithub />, alt: "GitHub" },
    { href: "https://www.instagram.com/nacif_/", icon: <SiInstagram />, alt: "Instagram" },
    { href: "https://www.figma.com/@nacif_eric", icon: <SiFigma />, alt: "Figma" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/movpajdd", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus(t.status.success);
        form.reset();
      } else {
        setStatus(t.status.error);
      }
    } catch (error) {
      setStatus(t.status.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contato" className="main-footer">
      <div className="container">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="section-title">{t.title}</h2>
            <p className="footer-subtitle">{t.subtitle}</p>

            <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <input type="text" name="name" placeholder={t.placeholders.name} required disabled={isSubmitting} />
                <input type="email" name="email" placeholder={t.placeholders.email} required disabled={isSubmitting} />
            </div>
            <textarea name="message" placeholder={t.placeholders.message} rows="5" required disabled={isSubmitting}></textarea>

            <button type="submit" disabled={isSubmitting} className="submit-btn">
                {isSubmitting ? t.button.sending : t.button.default}
            </button>

            {status && (
                <p className={`form-status ${status.includes('sucesso') || status.includes('success') || status.includes('éxito') ? 'success' : 'error'}`}>
                {status}
                </p>
            )}
            </form>

            <div className="footer-socials">
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

            <div className="footer-copy">
                <p>© {new Date().getFullYear()} Eric Nacif. {language === 'pt' ? 'Todos os direitos reservados.' : (language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.')}</p>
            </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;