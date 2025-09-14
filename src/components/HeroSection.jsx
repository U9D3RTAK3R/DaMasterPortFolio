import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatedSection } from "./AnimatedSection";

export const HeroSection = () => {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "I create stellar experiences with modern technologies.";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // Stop cursor blinking after typing is complete
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-4 h-4 bg-primary/30 rounded-full" style={{"--delay": "0s"}}></div>
        <div className="floating-element absolute top-40 right-20 w-3 h-3 bg-purple-500/30 rounded-full" style={{"--delay": "1s"}}></div>
        <div className="floating-element absolute bottom-60 left-20 w-5 h-5 bg-pink-500/30 rounded-full" style={{"--delay": "2s"}}></div>
        <div className="floating-element absolute bottom-40 right-10 w-2 h-2 bg-primary/40 rounded-full" style={{"--delay": "0.5s"}}></div>
      </div>

      {/* Morphing Background */}
      <div className="morphing-bg"></div>

      <div className="container max-w-4xl mx-auto text-center z-10">
        <AnimatedSection className="space-y-6" animationType="bounce-in">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-center">
            <div className="mb-2">
              <span className="opacity-0 animate-fade-in">Hi, I'm</span>
              <span className="wave-hand opacity-0 animate-fade-in-delay-1"> 👋</span>
            </div>
            <div className="flex justify-center items-center">
              <span className="name-aritra animate-fade-in-delay-1 inline-block">
                ARITRA
              </span>
            </div>
            <div className="mt-2">
              <span className="text-gradient animate-fade-in-delay-2 italic font-bold">
                Saha
              </span>
            </div>
          </h1>

          <div className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            <div className="mb-2">
              {typedText}
              {showCursor && <span className="animate-pulse">|</span>}
            </div>
            <p className="text-sm opacity-0 animate-fade-in-delay-4">
              Being a jack-of-all-trades but master-of-none, I build interfaces that are
              both beautiful and functional.
            </p>
          </div>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button glow-on-hover group">
              View My Work
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
            </a>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        animationType="bounce-in"
        delay={1000}
      >
        <span className="text-sm text-muted-foreground mb-2 animate-pulse"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary animate-bounce" />
      </AnimatedSection>
    </section>
  );
};