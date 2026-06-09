import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Header.css";
import { FaTimes } from "react-icons/fa";

import { useLanguage } from "@/hooks/useLanguage";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const opts = { rootMargin: "-30% 0px -40% 0px", threshold: 0 };
    const observedSections = new Set();
    const requiredSections = ["home", "sobre", "projetos", "contato"];
    let mo;

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, opts);

    const observe = () => {
      document.querySelectorAll("section[id], footer#contato").forEach((section) => {
        if (!observedSections.has(section.id)) {
          observerRef.current.observe(section);
          observedSections.add(section.id);
        }
      });

      if (mo && requiredSections.every((id) => observedSections.has(id))) {
        mo.disconnect();
      }
    };

    observe();
    mo = new MutationObserver(observe);
    const root = document.getElementById("root");
    if (root && !requiredSections.every((id) => observedSections.has(id))) {
      mo.observe(root, { childList: true, subtree: true });
    }

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
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: "smooth" });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`main-header ${scrolled ? "scrolled" : ""}`} role="banner">
      <div className="header-container">

        {/* Logo */}
        <a href="#home" className="header-logo-link" onClick={(e) => handleScrollTo(e, "home")} aria-label="Eric Nacif">
          <img src={logoSrc} alt="Eric Nacif" className="header-logo-img" width="36" height="36" />
        </a>

        {/* Nav central */}
        <nav className="desktop-nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-item ${activeSection === item.id ? "active" : ""}`}
              onClick={(e) => handleScrollTo(e, item.id)}
            >
              <span className="nav-text">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="header-controls">
          <div className="lang-inline">
            {["pt", "en", "es"].map((lang, i, arr) => (
              <React.Fragment key={lang}>
                <button
                  className={`lang-inline-btn ${language === lang ? "active" : ""}`}
                  onClick={() => changeLanguage(lang)}
                  aria-label={`Alterar idioma para ${lang.toUpperCase()}`}
                >
                  {lang.toUpperCase()}
                </button>
                {i < arr.length - 1 && <span className="lang-sep" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Hamburger */}
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(true)} aria-label="Abrir Menu">
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Drawer — via portal no body para evitar containing-block do header */}
      {isMenuOpen && createPortal(
        <>
          <div
            className="mobile-menu-overlay"
            onClick={() => setIsMenuOpen(false)}
          />
          <nav className="mobile-menu-drawer" ref={menuRef}>
            <div className="drawer-header">
              <div className="drawer-logo">
                <img src={logoSrc} alt="Eric Nacif" width="24" height="24" />
              </div>
              <button className="drawer-close-btn" onClick={() => setIsMenuOpen(false)} aria-label="Fechar">
                <FaTimes size={14} />
              </button>
            </div>

            <div className="drawer-links">
              {navItems.map((item, i) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleScrollTo(e, item.id)}
                  className={`drawer-item ${activeSection === item.id ? "active" : ""}`}
                >
                  <span className="drawer-item-num">0{i + 1}</span>
                  {item.label}
                </a>
              ))}
            </div>

            <div className="drawer-footer">
              <a
                href="#contato"
                onClick={(e) => handleScrollTo(e, "contato")}
                className="drawer-cta"
              >
                {t.hero?.cta2 || "Falar comigo"}
              </a>

              <div className="drawer-lang">
                {["pt", "en", "es"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className={language === lang ? "active" : ""}
                    aria-label={`Alterar idioma para ${lang.toUpperCase()}`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </>,
        document.body
      )}
    </header>
  );
};

export default Header;
