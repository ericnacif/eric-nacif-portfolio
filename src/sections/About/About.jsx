import React from 'react';
import './About.css';
import { useLanguage } from '@/hooks/useLanguage';
import { useReveal } from '@/hooks/useReveal';
import { SiInstagram, SiGithub, SiLinkedin, SiGmail } from 'react-icons/si';

const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/eric-nacif-956930324/', icon: <SiLinkedin /> },
  { name: 'GitHub', url: 'https://github.com/ericnacif', icon: <SiGithub /> },
  { name: 'Instagram', url: 'https://www.instagram.com/nacif_/', icon: <SiInstagram /> },
  { name: 'Email', url: 'mailto:naciferic7@gmail.com', icon: <SiGmail /> },
];

const About = () => {
  const { language, t } = useLanguage();
  const content = t.about;
  const revealRef = useReveal();

  return (
    <section id="sobre" className="about-section" ref={revealRef}>
      <div className="container about-container">

        <div className="section-header" data-reveal>
          <h2 className="section-title">{content.title}</h2>
        </div>

        <div className="about-body">
          <div className="about-col-left" data-reveal>
            <div className="about-logo-card">
              <img src="/logo-blue.webp" alt="Eric Nacif Logo" className="about-logo" width="180" height="180" loading="lazy" />
            </div>

            <div className="about-socials">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-social-btn"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="about-col-right" data-reveal key={language}>
            <p className="about-punchline">{content.punchline}</p>
            <ul className="about-highlights">
              {content.highlights.map((item) => (
                <li key={item} className="about-highlight-item">{item}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
