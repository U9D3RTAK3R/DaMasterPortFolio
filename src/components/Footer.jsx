import { useState, useRef, useEffect } from "react";
import { AnimatedSection } from "./AnimatedSection";

const msgs = [
  "SYSTEM.ONLINE",
  "HACK.THE.PLANET",
  "ACCESS.GRANTED",
  "SHELL.ACTIVE",
  "GHOST.MODE",
  "FIREWALL.BYPASSED",
  "NEURAL.LINK.UP",
  "DEEPER.STILL",
];

const colors = ["#00d4ff", "#ff00e6", "#ffd700", "#00fff0", "#ff4488"];

const responses = {
  help: "available: whoami  ls  pwd  uptime  sudo  date  matrix  67  creds  clear  exit",
  whoami: "aritra",
  ls: "about  experience  projects  skills  achievements  resume  contact",
  pwd: "/home/aritra/portfolio",
  uptime: "3.14 days of continuous uptime. no crashes. no sleep. no sanity.",
  sudo: "nice try, bish.",
  date: () => new Date().toLocaleString(),
  matrix: "follow the white rabbit and you shall face an ending like Subaru",
  67: "the answer to life, the universe, and everything.",
  creds: "you found the secret. but did you find the secret to life?",
  "sudo rm matrix": "matrix.exe terminated. reality restored.",
};

export const Footer = () => {
  const [i, setI] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [dotC, setDotC] = useState(colors[0]);
  const [out, setOut] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const [key, setKey] = useState(0);
  const [matrix, setMatrix] = useState(false);

  const activateMatrix = () => {
    setMatrix(true);
    document.documentElement.classList.add("matrix-active");
  };

  const deactivateMatrix = () => {
    setMatrix(false);
    document.documentElement.classList.remove("matrix-active");
  };

  useEffect(() => {
    if (!matrix) return;
    const interval = setInterval(() => setKey((k) => k + 1), 50);
    return () => clearInterval(interval);
  }, [matrix]);

  const cycle = () => {
    setGlitch(true);
    setTimeout(() => {
      setI((j) => (j + 1) % msgs.length);
      setGlitch(false);
    }, 180);
  };

  const handleCmd = (e) => {
    if (e.key !== "Enter") return;
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setOut("");
      setInput("");
      return;
    }
    if (cmd === "exit") {
      deactivateMatrix();
      setOut("");
      setShowInput(false);
      setInput("");
      return;
    }
    if (cmd === "sudo rm matrix") {
      deactivateMatrix();
      setOut(`$ ${cmd}\n> matrix.exe terminated. reality restored.`);
      setInput("");
      return;
    }

    const res =
      typeof responses[cmd] === "function"
        ? responses[cmd]()
        : responses[cmd] || `unknown: ${cmd}`;
    setOut(`$ ${cmd}\n> ${res}`);
    setInput("");
    if (cmd === "matrix") activateMatrix();
  };

  return (
    <AnimatedSection animationType="fade-up">
      <footer
        style={{
          padding: "2.5rem 1rem",
          borderTop: "1px solid rgba(0,212,255,0.06)",
          position: "relative",
          overflow: "hidden",
        }}
        onClick={() => {
          if (inputRef.current) inputRef.current.focus();
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(0,212,255,0.01) 30px, rgba(0,212,255,0.01) 31px)",
            pointerEvents: "none",
          }}
        />

        {matrix && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              color: "#00d4ff",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.4rem",
              opacity: 0.12,
              overflow: "hidden",
              lineHeight: "1.2",
            }}
            key={key}
          >
            {Array.from({ length: 80 }, (_, col) => (
              <span
                key={col}
                style={{
                  position: "absolute",
                  top: `${Math.random() * 100}%`,
                  left: `${(col / 80) * 100}%`,
                  writingMode: "vertical-rl",
                  animation: `matrix-fall ${2 + Math.random() * 3}s linear infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                {String.fromCharCode(0x30a0 + Math.random() * 96)}
              </span>
            ))}
          </div>
        )}

        <div
          className="cyber-container"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            {/* CLICKABLE STATUS BADGE */}
            <div
              onClick={cycle}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.7rem",
                color: "#8888aa",
                letterSpacing: "0.1em",
                cursor: "pointer",
                userSelect: "none",
                padding: "4px 12px",
                borderRadius: 4,
                border: "1px solid rgba(0,212,255,0.08)",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,212,255,0.25)";
                e.currentTarget.style.background = "rgba(0,212,255,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,212,255,0.08)";
                e.currentTarget.style.background = "transparent";
              }}
              title="click me"
            >
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setDotC(colors[Math.floor(Math.random() * colors.length)]);
                }}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: dotC,
                  display: "inline-block",
                  boxShadow: `0 0 8px ${dotC}`,
                  animation: "pulse-ft 2s infinite",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              />
              <span className={glitch ? "ft-glitch" : ""}>{msgs[i]}</span>
            </div>

            {/* ASNI ART */}
            <pre
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.35rem",
                lineHeight: 1.2,
                color: "rgba(0,212,255,0.35)",
                textAlign: "center",
                margin: 0,
                userSelect: "none",
              }}
            >
              {`  ╔══ DA_MASTER_PORTFOLIO ══╗
  ║  ⚡ v2.0  ACTIVE        ║`}
            </pre>

            {/* HIDDEN TERMINAL — double-click copyright to reveal */}
            {showInput && (
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.6rem",
                  color: "#00d4ff",
                  width: "100%",
                  maxWidth: 320,
                }}
              >
                {out && (
                  <pre
                    style={{
                      margin: "0 0 4px 0",
                      whiteSpace: "pre-wrap",
                      color: "#8888aa",
                      fontSize: "0.55rem",
                    }}
                  >
                    {out}
                  </pre>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ color: "#00d4ff" }}>$</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCmd}
                    style={{
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid rgba(0,212,255,0.2)",
                      outline: "none",
                      color: "#e0e0ff",
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "0.6rem",
                      flex: 1,
                      padding: "2px 4px",
                    }}
                    placeholder="type help..."
                    spellCheck={false}
                    autoComplete="off"
                  />
                </div>
              </div>
            )}

            <div
              style={{
                height: 1,
                width: 120,
                background: "rgba(0,212,255,0.08)",
                margin: "0.2rem 0",
              }}
            />

            <p
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.95rem",
                color: "#8888aa",
                cursor: "pointer",
                userSelect: "none",
              }}
              onDoubleClick={() => setShowInput((s) => !s)}
              title="double-click"
            >
              Made with Pain and Suffering O_O)b A.S.
            </p>
            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.9rem",
                color: "rgba(136,136,170,0.5)",
              }}
            >
              {matrix
                ? "> red pill swallowed. reality is optional."
                : "Powered to you by React, Three.js & Electric Neon"}
            </p>
            <p
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.5rem",
                color: "rgba(136,136,170,0.25)",
                letterSpacing: "0.05em",
              }}
            >
              Icons by{" "}
              <a
                href="https://www.flaticon.com/free-animated-icons/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(0,212,255,0.4)" }}
              >
                Freepik - Flaticon
              </a>
            </p>
          </div>
        </div>

        <style>{`
          @keyframes pulse-ft {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.8); }
          }
          .ft-glitch {
            animation: ft-glitch-fx 0.18s ease-in-out;
          }
          @keyframes ft-glitch-fx {
            0% { opacity: 1; transform: translate(0); }
            25% { opacity: 0.6; transform: translate(-2px, 1px); }
            50% { opacity: 0.8; transform: translate(2px, -1px); }
            75% { opacity: 0.7; transform: translate(-1px, 2px); }
            100% { opacity: 1; transform: translate(0); }
          }
          @keyframes matrix-fall {
            0% { transform: translateY(-100vh); opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
        `}</style>
      </footer>
    </AnimatedSection>
  );
};
