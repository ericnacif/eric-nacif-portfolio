import React, { useEffect, useRef } from 'react';
import './ScrollProgress.css';

const ScrollProgress = () => {
    const barRef = useRef(null);

    useEffect(() => {
        let ticking = false;

        const update = () => {
            const el = document.documentElement;
            const max = el.scrollHeight - el.clientHeight;
            const progress = max > 0 ? el.scrollTop / max : 0;
            if (barRef.current) {
                barRef.current.style.transform = `scaleX(${progress})`;
            }
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    return <div className="scroll-progress-bar" ref={barRef} />;
};

export default ScrollProgress;
