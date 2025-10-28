import React from 'react';
import SkillCard from '../../components/SkillCard/SkillCard';
import ExperienceList from '../../components/ExperienceList/ExperienceList';
import './About.css';
import { motion } from 'framer-motion';
import { SiLaravel, SiReact, SiPostgresql, SiTailwindcss } from 'react-icons/si';

// Dados com base no currículo
const personalInfo = {
  name: "Eric Nacif",
  bio: `Desenvolvedor full stack em início de carreira, com base sólida em PHP/Laravel e JavaScript.
   Tenho prática em criar APIs REST, interfaces responsivas em React e modelagem de dados com MySQL/Postgre.
   Busco uma oportunidade para contribuir em equipes que valorizam código limpo, performance e aprendizado contínuo.`,
  links: {
    instagram: "https://www.instagram.com/nacif_/",
    github: "https://github.com/ericnacif",
    linkedin: "https://www.linkedin.com/in/eric-nacif-956930324/",
    figma: "https://www.figma.com/@nacif_eric",
    email: "mailto:naciferic7@gmail.com"
  }
};

// Cards de skills nas categorias solicitadas
const skillsData = [
  {
    icon: <SiLaravel />,
    title: "Laravel, PHP & Blade",
    description: "APIs REST com Laravel, Blade, Eloquent, autenticação e performance em PHP."
  },
  {
    icon: <SiReact />,
    title: "React, React Native & Node.js",
    description: "SPA com React, apps móveis com React Native e back-end/SSR com Node.js."
  },
  {
    icon: <SiPostgresql />,
    title: "Banco de Dados (SQL, Postgre & Firebase)",
    description: "Modelagem e queries SQL, PostgreSQL; Realtime/Auth com Firebase."
  },
  {
    icon: <SiTailwindcss />,
    title: "Tailwind, CSS3 & Bootstrap",
    description: "CSS utilitário (Tailwind), base moderna com CSS3 e componentes com Bootstrap."
  }
];

// Dados das listas de experiência
const experienceListsData = {
  hadExperiences: {
    title: "Experiências com:",
    items: ["SQL", "GIT, GitHub", "PHP", "Figma", "CSS", "Laravel", "JavaScript", "HTML5"]
  },
  haveYearsExperience: {
    title: "Anos de Experiência com:",
    items: ["HTML5", "CSS3", "WordPress, Elementor", "JavaScript", "Pacote Adobe", "Interface de Usuário"]
  },
  workAndStudy: {
    title: "Estudo & Prática:",
    items: ["React.js", "Next.js", "React Native", "TypeScript", "Node.js", "API RESTful", "PostgreSQL", "MongoDB", "Tailwind CSS"]
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
            <a href={personalInfo.links.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN</a>
            <a href={personalInfo.links.figma} target="_blank" rel="noopener noreferrer">FIGMA</a>
            <a href={personalInfo.links.email}>EMAIL</a>
          </div>
        </motion.div>
      </div>

      {/* GRID DE SKILLS */}
      <motion.div
        className="skills-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skillsData.map((skill) => (
          <motion.div key={skill.title} variants={itemVariants}>
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