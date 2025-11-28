import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import './ProjectCard.css';

const ProjectCard = ({ title, description, tags, image, url, onClick }) => {

  // Função interna para lidar com o clique
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault(); // Impede o link padrão
      onClick(e);
    }
  };

  return (
    <motion.a
      href={url}
      onClick={handleClick} // Usa a função interna
      className="project-card"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* ... (resto do código igual) ... */}
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