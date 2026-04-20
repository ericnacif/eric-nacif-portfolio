import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const SESSION_KEY = 'en_portfolio_preloaded';

const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState('line');
  const [progress, setProgress] = useState(0);
  const visited = useMemo(() => sessionStorage.getItem(SESSION_KEY) === '1', []);

  useEffect(() => {
    const lineDuration = visited ? 420 : 1600;
    const startedAt = performance.now();

    let rafId;

    const tick = (time) => {
      const elapsed = time - startedAt;
      const nextProgress = Math.min(100, (elapsed / lineDuration) * 100);
      setProgress(nextProgress);

      if (nextProgress < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        setPhase('wipe');
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [visited]);

  useEffect(() => {
    if (phase !== 'wipe') return undefined;

    const doneTimer = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1');
      onComplete?.();
    }, visited ? 540 : 860);

    return () => clearTimeout(doneTimer);
  }, [onComplete, phase, visited]);

  return (
    <AnimatePresence>
      <motion.div
        className="preloader"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'wipe' ? 0 : 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: phase === 'wipe' ? 0.25 : 0 }}
      >
        <motion.div
          className="preloader-line"
          initial={{ height: 2 }}
          animate={{ height: phase === 'wipe' ? '100vh' : 2 }}
          transition={{ duration: visited ? 0.5 : 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="preloader-line-fill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.08, ease: 'linear' }}
          />
        </motion.div>

        <span className="preloader-percent">{Math.round(progress)}%</span>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
