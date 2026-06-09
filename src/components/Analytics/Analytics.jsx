import { useEffect } from 'react';

/**
 * Carrega o Google Analytics 4 apenas quando VITE_GA_ID está definido.
 * Defina o ID em um arquivo .env: VITE_GA_ID=G-XXXXXXXXXX
 * Sem o ID, o componente não injeta nenhum script (ambiente de dev fica limpo).
 */
const Analytics = () => {
  const gaId = import.meta.env.VITE_GA_ID;

  useEffect(() => {
    if (!gaId) return;
    if (document.getElementById('ga4-script')) return;

    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', gaId, { anonymize_ip: true });
  }, [gaId]);

  return null;
};

export default Analytics;
