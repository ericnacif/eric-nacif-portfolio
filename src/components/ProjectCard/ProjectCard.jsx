import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import './ProjectCard.css';

const ProjectCard = ({ title, description, tags, image, url, onClick }) => {
  const cardRef = useRef(null);

  const handleClick = (e) => {
    // Importante: NÃO usar e.preventDefault() aqui para permitir que o link abra.
    // Apenas chamamos a prop onClick se ela existir (ex: para analytics).
    if (onClick) {
      onClick(e);
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
      target="_blank"             // Força a abertura em nova aba (solução principal para mobile)
      rel="noopener noreferrer"   // Segurança necessária ao usar target="_blank"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      className="project-card spotlight-card"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
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