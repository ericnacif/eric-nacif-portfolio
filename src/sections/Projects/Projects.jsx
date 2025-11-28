import React, { useState } from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './Projects.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import RedirectLoader from '../../components/RedirectLoader/RedirectLoader';

// Imagens
import certificafeImg from '../../assets/images/project-certificafe.png';
import engelmigImg from '../../assets/images/project-engelmig.png';

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

  return (
    <>
      <AnimatePresence>
        {isRedirecting && (
          <RedirectLoader text={redirectMessages[language] || redirectMessages.pt} />
        )}
      </AnimatePresence>

      <motion.section
        id="projetos"
        className="container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <AnimatePresence mode="wait">
          <motion.h2
            className="section-title"
            key={language}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {sectionTitle[language] || sectionTitle.pt}
          </motion.h2>
        </AnimatePresence>

        {/* GRUPO DE CARDS COM TRANSIÇÃO SUAVE */}
        <AnimatePresence mode="wait">
          <motion.div
            className="projects-grid"
            key={language} // Troca todo o grid suavemente ao mudar língua
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {projectsData.map((project, index) => {
              const currentLangData = project.translations[language] || project.translations.pt;

              return (
                <div key={index} className="project-card-wrapper">
                  <ProjectCard
                    {...currentLangData}
                    image={project.image}
                    tags={project.tags}
                    url={project.url}
                    onClick={(e) => handleProjectClick(e, project.url)}
                  />
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </motion.section>
    </>
  );
};

export default Projects;