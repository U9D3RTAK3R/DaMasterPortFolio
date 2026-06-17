import { useEffect, useRef, useState } from 'react'

export const CustomPointer = () => {
  const [visible, setVisible] = useState(false)
  const cursorRef = useRef(null)
  const bracketTL = useRef(null)
  const bracketTR = useRef(null)
  const bracketBL = useRef(null)
  const bracketBR = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const smoothRef = useRef({ x: 0, y: 0 })
  const hoverRef = useRef(null)
  const clickingRef = useRef(false)
  const frameId = useRef(null)

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || window.innerWidth < 768
    if (isTouch) return

    setVisible(true)

    const style = document.createElement('style')
    style.id = 'cyber-cursor-hide'
    style.innerHTML = '*, *::before, *::after { cursor: none !important; }'
    document.head.appendChild(style)

    const inMatrix = () => document.documentElement.classList.contains('matrix-active')

    const handleMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleDown = () => { clickingRef.current = true }
    const handleUp = () => { clickingRef.current = false }

    const handleOver = (e) => {
      const el = e.target.closest('a, button, [role="button"], [data-cursor-hover]')
      if (el) {
        hoverRef.current = el.getBoundingClientRect()
      } else {
        hoverRef.current = null
      }
    }

    const tick = () => {
      const cursor = cursorRef.current
      if (!cursor) { frameId.current = requestAnimationFrame(tick); return }

      const raw = posRef.current
      const smooth = smoothRef.current
      const hover = hoverRef.current
      const clicking = clickingRef.current
      const matrix = inMatrix()
      const ease = hover ? 0.18 : 0.28

      smooth.x += (raw.x - smooth.x) * ease
      smooth.y += (raw.y - smooth.y) * ease

      const cx = matrix ? window.innerWidth - smooth.x : smooth.x
      const cy = matrix ? window.innerHeight - smooth.y : smooth.y

      cursor.style.width = '28px'
      cursor.style.height = '28px'
      cursor.style.left = `${cx - 14}px`
      cursor.style.top = `${cy - 14}px`
      cursor.style.transform = clicking ? 'scale(0.85)' : 'scale(1)'

      if (hover) {
        const { left, top, width, height } = hover
        const gap = 6

        cursor.style.borderColor = 'transparent'
        cursor.style.borderWidth = '0'
        cursor.style.boxShadow = 'none'
        cursor.style.background = 'transparent'

        if (bracketTL.current) {
          bracketTL.current.style.left = `${left - gap}px`
          bracketTL.current.style.top = `${top - gap}px`
          bracketTL.current.style.opacity = '1'
        }
        if (bracketTR.current) {
          bracketTR.current.style.left = `${left + width + gap - 10}px`
          bracketTR.current.style.top = `${top - gap}px`
          bracketTR.current.style.opacity = '1'
        }
        if (bracketBL.current) {
          bracketBL.current.style.left = `${left - gap}px`
          bracketBL.current.style.top = `${top + height + gap - 10}px`
          bracketBL.current.style.opacity = '1'
        }
        if (bracketBR.current) {
          bracketBR.current.style.left = `${left + width + gap - 10}px`
          bracketBR.current.style.top = `${top + height + gap - 10}px`
          bracketBR.current.style.opacity = '1'
        }
      } else {
        const col = matrix ? 'rgba(0,255,65,0.6)' : (clicking ? 'rgba(255,0,230,0.7)' : 'rgba(0,212,255,0.6)')
        const shadow = matrix
          ? (clicking
            ? '0 0 15px rgba(0,255,65,0.3), inset 0 0 15px rgba(0,255,65,0.06)'
            : '0 0 10px rgba(0,255,65,0.1), inset 0 0 10px rgba(0,255,65,0.02)')
          : (clicking
            ? '0 0 15px rgba(255,0,230,0.3), inset 0 0 15px rgba(255,0,230,0.06)'
            : '0 0 10px rgba(0,212,255,0.1), inset 0 0 10px rgba(0,212,255,0.02)')
        const bg = matrix ? (clicking ? 'rgba(0,255,65,0.06)' : 'transparent') : (clicking ? 'rgba(255,0,230,0.06)' : 'transparent')

        cursor.style.borderColor = col
        cursor.style.borderWidth = '1.5px'
        cursor.style.boxShadow = shadow
        cursor.style.background = bg

        if (bracketTL.current) bracketTL.current.style.opacity = '0'
        if (bracketTR.current) bracketTR.current.style.opacity = '0'
        if (bracketBL.current) bracketBL.current.style.opacity = '0'
        if (bracketBR.current) bracketBR.current.style.opacity = '0'
      }

      frameId.current = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mousedown', handleDown)
    document.addEventListener('mouseup', handleUp)
    document.addEventListener('mouseover', handleOver, true)
    frameId.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frameId.current)
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mousedown', handleDown)
      document.removeEventListener('mouseup', handleUp)
      document.removeEventListener('mouseover', handleOver, true)
      const el = document.getElementById('cyber-cursor-hide')
      if (el) el.remove()
    }
  }, [])

  if (!visible) return null

  const bracket = (ref, corner) => {
    const isTop = corner.includes('T')
    const isLeft = corner.includes('L')
    return (
      <span
        ref={ref}
        style={{
          position: 'fixed',
          width: 10,
          height: 10,
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0,
          transition: 'opacity 0.15s, left 0.2s, top 0.2s',
          willChange: 'left, top, opacity',
          borderTop: isTop ? '2px solid #ffd700' : 'none',
          borderBottom: !isTop ? '2px solid #ffd700' : 'none',
          borderLeft: isLeft ? '2px solid #ffd700' : 'none',
          borderRight: !isLeft ? '2px solid #ffd700' : 'none',
        }}
      />
    )
  }

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          pointerEvents: 'none',
          zIndex: 99999,
          borderRadius: 2,
          border: '1.5px solid rgba(0,212,255,0.6)',
          background: 'transparent',
          willChange: 'transform, left, top',
          overflow: 'visible',
        }}
      >
        <span style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 3,
          height: 3,
          borderRadius: '50%',
          background: '#00d4ff',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 8px rgba(0,212,255,0.8)',
        }} />
      </div>

      {bracket(bracketTL, 'TL')}
      {bracket(bracketTR, 'TR')}
      {bracket(bracketBL, 'BL')}
      {bracket(bracketBR, 'BR')}
    </>
  )
}
