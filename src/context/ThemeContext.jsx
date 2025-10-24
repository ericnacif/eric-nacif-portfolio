import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Cria o Contexto
const ThemeContext = createContext();

// 2. Cria o Provedor
export const ThemeProvider = ({ children }) => {
  // Pega o tema do localStorage ou usa 'light' como padrão
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  // Efeito que roda quando o 'theme' muda
  useEffect(() => {
    // 1. Salva a escolha no localStorage
    localStorage.setItem('theme', theme);
    // 2. Adiciona/Remove o atributo [data-theme] do <html>
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Função para trocar o tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // 3. Fornece o tema e a função para os componentes filhos
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Hook customizado para facilitar o uso
export const useTheme = () => useContext(ThemeContext);