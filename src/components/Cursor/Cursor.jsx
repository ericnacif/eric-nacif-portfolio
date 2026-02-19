import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const isCoarsePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  (window.matchMedia("(hover: none)").matches ||
    window.matchMedia("(pointer: coarse)").matches);

const Cursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [cursorState, setCursorState] = useState("default");
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot: snappy, quase instantâneo
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 35, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 35, mass: 0.1 });

  // Anel: segue com leve delay elegante
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 22, mass: 0.8 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 22, mass: 0.8 });

  useEffect(() => {
    const compute = () => setEnabled(!isCoarsePointer());
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
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

  useEffect(() => {
    if (!enabled) return;
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, label, .project-card, .skill-card';
    const textSelector = "p, h1, h2, h3, h4, h5, h6, li, span, blockquote";

    const onEnterInteractive = () => setCursorState("hover");
    const onEnterText = () => setCursorState("text");
    const onLeave = () => setCursorState("default");

    const attachListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeave);
      });
      document.querySelectorAll(textSelector).forEach((el) => {
        el.removeEventListener("mouseenter", onEnterText);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnterText);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    attachListeners();
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [enabled]);

  if (!enabled) return null;

  const isHover = cursorState === "hover";
  const isText = cursorState === "text";

  return (
    <>
      {/* Anel externo — segue com delay */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99998,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={
          isText
            ? { width: 2, height: 20, borderRadius: 2, opacity: 0.35, borderWidth: 0, backgroundColor: "#111" }
            : isHover
              ? { width: 44, height: 44, borderRadius: "50%", opacity: 1, borderWidth: 1.5, backgroundColor: "transparent" }
              : { width: 36, height: 36, borderRadius: "50%", opacity: 0.5, borderWidth: 1, backgroundColor: "transparent" }
        }
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
        initial={false}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "inherit",
            border: isText ? "none" : `${isHover ? 1.5 : 1}px solid #111`,
            backgroundColor: isText ? "#111" : "transparent",
          }}
        />
      </motion.div>

      {/* Dot central — instantâneo */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: "#111",
        }}
        animate={{
          scale: isClicking ? 0.4 : isHover ? 2.5 : isText ? 0 : 1,
          opacity: isText ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />
    </>
  );
};

export default Cursor;