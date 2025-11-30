import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GoogleAnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Verifica se o GA foi carregado (para não dar erro em localhost ou se bloqueado)
    if (window.gtag) {
      window.gtag("config", "G-XXXXXXXXXX", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};

export default GoogleAnalyticsTracker;