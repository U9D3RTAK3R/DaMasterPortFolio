import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

const skillNodes = [
  { id: 'python', label: 'Python', level: 90, category: 'Languages' },
  { id: 'javascript', label: 'JS', level: 85, category: 'Languages' },
  { id: 'cpp', label: 'C++', level: 80, category: 'Languages' },
  { id: 'java', label: 'Java', level: 80, category: 'Languages' },
  { id: 'golang', label: 'GoLang', level: 70, category: 'Languages' },
  { id: 'sql', label: 'SQL', level: 85, category: 'Languages' },
  { id: 'react', label: 'React', level: 85, category: 'Frontend' },
  { id: 'htmlcss', label: 'HTML/CSS', level: 90, category: 'Frontend' },
  { id: 'tailwind', label: 'TailwindCSS', level: 85, category: 'Frontend' },
  { id: 'flutter', label: 'Flutter', level: 70, category: 'Frontend' },
  { id: 'threejs', label: 'Three.js', level: 65, category: 'Frontend' },
  { id: 'framermotion', label: 'Framer', level: 75, category: 'Frontend' },
  { id: 'nodejs', label: 'Node.js', level: 80, category: 'Backend & Tools' },
  { id: 'fastapi', label: 'FastAPI', level: 75, category: 'Backend & Tools' },
  { id: 'mongodb', label: 'MongoDB', level: 85, category: 'Backend & Tools' },
  { id: 'firebase', label: 'Firebase', level: 80, category: 'Backend & Tools' },
  { id: 'git', label: 'Git', level: 90, category: 'Backend & Tools' },
  { id: 'docker', label: 'Docker', level: 70, category: 'Backend & Tools' },
]

const skillEdges = [
  { source: 'python', target: 'javascript' },
  { source: 'python', target: 'cpp' },
  { source: 'python', target: 'sql' },
  { source: 'python', target: 'fastapi' },
  { source: 'javascript', target: 'react' },
  { source: 'javascript', target: 'nodejs' },
  { source: 'javascript', target: 'threejs' },
  { source: 'javascript', target: 'sql' },
  { source: 'cpp', target: 'java' },
  { source: 'java', target: 'golang' },
  { source: 'golang', target: 'docker' },
  { source: 'react', target: 'tailwind' },
  { source: 'react', target: 'threejs' },
  { source: 'react', target: 'framermotion' },
  { source: 'react', target: 'firebase' },
  { source: 'htmlcss', target: 'tailwind' },
  { source: 'flutter', target: 'firebase' },
  { source: 'nodejs', target: 'mongodb' },
  { source: 'nodejs', target: 'firebase' },
  { source: 'fastapi', target: 'mongodb' },
  { source: 'mongodb', target: 'sql' },
  { source: 'git', target: 'docker' },
]

const catColors = {
  Languages: '#00d4ff',
  Frontend: '#ff00e6',
  'Backend & Tools': '#ffd700',
}

function computeLayout(nodes, edges, width, height) {
  const result = nodes.map(n => ({ ...n }))
  const pad = 60
  const w = width - pad * 2
  const h = height - pad * 2
  const cx = width / 2
  const cy = height / 2

  result.forEach((node, i) => {
    const angle = (2 * Math.PI * i) / result.length
    const r = Math.min(w, h) * 0.35
    node.x = cx + Math.cos(angle) * r
    node.y = cy + Math.sin(angle) * r
    node.vx = 0
    node.vy = 0
  })

  const iterations = 120
  const repulsion = 8000
  const attraction = 0.008
  const gravity = 0.008

  for (let iter = 0; iter < iterations; iter++) {
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        const dx = result[i].x - result[j].x
        const dy = result[i].y - result[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 1) continue
        const force = repulsion / (dist * dist)
        const fx = (dx / dist) * force
        const fy = (dy / dist) * force
        result[i].vx += fx
        result[i].vy += fy
        result[j].vx -= fx
        result[j].vy -= fy
      }
    }

    for (const edge of edges) {
      const s = result.find(n => n.id === edge.source)
      const t = result.find(n => n.id === edge.target)
      if (!s || !t) continue
      const dx = t.x - s.x
      const dy = t.y - s.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 1) continue
      const force = dist * attraction
      const fx = (dx / dist) * force
      const fy = (dy / dist) * force
      s.vx += fx
      s.vy += fy
      t.vx -= fx
      t.vy -= fy
    }

    for (const node of result) {
      const dx = cx - node.x
      const dy = cy - node.y
      node.vx += dx * gravity
      node.vy += dy * gravity
    }

    for (const node of result) {
      node.vx *= 0.85
      node.vy *= 0.85
      node.x += node.vx
      node.y += node.vy
      node.x = Math.max(pad, Math.min(width - pad, node.x))
      node.y = Math.max(pad, Math.min(height - pad, node.y))
    }
  }

  result.forEach(n => { delete n.vx; delete n.vy })
  return result
}

const SkillDetailPanel = ({ node, connectedNodeIds, allNodes, onClose, catColor }) => {
  const panelRef = useRef(null)
  const r = 38
  const circ = 2 * Math.PI * r
  const offset = circ - (node.level / 100) * circ

  const connected = connectedNodeIds
    ? Array.from(connectedNodeIds).map(id => allNodes.find(n => n.id === id)).filter(Boolean)
    : []

  useEffect(() => {
    const timer = setTimeout(() => {
      const handler = (e) => {
        if (panelRef.current && !panelRef.current.contains(e.target)) onClose()
      }
      document.addEventListener('mousedown', handler)
      return () => document.removeEventListener('mousedown', handler)
    }, 150)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ type: 'spring', damping: 22, stiffness: 300 }}
      style={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        width: 200,
        background: 'rgba(10,10,22,0.96)',
        border: `1px solid ${catColor}33`,
        borderRadius: 10,
        padding: '1.2rem',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        zIndex: 20,
        boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 20px ${catColor}15, inset 0 1px 0 ${catColor}11`,
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 6, right: 8,
          background: 'none', border: 'none', color: '#8888aa',
          fontSize: '1rem', cursor: 'pointer', fontFamily: "'Share Tech Mono'",
          lineHeight: 1, padding: 2,
        }}
      >
        ×
      </button>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.6rem' }}>
        <svg width="76" height="76" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="5" />
          <circle
            cx="50" cy="50" r={r}
            fill="none" stroke={catColor} strokeWidth="5"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            style={{ filter: `drop-shadow(0 0 4px ${catColor})` }}
          />
          <text x="50" y="44" textAnchor="middle" fill="#e0e0ff" fontSize="20" fontWeight="700" fontFamily="'Orbitron',monospace">
            {node.level}%
          </text>
          <text x="50" y="62" textAnchor="middle" fill="#8888aa" fontSize="7" fontWeight="600" fontFamily="'Share Tech Mono',monospace" letterSpacing="1">
            PROFICIENCY
          </text>
        </svg>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '0.7rem' }}>
        <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: '0.8rem', fontWeight: 600, color: '#e0e0ff', marginBottom: 2 }}>
          {node.label}
        </h3>
        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.55rem', fontWeight: 600, color: catColor, letterSpacing: '0.1em' }}>
          [{node.category.toUpperCase()}]
        </span>
      </div>

      {connected.length > 0 && (
        <>
          <div style={{
            height: 1,
            background: `linear-gradient(90deg, transparent, ${catColor}22, transparent)`,
            marginBottom: '0.6rem',
          }} />
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.5rem', fontWeight: 600, color: '#8888aa', letterSpacing: '0.1em', marginBottom: 6 }}>
            LINKED SKILLS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {connected.map(s => (
              <span key={s.id} style={{
                fontFamily: "'Rajdhani',sans-serif",
                fontSize: '0.7rem',
                color: catColors[s.category],
                padding: '2px 7px',
                background: `${catColors[s.category]}11`,
                border: `1px solid ${catColors[s.category]}22`,
                borderRadius: 3,
              }}>
                {s.label}
              </span>
            ))}
          </div>
        </>
      )}
    </motion.div>
  )
}

export const SkillsGraph = () => {
  const containerRef = useRef(null)
  const animRef = useRef(null)
  const [dims, setDims] = useState({ w: 500, h: 420 })
  const [hoveredNode, setHoveredNode] = useState(null)
  const [clickedNode, setClickedNode] = useState(null)
  const isInView = useInView(animRef, { once: true, margin: '-80px 0px' })

  useEffect(() => {
    const obs = new ResizeObserver(([entry]) => {
      const { width } = entry.contentRect
      setDims({ w: Math.max(width, 300), h: Math.max(width * 0.75, 350) })
    })
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  const laidOutNodes = useMemo(() => computeLayout(skillNodes, skillEdges, dims.w, dims.h), [dims.w, dims.h])

  const adjacency = useMemo(() => {
    const map = {}
    skillEdges.forEach(e => {
      if (!map[e.source]) map[e.source] = new Set()
      if (!map[e.target]) map[e.target] = new Set()
      map[e.source].add(e.target)
      map[e.target].add(e.source)
    })
    return map
  }, [])

  const highlighted = useMemo(() => {
    if (!hoveredNode) return { nodes: new Set(), edges: new Set() }
    const nodes = new Set([hoveredNode])
    const connected = adjacency[hoveredNode]
    if (connected) connected.forEach(n => nodes.add(n))
    const edgeIds = new Set()
    skillEdges.forEach((e, i) => {
      if (nodes.has(e.source) && nodes.has(e.target)) edgeIds.add(i)
    })
    return { nodes, edges: edgeIds }
  }, [hoveredNode, adjacency])

  const handleNodeClick = useCallback((id) => {
    setClickedNode(prev => (prev === id ? null : id))
  }, [])

  const catArr = Object.entries(catColors)

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: 380, position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, zIndex: 5,
        display: 'flex', gap: 10, flexWrap: 'wrap',
      }}>
        {catArr.map(([cat, color]) => (
          <div key={cat} style={{
            display: 'flex', alignItems: 'center', gap: 5,
            fontFamily: "'Share Tech Mono',monospace",
            fontSize: '0.55rem', fontWeight: 600,
            color: '#8888aa', letterSpacing: '0.08em',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: color, boxShadow: `0 0 6px ${color}`,
            }} />
            {cat.toUpperCase()}
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute', top: 0, right: 0, zIndex: 5,
        fontFamily: "'Share Tech Mono',monospace",
        fontSize: '0.55rem', color: '#8888aa',
        letterSpacing: '0.05em', textAlign: 'right',
        lineHeight: 1.6,
      }}>
        <div>hover → highlight path</div>
        <div>click → view level</div>
      </div>

      <motion.div
        ref={animRef}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ width: '100%', height: '100%', paddingTop: 20 }}
      >
        <svg viewBox={`0 0 ${dims.w} ${dims.h}`} style={{ width: '100%', height: dims.h }}>
          {skillEdges.map((edge, i) => {
            const source = laidOutNodes.find(n => n.id === edge.source)
            const target = laidOutNodes.find(n => n.id === edge.target)
            if (!source || !target) return null
            const isHi = highlighted.edges.has(i)
            const mx = (source.x + target.x) / 2
            const my = (source.y + target.y) / 2 - 25
            const eColor = catColors[laidOutNodes.find(n => n.id === edge.source)?.category] || '#00d4ff'
            return (
              <motion.path
                key={`edge-${i}`}
                d={`M${source.x} ${source.y} Q${mx} ${my} ${target.x} ${target.y}`}
                fill="none"
                stroke={isHi ? eColor : `rgba(0,212,255,0.08)`}
                strokeWidth={isHi ? 2.5 : 1}
                strokeLinecap="round"
                opacity={hoveredNode && !isHi ? 0.03 : isHi ? 0.85 : 0.15}
                style={{
                  transition: 'all 0.4s cubic-bezier(.4,0,.2,1)',
                  filter: isHi ? `drop-shadow(0 0 6px ${eColor})` : 'none',
                }}
                initial={{ pathLength: 0 }}
                animate={isInView
                  ? { pathLength: 1, transition: { duration: 0.7, delay: i * 0.035, ease: 'easeOut' } }
                  : { pathLength: 0 }}
              />
            )
          })}

          {laidOutNodes.map((node, i) => {
            const isHi = highlighted.nodes.has(node.id)
            const color = catColors[node.category]
            const radius = 14 + (node.level / 100) * 18
            const circ = 2 * Math.PI * (radius + 3)
            const arcLen = circ * 0.75 * (node.level / 100)

            return (
              <motion.g
                key={node.id}
                style={{ cursor: 'pointer' }}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView
                  ? {
                      opacity: 1, y: 0,
                      transition: { duration: 0.5, delay: i * 0.035, ease: [0.35, 0.1, 0.25, 1] },
                    }
                  : { opacity: 0, y: 15 }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleNodeClick(node.id)}
                className={`skill-node ${isHi ? 'skill-node-hi' : ''} ${hoveredNode && !isHi ? 'skill-node-dim' : ''}`}
              >
                {isHi && (
                  <circle
                    cx={node.x} cy={node.y}
                    r={radius + 6}
                    fill="none"
                    stroke={color}
                    strokeWidth={1.5}
                    opacity={0.5}
                    style={{ filter: `drop-shadow(0 0 12px ${color})` }}
                  />
                )}
                <circle
                  cx={node.x} cy={node.y}
                  r={radius}
                  fill={isHi ? `${color}30` : `${color}0A`}
                  stroke={isHi ? color : `${color}44`}
                  strokeWidth={isHi ? 2.5 : 1.2}
                  style={{
                    transition: 'all 0.4s cubic-bezier(.4,0,.2,1)',
                    filter: isHi ? `drop-shadow(0 0 8px ${color})` : 'none',
                    willChange: 'transform',
                  }}
                />
                <circle
                  cx={node.x} cy={node.y}
                  r={radius + 4}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  strokeDasharray={`${arcLen} ${circ - arcLen}`}
                  strokeLinecap="round"
                  opacity={isHi ? 0.9 : 0.25}
                  transform={`rotate(135 ${node.x} ${node.y})`}
                  style={{ transition: 'opacity 0.35s' }}
                />
                <text
                  x={node.x} y={node.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isHi ? '#e0e0ff' : '#8888aa'}
                  fontSize={Math.max(7.5, Math.min(radius * 0.37, 11))}
                  fontFamily="'Rajdhani',sans-serif"
                  fontWeight={isHi ? 600 : 400}
                  style={{
                    transition: 'all 0.35s ease',
                    pointerEvents: 'none',
                  }}
                >
                  {node.label}
                </text>
              </motion.g>
            )
          })}
        </svg>
      </motion.div>

      <style>{`
        .skill-node { animation: node-pulse 3s ease-in-out infinite; }
        .skill-node-hi { animation: node-pulse 1.5s ease-in-out infinite !important; }
        .skill-node-dim { animation: none !important; opacity: 0.35 !important; }
        @keyframes node-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.75; }
        }
      `}</style>

      {clickedNode && (
        <SkillDetailPanel
          node={laidOutNodes.find(n => n.id === clickedNode)}
          connectedNodeIds={adjacency[clickedNode]}
          allNodes={laidOutNodes}
          onClose={() => setClickedNode(null)}
          catColor={catColors[laidOutNodes.find(n => n.id === clickedNode)?.category] || '#00d4ff'}
        />
      )}

      {clickedNode && (
        <div
          onClick={() => setClickedNode(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 15 }}
        />
      )}
    </div>
  )
}
