import { useEffect, useRef, useState, useCallback } from 'react'

const TRAIL_LENGTH = 6

export const CustomPointer = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [shockwaves, setShockwaves] = useState([])
  const trailRef = useRef([])
  const dotRefs = useRef([])
  const posRef = useRef({ x: 0, y: 0 })
  const frameId = useRef(null)
  const shockId = useRef(null)

  const updateDots = useCallback(() => {
    const trail = trailRef.current
    const len = trail.length
    for (let i = 0; i < len; i++) {
      const dot = dotRefs.current[i]
      if (!dot) continue
      const t = trail[i]
      const scale = 1 - i / TRAIL_LENGTH
      dot.style.left = `${t.x}px`
      dot.style.top = `${t.y}px`
      dot.style.width = `${4 * scale}px`
      dot.style.height = `${4 * scale}px`
      dot.style.background = `rgba(0, 212, 255, ${0.3 * scale})`
      dot.style.boxShadow = `0 0 ${6 * scale}px rgba(0,212,255,${0.2 * scale})`
    }
  }, [])

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || window.innerWidth < 768
    if (isTouch) return

    setVisible(true)

    const style = document.createElement('style')
    style.id = 'cyber-cursor-hide'
    style.innerHTML = '*, *::before, *::after { cursor: none !important; }'
    document.head.appendChild(style)

    const handleMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      posRef.current = { x, y }
      setPos({ x, y })
      trailRef.current = [...trailRef.current.slice(-TRAIL_LENGTH + 1), { x, y }]
      if (!frameId.current) {
        frameId.current = requestAnimationFrame(() => {
          updateDots()
          frameId.current = null
        })
      }
    }

    const handleDown = () => {
      setClicking(true)
      setShockwaves((prev) => [...prev, { x: posRef.current.x, y: posRef.current.y, id: Date.now(), time: Date.now() }])
    }
    const handleUp = () => setClicking(false)

    const handleOver = (e) => {
      const t = e.target
      const isClickable =
        t.tagName === 'A' ||
        t.tagName === 'BUTTON' ||
        t.closest('a') ||
        t.closest('button') ||
        t.dataset.cursorHover ||
        t.closest('[data-cursor-hover]')
      setHovering(!!isClickable)
    }

    document.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mousedown', handleDown)
    document.addEventListener('mouseup', handleUp)
    document.addEventListener('mouseover', handleOver, true)

    shockId.current = setInterval(() => {
      setShockwaves((prev) => prev.filter((s) => Date.now() - s.time < 600))
    }, 200)

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mousedown', handleDown)
      document.removeEventListener('mouseup', handleUp)
      document.removeEventListener('mouseover', handleOver, true)
      if (frameId.current) cancelAnimationFrame(frameId.current)
      if (shockId.current) clearInterval(shockId.current)
      const el = document.getElementById('cyber-cursor-hide')
      if (el) el.remove()
    }
  }, [updateDots])

  if (!visible) return null

  return (
    <>
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { dotRefs.current[i] = el }}
          className="fixed pointer-events-none z-[9997] rounded-full"
          style={{
            left: 0,
            top: 0,
            transform: 'translate(-50%, -50%)',
            willChange: 'left, top, width, height',
          }}
        />
      ))}

      {shockwaves.map((s) => (
        <div
          key={s.id}
          className="fixed pointer-events-none z-[9997] rounded-full"
          style={{
            left: s.x,
            top: s.y,
            width: 10,
            height: 10,
            border: '1px solid rgba(0,212,255,0.6)',
            transform: 'translate(-50%, -50%)',
            animation: 'shockwave 0.6s ease-out forwards',
          }}
        />
      ))}

      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) scale(${clicking ? 0.75 : hovering ? 1.3 : 1})`,
          transition: 'transform 0.12s ease-out',
          willChange: 'transform',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <polygon
            points="16,2 22,6 22,14 26,18 26,26 22,30 16,30 10,26 10,18 6,14 6,6"
            fill="none"
            stroke={hovering ? '#ffd700' : '#00d4ff'}
            strokeWidth="1.2"
            opacity={hovering ? 0.9 : 0.5}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 16 16"
              to="360 16 16"
              dur={hovering ? '2s' : '4s'}
              repeatCount="indefinite"
            />
          </polygon>
          <circle cx="16" cy="16" r="2" fill={hovering ? '#ffd700' : '#00d4ff'} opacity={0.8} />
        </svg>

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 40,
            height: 40,
            background: hovering
              ? 'radial-gradient(circle, rgba(255,215,0,0.15), transparent)'
              : 'radial-gradient(circle, rgba(0,212,255,0.15), transparent)',
          }}
        />
      </div>

      <style>{`
        @keyframes shockwave {
          0% { width: 10px; height: 10px; opacity: 1; }
          100% { width: 80px; height: 80px; opacity: 0; }
        }
      `}</style>
    </>
  )
}
