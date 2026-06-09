import React from 'react';
import './Hero.css';
import { useLanguage } from '@/hooks/useLanguage';

const Hero = () => {
  const { language, t } = useLanguage();
  const content = t.hero;

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg" aria-hidden="true" />

      <div className="hero-inner">
        <h1 className="hero-title" key={`title-${language}`}>
          {content.headline}{' '}
          <span className="hero-title-accent">{content.headlineAccent}</span>
        </h1>

        <p className="hero-sub hero-reveal hero-reveal--1" key={`sub-${language}`}>
          {content.sub}
        </p>

        <div className="hero-ctas hero-reveal hero-reveal--2" key={`ctas-${language}`}>
          <button className="hero-cta hero-cta--primary" onClick={() => handleScroll('projetos')}>
            {content.cta1}
          </button>
          <button className="hero-cta hero-cta--secondary" onClick={() => handleScroll('contato')}>
            {content.cta2}
          </button>
        </div>
      </div>

      <div className="hero-scroll hero-reveal hero-reveal--3">
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
