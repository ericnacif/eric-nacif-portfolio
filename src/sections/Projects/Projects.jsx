import React, { useState } from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './Projects.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import RedirectLoader from '../../components/RedirectLoader/RedirectLoader';

// Imagens
import certificafeImg from '../../assets/images/project-certificafe.webp';
import engelmigImg from '../../assets/images/project-engelmig.webp';
import monacImg from '../../assets/images/project-monac.jpeg';

const Projects = () => {
  const { language } = useLanguage();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const projectsData = [
    {
      id: "monac",
      image: monacImg,
      url: "https://monacsistemas.netlify.app",
      tags: ["React", "Node.js", "API Rest", "NFe", "SaaS"],
      translations: {
        pt: {
          title: "Sistema de Gestão & NFe - Monac",
          description: "Desenvolvimento integral de um ecossistema SaaS para gestão financeira e emissão de notas fiscais. O projeto conta com uma API robusta em Node.js e uma interface moderna, focando em automação fiscal, relatórios detalhados e alta escalabilidade para o lançamento da marca no mercado.",
          contribution: ["Back-end Node.js.", "Integração NFe.", "Arquitetura SaaS."]
        },
        en: {
          title: "ERP & Invoicing System - Monac",
          description: "Full-cycle development of a SaaS ecosystem for financial management and tax invoicing. The project features a robust Node.js API and a modern interface, focusing on fiscal automation, detailed reporting, and high scalability for the brand's upcoming market launch.",
          contribution: ["Node.js Backend.", "NFe Integration.", "SaaS Architecture."]
        },
        es: {
          title: "Sistema de Gestión y Facturación - Monac",
          description: "Desarrollo integral de un ecosistema SaaS para gestión financiera y facturación. El proyecto cuenta con una API robusta en Node.js y una interfaz moderna, enfocándose en automatización fiscal, informes detallados y alta escalabilidad para el lanzamiento de la marca.",
          contribution: ["Back-end Node.js.", "Integración NFe.", "Arquitectura SaaS."]
        }
      }
    },
    {
      id: "certificafe",
      image: certificafeImg,
      url: "https://certificafe.com.br/",
      tags: ["PHP", "Laravel", "JavaScript", "React Native", "Blade", "API"],
      translations: {
        pt: {
          title: "Sistema Interno - Certificafé",
          description: "Manutenção e otimização do sistema principal da empresa. Foco em estabilidade, performance de aplicação legada e modernização de consultas. O trabalho envolveu refatoração de código crítico e implementação de novas features para suporte às operações diárias.",
          contribution: ["Correção de bugs.", "Otimização SQL.", "Views Blade."]
        },
        en: {
          title: "Internal System - Certificafé",
          description: "Maintenance and optimization of the company's core system. Focused on stability, legacy application performance, and query modernization. Work involved refactoring critical code and implementing new support features for daily operations.",
          contribution: ["Bug fixing.", "SQL optimization.", "Blade views."]
        },
        es: {
          title: "Sistema Interno - Certificafé",
          description: "Mantenimiento y optimización del sistema principal de la empresa. Enfocado en estabilidad, rendimiento de aplicaciones heredadas y modernización de consultas. El trabajo implicó refactorización de código crítico y nuevas características de soporte.",
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
          description: "Colaboração na presença digital e comunicação interna da empresa, participando ativamente em projetos web corporativos. Desenvolvimento de páginas institucionais e manutenção do portal para garantir a comunicação eficiente com stakeholders e público geral.",
          contribution: ["Site WordPress.", "Front-end.", "Campanhas internas."]
        },
        en: {
          title: "Corporate Website - ENGELMIG Energia",
          description: "Collaboration on digital presence and internal communication, actively participating in corporate web projects. Development of institutional pages and portal maintenance to ensure efficient communication with stakeholders and the general public.",
          contribution: ["WordPress site.", "Front-end.", "Internal campaigns."]
        },
        es: {
          title: "Sitio Corporativo - ENGELMIG Energia",
          description: "Colaboración en la presencia digital y comunicación interna de la empresa, participando activamente en proyectos web corporativos. Desarrollo de páginas institucionales y mantenimiento del portal para garantizar comunicación eficiente.",
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

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
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
        <div className="custom-shape-divider-top">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>

        <div className="container relative-z">
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