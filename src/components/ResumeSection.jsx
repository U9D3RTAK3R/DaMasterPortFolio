import { Download } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

const contents = ["Education", "Skills", "Projects", "Achievements"];

export const ResumeSection = () => (
  <section id="resume" className="section">
    <div className="container">
      <AnimatedSection animationType="fade-up">
        <div className="resume-panel">
          <div className="resume-panel__body">
            <span className="kicker">06 / Résumé</span>
            <h2 className="resume-panel__title">
              The complete <span className="accent">picture</span>
            </h2>
            <p className="resume-panel__sub">
              Education, skills, projects and awards: All laid out in one document. <br></br>
              The fastest way to get the whole story.
            </p>
            <ul className="resume-panel__list">
              {contents.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="resume-panel__actions">
            <a
              href="/resume.pdf"
              download
              className="btn btn--solid btn--lg"
            >
              <Download size={16} />
              Download résumé
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--lg"
            >
              Open in new tab ↗
            </a>
            <span className="resume-panel__note">PDF · one page</span>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);
