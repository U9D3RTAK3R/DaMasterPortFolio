import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  siPython,
  siJavascript,
  siCplusplus,
  siOpenjdk,
  siGo,
  siMysql,
  siReact,
  siHtml5,
  siTailwindcss,
  siFlutter,
  siFramer,
  siNodedotjs,
  siFastapi,
  siMongodb,
  siFirebase,
  siGit,
  siDocker,
  siLinux,
  siOpencv,
  siYolo,
  siTensorflow,
} from "simple-icons";

const skillNodes = [
  { id: "python", label: "Python", level: 90, experience: "5 yrs", icon: siPython, category: "Languages" },
  { id: "javascript", label: "JavaScript", level: 80, experience: "2 yrs", icon: siJavascript, category: "Languages" },
  { id: "cpp", label: "C++", level: 50, experience: "6 months", icon: siCplusplus, category: "Languages" },
  { id: "java", label: "Java", level: 60, experience: "1 yr", icon: siOpenjdk, category: "Languages" },
  { id: "golang", label: "Go", level: 30, experience: "6 months", icon: siGo, category: "Languages" },
  { id: "sql", label: "SQL", level: 85, experience: "2 yrs", icon: siMysql, category: "Languages" },
  { id: "react", label: "React", level: 85, experience: "2 yrs", icon: siReact, category: "Frontend" },
  { id: "htmlcss", label: "HTML/CSS", level: 90, experience: "3 yrs", icon: siHtml5, category: "Frontend" },
  { id: "tailwind", label: "Tailwind", level: 75, experience: "2 yrs", icon: siTailwindcss, category: "Frontend" },
  { id: "flutter", label: "Flutter", level: 45, experience: "6 months", icon: siFlutter, category: "Frontend" },
  { id: "framermotion", label: "Framer", level: 25, experience: "2 months", icon: siFramer, category: "Frontend" },
  { id: "nodejs", label: "Node", level: 85, experience: "2 yrs", icon: siNodedotjs, category: "Backend & Tools" },
  { id: "fastapi", label: "FastAPI", level: 70, experience: "3 months", icon: siFastapi, category: "Backend & Tools" },
  { id: "mongodb", label: "MongoDB", level: 85, experience: "1 yr", icon: siMongodb, category: "Backend & Tools" },
  { id: "firebase", label: "Firebase", level: 80, experience: "1 yr", icon: siFirebase, category: "Backend & Tools" },
  { id: "git", label: "Git", level: 90, experience: "3 yrs", icon: siGit, category: "Backend & Tools" },
  { id: "docker", label: "Docker", level: 15, experience: "1 month", icon: siDocker, category: "Backend & Tools" },
  { id: "linux", label: "Linux", level: 90, experience: "1 yr", icon: siLinux, category: "Backend & Tools" },
  { id: "opencv", label: "OpenCV", level: 75, experience: "3 months", icon: siOpencv, category: "AI & Vision" },
  { id: "yolo", label: "YOLO", level: 75, experience: "3 months", icon: siYolo, category: "AI & Vision" },
  { id: "aiml", label: "AI/ML", level: 70, experience: "6 months", icon: siTensorflow, category: "AI & Vision" },
];

const skillEdges = [
  { source: "python", target: "javascript" },
  { source: "python", target: "cpp" },
  { source: "python", target: "sql" },
  { source: "python", target: "fastapi" },
  { source: "python", target: "opencv" },
  { source: "python", target: "aiml" },
  { source: "javascript", target: "react" },
  { source: "javascript", target: "nodejs" },
  { source: "javascript", target: "sql" },
  { source: "cpp", target: "java" },
  { source: "java", target: "golang" },
  { source: "golang", target: "docker" },
  { source: "golang", target: "linux" },
  { source: "react", target: "tailwind" },
  { source: "react", target: "framermotion" },
  { source: "react", target: "firebase" },
  { source: "htmlcss", target: "tailwind" },
  { source: "flutter", target: "firebase" },
  { source: "nodejs", target: "mongodb" },
  { source: "nodejs", target: "firebase" },
  { source: "nodejs", target: "linux" },
  { source: "fastapi", target: "mongodb" },
  { source: "fastapi", target: "opencv" },
  { source: "mongodb", target: "sql" },
  { source: "git", target: "docker" },
  { source: "git", target: "linux" },
  { source: "opencv", target: "yolo" },
  { source: "opencv", target: "aiml" },
  { source: "yolo", target: "aiml" },
];

const categories = ["Languages", "Frontend", "AI & Vision", "Backend & Tools"];

const catColors = {
  Languages: "var(--link)",
  Frontend: "var(--accent)",
  "Backend & Tools": "var(--highlight)",
  "AI & Vision": "var(--info)",
};
const alpha = (color, pct) => `color-mix(in oklch, ${color} ${pct}%, transparent)`;

function computeLayout(nodes, width, height) {
  const cx = width / 2;
  const cy = height / 2;
  const pad = 66;
  const radius = Math.max(92, Math.min(width, height) / 2 - pad);

  const gapSlots = 1.4;
  const totalSlots = nodes.length + categories.length * gapSlots;
  const slotAngle = (Math.PI * 2) / totalSlots;

  let cursor = 0;
  const positions = {};

  categories.forEach((cat) => {
    const group = nodes.filter((n) => n.category === cat);
    group.forEach((node) => {
      const angle = -Math.PI / 2 + (cursor + 0.5) * slotAngle;
      positions[node.id] = {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        angle,
      };
      cursor += 1;
    });
    cursor += gapSlots;
  });

  return nodes.map((node) => ({ ...node, ...positions[node.id] }));
}

const SkillGlyph = ({ icon, x, y, size }) => (
  <g
    transform={`translate(${x - size / 2} ${y - size / 2}) scale(${size / 24})`}
    style={{ pointerEvents: "none" }}
  >
    <path d={icon.path} fill={`#${icon.hex}`} />
  </g>
);

const SkillDetailPanel = ({ node, connected, onClose, catColor }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose();
    };
    const timer = setTimeout(
      () => document.addEventListener("mousedown", handler),
      150,
    );
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handler);
    };
  }, [onClose]);

  if (!node) return null;

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="skill-panel"
      style={{ borderColor: alpha(catColor, 30) }}
    >
      <button
        type="button"
        className="skill-panel__close"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>

      <div className="skill-panel__head">
        <span
          className="skill-panel__icon"
          style={{ background: `#${node.icon.hex}` }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={node.icon.path} fill="var(--paper-0)" />
          </svg>
        </span>
        <div>
          <div className="skill-panel__name">{node.label}</div>
          <div className="skill-panel__cat" style={{ color: catColor }}>
            {node.category}
          </div>
        </div>
      </div>

      <div className="skill-panel__facts">
        <span>
          <em>Experience</em>
          {node.experience}
        </span>
        <span>
          <em>Proficiency</em>
          {node.level}%
        </span>
      </div>

      <div className="skill-panel__meter" aria-hidden="true">
        <span style={{ width: `${node.level}%`, background: catColor }} />
      </div>

      {connected.length > 0 && (
        <>
          <div className="skill-panel__divider" />
          <div className="skill-panel__label">Linked</div>
          <div className="skill-panel__tags">
            {connected.map((s) => (
              <span
                key={s.id}
                className="skill-panel__tag"
                style={{
                  color: catColors[s.category],
                  borderColor: alpha(catColors[s.category], 30),
                }}
              >
                {s.label}
              </span>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export const SkillsGraph = () => {
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const [dims, setDims] = useState({ w: 520, h: 460 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [clickedNode, setClickedNode] = useState(null);
  const isInView = useInView(animRef, { once: true, margin: "-80px 0px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const obs = new ResizeObserver(([entry]) => {
      const { width } = entry.contentRect;
      const w = Math.max(width, 300);
      setDims({ w, h: Math.min(Math.max(w * 0.86, 360), 560) });
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const laidOutNodes = useMemo(
    () => computeLayout(skillNodes, dims.w, dims.h),
    [dims.w, dims.h],
  );

  const adjacency = useMemo(() => {
    const map = {};
    skillEdges.forEach((e) => {
      if (!map[e.source]) map[e.source] = new Set();
      if (!map[e.target]) map[e.target] = new Set();
      map[e.source].add(e.target);
      map[e.target].add(e.source);
    });
    return map;
  }, []);

  const highlighted = useMemo(() => {
    if (!hoveredNode) return { nodes: new Set(), edges: new Set() };
    const nodes = new Set([hoveredNode]);
    (adjacency[hoveredNode] || new Set()).forEach((n) => nodes.add(n));
    const edgeIds = new Set();
    skillEdges.forEach((e, i) => {
      if (nodes.has(e.source) && nodes.has(e.target)) edgeIds.add(i);
    });
    return { nodes, edges: edgeIds };
  }, [hoveredNode, adjacency]);

  const handleNodeClick = useCallback((id) => {
    setClickedNode((prev) => (prev === id ? null : id));
  }, []);

  const clicked = clickedNode
    ? laidOutNodes.find((n) => n.id === clickedNode)
    : null;

  const activeId = hoveredNode || clickedNode;

  return (
    <div ref={containerRef} className="skill-graph" style={{ minHeight: 360 }}>
      <div className="skill-legend" aria-hidden="true">
        {categories.map((cat) => (
          <span key={cat}>
            <i style={{ background: catColors[cat] }} />
            {cat}
          </span>
        ))}
      </div>

      <motion.svg
        ref={animRef}
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        className="skill-graph__svg"
        role="img"
        aria-label={`Skill graph: ${skillNodes.length} skills across ${categories.length} categories`}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <circle
          cx={dims.w / 2}
          cy={dims.h / 2}
          r={Math.max(60, Math.min(dims.w, dims.h) / 2 - 66)}
          className="skill-graph__ring"
        />

        {skillEdges.map((edge, i) => {
          const s = laidOutNodes.find((n) => n.id === edge.source);
          const t = laidOutNodes.find((n) => n.id === edge.target);
          if (!s || !t) return null;
          const isHi = highlighted.edges.has(i);
          const dim = activeId && !isHi;
          const color = catColors[s.category] || "var(--link)";
          return (
            <g key={`edge-${i}`}>
              <line
                x1={s.x}
                y1={s.y}
                x2={t.x}
                y2={t.y}
                stroke={isHi ? color : "var(--rule)"}
                strokeWidth={isHi ? 1.6 : 1}
                opacity={dim ? 0 : isHi ? 0.7 : 0.12}
                style={{
                  transition: "opacity 0.3s ease, stroke 0.3s ease",
                  filter: isHi ? `drop-shadow(0 0 5px ${color})` : "none",
                }}
              />
              {isHi && !reduceMotion && (
                <>
                  <circle r="3.2" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
                    <animateMotion
                      dur="1.15s"
                      repeatCount="indefinite"
                      path={`M ${s.x} ${s.y} L ${t.x} ${t.y}`}
                    />
                  </circle>
                  <circle r="2.2" fill={color} opacity="0.7">
                    <animateMotion
                      dur="1.15s"
                      begin="0.55s"
                      repeatCount="indefinite"
                      path={`M ${s.x} ${s.y} L ${t.x} ${t.y}`}
                    />
                  </circle>
                </>
              )}
            </g>
          );
        })}

        {laidOutNodes.map((node, i) => {
          const isHi = highlighted.nodes.has(node.id);
          const isDim = activeId && !isHi;
          const color = catColors[node.category];
          const radius = 15 + (node.level / 100) * 9;
          const outward = node.angle;
          const lx = node.x + Math.cos(outward) * (radius + 11);
          const ly = node.y + Math.sin(outward) * (radius + 11);
          const anchor =
            Math.cos(outward) > 0.35
              ? "start"
              : Math.cos(outward) < -0.35
                ? "end"
                : "middle";
          return (
            <motion.g
              key={node.id}
              className="skill-node"
              style={{ cursor: "pointer" }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={
                isInView
                  ? {
                      opacity: isDim ? 0.3 : 1,
                      scale: 1,
                      transition: {
                        duration: 0.4,
                        delay: i * 0.02,
                        ease: [0.25, 0.1, 0.25, 1],
                      },
                    }
                  : { opacity: 0, scale: 0.6 }
              }
              whileHover={{ scale: 1.08 }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => handleNodeClick(node.id)}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={radius}
                fill={isHi ? alpha(color, 16) : "var(--paper-1)"}
                stroke={isHi ? color : alpha(color, 45)}
                strokeWidth={isHi ? 2 : 1.2}
                style={{ transition: "all 0.25s ease" }}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={radius - 3}
                fill="none"
                stroke={color}
                strokeWidth={1.6}
                strokeDasharray={`${(node.level / 100) * 2 * Math.PI * (radius - 3)} 999`}
                strokeLinecap="round"
                transform={`rotate(-90 ${node.x} ${node.y})`}
                opacity={isHi ? 0.9 : 0.4}
                style={{ transition: "opacity 0.25s ease" }}
              />
              <SkillGlyph
                icon={node.icon}
                x={node.x}
                y={node.y}
                size={radius * 1.15}
              />
              <text
                x={lx}
                y={ly}
                textAnchor={anchor}
                dominantBaseline="central"
                className="skill-node__label"
                style={{
                  fill: isHi ? "var(--ink-0)" : "var(--ink-1)",
                  fontWeight: isHi ? 600 : 400,
                }}
              >
                {node.label}
              </text>
            </motion.g>
          );
        })}
      </motion.svg>

      <p className="skill-graph__hint">hover to trace · click for details</p>

      {clicked && (
        <>
          <div
            className="skill-graph__scrim"
            onClick={() => setClickedNode(null)}
          />
          <SkillDetailPanel
            node={clicked}
            connected={Array.from(adjacency[clicked.id] || [])
              .map((id) => laidOutNodes.find((n) => n.id === id))
              .filter(Boolean)}
            onClose={() => setClickedNode(null)}
            catColor={catColors[clicked.category] || "var(--link)"}
          />
        </>
      )}
    </div>
  );
};
