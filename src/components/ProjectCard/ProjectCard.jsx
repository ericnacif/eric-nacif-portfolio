import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import './ProjectCard.css';

const ProjectCard = ({ title, description, tags, image, url, onClick }) => {
  const cardRef = useRef(null);

  const handleClick = (e) => {
    // 1. Previne o comportamento padrão do HTML para evitar conflitos no mobile
    e.preventDefault();

    // 2. Executa função de analytics/log se houver
    if (onClick) {
      onClick(e);
    }

    // 3. Força a abertura via JavaScript (Resolve o problema de não abrir no mobile)
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
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
      whileTap={{ scale: 0.98 }} // Adiciona feedback visual ao tocar no celular
      transition={{ type: 'spring', stiffness: 300 }}
      style={{ cursor: 'pointer', touchAction: 'manipulation' }} // Melhoria para toque
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