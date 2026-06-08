import { useEffect, useMemo, useState } from 'react';
import { LanguageContext } from './LanguageContext';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, translations } from '../i18n/translations';

const STORAGE_KEY = 'portfolio-language';

const getInitialLanguage = () => {
  const storedLanguage = localStorage.getItem(STORAGE_KEY);
  return SUPPORTED_LANGUAGES.includes(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === 'pt' ? 'pt-br' : language;
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
