import { AnimatedSection } from './AnimatedSection'

export const ResumeSection = () => {
  return (
    <section id="resume" className="cyber-section" style={{ background: 'var(--bg-card)' }}>
      <div className="cyber-grid-bg" />
      <div className="cyber-container">
        <AnimatedSection animationType="fade-up">
          <div className="section-eyebrow">Resume</div>
          <h2 className="section-title">Complete <em>Technical</em> Profile</h2>
        </AnimatedSection>

        <AnimatedSection animationType="scale-in" delay={300}>
          <div style={{ maxWidth: 480, margin: '2.5rem auto 0' }}>
            <div
              className="cyber-card"
              style={{
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.2rem',
              }}
            >
              <div style={{
                width: 54,
                height: 54,
                borderRadius: 10,
                background: 'rgba(0,212,255,0.05)',
                border: '1px solid rgba(0,212,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
              </div>
              <p style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 300,
                color: '#8888aa',
                lineHeight: 1.7,
                textAlign: 'center',
              }}>
                Want a detailed breakdown of my academic background, technical skills, and professional experience?
                View or download my complete resume below.
              </p>
              <a
                href="/resume.pdf"
                download
                className="cyber-button cyber-button-gold"
                style={{ marginTop: '0.25rem' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                DOWNLOAD RESUME
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
