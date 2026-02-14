import React, { useEffect, useState, useRef } from "react";
import "./Cursor.css";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

const isCoarsePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  (window.matchMedia("(hover: none)").matches ||
    window.matchMedia("(pointer: coarse)").matches);

const Cursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [cursorState, setCursorState] = useState("default");
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [ripples, setRipples] = useState([]);
  const rippleIdRef = useRef(0);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Cursor principal com spring suave
  const x = useSpring(mouseX, { stiffness: 400, damping: 25, mass: 0.3 });
  const y = useSpring(mouseY, { stiffness: 400, damping: 25, mass: 0.3 });

  // Cursor trail (rastro) com spring mais lento
  const trailX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 1.2 });
  const trailY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 1.2 });

  useEffect(() => {
    const compute = () => setEnabled(!isCoarsePointer());
    compute();
    const onResize = () => compute();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, mouseX, mouseY]);

  // Click effect - Ripple
  useEffect(() => {
    if (!enabled) return;

    const handleMouseDown = (e) => {
      setIsClicking(true);

      // Criar ripple
      const id = rippleIdRef.current++;
      const newRipple = {
        id,
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev, newRipple]);

      // Remover ripple após animação
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 800);
    };

    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const buttonSelectors =
      'button, .cv-button, .lang-btn, input[type="submit"], [role="button"]';
    const linkSelectors = "a:not(.header-logo-link)";
    const cardSelectors = ".project-card, .skill-card";
    const navSelectors = ".nav-item";
    const textSelectors =
      'p, h1, h2, h3, h4, h5, h6, span:not(.nav-text):not(.current-lang):not(.cv-text), li, input[type="text"], textarea';

    const setState = (state, text = "") => {
      setCursorState(state);
      setHoverText(text);
    };

    const onEnterButton = () => setState("button", "Click");
    const onEnterLink = (e) => {
      const href =
        e.target.getAttribute("href") ||
        e.target.closest("a")?.getAttribute("href");
      const text = href?.startsWith("#") ? "Go" : "Visit";
      setState("link", text);
    };
    const onEnterCard = () => setState("card", "View");
    const onEnterNav = () => setState("nav", "→");
    const onEnterText = () => setState("text");
    const onLeave = () => setState("default");

    const updateListeners = () => {
      // Buttons
      document.querySelectorAll(buttonSelectors).forEach((el) => {
        el.removeEventListener("mouseenter", onEnterButton);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnterButton);
        el.addEventListener("mouseleave", onLeave);
      });

      // Links
      document.querySelectorAll(linkSelectors).forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeave);
      });

      // Cards
      document.querySelectorAll(cardSelectors).forEach((el) => {
        el.removeEventListener("mouseenter", onEnterCard);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnterCard);
        el.addEventListener("mouseleave", onLeave);
      });

      // Nav items
      document.querySelectorAll(navSelectors).forEach((el) => {
        el.removeEventListener("mouseenter", onEnterNav);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnterNav);
        el.addEventListener("mouseleave", onLeave);
      });

      // Text
      document.querySelectorAll(textSelectors).forEach((el) => {
        el.removeEventListener("mouseenter", onEnterText);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnterText);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    updateListeners();

    const observer = new MutationObserver(updateListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [enabled]);

  if (!enabled) return null;

  // Morphing states
  const cursorVariants = {
    default: {
      height: 20,
      width: 20,
      borderRadius: "50%",
      rotate: 0,
    },
    button: {
      height: 64,
      width: 64,
      borderRadius: "50%",
      rotate: 0,
    },
    link: {
      height: 60,
      width: 60,
      borderRadius: "30%",
      rotate: 45,
    },
    card: {
      height: 80,
      width: 80,
      borderRadius: "20%",
      rotate: 0,
    },
    nav: {
      height: 50,
      width: 50,
      borderRadius: "25%",
      rotate: 0,
    },
    text: {
      height: 6,
      width: 2,
      borderRadius: "1px",
      rotate: 0,
    },
  };

  const trailVariants = {
    default: {
      height: 44,
      width: 44,
      opacity: 0.12,
    },
    button: {
      height: 90,
      width: 90,
      opacity: 0.15,
    },
    link: {
      height: 85,
      width: 85,
      opacity: 0.14,
    },
    card: {
      height: 110,
      width: 110,
      opacity: 0.1,
    },
    nav: {
      height: 75,
      width: 75,
      opacity: 0.13,
    },
    text: {
      height: 0,
      width: 0,
      opacity: 0,
    },
  };

  return (
    <>
      {/* Ripples ao clicar */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="cursor-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Cursor Trail (Rastro com gradient animado) */}
      <motion.div
        className="cursor-trail"
        style={{
          x: trailX,
          y: trailY,
        }}
        animate={trailVariants[cursorState]}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      />

      {/* Cursor Principal (Glassmorphism) */}
      <motion.div
        className={`custom-cursor cursor-${cursorState}`}
        style={{
          x,
          y,
        }}
        animate={{
          ...cursorVariants[cursorState],
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Texto customizado ao hover */}
        <AnimatePresence mode="wait">
          {hoverText && cursorState !== "text" && (
            <motion.span
              className="cursor-text"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {hoverText}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Gradient animado (borda) */}
        <motion.div
          className="cursor-gradient-border"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Dot central (apenas quando não está em text mode) */}
      {cursorState !== "text" && !isClicking && (
        <motion.div
          className="cursor-dot"
          style={{ x, y }}
          animate={{
            scale: cursorState === "default" ? 1 : 0,
            opacity: cursorState === "default" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      )}
    </>
  );
};

export default Cursor;
