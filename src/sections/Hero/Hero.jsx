import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const HEADLINE = 'Digital experiences that feel different —and perform';

const Hero = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hoveredWord, setHoveredWord] = useState(null);

  const words = useMemo(() => HEADLINE.split(' '), []);

  const onMove = (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 18;
    const y = (event.clientY / window.innerHeight - 0.5) * 18;
    setMouse({ x, y });
  };

  return (
    <section id="home" className="hero" onMouseMove={onMove}>
      <motion.div
        className="hero-bg"
        animate={{ x: mouse.x, y: mouse.y }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="hero-inner">
        <h1 className="hero-title">
          {words.map((word, index) => (
            <motion.span
              className="hero-word"
              key={`${word}-${index}`}
              initial={{ opacity: 0, y: 90 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 + index * 0.04 }}
              onMouseEnter={() => setHoveredWord(index)}
              onMouseLeave={() => setHoveredWord(null)}
              style={{ color: hoveredWord === index ? '#a52020' : '#f5f4f2' }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
        >
          Designer &amp; Developer
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
