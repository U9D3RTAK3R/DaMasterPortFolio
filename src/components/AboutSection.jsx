import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "./AnimatedSection";

const features = [
  {
    icon: "fullstack",
    title: "Full-Stack Developer",
    desc: "Building responsive, performant applications with React, Go, and modern frameworks.",
  },
  {
    icon: "game",
    title: "Anime and Gaming Enthusiast",
    desc: "Exploring new animes to binge watch, absolute-cinema games that leave you questioning life.",
  },
  {
    icon: "uiux",
    title: "UI/UX Architect",
    desc: "Crafting intuitive interfaces with focus on user experience and accessibility.",
  },
  {
    icon: "problemsolver",
    title: "Problem Solver",
    desc: "500+ computer problems solved across platforms. Algorithms & data structures masochist.",
  },
];

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="cyber-section"
      style={{ background: "var(--bg-card)" }}
    >
      <div className="cyber-grid-bg" />
      <div className="cyber-container">
        <AnimatedSection animationType="fade-up">
          <div className="section-eyebrow">About</div>
          <h2 className="section-title">
            System <em>Overview</em>
          </h2>
          <p className="section-sub">Aritra Saha — cybernetic profile</p>
        </AnimatedSection>

        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          <AnimatedSection animationType="fade-right">
            <div className="cyber-term" style={{ marginBottom: "2rem" }}>
              <div className="cyber-term-bar">
                <span className="cyber-term-dot r" />
                <span className="cyber-term-dot y" />
                <span className="cyber-term-dot g" />
                <span className="cyber-term-fname">aritra@dev ~ about.txt</span>
              </div>
              <div className="cyber-term-body" style={{ textAlign: "left" }}>
                <div>
                  <span className="tc">// Aritra Saha — Bio</span>
                </div>
                <div>
                  <span className="tk">"name"</span>:{" "}
                  <span className="ts">"Aritra Saha"</span>,
                </div>
                <div>
                  <span className="tk">"role"</span>:{" "}
                  <span className="ts">
                    "Full-Stack Developer / Anime Nerd & Gamer"
                  </span>
                  ,
                </div>
                <div>
                  <span className="tk">"location"</span>:{" "}
                  <span className="ts">"Kolkata, India"</span>,
                </div>
                <div>
                  <span className="tk">"status"</span>:{" "}
                  <span className="tb">"actively_building"</span>
                  <span className="cyber-cur" />
                </div>
              </div>
            </div>

            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.9rem",
                color: "#8888aa",
                lineHeight: 1.7,
                textAlign: "left",
              }}
            >
              Starting out in web development, I specialize in grasping the
              problem and creating responsive, accessible, and performant
              applications using modern technologies. I'm passionate about
              elegant solutions and constantly learning new technologies.
            </p>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
              <a href="#contact" className="cyber-button">
                CONNECT
              </a>
              <a
                href="/resume.pdf"
                download
                className="cyber-button cyber-button-gold"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                RESUME
              </a>
            </div>
          </AnimatedSection>

          <StaggerContainer className="cyber-features" staggerDelay={0.1}>
            {features.map((f, i) => (
              <StaggerItem key={i}>
                <div
                  className="cyber-card"
                  style={{
                    padding: "1.2rem",
                    marginBottom: "0.8rem",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.8rem",
                    }}
                  >
                    <img
                      src={`/icons/${f.icon}.gif`}
                      alt={f.title}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 4,
                        objectFit: "contain",
                      }}
                    />
                    <div>
                      <h4
                        style={{
                          fontFamily: "'Orbitron', monospace",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "#e0e0ff",
                          marginBottom: 2,
                        }}
                      >
                        {f.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontSize: "0.8rem",
                          color: "#8888aa",
                        }}
                      >
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
