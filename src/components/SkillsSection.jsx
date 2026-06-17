import { AnimatedSection } from './AnimatedSection'
import { SkillsGraph } from './SkillsGraph'

export const SkillsSection = () => {
  return (
    <section id="skills" className="cyber-section" style={{ background: 'var(--bg-deep)' }}>
      <div className="cyber-grid-bg" />
      <div className="cyber-orb" style={{ width: 450, height: 450, top: -120, right: -180, background: 'rgba(255,0,230,0.03)' }} />
      <div className="cyber-container">
        <AnimatedSection animationType="fade-up">
          <div className="section-eyebrow">Skills</div>
          <h2 className="section-title">Technical <em>Arsenal</em></h2>
          <p className="section-sub">Languages, frameworks, and tools across the stack</p>
        </AnimatedSection>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '2rem',
          alignItems: 'start',
        }} className="skills-grid">
          <AnimatedSection animationType="fade-right">
            <div className="cyber-term">
              <div className="cyber-term-bar">
                <span className="cyber-term-dot r" />
                <span className="cyber-term-dot y" />
                <span className="cyber-term-dot g" />
                <span className="cyber-term-fname">aritra@dev ~ skills.json</span>
              </div>
              <div className="cyber-term-body" style={{ textAlign: 'left' }}>
                <div><span className="tc">// Skill Matrix — Aritra Saha</span></div>
                <div><span className="tk">"role"</span>: <span className="ts">"Full-Stack Developer"</span>,</div>
                <div><span className="tk">"languages"</span>: [ <span className="ts">"Python"</span>, <span className="ts">"JS"</span>, <span className="ts">"C++"</span>, <span className="ts">"Java"</span>, <span className="ts">"SQL"</span> ],</div>
                <div><span className="tk">"frameworks"</span>: [ <span className="ts">"React"</span>, <span className="ts">"FastAPI"</span>, <span className="ts">"Flutter"</span> ],</div>
                <div><span className="tk">"tools"</span>: [ <span className="ts">"Git"</span>, <span className="ts">"Docker"</span>, <span className="ts">"Firebase"</span>, <span className="ts">"MongoDB"</span> ],</div>
                <div><span className="tk">"status"</span>: <span className="tb">"always_learning"</span><span className="cyber-cur" /></div>
              </div>
            </div>
          </AnimatedSection>

          <SkillsGraph />
        </div>
      </div>

      <style>{`
        @media(max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
