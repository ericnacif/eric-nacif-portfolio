import React, { useState } from 'react';
import './Footer.css';
import { motion } from 'framer-motion';

// --- VERIFY THESE IMPORTS ---
// Should be default imports like this
import FigmaIcon from '../../assets/icons/figma.svg';
import LinkedinIcon from '../../assets/icons/linkedin.svg';
import InstagramIcon from '../../assets/icons/instagram.svg';
import GithubIcon from '../../assets/icons/github.svg';
// --- END VERIFICATION ---

const socialLinks = [
  { href: "https://linkedin.com/in/eric-nacif", IconComponent: LinkedinIcon, alt: "LinkedIn" },
  { href: "https://github.com/ericnacif", IconComponent: GithubIcon, alt: "GitHub" },
  { href: "#", IconComponent: InstagramIcon, alt: "Instagram" },
  { href: "#", IconComponent: FigmaIcon, alt: "Figma" },
];

// ... (Rest of the Footer component remains the same) ...
const Footer = () => {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Enviando...");

    const form = e.target;
    const data = new FormData(form);

    try {
      // REMEMBER TO PUT YOUR FORMSPREE ID HERE
      const response = await fetch("https://formspree.io/f/movpajdd", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("Mensagem enviada com sucesso!");
        form.reset();
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.errors?.map(e => e.message).join(', ') || "Erro desconhecido.";
        setStatus(`Erro ao enviar: ${errorMessage}`);
      }
    } catch (error) {
      setStatus("Erro de rede. Verifique sua conexão e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <footer id="contato" className="container main-footer">
      <h2 className="section-title">Contato</h2>

      <motion.form
        className="contact-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <p>Gostou do meu trabalho? Vamos conversar.</p>
        <div className="form-row">
          <input type="text" name="name" placeholder="Seu nome" required disabled={isSubmitting} />
          <input type="email" name="email" placeholder="Seu e-mail" required disabled={isSubmitting} />
        </div>
        <textarea name="message" placeholder="Sua mensagem" rows="5" required disabled={isSubmitting}></textarea>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>

        {status && <p className={`form-status ${status.includes('Erro') ? 'error' : 'success'}`}>{status}</p>}
      </motion.form>

      <div className="social-icons">
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, opacity: 0.8 }}
            transition={{ type: 'spring', stiffness: 400 }}
            aria-label={link.alt}
          >
            {/* --- CORREÇÃO AQUI --- */}
            <img
              src={link.IconComponent}
              alt={link.alt}
              className="social-icon-svg"
            />
            {/* --- FIM DA CORREÇÃO --- */}
          </motion.a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;