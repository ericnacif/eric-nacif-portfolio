import { useState } from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './Projects.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import RedirectLoader from '../../components/RedirectLoader/RedirectLoader';

// Imagens
import certificafeImg from '../../assets/images/project-certificafe.webp';
import engelmigImg from '../../assets/images/project-engelmig.webp';

const Projects = () => {
  const { language } = useLanguage();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const projectsData = [
    {
      id: "certificafe",
      image: certificafeImg,
      url: "https://certificafe.com.br/",
      tags: ["PHP", "Laravel", "JavaScript", "React Native", "Blade", "API"],
      translations: {
        pt: {
          title: "Sistema Interno - Certificafé",
          description: "Manutenção e otimização do sistema principal. Foco em estabilidade, performance de aplicação legada e modernização de consultas.",
          contribution: ["Correção de bugs.", "Otimização SQL.", "Views Blade."]
        },
        en: {
          title: "Internal System - Certificafé",
          description: "Maintenance and optimization of the core system. Focused on stability, legacy application performance, and query modernization.",
          contribution: ["Bug fixing.", "SQL optimization.", "Blade views."]
        },
        es: {
          title: "Sistema Interno - Certificafé",
          description: "Mantenimiento y optimización del sistema principal. Enfocado en estabilidad, rendimiento de aplicaciones heredadas y modernización de consultas.",
          contribution: ["Corrección de errores.", "Optimización SQL.", "Vistas Blade."]
        }
      }
    },
    {
      id: "engelmig",
      image: engelmigImg,
      url: "https://www.engelmig.com.br/",
      tags: ["WordPress", "HTML", "CSS", "JavaScript"],
      translations: {
        pt: {
          title: "Site Institucional - ENGELMIG Energia",
          description: "Colaboração na presença digital e comunicação interna da empresa, participando ativamente em projetos web.",
          contribution: ["Site WordPress.", "Front-end.", "Campanhas internas."]
        },
        en: {
          title: "Corporate Website - ENGELMIG Energia",
          description: "Collaboration on digital presence and internal communication, actively participating in web projects.",
          contribution: ["WordPress site.", "Front-end.", "Internal campaigns."]
        },
        es: {
          title: "Sitio Corporativo - ENGELMIG Energia",
          description: "Colaboración en la presencia digital y comunicación interna, participando activamente en proyectos web.",
          contribution: ["Sitio WordPress.", "Front-end.", "Campañas internas."]
        }
      }
    }
  ];

  const sectionTitle = {
    pt: "Projetos Selecionados",
    en: "Selected Projects",
    es: "Proyectos Seleccionados"
  };

  const redirectMessages = {
    pt: "Redirecionando...",
    en: "Redirecting...",
    es: "Redireccionando..."
  };

  const handleProjectClick = (e, url) => {
    e.preventDefault();
    setIsRedirecting(true);
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setIsRedirecting(false);
    }, 2000);
  };

  // --- VARIANTES PARA EFEITO CASCATA DO TÍTULO (CORRIGIDO) ---
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.04 }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2 } // Sai rápido para não sobrepor
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <>
      <AnimatePresence>
        {isRedirecting && (
          <RedirectLoader text={redirectMessages[language] || redirectMessages.pt} />
        )}
      </AnimatePresence>

      <section id="projetos" className="projects-section-blue">

        {/* ONDA SUPERIOR */}
        <div className="custom-shape-divider-top">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>

        <div className="container relative-z">

          {/* TÍTULO COM EFEITO CASCATA (CORRIGIDO COM MODE WAIT) */}
          <AnimatePresence mode="wait">
            <motion.h2
                className="section-title white-title"
                key={language}
                variants={textContainerVariants}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.5 }}
            >
                {Array.from(sectionTitle[language] || sectionTitle.pt).map((char, index) => (
                    <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </motion.h2>
          </AnimatePresence>

          <motion.div
            className="projects-grid"
            key={language}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {projectsData.map((project, index) => {
              const currentLangData = project.translations[language] || project.translations.pt;

              return (
                <motion.div key={index} variants={itemVariants} className="project-card-wrapper">
                  <ProjectCard
                    {...currentLangData}
                    image={project.image}
                    tags={project.tags}
                    url={project.url}
                    onClick={(e) => handleProjectClick(e, project.url)}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ONDA INFERIOR */}
        <div className="custom-shape-divider-bottom">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>

      </section>
    </>
  );
};

export default Projects;