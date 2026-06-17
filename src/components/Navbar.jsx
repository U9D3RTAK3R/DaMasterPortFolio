import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Achievements", href: "#achievements" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = document.querySelectorAll("section[id]");
      let current = "hero";
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        background: scrolled ? "rgba(6,6,14,0.92)" : "rgba(6,6,14,0.5)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(0,212,255,0.1)"
          : "1px solid transparent",
        transition: "all 0.35s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 56,
        }}
      >
        <a
          href="#hero"
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "0.9rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "#e0e0ff",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <img src="/logo.svg" alt="Logo" style={{ height: 24 }} />
          <span
            style={{
              color: "#00d4ff",
              textShadow: "0 0 8px rgba(0,212,255,0.5)",
            }}
          >
            //
          </span>{" "}
          ARITRA
        </a>

        {/* DESKTOP NAV */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <nav className="nav-desktop">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.75rem",
                  fontWeight: item.name === "Resume" ? 700 : 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color:
                    active === item.href.replace("#", "")
                      ? item.name === "Resume"
                        ? "#ffd700"
                        : "#00d4ff"
                      : item.name === "Resume"
                        ? "rgba(255,215,0,0.6)"
                        : "#8888aa",
                  transition: "color 0.25s",
                  position: "relative",
                  textShadow:
                    active === item.href.replace("#", "")
                      ? item.name === "Resume"
                        ? "0 0 8px rgba(255,215,0,0.4)"
                        : "0 0 8px rgba(0,212,255,0.4)"
                      : "none",
                  border:
                    item.name === "Resume"
                      ? "1px solid rgba(255,215,0,0.2)"
                      : "none",
                  borderRadius: 4,
                  padding: item.name === "Resume" ? "4px 10px" : 0,
                }}
                onMouseEnter={(e) => {
                  if (active !== item.href.replace("#", "")) {
                    e.currentTarget.style.color =
                      item.name === "Resume" ? "#ffd700" : "#e0e0ff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (active !== item.href.replace("#", "")) {
                    e.currentTarget.style.color =
                      item.name === "Resume"
                        ? "rgba(255,215,0,0.6)"
                        : "#8888aa";
                  }
                }}
              >
                {item.name === "Resume"
                  ? `${item.name.toUpperCase()} ↗`
                  : `[${item.name.toUpperCase()}]`}
              </a>
            ))}
          </nav>

          {/* HAMBURGER */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="hamburger-btn"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              color: "#e0e0ff",
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <style>{`
        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .nav-desktop { display: flex !important; }
          .hamburger-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>

      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100dvh",
            zIndex: 101,
            background: "rgb(4,4,10)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            padding: "4.5rem 2rem 2rem",
            overflowY: "auto",
            animation: "menu-fade-in 0.2s ease-out",
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "none",
              border: "none",
              color: "#8888aa",
              cursor: "pointer",
              padding: 8,
              zIndex: 1,
            }}
          >
            <X size={32} />
          </button>

          <div
            style={{
              fontFamily: "'Orbitron',monospace",
              fontSize: "0.55rem",
              color: "rgba(0,212,255,0.2)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: "1rem",
              marginTop: "0.5rem",
            }}
          >
            NAVIGATION
          </div>

          {navItems.map((item) => {
            const isActive = active === item.href.replace("#", "");
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: isActive
                    ? 700
                    : item.name === "Resume"
                      ? 600
                      : 400,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: isActive
                    ? item.name === "Resume"
                      ? "#ffd700"
                      : "#00d4ff"
                    : item.name === "Resume"
                      ? "rgba(255,215,0,0.5)"
                      : "#8888aa",
                  padding: "12px 24px",
                  transition: "all 0.2s",
                  textShadow: isActive
                    ? item.name === "Resume"
                      ? "0 0 12px rgba(255,215,0,0.3)"
                      : "0 0 12px rgba(0,212,255,0.3)"
                    : "none",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color =
                      item.name === "Resume" ? "#ffd700" : "#e0e0ff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color =
                      item.name === "Resume"
                        ? "rgba(255,215,0,0.5)"
                        : "#8888aa";
                  }
                }}
              >
                {item.name}
                {item.name === "Resume" ? " ↗" : ""}
              </a>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes menu-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </nav>
  );
};
