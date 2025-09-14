import { ArrowUp, Heart, Code, Coffee } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { useState } from "react";

export const Footer = () => {
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isCoffeeHovered, setIsCoffeeHovered] = useState(false);

  return (
    <AnimatedSection animationType="slide-up">
      <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-element absolute top-4 left-10 w-2 h-2 bg-primary/20 rounded-full" style={{"--delay": "0s"}}></div>
          <div className="floating-element absolute bottom-6 right-20 w-3 h-3 bg-purple-500/20 rounded-full" style={{"--delay": "2s"}}></div>
          <div className="floating-element absolute top-8 right-10 w-1 h-1 bg-pink-500/30 rounded-full" style={{"--delay": "1s"}}></div>
        </div>

        <div className="container mx-auto">
          {/* Main footer content */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left side - Copyright */}
            <div className="flex flex-col gap-2 text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Arirani. All rights reserved.
              </p>
              
              {/* Fun creative text */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground/80">
                <span>Made with</span>
                <div 
                  className="group cursor-pointer transition-all duration-300 hover:scale-110"
                  onMouseEnter={() => setIsHeartHovered(true)}
                  onMouseLeave={() => setIsHeartHovered(false)}
                >
                  <Heart 
                    size={12} 
                    className={`transition-all duration-300 ${
                      isHeartHovered 
                        ? 'text-red-500 fill-red-500 animate-pulse' 
                        : 'text-primary'
                    }`}
                  />
                </div>
                <span>& lots of</span>
                <div 
                  className="group cursor-pointer transition-all duration-300 hover:scale-110"
                  onMouseEnter={() => setIsCoffeeHovered(true)}
                  onMouseLeave={() => setIsCoffeeHovered(false)}
                >
                  <Coffee 
                    size={12} 
                    className={`transition-all duration-300 ${
                      isCoffeeHovered 
                        ? 'text-amber-600 animate-bounce' 
                        : 'text-primary'
                    }`}
                  />
                </div>
                <span>by a student</span>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-muted-foreground/60">
                <Code size={10} className="text-primary" />
                <span>Crafted with React & TailwindCSS</span>
              </div>
            </div>

            {/* Right side - Back to top button */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground/60 animate-pulse">Back to top</span>
              <a
                href="#hero"
                className="group p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1 glow-on-hover relative overflow-hidden"
              >
                <ArrowUp size={20} className="transition-transform group-hover:-translate-y-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </AnimatedSection>
  );
};