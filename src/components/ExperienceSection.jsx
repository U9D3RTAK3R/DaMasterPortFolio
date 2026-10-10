import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";

const experiences = [
  {
    period: "Dec 2024 – Present",
    title: "CacheCrew",
    company: "Hackathon Team · Kolkata",
    tag: "Cofounder",
    details: [
      "Co-founded and lead CacheCrew, the hackathon team, since first year of college.",
      "Assemble ideas, scope problems, and ship projects to submission under deadline.",
    ],
  },
  {
    period: "July 2025 – Present",
    title: "Open-Source Contributor",
    company: "Independent · Remote",
    details: [
      "Contributed to two major open-source repositories.",
      "Diagnosed issues, opened pull requests, and reviewed changes.",
    ],
  },
  {
    period: "Aug 2026 – Present",
    title: "Home Server",
    company: "Independent · Kolkata",
    details: [
      "Setup a home server using my old laptop.",
      "Runs on CasaOS and uses services like Jellyfin, Adhome Blocker, Immich."
    ],
  },
  {
    period: "Dec 2077 · Redacted",
    title: "REDACTED",
    company: "REDACTED · Remote",
    details: ["REDACTED"],
  },
];

function ExpItem({ exp }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="tl-item">
      <div className="tl-item__period">{exp.period}</div>
      <h3 className="tl-item__title">
        {exp.title}
        {exp.tag && <span className="tl-item__tag">{exp.tag}</span>}
      </h3>
      <div className="tl-item__org">{exp.company}</div>
      <div className="tl-item__body">
        <button
          type="button"
          className="tl-toggle"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Hide details ↑" : "View details ↓"}
        </button>
        <div className={`tl-details${open ? " open" : ""}`}>
          <div className="tl-details__inner">
            {exp.details.map((detail) => (
              <div className="tl-bullet" key={detail}>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const ExperienceSection = () => (
  <section id="experience" className="section section--alt">
    <div className="container section__grid">
      <div className="section__head section__head--sticky">
        <AnimatedSection animationType="fade-up">
          <span className="kicker">02 / Experience</span>
          <h2 className="h2">
            Roles and <span className="accent">contributions</span>
          </h2>
          <p className="sub">Open-source work and the occasional redaction.</p>
        </AnimatedSection>
      </div>

      <AnimatedSection animationType="fade-left" delay={120}>
        <div className="timeline">
          {experiences.map((exp) => (
            <ExpItem key={exp.title + exp.period} exp={exp} />
          ))}
        </div>
      </AnimatedSection>
    </div>
  </section>
);
