import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/AnimatedSection";
import { projects } from "@/data/projects";

export const ProjectsSection = () => (
  <section id="projects" className="section">
    <div className="container section__grid">
      <div className="section__head section__head--sticky">
        <AnimatedSection animationType="fade-up">
          <span className="kicker">03 / Projects</span>
          <h2 className="h2">
            Things that <span className="accent">ship</span>
          </h2>
          <p className="sub">Selected builds. Full notes on the projects page.</p>
        </AnimatedSection>
      </div>

      <div>
        <div className="project-list">
          {projects.map((project, i) => (
            <AnimatedSection
              key={project.id}
              animationType="fade-up"
              delay={i * 70}
            >
              <Link to={`/projects#${project.id}`} className="project">
                <div className="project__meta">{project.tags.join(" · ")}</div>
                <h3 className="project__title">{project.title}</h3>
                <p className="project__desc">{project.oneLiner}</p>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animationType="fade-up" delay={120}>
          <Link to="/projects" className="btn" style={{ marginTop: "var(--space-lg)" }}>
            All projects
          </Link>
        </AnimatedSection>
      </div>
    </div>
  </section>
);
