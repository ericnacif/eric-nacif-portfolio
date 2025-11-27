import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('pt'); // 'pt', 'en', 'es'

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    // Textos simples para o Header (você expandirá isso depois para o resto do site)
    const translations = {
        pt: {
            nav: { projects: 'Projetos', about: 'Sobre', contact: 'Contato' },
            cvBtn: 'Baixar CV',
            cvFile: 'cv-pt'
        },
        en: {
            nav: { projects: 'Projects', about: 'About', contact: 'Contact' },
            cvBtn: 'Download CV',
            cvFile: 'cv-en'
        },
        es: {
            nav: { projects: 'Proyectos', about: 'Sobre mí', contact: 'Contacto' },
            cvBtn: 'Descargar CV',
            cvFile: 'cv-en' // Fallback para inglês, já que não temos CV em espanhol ainda
        }
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);