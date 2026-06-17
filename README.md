# ⚡ DA_MASTER_PORTFOLIO — v2.0

**v2.0** — A cyberpunk-styled personal portfolio built with React, Vite, Three.js, and Framer Motion. Features a force-directed skill graph, custom cursor, 3D background, and a fully responsive dark design.

---

## ✨ What's New in v2.0

- **Complete visual overhaul** — Cyberpunk neon theme (Electric Blue `#00d4ff` / Magenta `#ff00e6` / Gold `#ffd700`)
- **Force-directed skill graph** — 18-node interactive SVG graph with adjacency highlighting, click detail panel, and scroll-triggered draw-in animation (no D3 dependency)
- **3D background** — Deferred-loaded Three.js scene with floating wireframe geometries and particle field (`React.lazy` + `Suspense`, 899 kB deferred chunk)
- **Custom cursor** — Ref-based trail system (no React state per frame), reticle with rotation animation and shockwave ripple on click
- **Mobile-first responsive** — Full-screen hamburger overlay, grid breakpoints for projects/achievements/contact
- **Footer easter egg** — Clickable status badge cycles messages; double-click copyright for hidden terminal (`whoami`, `ls`, `matrix`, `42`, etc.)
- **Contact form** — EmailJS integration with toast notifications, two-column layout
- **Scroll-triggered animations** — 6 animation variants (`fade-up`, `fade-left`, `fade-right`, `scale-in`, `bounce-in`, `slide-graph`) via custom `AnimatedSection` component
- **Always-dark theme** — No light mode toggle, simplified CSS
- **Profile image** — Morphing blob frame with animated border-radius oscillation
- **404 page** — Terminal-styled error with glitch aesthetic

---

## 🧰 Tech Stack

| Layer | Stack |
|-------|-------|
| **Framework** | React 19 + Vite |
| **Routing** | React Router v7 |
| **Animation** | Framer Motion (scroll, stagger, spring) |
| **3D** | Three.js + @react-three/fiber + @react-three/drei |
| **Icons** | lucide-react |
| **Email** | @emailjs/browser |
| **Build** | Vite 7 |
| **Linting** | ESLint 9 |

No Tailwind CSS — all styling uses inline styles and CSS-in-JS.

---

## 🚀 Getting Started

```bash
git clone https://github.com/U9D3RTAK3R/DaMasterPortFolio
cd DaMasterPortFolio
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/               # Toast system (shadcn-style)
│   ├── AboutSection.jsx
│   ├── AchievementsSection.jsx
│   ├── AnimatedSection.jsx   # Reusable scroll-triggered animation wrapper
│   ├── BackToTop.jsx
│   ├── ContactSection.jsx
│   ├── CustomPointer.jsx     # Ref-based cursor trail
│   ├── ExperienceSection.jsx
│   ├── Footer.jsx            # Easter egg terminal
│   ├── HeroSection.jsx
│   ├── Navbar.jsx
│   ├── ProjectsSection.jsx
│   ├── ResumeSection.jsx
│   ├── ScrollProgress.jsx
│   ├── SkillsGraph.jsx       # Force-directed graph
│   ├── SkillsSection.jsx
│   └── ThreeBackground.jsx   # 3D scene (lazy-loaded)
├── hooks/
│   └── use-toast.js
├── lib/
│   └── utils.js
├── pages/
│   ├── Home.jsx
│   └── NotFound.jsx
├── App.jsx
├── index.css
└── main.jsx
```

---

## 🎨 Design System

- **Fonts**: Orbitron (headings), Rajdhani (body), Share Tech Mono (code/mono)
- **Colors**: `#00d4ff` (blue), `#ff00e6` (magenta), `#ffd700` (gold), `#06060e` (bg)
- **No light mode** — always-dark aesthetic
- **Grid breakpoints**: CSS class-based (no Tailwind)

---

## 🔌 EmailJS Configuration

If you fork this project, update the credentials in `ContactSection.jsx`:

```js
emailjs.sendForm('your_service_id', 'your_template_id', form.current, 'your_public_key')
```

---

## 📄 License

MIT — feel free to use as a reference for your own portfolio.
