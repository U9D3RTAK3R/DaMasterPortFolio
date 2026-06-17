import { useEffect, useState } from 'react'

export const BackToTop = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 200,
        width: 42,
        height: 42,
        borderRadius: 6,
        background: 'rgba(12,12,26,0.9)',
        border: '1px solid rgba(0,212,255,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
        transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
        transform: show ? 'translateY(0)' : 'translateY(12px)',
      }}
      className="group"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#00d4ff'
        e.currentTarget.style.boxShadow = '0 0 15px rgba(0,212,255,0.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}
