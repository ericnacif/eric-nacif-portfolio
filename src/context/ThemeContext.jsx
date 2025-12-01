import React, { createContext, useContext, useState, useEffect } from 'react';

// REMOVIDO: imports de imagens
// Agora usamos strings: '/logo-blue.webp' e '/logo-gray.webp'

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    const favicon = document.querySelector("link[rel*='icon']");
    if (favicon) {
      // CORREÇÃO: Caminhos absolutos (strings)
      favicon.href = theme === 'dark' ? '/logo-gray.webp' : '/logo-blue.webp';
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