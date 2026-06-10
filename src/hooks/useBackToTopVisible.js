import { useEffect, useState } from 'react';

let currentVisibility = false;
let activeHandler = null;
const subscribers = new Set();

const notifySubscribers = () => {
  subscribers.forEach((callback) => callback(currentVisibility));
};

export const useBackToTopVisible = (threshold = 600) => {
  const [isVisible, setIsVisible] = useState(currentVisibility);

  useEffect(() => {
    const onScroll = () => {
      // Esconde no fim real da página, igual ao header e ao botão de WhatsApp
      const scrollBottom = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      const atFooter = pageHeight - scrollBottom <= 60;

      const nextVisibility = window.scrollY > threshold && !atFooter;

      if (nextVisibility !== currentVisibility) {
        currentVisibility = nextVisibility;
        notifySubscribers();
      }
    };

    subscribers.add(setIsVisible);

    if (subscribers.size === 1) {
      activeHandler = onScroll;
      onScroll();
      window.addEventListener('scroll', activeHandler, { passive: true });
      window.addEventListener('resize', activeHandler, { passive: true });
    }

    return () => {
      subscribers.delete(setIsVisible);

      if (subscribers.size === 0) {
        window.removeEventListener('scroll', activeHandler);
        window.removeEventListener('resize', activeHandler);
        activeHandler = null;
      }
    };
  }, [threshold]);

  return isVisible;
};
