import { AnimatedSection } from "@/components/AnimatedSection";

const achievements = [
  {
    icon: "🏆",
    title: "Innov-A-Thon — Safalya 2025",
    desc: "Winner, 1st place and gold medal.",
  },
  {
    icon: "🥈",
    title: "GDG TechSprint 2025",
    desc: "Winner, 2nd place for Exceptional Technical Complexity.",
  },
  {
    icon: "🎯",
    title: "Smart India Hackathon 2025 & 2026",
    desc: "Only departmental team to clear the first internal round in 2026.",
  },
  {
    icon: "🤝",
    title: "Educ-A-Thon 2024",
    desc: "Participated in a national education-innovation hackathon.",
  },
];

const certifications = [
  { name: "Networking Basics", org: "CISCO" },
  { name: "Introduction to Cyber Security", org: "CISCO" },
];

const jokes = [
  "Master Procrastinator — gold level, 5★",
  "INF days of Pain and Suffering",
  "500+ problems solved on this tiny teeny blue planet",
];

export const AchievementsSection = () => (
  <section id="achievements" className="section">
    <div className="container section__grid">
      <div className="section__head section__head--sticky">
        <AnimatedSection animationType="fade-up">
          <span className="kicker">05 / Achievements</span>
          <h2 className="h2">
            Milestones and <span className="accent">recognition</span>
          </h2>
          <p className="sub">Awards, with the customary nonsense filed small.</p>
        </AnimatedSection>
      </div>

      <div>
        <div className="ach-list">
          {achievements.map((ach, i) => (
            <AnimatedSection key={ach.title} animationType="fade-up" delay={i * 70}>
              <div className="ach">
                <div className="ach__head">
                  <span className="ach__icon" aria-hidden="true">
                    {ach.icon}
                  </span>
                  <h3 className="ach__title">{ach.title}</h3>
                </div>
                <p className="ach__desc">{ach.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animationType="fade-up" delay={200}>
          <div className="card" style={{ marginTop: "var(--space-lg)" }}>
            <h3 className="card__title" style={{ marginBottom: "var(--space-sm)" }}>
              Certifications
            </h3>
            <div className="cert-list">
              {certifications.map((cert, i) => (
                <div className="cert" key={`${cert.name}-${i}`}>
                  <span className="cert__dot" />
                  <span className="cert__name">{cert.name}</span>
                  <span className="cert__org">{cert.org}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <ul className="joke-strip" aria-label="Footnotes">
          {jokes.map((joke) => (
            <li key={joke}>
              <em>{joke}</em>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
