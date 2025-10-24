import React from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './Projects.css';
import { motion } from 'framer-motion';

// Importe as imagens
import certificafeImg from '../../assets/project-certificafe.png';
import engelmigImg from '../../assets/project-engelmig.png';

const projectsData = [
  { 
    title: "Sistema Interno - Certificafé", 
    description: "Atuação direta na manutenção e otimização do sistema principal da empresa. O foco foi garantir a estabilidade e a performance da aplicação legada, além de modernizar consultas e rotas.",
    contribution: [
        "Correção de bugs e depuração de código legado em PHP e JavaScript.",
        "Manutenção de rotas e otimização de consultas ao banco de dados SQL com Laravel.",
        "Desenvolvimento de views com a template engine Blade."
    ],
    tags: ["PHP", "Laravel", "JavaScript", "Blade", "API"],
    image: certificafeImg
  },
  { 
    title: "Site Institucional - ENGELMIG Energia", 
    description: "Durante o estágio em TI, tive a oportunidade de colaborar com a presença digital e a comunicação interna da empresa, participando ativamente em projetos web e de comunicação.",
    contribution: [
        "Participação ativa no desenvolvimento do site institucional da empresa utilizando WordPress.",
        "Customizações de front-end com HTML, CSS e JavaScript.",
        "Criação de campanhas de comunicação interna."
    ],
    tags: ["WordPress", "HTML", "CSS", "JavaScript"],
    image: engelmigImg
  }
];

// Variantes para animar o container e os itens
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Atraso de 0.2s entre cada card
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const Projects = () => {
  return (
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
        Projetos
      </motion.h2>
      
      <motion.div 
        className="projects-grid"
        variants={containerVariants} // Aplica as variantes do container
      >
        {projectsData.map((project, index) => (
          // Cada ProjectCard é envolvido em um 'motion.div' para o stagger
          <motion.div key={index} variants={itemVariants}>
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Projects;