import React from 'react';
import './Hero.css';
import { useLanguage } from '@/hooks/useLanguage';

const Hero = () => {
  const { t } = useLanguage();
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
        <h1 className="hero-title">
          {content.headline}{' '}
          <span className="hero-title-l2">
            {content.headlineLead}{' '}
            <span className="hero-title-accent">{content.headlineAccent}</span>
          </span>
        </h1>

        <div className="hero-foot">
          <p className="hero-sub hero-reveal hero-reveal--1">
            {content.sub}
          </p>

          <div className="hero-ctas hero-reveal hero-reveal--2">
            <button className="hero-cta hero-cta--primary" onClick={() => handleScroll('projetos')}>
              {content.cta1}
            </button>
            <button className="hero-cta hero-cta--secondary" onClick={() => handleScroll('contato')}>
              {content.cta2}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
