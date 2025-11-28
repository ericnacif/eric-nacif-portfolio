import React, { createContext, useContext, useState, useEffect } from 'react';

// Importe as imagens para usar como favicon
import logoBlue from '../assets/images/logo-blue.png';
import logoGray from '../assets/images/logo-gray.png';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Efeito para aplicar classe no HTML e trocar o FAVICON
  useEffect(() => {
    // 1. Atualiza atributo do HTML
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // 2. Troca o Favicon Dinamicamente
    const favicon = document.querySelector("link[rel*='icon']");
    if (favicon) {
      favicon.href = theme === 'dark' ? logoGray : logoBlue;
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);