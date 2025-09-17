import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { AnimatedSection } from "./AnimatedSection";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: 1,
    title: "PortFolio Website",
    description: "A beautiful portfolio webiste using React and Tailwind.",
    image: "/projects/project1.png",
    tags: ["React", "TailwindCSS", "EmailJS"],
    demoUrl: "https://da-master-port-folio.vercel.app/",
    githubUrl: "https://github.com/U9D3RTAK3R/DaMasterPortFolio",
  },
  {
    id: 2,
    title: "CSCS Dept. Website",
    description:
      "MERN Stack website for the CSCS department.",
    image: "/projects/placeholder.png",
    tags: ["MongoDB", "Express.js", "Node.js", "React", "TailWindCSS"],
    demoUrl: "#",
    githubUrl: "https://github.com/U9D3RTAK3R/DaMasterHack",
  },
  {
    id: 3,
    title: "PlaceHolder",
    description:
      "We used to dream of days like these",
    image: "/projects/placeholder.png",
    tags: ["Tag1", "Tag2", "Tag3"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

export const ProjectsSection = () => {
  const [containerRef, visibleItems] = useStaggeredAnimation(projects.length, {
    staggerDelay: 200,
    threshold: 0.1
  });

  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-20 right-20 w-16 h-16 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full" style={{"--delay": "1s"}}></div>
        <div className="floating-element absolute bottom-40 left-10 w-24 h-24 bg-gradient-to-r from-pink-500/10 to-primary/10 rounded-full" style={{"--delay": "3s"}}></div>
      </div>

      <div className="container mx-auto max-w-5xl">
        <AnimatedSection animationType="slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            {" "}
            Featured <span className="text-gradient"> Projects </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection animationType="fade-in" delay={300}>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Here are some of my recent projects. Each project was carefully
            crafted with attention to detail, performance, and user experience.
          </p>
        </AnimatedSection>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={cn(
                "group bg-card rounded-xl overflow-hidden shadow-lg transition-all duration-500 transform-gpu",
                "hover:shadow-2xl hover:shadow-primary/20 card-3d",
                visibleItems.has(index) ? "stagger-animation" : "opacity-0"
              )}
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 parallax-element"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Floating action buttons - always visible on mobile, hover on desktop */}
                <div className="absolute top-4 right-4 flex gap-2 md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-all duration-300 transform md:translate-y-2 md:group-hover:translate-y-0 translate-y-0">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    className="p-2 bg-white/90 rounded-full text-gray-800 hover:bg-white transition-colors duration-200 glow-on-hover shadow-md"
                    aria-label="View live demo"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    className="p-2 bg-white/90 rounded-full text-gray-800 hover:bg-white transition-colors duration-200 glow-on-hover shadow-md"
                    aria-label="View source code"
                  >
                    <Github size={16} />
                  </a>
                </div>
              </div>

              <div className="p-6 relative">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-medium border rounded-full bg-secondary/50 text-secondary-foreground transition-all duration-300 hover:bg-primary/20 hover:border-primary/50 hover:scale-105"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300"> 
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <AnimatedSection 
          className="text-center mt-12"
          animationType="bounce-in"
          delay={600}
        >
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2 glow-on-hover group"
            target="_blank"
            href="https://github.com/U9D3RTAK3R"
          >
            Check My Github 
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};