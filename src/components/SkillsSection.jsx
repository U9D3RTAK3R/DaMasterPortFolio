import { AnimatedSection } from "@/components/AnimatedSection";
import { SkillsGraph } from "@/components/SkillsGraph";

export const SkillsSection = () => (
  <section id="skills" className="section section--alt">
    <div className="container section__grid">
      <div className="section__head section__head--sticky">
        <AnimatedSection animationType="fade-up">
          <span className="kicker">04 / Skills</span>
          <h2 className="h2">
            The technical <span className="accent">arsenal</span>
          </h2>
          <p className="sub">
            Languages, frameworks, and tools across the stack — hover a node to
            trace its connections.
          </p>
        </AnimatedSection>
      </div>

      <AnimatedSection animationType="fade-left" delay={120}>
        <SkillsGraph />
      </AnimatedSection>
    </div>
  </section>
);
