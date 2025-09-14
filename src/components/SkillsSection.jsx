import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { AnimatedSection } from "./AnimatedSection";

const skills = [
    {name: "HTML/CSS", level: 60, category: "FrontEnd", icon: "🎨"},
    {name: "JavaScript", level: 75, category: "FrontEnd", icon: "⚡"},
    {name: "React", level: 75, category: "FrontEnd", icon: "⚛️"},
    {name: "TailWind CSS", level: 40, category: "FrontEnd", icon: "🎯"},

    {name: "MySQL", level: 85, category: "BackEnd", icon: "🗄️"},
    {name: "MongoDB", level: 80, category: "BackEnd", icon: "🍃"},

    {name: "Python", level: 90, category: "Languages", icon: "🐍"},
    {name: "C", level: 85, category: "Languages", icon: "⚙️"},
    {name: "C++", level: 75, category: "Languages", icon: "🔧"},
    {name: "Java", level: 85, category: "Languages", icon: "☕"},
    
    {name: "Git/GitHub", level: 90, category: "Tools", icon: "🔀"},
    {name: "Figma", level: 65, category: "Tools", icon: "🎨"},
    {name: "VS Code", level: 95, category: "Tools", icon: "💻"},
];

const categories = ["All", "FrontEnd", "BackEnd", "Languages", "Tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [animatedBars, setAnimatedBars] = useState(new Set());

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  const [containerRef, visibleItems] = useStaggeredAnimation(filteredSkills.length, {
    staggerDelay: 100,
    threshold: 0.2
  });

  // Animate skill bars when they become visible
  useEffect(() => {
    const timer = setTimeout(() => {
      filteredSkills.forEach((_, index) => {
        if (visibleItems.has(index)) {
          setTimeout(() => {
            setAnimatedBars(prev => new Set([...prev, index]));
          }, index * 200);
        }
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [visibleItems, filteredSkills]);

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-10 left-10 w-20 h-20 bg-primary/5 rounded-full" style={{"--delay": "0s"}}></div>
        <div className="floating-element absolute bottom-20 right-10 w-32 h-32 bg-purple-500/5 rounded-full" style={{"--delay": "2s"}}></div>
      </div>

      <div className="container mx-auto max-w-5xl">
        <AnimatedSection animationType="slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            My <span className="text-gradient"> Skills</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection animationType="scale-in" delay={200}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveCategory(category);
                  setAnimatedBars(new Set()); // Reset animations
                }}
                className={cn(
                  "px-5 py-2 rounded-full transition-all duration-300 capitalize glow-on-hover",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-secondary/70 text-foreground hover:bg-secondary hover:scale-105"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${activeCategory}`}
              className={cn(
                "bg-card p-6 rounded-lg shadow-xs card-3d group",
                visibleItems.has(index) ? "stagger-animation" : "opacity-0"
              )}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="text-left mb-4 flex items-center gap-3">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </span>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"> 
                  {skill.name}
                </h3>
              </div>
              
              <div className="w-full bg-secondary/50 h-3 rounded-full overflow-hidden relative">
                <div
                  className={cn(
                    "bg-gradient-to-r from-primary to-purple-500 h-3 rounded-full origin-left transition-all duration-1000 ease-out relative",
                    animatedBars.has(index) ? "" : "w-0"
                  )}
                  style={{ 
                    width: animatedBars.has(index) ? `${skill.level}%` : '0%'
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              <div className="text-right mt-2 flex justify-between items-center">
                <span className="text-xs text-muted-foreground capitalize">
                  {skill.category}
                </span>
                <span className={cn(
                  "text-sm font-semibold transition-all duration-500",
                  animatedBars.has(index) ? "text-primary" : "text-muted-foreground"
                )}>
                  {animatedBars.has(index) ? skill.level : 0}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};