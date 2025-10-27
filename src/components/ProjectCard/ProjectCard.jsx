import React from 'react'; // useRef e hooks de scroll removidos
import { motion } from 'framer-motion';
import './ProjectCard.css';

const ProjectCard = ({ title, description, contribution, tags, image }) => {
  // Referência e hooks de scroll removidos

  return (
    // A ref foi removida do motion.div
    <motion.div
      className="project-card"
      whileHover={{ y: -8, boxShadow: "0 10px 20px var(--shadow-color)" }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Wrapper da imagem não é mais necessário */}
      {/* Imagem agora é uma tag <img> normal com otimizações de performance */}
      <img
        src={image}
        alt={title}
        className="project-image"
        loading="lazy"
        decoding="async"
        sizes="(max-width: 768px) 100vw, (max-width: 1240px) 50vw, 600px"
        draggable={false}
        style={{ width: '100%', height: 'auto', aspectRatio: '16 / 9', objectFit: 'cover' }}
      />

      <div className="project-info">
        <h3>{title}</h3>
        <p>{description}</p>

        {contribution && contribution.length > 0 && (
          <>
            <h4>Minha Contribuição:</h4>
            <ul className="contribution-list">
              {contribution.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        )}

        <div className="project-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;