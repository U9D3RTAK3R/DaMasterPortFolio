import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";

const stats = [
  { value: "500+", label: "Problems Solved" },
  { value: "5+", label: "Projects Built" },
  { value: "INF", label: "Pain and Suffering" },
  { value: "5★", label: "Focusing Skills" },
];

const typingTexts = [
  "Full-Stack Developer",
  "Anime Nerd/Gamer",
  "UI/UX Enthusiast",
  "Problem Solver",
];

export const HeroSection = () => {
  const [typing, setTyping] = useState({
    text: "",
    index: 0,
    char: 0,
    deleting: false,
  });

  useEffect(() => {
    const tick = () => {
      setTyping((prev) => {
        const word = typingTexts[prev.index];
        if (!prev.deleting) {
          if (prev.char < word.length) {
            return {
              ...prev,
              text: word.slice(0, prev.char + 1),
              char: prev.char + 1,
            };
          }
          return { ...prev, deleting: true };
        } else {
          if (prev.char > 0) {
            return {
              ...prev,
              text: word.slice(0, prev.char - 1),
              char: prev.char - 1,
            };
          }
          return {
            ...prev,
            deleting: false,
            index: (prev.index + 1) % typingTexts.length,
          };
        }
      });
    };

    const speed = typing.deleting ? 30 : 70;
    const pause =
      typing.deleting && typing.char === 0
        ? 500
        : !typing.deleting && typing.char === typingTexts[typing.index].length
          ? 2000
          : speed;

    const timer = setTimeout(tick, pause);
    return () => clearTimeout(timer);
  }, [typing]);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "7rem 2rem 4rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="cyber-grid-bg" />
      <div
        className="cyber-orb"
        style={{
          width: 500,
          height: 500,
          top: -150,
          left: -200,
          background: "rgba(0,212,255,0.06)",
        }}
      />
      <div
        className="cyber-orb"
        style={{
          width: 400,
          height: 400,
          bottom: -100,
          right: -150,
          background: "rgba(255,0,230,0.04)",
        }}
      />

      <div className="cyber-container" style={{ width: "100%" }}>
        <div
          className="hero-grid"
          style={{
            display: "flex",
            gap: "3rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            className="hero-grid-main"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              flex: 1,
              minWidth: 0,
              textAlign: "left",
            }}
          >
            <AnimatedSection animationType="fade-up" delay={100}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    color: "#8888aa",
                    letterSpacing: "0.15em",
                    border: "1px solid rgba(0,212,255,0.15)",
                    padding: "3px 8px",
                    borderRadius: 2,
                  }}
                >
                  <span style={{ color: "#00d4ff" }}>$</span> SYSTEM.READY
                </span>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#00d4ff",
                    display: "inline-block",
                    boxShadow: "0 0 8px rgba(0,212,255,0.6)",
                    animation: "pulse 2s infinite",
                  }}
                />
              </div>
            </AnimatedSection>

            <AnimatedSection animationType="fade-up" delay={200}>
              <p
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.55rem",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  color: "#ff00e6",
                  marginBottom: "0.85rem",
                  textShadow: "0 0 10px rgba(255,0,230,0.3)",
                }}
              >
                {"<"}FULL-STACK {"/>"} {"<"}ML {"/>"} {"<"}UI/UX {"/>"}
              </p>
            </AnimatedSection>

            <AnimatedSection animationType="fade-up" delay={300}>
              <h1
                className="glitch"
                data-text="ARITRA SAHA"
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "clamp(2rem, 5.5vw, 4rem)",
                  fontWeight: 900,
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "#e0e0ff",
                  marginBottom: "0.5rem",
                }}
              >
                ARITRA{" "}
                <span
                  style={{
                    color: "#00d4ff",
                    textShadow: "0 0 15px rgba(0,212,255,0.6)",
                  }}
                >
                  SAHA
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection animationType="fade-up" delay={400}>
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "#8888aa",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    color: "#00d4ff",
                    textShadow: "0 0 8px rgba(0,212,255,0.4)",
                  }}
                >
                  $
                </span>
                <span>{typing.text}</span>
                <span className="cyber-cur" />
              </div>
            </AnimatedSection>

            <AnimatedSection animationType="fade-up" delay={500}>
              <p
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 300,
                  color: "#8888aa",
                  lineHeight: 1.7,
                  maxWidth: 540,
                  marginBottom: "0.85rem",
                }}
              >
                I build full-stack applications, an enthusiast of anime and
                games, and immersive digital experiences. Currently crafting the
                future with React, Flutter, Go, Python, and a passion for clean
                architecture as well as exploring other low level languages
              </p>
            </AnimatedSection>

            <AnimatedSection animationType="fade-up" delay={600}>
              <div
                className="hero-stats"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 8,
                  maxWidth: 480,
                  marginBottom: "2rem",
                }}
              >
                {stats.map((stat, i) => (
                  <div key={i} className="cyber-stat">
                    <div className="cyber-stat-n">{stat.value}</div>
                    <div className="cyber-stat-l">{stat.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection animationType="fade-up" delay={700}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <a
                  href="#contact"
                  className="cyber-button"
                  style={{ fontSize: "0.65rem" }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238z" />
                  </svg>
                  INITIATE CONNECTION
                </a>
                <a
                  href="https://github.com/U9D3RTAK3R"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-button cyber-button-magenta"
                  style={{ fontSize: "0.65rem" }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" />
                  </svg>
                  VIEW SOURCE
                </a>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection animationType="fade-left" delay={400}>
            <div className="profile-frame">
              <img
                src="/PFP_Pixel_Edit.png"
                alt="Aritra Saha"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
                style={{ display: "block" }}
              />
              <div
                className="profile-placeholder-icon"
                style={{ display: "none" }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00d4ff"
                  strokeWidth="1.5"
                  opacity={0.6}
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M20 21a8 8 0 1 0-16 0" />
                </svg>
                <span
                  style={{
                    fontFamily: "'Share Tech Mono',monospace",
                    fontSize: "0.4rem",
                    color: "#8888aa",
                    letterSpacing: "0.08em",
                  }}
                >
                  ADD IMAGE
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          opacity: 0.3,
        }}
      >
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.45rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            color: "#8888aa",
          }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 24,
            background: "linear-gradient(to bottom, #00d4ff, transparent)",
          }}
        />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        .ib {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 6px;
          background: rgba(12,12,26,0.6);
          border: 1px solid rgba(0,212,255,0.08);
          transition: all 0.28s;
        }
        .ib:hover {
          border-color: rgba(0,212,255,0.3);
          background: rgba(0,212,255,0.05);
          transform: translateY(-2px);
        }
        .ib:hover svg { fill: #00d4ff; }
      `}</style>
    </section>
  );
};
