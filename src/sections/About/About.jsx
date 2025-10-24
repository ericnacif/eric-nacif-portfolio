import React from 'react';
import SkillCard from '../../components/SkillCard/SkillCard';
import ExperienceList from '../../components/ExperienceList/ExperienceList';
import './About.css';
import { FaPaintBrush, FaCode, FaReact, FaWordpress } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Dados com base no currículo
const personalInfo = {
    name: "Eric Nacif",
    bio: `Desenvolvedor Full-Stack com experiência em PHP,
     Laravel e JavaScript na criação de sistemas web.
      Com vivência prática no desenvolvimento de interfaces responsivas e APIs,
       busco ativamente uma oportunidade para entregar soluções tecnológicas eficientes
        e colaborar com equipes de alta performance.`,
    links: {
        instagram: "https://instagram.com/nacif_",
        github: "https://github.com/ericnacif",
        email: "mailto:naciferic7@gmail.com"
    }
};

const skillsData = [
    { icon: <FaPaintBrush />, title: "Interface & Design", description: "Briefing, wireframe, UI, UX e branding." },
    { icon: <FaCode />, title: "HTML & CSS", description: "Responsive websites with fast loading." },
    { icon: <FaReact />, title: "React.js", description: "Build your system with modernjs." },
    { icon: <FaWordpress />, title: "WordPress", description: "Create your e-commerce and blog with PHP." }
];

const experienceListsData = {
    hadExperiences: {
        title: "Tenho experiência com:",
        items: ["MySQL Database", "GIT, GitHub", "PHP", "Figma, Photoshop", "CSS3", "Laravel Framework", "JavaScript", "WordPress CMS"]
    },
    haveYearsExperience: {
        title: "Tenho anos de experiência com:",
        items: ["HTML5", "CSS3", "WordPress", "JavaScript", "Elementor", "Pacote Adobe", "Criação de sites"]
    },
    workAndStudy: {
        title: "Trabalho e estudo sobre:",
        items: ["React.js", "Vue.js", "JavaScript", "TypeScript", "Node.js", "API RESTful", "User Experience"]
    }
};


// Variantes de animação para containers
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // Anima os filhos em sequência
        },
    },
};

// Variantes de animação para itens filhos
const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
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