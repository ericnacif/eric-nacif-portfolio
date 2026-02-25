import React, { useRef, useState } from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './Projects.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import RedirectLoader from '../../components/RedirectLoader/RedirectLoader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import certificafeImg from '../../assets/images/project-certificafe.webp';
import engelmigImg from '../../assets/images/project-engelmig.png';
import monacImg from '../../assets/images/project-monac.png';
import okanImg from '../../assets/images/project-okan.png';
import murkeImg from '../../assets/images/project-murke.png';

const projectsData = [
  {
    id: 'okan', image: okanImg, url: 'https://okancontabilidade.com',
    tags: ['React', 'TypeScript', 'Next.js', 'Responsive'],
    translations: {
      pt: { title: 'OKAN Contabilidade', description: 'Site institucional moderno com design profissional, foco em conversão e performance otimizada.' },
      en: { title: 'OKAN Contabilidade', description: 'Modern institutional website with professional design, focused on conversion and optimized performance.' },
      es: { title: 'OKAN Contabilidade', description: 'Sitio institucional moderno con diseño profesional, enfocado en conversión y rendimiento optimizado.' },
    },
  },
  {
    id: 'murke',
    image: murkeImg,
    url: 'https://murke.netlify.app',
    tags: ['Branding', 'UI Design', 'React', 'Framer Motion'],
    translations: {
      pt: {
        title: 'Murke',
        description:
          'Projeto de branding e presença digital para estúdio criativo. Identidade visual autoral com direção estética marcante e interface orientada a conceito.',
      },
      en: {
        title: 'Murke',
        description:
          'Branding and digital presence project for a creative studio. Authorial visual identity with bold aesthetic direction and concept-driven interface.',
      },
      es: {
        title: 'Murke',
        description:
          'Proyecto de branding y presencia digital para estudio creativo. Identidad visual autoral con fuerte dirección estética e interfaz conceptual.',
      },
    },
  },
  {
    id: 'monac', image: monacImg, url: 'https://monacsistemas.netlify.app',
    tags: ['React', 'Node.js', 'MongoDB', 'REST API'],
    translations: {
      pt: { title: 'MONAC Sistemas', description: 'Plataforma SaaS para gestão empresarial e emissão fiscal. Arquitetura escalável com API REST robusta.' },
      en: { title: 'MONAC Sistemas', description: 'SaaS platform for business management and tax invoicing. Scalable architecture with robust REST API.' },
      es: { title: 'MONAC Sistemas', description: 'Plataforma SaaS para gestión empresarial y emisión fiscal. Arquitectura escalable con API REST robusta.' },
    },
  },
  {
    id: 'certificafe', image: certificafeImg, url: 'https://certificafe.com.br/',
    tags: ['PHP', 'Laravel', 'MySQL', 'Blade'],
    translations: {
      pt: { title: 'Certificafé', description: 'Sistema corporativo para certificação de café. Manutenção de aplicação legacy com foco em estabilidade e performance.' },
      en: { title: 'Certificafé', description: 'Corporate system for coffee certification. Legacy application maintenance focused on stability and performance.' },
      es: { title: 'Certificafé', description: 'Sistema corporativo para certificación de café. Mantenimiento de aplicación heredada enfocada en estabilidad.' },
    },
  },
  {
    id: 'engelmig', image: engelmigImg, url: 'https://www.engelmig.com.br/',
    tags: ['WordPress', 'JavaScript', 'SEO', 'UX/UI'],
    translations: {
      pt: { title: 'Engelmig Energia', description: 'Portal corporativo do setor energético. Desenvolvimento de páginas institucionais e otimização SEO.' },
      en: { title: 'Engelmig Energia', description: 'Energy sector corporate portal. Development of institutional pages and SEO optimization.' },
      es: { title: 'Engelmig Energia', description: 'Portal corporativo del sector energético. Desarrollo de páginas institucionales y optimización SEO.' },
    },
  },
];

const sectionTitles = { pt: 'Projetos em Destaque', en: 'Featured Projects', es: 'Proyectos Destacados' };
const redirectMessages = { pt: 'Redirecionando...', en: 'Redirecting...', es: 'Redireccionando...' };

const Projects = () => {
  const { language } = useLanguage();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const swiperRef = useRef(null);

  const handleProjectClick = (e, url) => {
    e.preventDefault();
    setIsRedirecting(true);
    setTimeout(() => { window.open(url, '_blank', 'noopener,noreferrer'); setIsRedirecting(false); }, 1800);
  };

  const goNext = () => swiperRef.current?.swiper?.slideNext();
  const goPrev = () => swiperRef.current?.swiper?.slidePrev();

  return (
    <>
      <AnimatePresence>
        {isRedirecting && <RedirectLoader text={redirectMessages[language] || redirectMessages.pt} />}
      </AnimatePresence>

      <section id="projetos" className="projects-section">

        <div className="custom-shape-divider-top">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill" />
          </svg>
        </div>

        <div className="projects-container">

          {/* Header da seção */}
          <motion.div
            className="projects-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <span className="projects-eyebrow">02 — Projetos</span>
            <AnimatePresence mode="wait">
              <motion.h2
                className="projects-title"
                key={language}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                {sectionTitles[language] || sectionTitles.pt}
              </motion.h2>
            </AnimatePresence>
          </motion.div>

          {/* Carrossel */}
          <motion.div
            className="carousel-wrapper"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Swiper
              ref={swiperRef}
              modules={[Pagination, A11y, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{
                clickable: true,
                el: '.swiper-custom-pagination',
                bulletClass: 'swiper-custom-bullet',
                bulletActiveClass: 'swiper-custom-bullet--active',
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop
              grabCursor
              speed={500}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 20 },
                1100: { slidesPerView: 3, spaceBetween: 24 },
              }}
              className="projects-swiper"
            >
              {projectsData.map((project) => {
                const lang = project.translations[language] || project.translations.pt;
                return (
                  <SwiperSlide key={project.id}>
                    <ProjectCard
                      {...lang}
                      image={project.image}
                      tags={project.tags}
                      url={project.url}
                      onClick={(e) => handleProjectClick(e, project.url)}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Setas laterais absolutas */}
            <button className="swiper-arrow swiper-arrow--prev" onClick={goPrev} aria-label="Anterior">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button className="swiper-arrow swiper-arrow--next" onClick={goNext} aria-label="Próximo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Paginação abaixo, centralizada */}
            <div className="swiper-custom-pagination" />
          </motion.div>
        </div>

        <div className="custom-shape-divider-bottom">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill" />
          </svg>
        </div>

      </section>
    </>
  );
};

export default Projects;