import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomPointer } from "@/components/CustomPointer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { SkipLink } from "@/components/fx/SkipLink";
import { AnimatedSection } from "@/components/AnimatedSection";
import { projects } from "@/data/projects";

export const Projects = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return (
    <div style={{ position: "relative" }}>
      <SkipLink />
      <ScrollProgress />
      <CustomPointer />
      <Navbar />
      <main id="main">
        <header className="page-head">
          <div className="container">
            <span className="kicker">Index / Projects</span>
            <h1 className="page-head__title">Projects</h1>
            <p className="sub">Things I have built, in rough order of ambition.</p>
          </div>
        </header>

        <section className="section">
          <div className="container">
            <div className="project-detail-list">
              {projects.map((project) => (
                <AnimatedSection
                  key={project.id}
                  animationType="fade-up"
                >
                  <article id={project.id} className="project-detail">
                    <div className="project-detail__body">
                      <span className="project-detail__num">{project.number}</span>
                      <h2 className="project-detail__title">{project.title}</h2>
                      <p className="project-detail__desc">{project.description}</p>
                      <div className="project__tags">
                        {project.tags.map((tag) => (
                          <span className="tag tag--link" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="project-detail__links">
                        {project.demo && (
                          <a
                            className="btn btn--solid"
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Live site
                          </a>
                        )}
                        {project.github && (
                          <a
                            className="btn"
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View project
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="project__media">
                      <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};
