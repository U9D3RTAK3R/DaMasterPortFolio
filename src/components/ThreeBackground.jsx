import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

function FloatingGeometry({ position, geometry, color, speed = 0.5 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.getElapsedTime() * speed * 0.3
    ref.current.rotation.y = clock.getElapsedTime() * speed * 0.5
  })
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh ref={ref} position={position}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          wireframe
          transparent
          opacity={0.4}
          distort={0.2}
          speed={1.5}
        />
      </mesh>
    </Float>
  )
}

function Particles({ count = 200 }) {
  const ref = useRef()
  const { positions } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return { positions: pos }
  }, [count])

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function Grid() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
      <planeGeometry args={[40, 40, 40, 40]} />
      <meshBasicMaterial
        color="#00d4ff"
        wireframe
        transparent
        opacity={0.06}
      />
    </mesh>
  )
}

function Scene() {
  const { width } = useThree((s) => s.viewport)
  const isMobile = width < 6

  if (isMobile) return null

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#ff00e6" />

      <FloatingGeometry
        position={[-3.5, 1, -2]}
        geometry={<torusKnotGeometry args={[0.6, 0.2, 64, 8]} />}
        color="#00d4ff"
        speed={0.4}
      />
      <FloatingGeometry
        position={[3.5, -1.5, -3]}
        geometry={<icosahedronGeometry args={[0.5, 0]} />}
        color="#ff00e6"
        speed={0.6}
      />
      <FloatingGeometry
        position={[0, 3, -4]}
        geometry={<octahedronGeometry args={[0.4, 0]} />}
        color="#ffd700"
        speed={0.3}
      />
      <FloatingGeometry
        position={[-2, -2.5, -5]}
        geometry={<dodecahedronGeometry args={[0.35, 0]} />}
        color="#00fff0"
        speed={0.5}
      />
      <FloatingGeometry
        position={[2.5, 2.5, -6]}
        geometry={<torusGeometry args={[0.5, 0.15, 16, 32]} />}
        color="#00d4ff"
        speed={0.7}
      />
      <Particles count={250} />
      <Grid />
    </>
  )
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
