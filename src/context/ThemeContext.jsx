import React, { createContext, useContext, useState, useEffect } from 'react';

// Importe as imagens para usar como favicon
import logoBlue from '../assets/images/logo-blue.webp';
import logoGray from '../assets/images/logo-gray.webp';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Alteração: Inicia sempre como 'light' fixo, ignorando preferências salvas
  const [theme, setTheme] = useState('light');

  // Removi o useEffect que carregava o tema do localStorage ou sistema.
  // Isso garante que sempre inicie 'light'.

  // Efeito para aplicar classe no HTML e trocar o FAVICON
  useEffect(() => {
    // 1. Atualiza atributo do HTML
    document.documentElement.setAttribute('data-theme', theme);

    // Opcional: Salvar no localStorage foi removido/comentado pois sempre queremos reiniciar em light
    // localStorage.setItem('theme', theme);

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