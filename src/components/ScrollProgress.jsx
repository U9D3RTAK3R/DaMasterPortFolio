import { useEffect, useState } from 'react'

export const ScrollProgress = () => {
  const [width, setWidth] = useState('0%')

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
      setWidth(`${scrolled}%`)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      id="scroll-progress"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width,
        height: '2px',
        background: 'linear-gradient(90deg, #00d4ff, #ff00e6)',
        zIndex: 9999,
        boxShadow: '0 0 10px rgba(0,212,255,0.5), 0 0 20px rgba(255,0,230,0.3)',
        transition: 'width 0.1s ease-out',
      }}
    />
  )
}
