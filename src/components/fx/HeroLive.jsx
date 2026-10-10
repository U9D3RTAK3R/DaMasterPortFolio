import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { HeroMotionContext } from "@/components/fx/HeroMotion";

const BLOB_SIZE = 380;
const ECHO_SIZE = 300;

const SPRING_MAIN = { stiffness: 240, damping: 26, mass: 0.6 };
const SPRING_ECHO = { stiffness: 55, damping: 24, mass: 1.3 };

export const HeroLive = ({ children, rootRef }) => {
  const [hovered, setHovered] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const mainX = useSpring(pointerX, SPRING_MAIN);
  const mainY = useSpring(pointerY, SPRING_MAIN);
  const echoX = useSpring(pointerX, SPRING_ECHO);
  const echoY = useSpring(pointerY, SPRING_ECHO);

  const mainOffX = useTransform(mainX, (v) => v - BLOB_SIZE / 2);
  const mainOffY = useTransform(mainY, (v) => v - BLOB_SIZE / 2);
  const echoOffX = useTransform(echoX, (v) => v - ECHO_SIZE / 2);
  const echoOffY = useTransform(echoY, (v) => v - ECHO_SIZE / 2);

  useEffect(() => {
    const root = rootRef?.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    const onMove = (e) => {
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pointerX.set(x);
      pointerY.set(y);
      normX.set((x / rect.width) * 2 - 1);
      normY.set((y / rect.height) * 2 - 1);
    };

    root.addEventListener("mouseenter", onEnter);
    root.addEventListener("mousemove", onMove);
    root.addEventListener("mouseleave", onLeave);
    return () => {
      root.removeEventListener("mouseenter", onEnter);
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("mouseleave", onLeave);
    };
  }, [rootRef, pointerX, pointerY, normX, normY]);

  return (
    <HeroMotionContext.Provider value={{ mx: normX, my: normY, hovered }}>
      {children}
      <div className="hero-trail" aria-hidden="true">
        <AnimatePresence>
          {hovered && (
            <motion.span
              key="echo"
              className="hero-trail__blob hero-trail__blob--echo"
              style={{
                width: ECHO_SIZE,
                height: ECHO_SIZE,
                x: echoOffX,
                y: echoOffY,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            />
          )}
          {hovered && (
            <motion.span
              key="main"
              className="hero-trail__blob"
              style={{
                width: BLOB_SIZE,
                height: BLOB_SIZE,
                x: mainOffX,
                y: mainOffY,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </div>
    </HeroMotionContext.Provider>
  );
};