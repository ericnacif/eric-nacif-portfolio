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
      const footer = document.getElementById('contato');
      const footerVisible = footer
        ? footer.getBoundingClientRect().top < window.innerHeight
        : false;

      const nextVisibility = window.scrollY > threshold && !footerVisible;

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
    }

    return () => {
      subscribers.delete(setIsVisible);

      if (subscribers.size === 0) {
        window.removeEventListener('scroll', activeHandler);
        activeHandler = null;
      }
    };
  }, [threshold]);

  return isVisible;
};
