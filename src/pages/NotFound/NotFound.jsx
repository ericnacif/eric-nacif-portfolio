import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './NotFound.css';
import { useLanguage } from '../../context/LanguageContext';
// REMOVIDO: import logoBlue

const NotFound = () => {
    const { language } = useLanguage();

    const content = {
        pt: {
            title: "404",
            subtitle: "Página não encontrada",
            text: "Parece que você se perdeu no ciberespaço.",
            button: "Voltar para o Início"
        },
        en: {
            title: "404",
            subtitle: "Page Not Found",
            text: "Looks like you got lost in cyberspace.",
            button: "Back to Home"
        },
        es: {
            title: "404",
            subtitle: "Página no encontrada",
            text: "Parece que te perdiste en el ciberespacio.",
            button: "Volver al Inicio"
        }
    };

    const t = content[language] || content.pt;

    return (
        <section className="not-found-section">
            <div className="simple-header">
                {/* CORREÇÃO: Uso direto da string */}
                <img src="/logo-blue.webp" alt="Logo" className="simple-logo-img" />
                <span className="simple-logo-text">Eric Nacif</span>
            </div>

            <motion.div
                className="not-found-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="glitch-text" data-text="404">404</h1>
                <h2>{t.subtitle}</h2>
                <p>{t.text}</p>

                <Link to="/" className="back-home-btn">
                    {t.button}
                </Link>
            </motion.div>
        </section>
    );
};

export default NotFound;