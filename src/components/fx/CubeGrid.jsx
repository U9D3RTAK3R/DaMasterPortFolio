import { useEffect, useRef, useState } from "react";

const COLS = 12;
const ROWS = 9;
const TOTAL = COLS * ROWS;

export const CubeGrid = ({ hoverIndex = -1 }) => {
  const [lit, setLit] = useState(() => new Set([13, 26, 44, 67, 82]));
  const frame = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf;
    const tick = () => {
      frame.current += 1;
      if (frame.current % 14 === 0) {
        setLit((prev) => {
          const next = new Set(prev);
          const drop = [...next][Math.floor(Math.random() * next.size)];
          next.delete(drop);
          next.add(Math.floor(Math.random() * TOTAL));
          return next;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="cube-grid" aria-hidden="true">
      {Array.from({ length: TOTAL }, (_, i) => (
        <span
          key={i}
          className={`cube-grid__tile${lit.has(i) ? " is-lit" : ""}${i === hoverIndex ? " is-hover" : ""}`}
        />
      ))}
    </div>
  );
};

export const DotGrid = () => <div className="dot-grid" aria-hidden="true" />;
