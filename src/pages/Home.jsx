import { lazy, Suspense, useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { CustomPointer } from '../components/CustomPointer'
import { ScrollProgress } from '../components/ScrollProgress'
import { BackToTop } from '../components/BackToTop'
import { HeroSection } from '../components/HeroSection'
import { AboutSection } from '../components/AboutSection'
import { ExperienceSection } from '../components/ExperienceSection'
import { ProjectsSection } from '../components/ProjectsSection'
import { SkillsSection } from '../components/SkillsSection'
import { AchievementsSection } from '../components/AchievementsSection'
import { ResumeSection } from '../components/ResumeSection'
import { ContactSection } from '../components/ContactSection'
import { Footer } from '../components/Footer'

const ThreeBackground = lazy(() => import('../components/ThreeBackground'))

export const Home = () => {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const heroBottom = window.innerHeight * 0.8

    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const scrollPercent = scrollY / (docHeight - winHeight)

      const nearBottom = scrollPercent > 0.75
      const pastHero = scrollY > heroBottom

      setHidden(pastHero && !nearBottom)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <ScrollProgress />
      <CustomPointer />
      <Suspense fallback={null}>
        <ThreeBackground hidden={hidden} />
      </Suspense>
      <Navbar />
      <main>
        <HeroSection />
        <div className="cyber-divider" />
        <AboutSection />
        <div className="cyber-divider" />
        <ExperienceSection />
        <div className="cyber-divider" />
        <ProjectsSection />
        <div className="cyber-divider" />
        <SkillsSection />
        <div className="cyber-divider" />
        <AchievementsSection />
        <div className="cyber-divider" />
        <ResumeSection />
        <div className="cyber-divider" />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
