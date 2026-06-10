import React, { useRef } from "react";
import "./Projects.css";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "@/hooks/useLanguage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import certificafeImg from "@/assets/images/project-certificafe.webp";
import engelmigImg from "@/assets/images/project-engelmig.webp";
import monacImg from "@/assets/images/project-monac.webp";
import okanImg from "@/assets/images/project-okan.webp";
import whatsappBotImg from "@/assets/images/project-whatsapp-bot.webp";
import murkeImg from "@/assets/images/project-murke.webp";

const projectsData = [
  {
    id: "monac",
    image: monacImg,
    url: "https://monacsistemas.netlify.app",
    tags: ["React", "Node.js", "MongoDB", "REST API"],
    translations: {
      pt: {
        title: "MONAC Sistemas",
        description:
          "Plataforma de gestão empresarial e emissão fiscal. Desenvolvi a interface e a integração com a API REST, priorizando fluxos claros para as tarefas do dia a dia da operação.",
      },
      en: {
        title: "MONAC Sistemas",
        description:
          "Business management and tax invoicing platform. I built the interface and the REST API integration, prioritizing clear flows for the team's day-to-day operations.",
      },
      es: {
        title: "MONAC Sistemas",
        description:
          "Plataforma de gestión empresarial y emisión fiscal. Desarrollé la interfaz y la integración con la API REST, priorizando flujos claros para las tareas diarias de la operación.",
      },
    },
  },
  {
    id: "okan",
    image: okanImg,
    url: "https://okancontabilidade.com",
    tags: ["React", "TypeScript", "Next.js", "Responsive"],
    translations: {
      pt: {
        title: "OKAN Contabilidade",
        description:
          "Site institucional para escritório de contabilidade. Estruturei a comunicação para transmitir autoridade e captar clientes, com navegação clara e carregamento rápido em qualquer dispositivo.",
      },
      en: {
        title: "OKAN Contabilidade",
        description:
          "Institutional website for an accounting firm. I structured the messaging to convey authority and attract clients, with clear navigation and fast loading on any device.",
      },
      es: {
        title: "OKAN Contabilidade",
        description:
          "Sitio institucional para un despacho contable. Estructuré la comunicación para transmitir autoridad y captar clientes, con navegación clara y carga rápida en cualquier dispositivo.",
      },
    },
  },
  {
    id: "whatsapp-bot-template",
    image: whatsappBotImg,
    url: "https://github.com/ericnacif/template-bot-whatsapp",
    tags: ["Node.js", "WhatsApp", "Boilerplate", "Automation"],
    translations: {
      pt: {
        title: "Template Bot WhatsApp",
        description:
          "Template profissional em Node.js para criar assistentes de WhatsApp com fluxos de atendimento, menus interativos, sessões por usuário, rate limiting e estrutura pronta para integrar IA.",
      },
      en: {
        title: "WhatsApp Bot Template",
        description:
          "Professional Node.js template for building WhatsApp assistants with service flows, interactive menus, per-user sessions, rate limiting, and an AI-ready structure.",
      },
      es: {
        title: "Template Bot WhatsApp",
        description:
          "Template profesional en Node.js para crear asistentes de WhatsApp con flujos de atención, menús interactivos, sesiones por usuario, rate limiting y estructura lista para integrar IA.",
      },
    },
  },
  {
    id: "murke",
    image: murkeImg,
    url: "https://murke.netlify.app",
    tags: ["React", "Framer Motion", "UI", "Responsive"],
    translations: {
      pt: {
        title: "Murke",
        description:
          "Site para estúdio criativo. Desenvolvi a interface e a presença digital com animações fluidas, priorizando uma experiência envolvente e navegação leve em qualquer dispositivo.",
      },
      en: {
        title: "Murke",
        description:
          "Website for a creative studio. I built the interface and digital presence with fluid animations, prioritizing an engaging experience and smooth navigation on any device.",
      },
      es: {
        title: "Murke",
        description:
          "Sitio para un estudio creativo. Desarrollé la interfaz y la presencia digital con animaciones fluidas, priorizando una experiencia envolvente y una navegación ligera en cualquier dispositivo.",
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
          "Sistema corporativo de certificação de café. Atuo como um dos desenvolvedores da plataforma em Laravel, implementando funcionalidades e correções junto ao time para manter a operação estável.",
      },
      en: {
        title: "Certificafé",
        description:
          "Corporate coffee certification system. I work as one of the developers on the Laravel platform, shipping features and fixes alongside the team to keep operations stable.",
      },
      es: {
        title: "Certificafé",
        description:
          "Sistema corporativo de certificación de café. Actúo como uno de los desarrolladores de la plataforma en Laravel, implementando funcionalidades y correcciones junto al equipo para mantener la operación estable.",
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
          "Portal corporativo do setor de energia. Desenvolvi páginas institucionais e apliquei otimizações de SEO on-page para ampliar a visibilidade da empresa nas buscas.",
      },
      en: {
        title: "Engelmig Energia",
        description:
          "Corporate portal for the energy sector. I developed institutional pages and applied on-page SEO optimizations to increase the company's visibility in search.",
      },
      es: {
        title: "Engelmig Energia",
        description:
          "Portal corporativo del sector energético. Desarrollé páginas institucionales y apliqué optimizaciones de SEO on-page para ampliar la visibilidad de la empresa en las búsquedas.",
      },
    },
  },
];

const Projects = () => {
  const { language, t } = useLanguage();
  const content = t.projects;
  const swiperRef = useRef(null);

  const handleProjectClick = (e, url) => {
    e.preventDefault();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const goNext = () => swiperRef.current?.swiper?.slideNext();
  const goPrev = () => swiperRef.current?.swiper?.slidePrev();

  return (
    <>
      <section id="projetos" className="projects-section">
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
            />
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
            <div className="projects-header-text">
              <h2 className="projects-title">{content.title}</h2>
            </div>

            <div className="projects-nav">
              <button
                className="swiper-arrow swiper-arrow--prev"
                onClick={goPrev}
                aria-label={content.previous}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className="swiper-arrow swiper-arrow--next"
                onClick={goNext}
                aria-label={content.next}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
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
              spaceBetween={28}
              slidesPerView={1}
              pagination={{
                clickable: true,
                el: ".swiper-custom-pagination",
                bulletClass: "swiper-custom-bullet",
                bulletActiveClass: "swiper-custom-bullet--active",
              }}
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop
              grabCursor
              speed={600}
              breakpoints={{
                981: { slidesPerView: 1.12, spaceBetween: 36 },
              }}
              className="projects-swiper"
            >
              {projectsData.map((project, idx) => {
                const lang =
                  project.translations[language] || project.translations.pt;
                return (
                  <SwiperSlide key={project.id}>
                    <article className="showcase">
                      <div
                        className="showcase__media"
                        onClick={(e) => handleProjectClick(e, project.url)}
                        role="link"
                        tabIndex={0}
                        aria-label={lang.title}
                      >
                        <img
                          src={project.image}
                          alt={lang.title}
                          loading="lazy"
                        />
                        <span className="showcase__view">
                          {content.viewProject}
                          <FiArrowUpRight />
                        </span>
                      </div>

                      <div className="showcase__content">
                        <span className="showcase__index">
                          {String(idx + 1).padStart(2, "0")}
                          <em>/ {String(projectsData.length).padStart(2, "0")}</em>
                        </span>
                        <h3 className="showcase__title">{lang.title}</h3>
                        <p className="showcase__desc">{lang.description}</p>
                        <div className="showcase__tags">
                          {project.tags.map((tag) => (
                            <span key={tag} className="showcase__tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          className="showcase__btn"
                          onClick={(e) => handleProjectClick(e, project.url)}
                        >
                          {content.viewProject}
                          <FiArrowUpRight />
                        </button>
                      </div>
                    </article>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Paginação abaixo, centralizada */}
            <div className="swiper-custom-pagination" />
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
            />
          </svg>
        </div>
      </section>
    </>
  );
};

export default Projects;
