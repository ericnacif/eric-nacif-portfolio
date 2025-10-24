import React from 'react';
import { motion } from 'framer-motion';
import './ProjectCard.css';
// A LINHA DE IMPORT DO "project-placeholder.png" FOI REMOVIDA DAQUI

const ProjectCard = ({ title, description, contribution, tags, image }) => {
    return (
        <motion.div
            className="project-card"
            whileHover={{ y: -8, boxShadow: "0 10px 20px rgba(0,0,0,0.07)" }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            {/* A lógica '|| projectPlaceholder' foi removida daqui */}
            <img src={image} alt={title} className="project-image" />
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