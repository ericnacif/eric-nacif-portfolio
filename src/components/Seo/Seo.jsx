import { useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

/**
 * Mantém title, description e tags sociais sincronizados com o idioma ativo.
 * O index.html já traz a versão estática (PT) para o primeiro paint/crawl;
 * aqui atualizamos quando o usuário troca de idioma.
 */
const Seo = () => {
  const { language, t } = useLanguage();
  const seo = t.seo;

  useEffect(() => {
    if (!seo) return;

    document.title = seo.title;
    setMeta('meta[name="description"]', 'content', seo.description);
    setMeta('meta[property="og:title"]', 'content', seo.title);
    setMeta('meta[property="og:description"]', 'content', seo.description);
    setMeta('meta[name="twitter:title"]', 'content', seo.title);
    setMeta('meta[name="twitter:description"]', 'content', seo.description);

    const ogLocaleMap = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' };
    setMeta('meta[property="og:locale"]', 'content', ogLocaleMap[language] || 'pt_BR');
  }, [language, seo]);

  return null;
};

export default Seo;
