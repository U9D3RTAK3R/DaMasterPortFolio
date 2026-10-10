import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import { CubeGrid, DotGrid } from "@/components/fx/CubeGrid";
import { AnimatedSection } from "@/components/AnimatedSection";
import { HeroLive } from "@/components/fx/HeroLive";
import { useHeroMotion } from "@/components/fx/HeroMotion";

const GRID_COLS = 12;
const GRID_ROWS = 9;

const BG_PX = 22;
const BG_PY = 14;
const FG_PX = 10;
const FG_PY = 6;

const SPRING_PARALLAX = { stiffness: 60, damping: 20, mass: 0.8 };

const BgParallax = ({ children }) => {
  const { mx, my } = useHeroMotion();
  const x = useSpring(useTransform(mx, (v) => v * -BG_PX), SPRING_PARALLAX);
  const y = useSpring(useTransform(my, (v) => v * -BG_PY), SPRING_PARALLAX);
  return (
    <motion.div className="hero__parallax-bg" style={{ x, y }} aria-hidden="true">
      {children}
    </motion.div>
  );
};

const FgParallax = ({ children }) => {
  const { mx, my } = useHeroMotion();
  const x = useSpring(useTransform(mx, (v) => v * FG_PX), SPRING_PARALLAX);
  const y = useSpring(useTransform(my, (v) => v * FG_PY), SPRING_PARALLAX);
  return (
    <motion.div className="hero__parallax-fg" style={{ x, y }}>
      {children}
    </motion.div>
  );
};

const HeroGrid = () => {
  const { mx, my } = useHeroMotion();
  const [hoverIndex, setHoverIndex] = useState(-1);

  useMotionValueEvent(mx, "change", () => {
    const nx = Math.min(1, Math.max(0, (mx.get() + 1) / 2));
    const ny = Math.min(1, Math.max(0, (my.get() + 1) / 2));
    const idx =
      Math.round(nx * (GRID_COLS - 1)) +
      Math.round(ny * (GRID_ROWS - 1)) * GRID_COLS;
    setHoverIndex((prev) => (prev === idx ? prev : idx));
  });

  return (
    <BgParallax>
      <CubeGrid hoverIndex={hoverIndex} />
      <DotGrid />
    </BgParallax>
  );
};

const stats = [
  { value: "500+", label: "Problems solved", kind: "accent" },
  { value: "5+", label: "Projects shipped", kind: "" },
  { value: "1st", label: "Innov-A-Thon ’25", kind: "highlight" },
  { value: "8.63", label: "Best SGPA", kind: "" },
];

const typingTexts = [
  "Full-Stack Developer",
  "AI/ML Learner",
  "CyberSecurity Enjoyer",
  "Anime Nerd / Gamer",
  "UI/UX Enthusiast",
  "Problem Solver",
];

export const HeroSection = () => {
  const sectionRef = useRef(null);
  const [typing, setTyping] = useState({
    text: "",
    index: 0,
    char: 0,
    deleting: false,
  });
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const first = typingTexts[0];
    setTyping((prev) => ({ ...prev, text: first, char: first.length }));
  }, []);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tick = () => {
      setTyping((prev) => {
        const word = typingTexts[prev.index];
        if (!prev.deleting) {
          if (prev.char < word.length) {
            return {
              ...prev,
              text: word.slice(0, prev.char + 1),
              char: prev.char + 1,
            };
          }
          return { ...prev, deleting: true };
        }
        if (prev.char > 0) {
          return {
            ...prev,
            text: word.slice(0, prev.char - 1),
            char: prev.char - 1,
          };
        }
        return {
          ...prev,
          deleting: false,
          index: (prev.index + 1) % typingTexts.length,
        };
      });
    };

    const word = typingTexts[typing.index];
    const speed = typing.deleting ? 28 : 65;
    const pause =
      typing.deleting && typing.char === 0
        ? 450
        : !typing.deleting && typing.char === word.length
          ? 1900
          : speed;

    const timer = setTimeout(tick, pause);
    return () => clearTimeout(timer);
  }, [typing, paused]);

  return (
    <section id="hero" ref={sectionRef} className="hero">
      <HeroLive rootRef={sectionRef}>
        <div className="hero__bg">
          <HeroGrid />
        </div>

        <div className="container hero__inner">
          <FgParallax>
            <AnimatedSection animationType="fade-up" delay={80}>
          <div className="hero__meta">
            <span className="hero__status-dot" />
            <span>Kolkata, India — available for work</span>
          </div>
        </AnimatedSection>

        <AnimatedSection animationType="fade-up" delay={160}>
          <h1 className="hero__title">
            <span className="line">Aritra</span>
            <span className="line line-2">
              <span className="accent">Saha</span>
            </span>
          </h1>
        </AnimatedSection>

        <AnimatedSection animationType="fade-up" delay={260}>
          <div
            className="hero__type"
            tabIndex={0}
            aria-label={`Roles: ${typingTexts.join(", ")}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <span className="prompt" aria-hidden="true">$</span>
            <span aria-hidden="true">{typing.text}</span>
            <span className="cursor" aria-hidden="true" />
          </div>
        </AnimatedSection>

        <AnimatedSection animationType="fade-up" delay={340}>
          <p className="hero__blurb lead">
            I build responsive, accessible, performant products with React,
            Flutter, Go and Python with a taste of AI/ML.<br></br>
            Did I say I like performative hard problems.
          </p>
        </AnimatedSection>

        <AnimatedSection animationType="fade-up" delay={420}>
          <div className="hero__stats">
            {stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <div
                  className={`stat__n${stat.kind ? ` stat__n--${stat.kind}` : ""}`}
                >
                  {stat.value}
                </div>
                <div className="stat__l">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection animationType="fade-up" delay={500}>
          <div className="hero__actions">
            <a href="#contact" className="btn btn--solid">
              Start a conversation
            </a>
            <a href="#resume" className="btn">
              Résumé
            </a>
          </div>
        </AnimatedSection>
          </FgParallax>
      </div>
      </HeroLive>

      <span className="hero__scroll" aria-hidden="true">
        scroll ↓
      </span>
    </section>
  );
};
