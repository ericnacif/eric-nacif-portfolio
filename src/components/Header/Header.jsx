import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaGlobe, FaDownload, FaBars, FaTimes } from "react-icons/fa";

import cvPt from "../../assets/docs/cv-pt.pdf";
import cvEn from "../../assets/docs/cv-en.pdf";

import { useLanguage } from "../../context/LanguageContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  const { language, changeLanguage, t } = useLanguage();
  const menuRef = useRef(null);
  const observerRef = useRef(null);
  const logoSrc = "/logo-blue.webp";

  const navItems = [
    { id: "sobre", label: t.nav?.about || "Sobre" },
    { id: "projetos", label: t.nav?.projects || "Projetos" },
    { id: "contato", label: t.nav?.contact || "Contato" },
  ];

  const getCvLink = () => (language === "pt" ? cvPt : cvEn);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const opts = { rootMargin: "-30% 0px -40% 0px", threshold: 0 };
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, opts);
    const observe = () =>
      document.querySelectorAll("section[id], footer#contato").forEach((s) =>
        observerRef.current.observe(s)
      );
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { observerRef.current?.disconnect(); mo.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 1024) setIsMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id === "home" ? "hero" : id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: "smooth" });
      setActiveSection(id === "home" ? "hero" : id);
      setIsMenuOpen(false);
    }
  };

  const navContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const navItemVariants = {
    hidden: { y: -14, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <header className={`main-header ${scrolled ? "scrolled" : ""}`} role="banner">
      <div className="header-container">

        {/* Logo */}
        <a href="#hero" className="header-logo-link" onClick={(e) => handleScrollTo(e, "hero")}>
          <img src={logoSrc} alt="Logo" className="header-logo-img" width="36" height="36" />
          <span className="header-logo-text">Eric Nacif</span>
        </a>

        {/* Nav — pill flutuante centralizado */}
        <motion.nav
          className="desktop-nav"
          variants={navContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={(e) => handleScrollTo(e, item.id)}
                variants={navItemVariants}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    className="nav-pill-bg"
                    layoutId="navPill"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
                <AnimatePresence mode="wait">
                  <motion.span key={language} className="nav-text"
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.16 }}
                  >
                    {item.label}
                  </motion.span>
                </AnimatePresence>
              </motion.a>
            );
          })}
        </motion.nav>

        {/* Controls */}
        <div className="header-controls">
          {/* Lang switcher — botões inline */}
          <div className="lang-inline">
            {["pt", "en", "es"].map((lang, i, arr) => (
              <React.Fragment key={lang}>
                <button
                  className={`lang-inline-btn ${language === lang ? "active" : ""}`}
                  onClick={() => changeLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </button>
                {i < arr.length - 1 && <span className="lang-sep" />}
              </React.Fragment>
            ))}
          </div>

          {/* CV */}
          <motion.a
            href={getCvLink()}
            download
            className="cv-button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <AnimatePresence mode="wait">
              <motion.span key={language} className="cv-text"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.16 }}
              >
                {t.cvBtn}
              </motion.span>
            </AnimatePresence>
            <FaDownload size={10} />
          </motion.a>
        </div>

        {/* Hamburger */}
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(true)} aria-label="Abrir Menu">
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.nav
              className="mobile-menu-drawer"
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: "0%", transition: { type: "spring", stiffness: 280, damping: 28 } }}
              exit={{ x: "100%", transition: { duration: 0.22 } }}
            >
              <div className="drawer-header">
                <div className="drawer-logo">
                  <img src={logoSrc} alt="Logo" width="24" height="24" />
                  <span>Eric Nacif</span>
                </div>
                <button className="drawer-close-btn" onClick={() => setIsMenuOpen(false)} aria-label="Fechar">
                  <FaTimes size={14} />
                </button>
              </div>

              <div className="drawer-links">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleScrollTo(e, item.id)}
                    className={`drawer-item ${activeSection === item.id ? "active" : ""}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: i * 0.07 } }}
                  >
                    <span className="drawer-item-num">0{i + 1}</span>
                    {item.label}
                  </motion.a>
                ))}
              </div>

              <div className="drawer-footer">
                <div className="drawer-lang">
                  {["pt", "en", "es"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => changeLanguage(lang)}
                      className={language === lang ? "active" : ""}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
                <a href={getCvLink()} download className="drawer-cv-btn">
                  <FaDownload size={12} />
                  <span>{t.cvBtn}</span>
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;