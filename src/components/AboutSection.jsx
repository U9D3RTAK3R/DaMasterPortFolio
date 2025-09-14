import { Briefcase, Code, User } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

export const AboutSection = () => {
  const features = [
    {
      icon: Code,
      title: "Tech Enthusiast",
      description: "Creating responsive applications with modern frameworks."
    },
    {
      icon: User,
      title: "UI/UX Design",
      description: "Designing intuitive user interfaces and seamless user experiences."
    },
    {
      icon: Briefcase,
      title: "Project Management",
      description: "Leading projects from conception to completion with out-of-the-box methodologies."
    }
  ];

  const [cardsRef, visibleCards] = useStaggeredAnimation(features.length, {
    staggerDelay: 150,
    threshold: 0.2
  });

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-10 left-5 w-12 h-12 bg-primary/10 rounded-full" style={{"--delay": "0s"}}></div>
        <div className="floating-element absolute bottom-20 right-5 w-8 h-8 bg-purple-500/10 rounded-full" style={{"--delay": "2s"}}></div>
        <div className="morphing-bg opacity-5"></div>
      </div>

      <div className="container mx-auto max-w-5xl">
        <AnimatedSection animationType="slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            About <span className="text-gradient"> Me</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimatedSection animationType="slide-right" delay={300}>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">
                Passionate Web Developer & <span className="text-gradient">Tech Creator</span>
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                Starting out in web development, I specialize
                in grasping the problem and creating responsive, 
                accessible, and performant web
                applications using modern technologies.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                I'm not only passionate about creating elegant solutions to complex
                problems, and I'm constantly learning new technologies and
                techniques to stay at the forefront of the ever-evolving technological landscape
                in the contemporary world.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#contact" className="cosmic-button glow-on-hover group relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <span className="relative z-10">
                    Get In Touch
                    <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>

                <a
                  href="https://www.linkedin.com/in/aritra-saha-a5ab88311/"
                  target="_blank"
                  className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 glow-on-hover group relative overflow-hidden"
                >
                  <span className="relative z-10">Download CV</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
            </div>
          </AnimatedSection>

          <div ref={cardsRef} className="grid grid-cols-1 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className={cn(
                    "gradient-border p-6 card-3d group relative overflow-hidden",
                    visibleCards.has(index) ? "stagger-animation" : "opacity-0"
                  )}
                  style={{
                    animationDelay: `${600 + index * 150}ms`
                  }}
                >
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex items-start gap-4 relative">
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                      <IconComponent className="h-6 w-6 text-primary group-hover:text-primary/80 transition-colors duration-300" />
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"> 
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};