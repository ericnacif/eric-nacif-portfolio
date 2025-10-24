import React from 'react';
import SkillCard from '../../components/SkillCard/SkillCard';
import ExperienceList from '../../components/ExperienceList/ExperienceList';
import './About.css';
import { FaPaintBrush, FaCode, FaReact, FaWordpress } from 'react-icons/fa'; // Ícones de volta
import { motion } from 'framer-motion';

// Dados com base no currículo
const personalInfo = {
  name: "Eric Nacif",
  bio: `Desenvolvedor Full-Stack com experiência em PHP, Laravel e JavaScript na criação de sistemas web. Com vivência prática no desenvolvimento de interfaces responsivas e APIs, busco ativamente uma oportunidade para entregar soluções tecnológicas eficientes e colaborar com equipes de alta performance.`,
  links: {
    instagram: "https://instagram.com/nacif_",
    github: "https://github.com/ericnacif",
    email: "mailto:naciferic7@gmail.com"
  }
};

// DADOS DE SKILLS (OS 4 CARDS) REVERTIDOS
const skillsData = [
    { icon: <FaPaintBrush />, title: "Interface & Design", description: "Briefing, wireframe, UI, UX e branding." },
    { icon: <FaCode />, title: "HTML & CSS", description: "Responsive websites with fast loading." },
    { icon: <FaReact />, title: "React.js", description: "Build your system with modernjs." },
    { icon: <FaWordpress />, title: "WordPress", description: "Create your e-commerce and blog with PHP." }
];

// Dados das listas de experiência
const experienceListsData = {
  hadExperiences: {
    title: "Experiências com",
    items: ["Firebase Database", "MySQL Database", "GIT, GitHub, Bitbucket", "Coding PHP", "Figma, Adobe XD, Sketch", "CSS Preprocessors", "Digital Marketing", "Coding Python (Django)"]
  },
  haveYearsExperience: {
    title: "Experiência de Anos com",
    items: ["Coding HTML5", "Coding CSS3", "Coding WordPress", "Coding JavaScript", "Using Elementor", "Using Adobe Package", "Creating Brand and Logo", "Creating User Interface"]
  },
  workAndStudy: {
    title: "Estudo & Pratico",
    items: ["Coding React.js", "Coding CSS3", "Coding JavaScript", "Studying TypeScript", "Studying Node.js basics", "Studying API RESTful", "Studying User Experience"]
  }
};


// Variantes de animação
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const About = () => {
  return (
    <section id="sobre" className="container about-section">
      <div className="about-header-content">
        <h2 className="section-title">Sobre mim</h2>
        <motion.div
          className="about-bio"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h3>{personalInfo.name}</h3>
          <p>{personalInfo.bio}</p>
          <div className="about-links">
            <a href={personalInfo.links.instagram} target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
            <a href={personalInfo.links.github} target="_blank" rel="noopener noreferrer">GITHUB</a>
            <a href={personalInfo.links.email}>EMAIL</a>
          </div>
        </motion.div>
      </div>

      {/* GRID DE SKILLS REVERTIDO */}
      <motion.div
        className="skills-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skillsData.map((skill, index) => (
          <motion.div key={index} variants={itemVariants}>
            <SkillCard {...skill} />
          </motion.div>
        ))}
      </motion.div>

      {/* Grid de listas de experiência */}
      <motion.div
        className="experience-lists-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={itemVariants}>
          <ExperienceList {...experienceListsData.hadExperiences} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ExperienceList {...experienceListsData.haveYearsExperience} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ExperienceList {...experienceListsData.workAndStudy} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;