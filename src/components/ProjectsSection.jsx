import { useRef } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { motion, useSpring, useTransform } from "framer-motion";

const projects = [
  {
    title: "Cognify — AI Learning Platform",
    desc: "AI-powered adaptive learning platform with gamification, educator analytics, and real-time progress tracking.",
    image: "/projects/project3.png",
    tags: ["Flutter", "GoLang", "Firebase", "Gemini API", "GCP"],
    demo: "https://cognify.localplayer.dev/",
    github: "https://github.com/U9D3RTAK3R/Cognify",
  },
  {
    title: "Portfolio System v2",
    desc: "This Cyberpunk-styled portfolio with Three.js 3D visuals, framer-motion animations, and custom cursor system.",
    image: "/projects/project4.png",
    tags: ["React", "Three.js", "Framer Motion", "TailwindCSS"],
    demo: "https://aritra.is-a.dev",
    github: "https://github.com/U9D3RTAK3R/DaMasterPortFolio",
  },
  {
    title: "DaMasterStroke Retro",
    desc: "Interactive old-retro style portfolio with real-time terminal emulation, command parsing, and retro UI and old-computer feels",
    image: "/projects/project2.png",
    tags: ["React", "Node.js", "TailwindCSS"],
    demo: "https://aritra.is-a-good.dev",
    github: "https://github.com/U9D3RTAK3R/DaMasterPortfolioRetro",
  },
];

function TiltCard({ project }) {
  const ref = useRef();
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="cyber-card"
    >
      <div style={{ position: "relative", overflow: "hidden", height: 160 }}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.7s cubic-bezier(.165,.84,.44,1)",
          }}
          className="hover-scale"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 40%, rgba(6,6,14,0.9) 100%)",
          }}
        />
      </div>
      <div style={{ padding: "1.25rem", textAlign: "left" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 8,
            marginBottom: "0.75rem",
          }}
        >
          <h3
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#e0e0ff",
              lineHeight: 1.4,
              flex: 1,
            }}
          >
            {project.title}
          </h3>
          <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  background: "rgba(0,212,255,0.05)",
                  border: "1px solid rgba(0,212,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#00d4ff";
                  e.currentTarget.style.background = "rgba(0,212,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,212,255,0.12)";
                  e.currentTarget.style.background = "rgba(0,212,255,0.05)";
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#8888aa">
                  <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" />
                </svg>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  background: "rgba(0,212,255,0.05)",
                  border: "1px solid rgba(0,212,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#00d4ff";
                  e.currentTarget.style.background = "rgba(0,212,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,212,255,0.12)";
                  e.currentTarget.style.background = "rgba(0,212,255,0.05)";
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8888aa"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            marginBottom: "0.75rem",
          }}
        >
          {project.tags.map((tag, i) => (
            <span key={i} className="cyber-tag">
              {tag}
            </span>
          ))}
        </div>
        <p
          className="project-desc"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.95rem",
            color: "#8888aa",
            lineHeight: 1.6,
          }}
        >
          {project.desc}
        </p>
      </div>

      <style>{`
        .hover-scale:hover { transform: scale(1.05); }
        .project-desc {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .cyber-card:hover .project-desc {
          -webkit-line-clamp: unset;
          overflow: visible;
        }
      `}</style>
    </motion.div>
  );
}

export const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="cyber-section"
      style={{ background: "var(--bg-card)" }}
    >
      <div className="cyber-grid-bg" />
      <div
        className="cyber-orb"
        style={{
          width: 350,
          height: 350,
          bottom: -80,
          left: -120,
          background: "rgba(0,212,255,0.04)",
        }}
      />
      <div className="cyber-container">
        <AnimatedSection animationType="fade-up">
          <div className="section-eyebrow">Projects</div>
          <h2 className="section-title">
            Deployed <em>Systems</em>
          </h2>
          <p className="section-sub">
            Production applications, experiments, and creative builds
          </p>
        </AnimatedSection>

        <div className="projects-grid" style={{ gap: 16 }}>
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <TiltCard project={project} />
            </motion.div>
          ))}
        </div>

        <AnimatedSection animationType="fade-up" delay={600}>
          <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.8rem",
                fontStyle: "italic",
                color: "#8888aa",
                marginBottom: "1.25rem",
              }}
            >
              These are just highlights. Explore all repositories and
              experiments.
            </p>
            <a
              href="https://github.com/U9D3RTAK3R"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-button"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" />
              </svg>
              VIEW ALL ON GITHUB
            </a>
          </div>
        </AnimatedSection>
      </div>

      <style>{`
        .projects-grid {
          display: grid !important;
          grid-template-columns: 1fr !important;
        }
        @media (min-width: 640px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
};
