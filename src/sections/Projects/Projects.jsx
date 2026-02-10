import React, { useState, useRef } from "react";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import "./Projects.css";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import RedirectLoader from "../../components/RedirectLoader/RedirectLoader";

// --- IMPORTAÇÕES DO SWIPER (CARROSSEL) ---
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, A11y, Autoplay } from "swiper/modules";
// Importar estilos do Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Imagens
import certificafeImg from "../../assets/images/project-certificafe.webp";
import engelmigImg from "../../assets/images/project-engelmig.png";
import monacImg from "../../assets/images/project-monac.png";
import okanImg from "../../assets/images/project-okan.png";

const Projects = () => {
  const { language } = useLanguage();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const swiperRef = useRef(null);

  const projectsData = [
    {
      id: "okan",
      image: okanImg,
      url: "https://okancontabilidade.com",
      tags: ["React", "TypeScript", "Next.js", "Responsive"],
      translations: {
        pt: {
          title: "OKAN Contabilidade",
          description:
            "Site institucional moderno com design profissional, foco em conversão e performance otimizada.",
        },
        en: {
          title: "OKAN Contabilidade",
          description:
            "Modern institutional website with professional design, focused on conversion and optimized performance.",
        },
        es: {
          title: "OKAN Contabilidade",
          description:
            "Sitio institucional moderno con diseño profesional, enfocado en conversión y rendimiento optimizado.",
        },
      },
    },
    {
      id: "monac",
      image: monacImg,
      url: "https://monacsistemas.netlify.app",
      tags: ["React", "Node.js", "MongoDB", "REST API"],
      translations: {
        pt: {
          title: "MONAC Sistemas",
          description:
            "Plataforma SaaS para gestão empresarial e emissão fiscal. Arquitetura escalável com API REST robusta.",
        },
        en: {
          title: "MONAC Sistemas",
          description:
            "SaaS platform for business management and tax invoicing. Scalable architecture with robust REST API.",
        },
        es: {
          title: "MONAC Sistemas",
          description:
            "Plataforma SaaS para gestión empresarial y emisión fiscal. Arquitectura escalable con API REST robusta.",
        },
      },
    },
    {
      id: "certificafe",
      image: certificafeImg,
      url: "https://certificafe.com.br/",
      tags: ["PHP", "Laravel", "MySQL", "Blade"],
      translations: {
        pt: {
          title: "Certificafé",
          description:
            "Sistema corporativo para certificação de café. Manutenção de aplicação legacy com foco em estabilidade e performance.",
        },
        en: {
          title: "Certificafé",
          description:
            "Corporate system for coffee certification. Legacy application maintenance focused on stability and performance.",
        },
        es: {
          title: "Certificafé",
          description:
            "Sistema corporativo para certificación de café. Mantenimiento de aplicación heredada enfocada en estabilidad y rendimiento.",
        },
      },
    },
    {
      id: "engelmig",
      image: engelmigImg,
      url: "https://www.engelmig.com.br/",
      tags: ["WordPress", "JavaScript", "SEO", "UX/UI"],
      translations: {
        pt: {
          title: "Engelmig Energia",
          description:
            "Portal corporativo do setor energético. Desenvolvimento de páginas institucionais e otimização SEO.",
        },
        en: {
          title: "Engelmig Energia",
          description:
            "Energy sector corporate portal. Development of institutional pages and SEO optimization.",
        },
        es: {
          title: "Engelmig Energia",
          description:
            "Portal corporativo del sector energético. Desarrollo de páginas institucionales y optimización SEO.",
        },
      },
    },
  ];

  const sectionTitle = {
    pt: "Projetos em Destaque",
    en: "Featured Projects",
    es: "Proyectos Destacados",
  };

  const redirectMessages = {
    pt: "Redirecionando...",
    en: "Redirecting...",
    es: "Redireccionando...",
  };

  const handleProjectClick = (e, url) => {
    e.preventDefault();
    setIsRedirecting(true);
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setIsRedirecting(false);
    }, 2000);
  };

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const textContainerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const carouselVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  };

  return (
    <>
      <AnimatePresence>
        {isRedirecting && (
          <RedirectLoader
            text={redirectMessages[language] || redirectMessages.pt}
          />
        )}
      </AnimatePresence>

      <section id="projetos" className="projects-section-blue">
        <div className="custom-shape-divider-top">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>

        <div className="container projects-container">
          <motion.h2
            className="section-title white-title"
            key={language}
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {sectionTitle[language] || sectionTitle.pt}
          </motion.h2>

          <motion.div
            variants={carouselVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="carousel-wrapper"
          >
            <Swiper
              ref={swiperRef}
              modules={[Pagination, Navigation, A11y, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{
                clickable: true,
                dynamicBullets: false,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              grabCursor={true}
              speed={600}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1100: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="projects-swiper"
            >
              {projectsData.map((project) => {
                const currentLangData =
                  project.translations[language] || project.translations.pt;

                return (
                  <SwiperSlide key={project.id}>
                    <ProjectCard
                      {...currentLangData}
                      image={project.image}
                      tags={project.tags}
                      url={project.url}
                      onClick={(e) => handleProjectClick(e, project.url)}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Setas Customizadas */}
            <div className="custom-swiper-button-prev" onClick={goPrev}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>
            <div className="custom-swiper-button-next" onClick={goNext}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </motion.div>
        </div>

        <div className="custom-shape-divider-bottom">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>
    </>
  );
};

export default Projects;
