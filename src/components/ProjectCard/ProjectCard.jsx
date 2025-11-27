import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProjectCard.css';
import { FaTimes } from 'react-icons/fa';

const ProjectCard = ({ title, description, contribution, tags, image, labels }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  // Bloqueio de scroll simples
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  const open = () => setIsModalOpen(true);
  const close = () => setIsModalOpen(false);

  return (
    <>
      <motion.div
        className="project-card"
        whileHover={{ y: -8, borderColor: 'var(--accent-color)' }}
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
        
          {/* Botão Mobile (e Desktop se quiser ver contribuições detalhadas) */}
          <button
            type="button"
            className="details-btn"
            onClick={open}
          >
            {labels.details}
          </button>
        </div>
      </motion.div>

      {/* Modal Minimalista */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay" onClick={close}>
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <button className="modal-close" onClick={close}><FaTimes /></button>
              
              <img src={image} alt={title} className="modal-image" />
              
              <div className="modal-body">
                <h3>{title}</h3>
                <p className="modal-description">{description}</p>
                
                {contribution && (
                    <div className="modal-contribution">
                        <h4>{labels.contribution}</h4>
                        <ul>
                            {contribution.map((item, idx) => <li key={idx}>{item}</li>)}
                        </ul>
                    </div>
                )}

                <div className="project-tags modal-tags">
                  {tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;