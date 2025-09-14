import { Navbar } from "../components/Navbar";
import { CustomPointer } from "../components/CustomPointer";
import { StarBackground } from "@/components/StarBackground";
import { CloudBackground } from "@/components/CloudBackground";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export const Home = () => {
    return(
        <div className="min-h-screen">
            {/* Custom Pointer */}
            <CustomPointer />
            {/* Background Effects */}
            <StarBackground />
            <CloudBackground />
            {/* Navbar */}
            <Navbar />
            {/* Main Content */}
            <main>
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
                <ContactSection />
            </main>
            {/* Footer */}
            <Footer />
        </div>
    );
}