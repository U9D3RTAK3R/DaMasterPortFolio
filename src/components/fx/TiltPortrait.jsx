import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const SPRING = { stiffness: 150, damping: 18, mass: 0.6 };

export const TiltPortrait = ({ src, alt = "" }) => {
  const ref = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const lift = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(pointerY, [-1, 1], [16, -16]),
    SPRING,
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-1, 1], [-16, 16]),
    SPRING,
  );
  const translateZ = useSpring(useTransform(lift, [0, 1], [0, 46]), SPRING);
  const scale = useSpring(useTransform(lift, [0, 1], [1, 1.06]), SPRING);
  const glow = useSpring(useTransform(lift, [0, 1], [0, 0.55]), SPRING);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const vicinity = Math.max(rect.width, rect.height) * 0.85 + 180;
      const influence = Math.max(0, 1 - dist / vicinity);

      pointerX.set(clamp(dx / (rect.width / 2), -1, 1));
      pointerY.set(clamp(dy / (rect.height / 2), -1, 1));
      lift.set(influence);
    };
    const reset = () => {
      pointerX.set(0);
      pointerY.set(0);
      lift.set(0);
    };
    const handleOut = (e) => {
      if (!e.relatedTarget) reset();
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseout", handleOut);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleOut);
    };
  }, [pointerX, pointerY, lift]);

  return (
    <div ref={ref} className="tilt-portrait" data-cursor-hover>
      <motion.span
        className="tilt-portrait__glow"
        style={{ opacity: glow }}
        aria-hidden="true"
      />
      <motion.div
        className="tilt-portrait__inner"
        style={{
          rotateX,
          rotateY,
          translateZ,
          scale,
          transformStyle: "preserve-3d",
        }}
      >
        <span className="tilt-portrait__frame" aria-hidden="true" />
        <span className="tilt-portrait__edge" aria-hidden="true" />
        <img
          src={src}
          alt={alt}
          className="tilt-portrait__img"
          style={{ transform: "translateZ(30px)" }}
        />
      </motion.div>
    </div>
  );
};

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}
