import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";

const achievements = [
  {
    icon: "🏆",
    title: "GDG TMSL + Safalya Winner",
    desc: "Won 2nd + 1st Prize respectively for the hackathons among 250+ teams.",
  },
  {
    icon: "⭐",
    title: "Master Procrastinator",
    desc: "Gold Level (5 Star) in Procrastination.",
  },
  {
    icon: "🎯",
    title: "Problem Solving",
    desc: "Strong algorithmic thinking with 500+ problems solved over the course I have walked on this tiny teeny blue planet.",
  },
  {
    icon: "🤝",
    title: "Community Leadership",
    desc: "Active member of social clubs, community initiatives, debates, and management skills",
  },
];

const certifications = [
  { name: "Coming of the Soon~~", org: "TBC" },
  { name: "Coming of the Soon~~", org: "TBC" },
  { name: "Coming of the Soon~~", org: "TBC" },
  { name: "Coming of the Soon~~", org: "TBC" },
  { name: "Coming of the Soon~~", org: "TBC" },
  { name: "Coming of the Soon~~", org: "TBC" },
];

export const AchievementsSection = () => {
  return (
    <section
      id="achievements"
      className="cyber-section"
      style={{ background: "var(--bg-card)" }}
    >
      <div className="cyber-container">
        <AnimatedSection animationType="slide-graph">
          <div className="section-eyebrow">Achievements</div>
          <h2 className="section-title">
            Milestones & <em>Recognition</em>
          </h2>
          <p className="section-sub">
            Awards, accomplishments, and continuous development
          </p>
        </AnimatedSection>

        <div className="ach-grid" style={{ gap: 14, marginBottom: "1.85rem" }}>
          {achievements.map((ach, i) => (
            <motion.div
              key={i}
              style={{ display: "flex" }}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
                <div className="cyber-ach" style={{ textAlign: "left", height: "100%", display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: "0.6rem",
                  }}
                >
                  <span style={{ fontSize: "1.3rem" }}>{ach.icon}</span>
                  <h4
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#e0e0ff",
                    }}
                  >
                    {ach.title}
                  </h4>
                </div>
                <p
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.95rem",
                    color: "#8888aa",
                    lineHeight: 1.6,
                    flex: 1,
                  }}
                >
                  {ach.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatedSection animationType="slide-graph" delay={250}>
          <div
            className="cyber-card"
            style={{ padding: "1.8rem", textAlign: "left" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: "1.1rem",
                paddingBottom: "0.85rem",
                borderBottom: "1px solid rgba(0,212,255,0.08)",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>📜</span>
              <h4
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#e0e0ff",
                }}
              >
                Certifications
              </h4>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "0 2rem",
              }}
            >
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 0",
                    borderBottom:
                      i < certifications.length - 1
                        ? "1px solid rgba(0,212,255,0.05)"
                        : "none",
                    fontSize: "0.9rem",
                    color: "#8888aa",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#e0e0ff";
                    e.currentTarget.style.transform = "translateX(3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#8888aa";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: "#00d4ff",
                      flexShrink: 0,
                      boxShadow: "0 0 6px rgba(0,212,255,0.5)",
                    }}
                  />
                  <span style={{ flex: 1 }}>{cert.name}</span>
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "0.6rem",
                      fontWeight: 600,
                      color: "#8888aa",
                      textAlign: "right",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cert.org}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      <style>{`
        .ach-grid {
          display: grid !important;
          grid-template-columns: 1fr !important;
        }
        @media (min-width: 640px) {
          .ach-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .ach-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
};
