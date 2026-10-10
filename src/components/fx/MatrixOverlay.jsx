import { useEffect, useState } from "react";

const COLS = 60;

export const MatrixOverlay = ({ active }) => {
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setSeed((s) => s + 1), 90);
    return () => clearInterval(id);
  }, [active]);

  if (!active) return null;

  return (
    <div className="matrix-overlay" aria-hidden="true" key={seed}>
      {Array.from({ length: COLS }, (_, col) => (
        <span
          key={col}
          style={{
            top: `${Math.random() * 40}%`,
            left: `${(col / COLS) * 100}%`,
            animationDuration: `${2.4 + Math.random() * 3}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          {String.fromCharCode(0x30a0 + Math.random() * 96)}
        </span>
      ))}
    </div>
  );
};
