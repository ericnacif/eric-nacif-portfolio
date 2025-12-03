import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import './ProjectCard.css';

const ProjectCard = ({ title, description, tags, image, url, onClick }) => {
  const cardRef = useRef(null);

  const handleClick = (e) => {
    // Verifica se é dispositivo móvel pela largura da tela
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // NO MOBILE: Ignora o redirect animado e abre o link imediatamente
      // Isso resolve o problema de não abrir no celular
      if (url) {
        e.preventDefault();
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } else {
      // NO COMPUTADOR: Mantém o comportamento original (Redirect com animação)
      if (onClick) {
        e.preventDefault();
        onClick(e);
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.a
      ref={cardRef}
      href={url}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      className="project-card spotlight-card"
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{ cursor: 'pointer', touchAction: 'manipulation' }}
    >
      <div className="spotlight-overlay" />

      <div className="card-image-wrapper">
        <img src={image} alt={title} className="project-image" loading="lazy" />
        <div className="card-overlay">
          <FiExternalLink size={32} />
        </div>
      </div>

      <div className="project-info">
        <div className="project-header">
          <h3>
            {title}
            <FiExternalLink className="header-link-icon" />
          </h3>
        </div>

        <p className="project-description">{description}</p>

        <div className="project-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

export default ProjectCard;