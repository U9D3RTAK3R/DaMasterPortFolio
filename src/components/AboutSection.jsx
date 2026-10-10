import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";
import { TiltPortrait } from "@/components/fx/TiltPortrait";

const features = [
  { icon: "fullstack", title: "Full-Stack + AI/ML", desc: "React, YOLO, Python" },
  { icon: "uiux", title: "UI/UX", desc: "Accessible, fast, considered" },
  { icon: "problemsolver", title: "Problem Solver", desc: "500+ problems solved" },
  { icon: "game", title: "Anime & Games", desc: "Off the clock" },
];

export const AboutSection = () => {
  return (
    <section id="about" className="section">
      <div className="container section__grid">
        <div className="section__head section__head--sticky">
          <AnimatedSection animationType="fade-up">
            <span className="kicker">01 / About</span>
            <h2 className="h2">
              A developer who reads the <span className="accent">fine print</span>
            </h2>
            <p className="sub">
              Undercover full-stack developer and AI/ML enthusiast, happy untangling a hard problem.<br></br>
              Learning essentials of CybSec.
            </p>
          </AnimatedSection>
        </div>

        <div className="about-content">
          <StaggerContainer className="feature-list" staggerDelay={0.08}>
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="feature">
                  <img
                    className="feature__icon"
                    src={`/icons/${feature.icon}.gif`}
                    alt=""
                    loading="lazy"
                  />
                  <div>
                    <h3 className="feature__title">{feature.title}</h3>
                    <p className="feature__desc">{feature.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection animationType="fade-left" delay={120}>
            <TiltPortrait src="/PFP_Pixel_Edit_Final.webp" alt="Aritra Saha" />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
