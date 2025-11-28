import React from 'react';
import { motion } from 'framer-motion';
import './ProjectCard.css';

const ProjectCard = ({ title, description, tags, image }) => {

  return (
    <>
      <motion.div
        className="project-card"
        whileHover={{ y: -8 }} // Elevação no hover
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="card-image-wrapper">
          <img src={image} alt={title} className="project-image" loading="lazy" />
        </div>

        <div className="project-info">
          <div className="project-header">
            <h3>{title}</h3>
          </div>

          <p className="project-description">{description}</p>

          <div className="project-tags">
            {tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProjectCard;