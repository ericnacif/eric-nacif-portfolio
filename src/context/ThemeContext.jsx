import React, { createContext, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    // Define favicon fixo para tema light
    const favicon = document.querySelector("link[rel*='icon']");
    if (favicon) {
      favicon.href = "/logo-blue.webp";
    }
  }, []);

  // Retorna valores fixos sem funcionalidade de toggle
  return (
    <ThemeContext.Provider value={{ theme: "light", toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
