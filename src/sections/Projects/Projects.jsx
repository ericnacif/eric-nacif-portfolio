import React, { useState } from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './Projects.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import RedirectLoader from '../../components/RedirectLoader/RedirectLoader'; // <--- Import Novo

// Imagens
import certificafeImg from '../../assets/images/project-certificafe.png';
import engelmigImg from '../../assets/images/project-engelmig.png';

const Projects = () => {
  const { language } = useLanguage();

  // Estado para controlar o Loading de Redirecionamento
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
          contribution: [
            "Correção de bugs em PHP e JavaScript.",
            "Otimização de consultas SQL com Laravel.",
            "Desenvolvimento de views com Blade."
          ]
        },
        en: {
          title: "Internal System - Certificafé",
          description: "Maintenance and optimization of the core system. Focused on stability, legacy application performance, and query modernization.",
          contribution: [
            "Bug fixing in PHP and JavaScript.",
            "SQL query optimization with Laravel.",
            "View development using Blade."
          ]
        },
        es: {
          title: "Sistema Interno - Certificafé",
          description: "Mantenimiento y optimización del sistema principal. Enfocado en estabilidad, rendimiento de aplicaciones heredadas y modernización de consultas.",
          contribution: [
            "Corrección de errores en PHP y JavaScript.",
            "Optimización de consultas SQL con Laravel.",
            "Desarrollo de vistas con Blade."
          ]
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
          contribution: [
            "Desenvolvimento do site institucional (WordPress).",
            "Customizações de front-end.",
            "Criação de campanhas internas."
          ]
        },
        en: {
          title: "Corporate Website - ENGELMIG Energia",
          description: "Collaboration on digital presence and internal communication, actively participating in web projects.",
          contribution: [
            "Corporate website development (WordPress).",
            "Front-end customizations.",
            "Internal campaign creation."
          ]
        },
        es: {
          title: "Sitio Corporativo - ENGELMIG Energia",
          description: "Colaboración en la presencia digital y comunicación interna, participando activamente en proyectos web.",
          contribution: [
            "Desarrollo del sitio corporativo (WordPress).",
            "Personalizaciones de front-end.",
            "Creación de campañas internas."
          ]
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

  // Função que intercepta o clique e mostra o loader
  const handleProjectClick = (e, url) => {
    e.preventDefault(); // Impede abrir o link imediatamente
    setIsRedirecting(true); // Mostra a tela branca com logo

    // Espera 2 segundos e abre o link
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setIsRedirecting(false); // Esconde a tela
    }, 2000);
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
      {/* Componente de Loading Condicional */}
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
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          {sectionTitle[language] || sectionTitle.pt}
        </motion.h2>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
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
                  // Passamos a função de clique customizada
                  onClick={(e) => handleProjectClick(e, project.url)}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>
    </>
  );
};

export default Projects;