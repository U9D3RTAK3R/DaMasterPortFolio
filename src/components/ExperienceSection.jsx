import { useState } from "react";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "./AnimatedSection";

const experiences = [
  {
    period: "JULY 2025 – PRESENT",
    title: "Open-Source Contributor",
    company: "Independent · REMOTE",
    logo: "https://cdn.simpleicons.org/github/e0e0ff",
    details: ["Contributed to 2 major open-source repositories."],
  },
  {
    period: "DEC 2077 · REDACTED",
    title: "REDACTED",
    company: "REDACTED · REMOTE",
    logo: "https://cdn.simpleicons.org/github/e0e0ff",
    details: ["REDACTED"],
  },
];

function ExpCard({ exp }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="cyber-exp cyber-tl-item">
      <div className="cyber-tl-dot" />
      <div style={{ display: "flex", gap: "1.1rem", alignItems: "flex-start" }}>
        <div
          style={{
            width: 42,
            height: 42,
            flexShrink: 0,
            background: "var(--bg-surface)",
            border: "1px solid rgba(0,212,255,0.1)",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 5,
          }}
        >
          <img
            src={exp.logo}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            loading="lazy"
          />
        </div>
        <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
          <div className="cyber-exp-dt" style={{ marginBottom: 4 }}>
            {exp.period}
          </div>
          <h3
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#e0e0ff",
              marginBottom: 2,
            }}
          >
            {exp.title}
          </h3>
          <p
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.65rem",
              fontWeight: 600,
              color: "#8888aa",
              marginBottom: "0.3rem",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
            }}
          >
            {exp.company}
          </p>

          <button onClick={() => setOpen(!open)} className="exp-toggle-btn">
            {open ? "Show Less" : "View Details"}{" "}
            <span className="arr">{open ? "↑" : "↓"}</span>
          </button>

          <div className={`exp-details ${open ? "open" : ""}`}>
            <div className="exp-details-inner">
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {exp.details.map((d, i) => (
                  <div key={i} className="cyber-bul">
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="cyber-section"
      style={{ background: "var(--bg-deep)" }}
    >
      <div className="cyber-grid-bg" />
      <div
        className="cyber-orb"
        style={{
          width: 400,
          height: 400,
          top: "30%",
          right: -150,
          background: "rgba(255,0,230,0.03)",
        }}
      />
      <div className="cyber-container">
        <AnimatedSection animationType="fade-up">
          <div className="section-eyebrow">Experience</div>
          <h2 className="section-title">
            Professional <em>Journey</em>
          </h2>
          <p className="section-sub">
            Engineering roles, open-source contributions, and community work
          </p>
        </AnimatedSection>

        <div
          className="cyber-tl"
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <StaggerContainer staggerDelay={0.15}>
            {experiences.map((exp, i) => (
              <StaggerItem key={i}>
                <ExpCard exp={exp} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
