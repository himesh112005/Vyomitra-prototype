'use client'
import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, RoundedBox, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import SectionWrapper from '../ui/SectionWrapper'
import dynamic from 'next/dynamic'

const LAYERS = [
  {
    id: 'input',
    label: 'INPUT LAYER',
    sublabel: 'Telemetry Ingestion',
    color: '#22d3ee',
    details: 'SNMP traps, NetFlow v9/v10, syslog, YANG models',
    position: [-4.5, 0, 0] as [number, number, number],
  },
  {
    id: 'orchestration',
    label: 'AGENT ORCHESTRATION',
    sublabel: 'LangGraph Multi-Agent',
    color: '#a855f7',
    details: 'Sensor Agent, Analysis Agent, Prediction Agent, Remediation Agent',
    position: [-1.5, 0, 0] as [number, number, number],
  },
  {
    id: 'intelligence',
    label: 'INTELLIGENCE',
    sublabel: 'Local AI Models',
    color: '#f97316',
    details: 'Llama 3.1 (Ollama) + FAISS RAG + Prophet Forecasting',
    position: [1.5, 0, 0] as [number, number, number],
  },
  {
    id: 'output',
    label: 'OUTPUT LAYER',
    sublabel: 'Engineer Copilot',
    color: '#34d399',
    details: 'Dashboard UI, Chat Interface, Audit Logs, Playbook Export',
    position: [4.5, 0, 0] as [number, number, number],
  },
]

function DataFlowLine({ from, to, color }: { from: [number, number, number]; to: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 2 + from[0]) * 0.4
    }
  })

  const mid: [number, number, number] = [
    (from[0] + to[0]) / 2,
    (from[1] + to[1]) / 2,
    (from[2] + to[2]) / 2,
  ]
  const length = Math.sqrt(
    Math.pow(to[0] - from[0], 2) + Math.pow(to[1] - from[1], 2) + Math.pow(to[2] - from[2], 2)
  )

  return (
    <mesh ref={ref} position={mid} rotation={[0, 0, 0]}>
      <cylinderGeometry args={[0.015, 0.015, length, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  )
}

function ArchPanel({ layer, index }: { layer: typeof LAYERS[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const targetY = Math.sin(state.clock.elapsedTime * 0.5 + index * 1.2) * 0.15
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05
    groupRef.current.rotation.y += 0.003
  })

  return (
    <group
      ref={groupRef}
      position={layer.position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <RoundedBox args={[2.2, 2.8, 0.15]} radius={0.12} smoothness={4}>
        <meshStandardMaterial
          color={hovered ? layer.color : '#0a1628'}
          emissive={layer.color}
          emissiveIntensity={hovered ? 0.4 : 0.08}
          transparent
          opacity={0.85}
          metalness={0.3}
          roughness={0.4}
        />
      </RoundedBox>

      {/* Border glow frame */}
      <RoundedBox args={[2.25, 2.85, 0.1]} radius={0.12} smoothness={4}>
        <meshBasicMaterial color={layer.color} transparent opacity={hovered ? 0.4 : 0.12} wireframe />
      </RoundedBox>

      <Html center distanceFactor={8} style={{ pointerEvents: 'none', userSelect: 'none' }}>
        <div
          style={{
            width: 180,
            padding: '12px 16px',
            textAlign: 'center',
            fontFamily: 'monospace',
            transition: 'all 0.3s',
          }}
        >
          <div
            style={{
              fontSize: 9,
              color: layer.color,
              letterSpacing: '2px',
              marginBottom: 6,
              opacity: 0.9,
            }}
          >
            {layer.label}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600, marginBottom: 8 }}>
            {layer.sublabel}
          </div>
          {hovered && (
            <div
              style={{
                fontSize: 9,
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.6,
                marginTop: 8,
                padding: '6px 8px',
                background: 'rgba(0,0,0,0.5)',
                borderRadius: 6,
                border: `1px solid ${layer.color}40`,
              }}
            >
              {layer.details}
            </div>
          )}
        </div>
      </Html>
    </group>
  )
}

function ArchScene() {
  const sceneRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3
    }
  })

  return (
    <group ref={sceneRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 5]} intensity={2} color="#22d3ee" />

      {LAYERS.map((layer, i) => (
        <ArchPanel key={layer.id} layer={layer} index={i} />
      ))}

      {/* Connection lines between panels */}
      {LAYERS.slice(0, -1).map((layer, i) => (
        <DataFlowLine
          key={`line-${i}`}
          from={[layer.position[0] + 1.1, 0, 0]}
          to={[LAYERS[i + 1].position[0] - 1.1, 0, 0]}
          color={layer.color}
        />
      ))}

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} dampingFactor={0.1} enableDamping />
      <EffectComposer>
        <Bloom luminanceThreshold={0.1} intensity={1.2} mipmapBlur />
      </EffectComposer>
    </group>
  )
}

const ArchCanvas = dynamic(
  () =>
    Promise.resolve(function ArchCanvas3D() {
      return (
        <Canvas camera={{ position: [0, 2, 10], fov: 55 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <ArchScene />
          </Suspense>
        </Canvas>
      )
    }),
  { ssr: false }
)

export default function Architecture3D() {
  return (
    <SectionWrapper id="architecture" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-orange-400 text-xs font-mono tracking-widest">SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Four-Layer{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Intelligence
            </span>{' '}
            Stack
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Hover over each layer to explore VYOMITRA&apos;s modular, air-gapped architecture.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden border border-white/10 bg-black/30 backdrop-blur-sm" style={{ height: 420 }}>
          <ArchCanvas />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {LAYERS.map((layer) => (
            <div key={layer.id} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ background: layer.color, boxShadow: `0 0 10px ${layer.color}` }} />
              <div className="text-white/80 text-xs font-mono">{layer.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
