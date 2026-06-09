import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './NotFound.css';
import { useLanguage } from '@/hooks/useLanguage';

const NotFound = () => {
    const { t } = useLanguage();
    const content = t.notFound;

    useEffect(() => {
        const prevTitle = document.title;
        document.title = '404 | Eric Nacif';

        const meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, follow';
        document.head.appendChild(meta);

        return () => {
            document.title = prevTitle;
            document.head.removeChild(meta);
        };
    }, []);

    return (
        <section className="not-found-section">
            <div className="not-found-bg" aria-hidden="true">
                <span className="nf-blob nf-blob--1" />
                <span className="nf-blob nf-blob--2" />
                <div className="nf-grid" />
            </div>

            <div className="simple-header">
                <img src="/logo-blue.webp" alt="Eric Nacif" className="simple-logo-img" />
                <span className="simple-logo-text">Eric Nacif</span>
            </div>

            <motion.div
                className="not-found-content"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <h1 className="nf-code">404</h1>
                <h2 className="nf-subtitle">{content.subtitle}</h2>
                <p className="nf-text">{content.text}</p>

                <Link to="/" className="back-home-btn">
                    <FiArrowLeft />
                    {content.button}
                </Link>
            </motion.div>
        </section>
    );
};

export default NotFound;