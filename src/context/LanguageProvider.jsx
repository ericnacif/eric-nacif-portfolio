import { useEffect, useMemo, useRef, useState } from 'react';
import { LanguageContext } from './LanguageContext';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, translations } from '@/i18n/translations';

const STORAGE_KEY = 'portfolio-language';

const getInitialLanguage = () => {
  const storedLanguage = localStorage.getItem(STORAGE_KEY);
  return SUPPORTED_LANGUAGES.includes(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);
  const isFirstRender = useRef(true);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === 'pt' ? 'pt-br' : language;
  }, [language]);

  // Fade leve em toda a página ao trocar de idioma (sem remontar nada).
  // Apenas opacidade (acelerada por GPU) para não afetar layout/performance.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const root = document.getElementById('root');
    if (!root || typeof root.animate !== 'function') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    root.animate(
      [{ opacity: 0.4 }, { opacity: 1 }],
      { duration: 380, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    );
  }, [language]);

  const changeLanguage = (lang) => {
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      setLanguage(lang);
    }
  };

  const value = useMemo(
    () => ({
      language,
      changeLanguage,
      t: translations[language] || translations[DEFAULT_LANGUAGE],
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
