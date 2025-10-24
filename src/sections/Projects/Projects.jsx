import React from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './Projects.css';
import { motion } from 'framer-motion';

// 1. IMPORTE AS IMAGENS AQUI
// Certifique-se que os nomes dos arquivos estão corretos na sua pasta 'src/assets/'
import certificafeImg from '../../assets/project-certificafe.png';
import engelmigImg from '../../assets/project-engelmig.png';

// --- SEUS PROJETOS ---
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
        image: certificafeImg // 2. USE A VARIÁVEL AQUI
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
        image: engelmigImg // 3. E AQUI
    }
];


const Projects = () => {
    return (
        <section id="projetos" className="container">
            <h2 className="section-title">Projetos</h2>
            <div className="projects-grid">
                {projectsData.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </section>
    );
};

export default Projects;