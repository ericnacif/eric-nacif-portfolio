import React, { useEffect, useState } from 'react'; // useRef e hooks de scroll removidos
import { motion } from 'framer-motion';
import './ProjectCard.css';

const ProjectCard = ({ title, description, contribution, tags, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Bloquear scroll do body quando o modal estiver aberto (apenas mobile)
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      if (isModalOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <>
      <motion.div
        className="project-card"
        whileHover={{ y: -8, boxShadow: "0 10px 20px var(--shadow-color)" }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Imagem otimizada */}
        <img
          src={image}
          alt={title}
          className="project-image"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 100vw, (max-width: 1240px) 50vw, 600px"
          draggable={false}
        />

        <div className="project-info">
          <h3>{title}</h3>

          {/* No desktop mantém descrição e contribuição visíveis; no mobile, escondidos via CSS */}
          <p className="project-description">{description}</p>

          {contribution && contribution.length > 0 && (
            <>
              <h4 className="project-contrib-title">Minha Contribuição:</h4>
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

          {/* Botão só aparece no mobile para abrir modal */}
          <button
            type="button"
            className="show-details-mobile"
            onClick={() => setIsModalOpen(true)}
            aria-haspopup="dialog"
            aria-controls={`project-modal-${title}`}
          >
            Ver detalhes
          </button>
        </div>
      </motion.div>

      {/* Modal - apenas será usado no mobile (o botão só aparece no mobile) */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${title}`}
          id={`project-modal-${title}`}
          onClick={() => setIsModalOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              aria-label="Fechar"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h3 id={`modal-title-${title}`} className="modal-title">{title}</h3>
            <div className="project-tags modal-tags">
              {tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
            {image && (
              <img
                src={image}
                alt={title}
                className="modal-image"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            )}
            {description && <p className="modal-description">{description}</p>}
            {contribution && contribution.length > 0 && (
              <>
                <h4 className="modal-subtitle">Minha Contribuição:</h4>
                <ul className="modal-list">
                  {contribution.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;