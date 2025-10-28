import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './ProjectCard.css';

const ProjectCard = ({ title, description, contribution, tags, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const previouslyFocusedElement = useRef(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!isModalOpen) return;

    previouslyFocusedElement.current = document.activeElement;

    // Freeze scroll (iOS/Android/Desktop)
    scrollYRef.current = window.scrollY;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';

    // Bloquear gestos de fundo
    const prevent = (e) => e.preventDefault();
    document.addEventListener('touchmove', prevent, { passive: false });

    // Foco inicial
    const closeBtn = modalRef.current?.querySelector('.modal-close');
    closeBtn?.focus();

    // Trap de foco + ESC
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsModalOpen(false);
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchmove', prevent);

      // Restore scroll
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollYRef.current);

      previouslyFocusedElement.current && previouslyFocusedElement.current.focus?.();
    };
  }, [isModalOpen]);

  const open = () => setIsModalOpen(true);
  const close = () => setIsModalOpen(false);

  // Fechar ao clicar/tocar fora
  const handleOverlayPointerDown = () => close();
  const stopPropagation = (e) => e.stopPropagation();

  return (
    <>
      <motion.div
        className="project-card"
        whileHover={{ y: -8, boxShadow: "0 10px 20px var(--shadow-color)" }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
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

          {/* Desktop: descrição visível; Mobile: oculta via CSS */}
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

          <button
            type="button"
            className="show-details-mobile"
            onClick={open}
            aria-haspopup="dialog"
            aria-controls={`project-modal-${title}`}
          >
            Ver detalhes
          </button>
        </div>
      </motion.div>

      {isModalOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${title}`}
          id={`project-modal-${title}`}
          onPointerDown={handleOverlayPointerDown}
        >
          <div
            className="modal-content"
            onPointerDown={stopPropagation}
            ref={modalRef}
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Fechar"
              onClick={close}
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