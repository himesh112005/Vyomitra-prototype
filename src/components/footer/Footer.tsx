'use client'
import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import dynamic from 'next/dynamic'

function WireframeEarth() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4
      meshRef.current.rotation.x += delta * 0.05
    }
  })
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.5} />
    </mesh>
  )
}

const EarthCanvas = dynamic(
  () =>
    Promise.resolve(function EarthCanvasInner() {
      return (
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }} dpr={1} gl={{ antialias: false, alpha: true }}>
          <Suspense fallback={null}>
            <WireframeEarth />
            <ambientLight intensity={0.5} />
            <pointLight position={[3, 3, 3]} intensity={2} color="#22d3ee" />
          </Suspense>
        </Canvas>
      )
    }),
  { ssr: false }
)

export default function Footer() {
  return (
    <footer className="relative py-20 px-4 border-t border-white/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-8">
          {/* Rotating Earth */}
          <div className="w-24 h-24">
            <EarthCanvas />
          </div>

          {/* Brand */}
          <div className="text-center">
            <div
              className="text-4xl font-black text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #22d3ee, #818cf8)',
                fontFamily: 'Orbitron, sans-serif',
              }}
            >
              VYOMITRA
            </div>
            <div className="text-white/30 text-sm font-mono mt-2">
              वायोमित्र — Friend of the Cosmos
            </div>
          </div>

          {/* Zero egress badge */}
          <motion.div
            animate={{ scale: [1, 1.04, 1], boxShadow: ['0 0 15px rgba(34,211,238,0.2)', '0 0 30px rgba(34,211,238,0.4)', '0 0 15px rgba(34,211,238,0.2)'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="flex items-center gap-3 px-6 py-3 rounded-full border border-cyan-500/40 bg-cyan-500/10 backdrop-blur-sm"
          >
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-cyan-300 text-sm font-mono font-semibold tracking-wide">
              100% Local Inference — Zero Egress Guaranteed
            </span>
          </motion.div>

          {/* Team info */}
          <div className="text-center">
            <div className="text-white/50 text-sm font-mono">
              Built for{' '}
              <span className="text-cyan-400">ISRO Bharatiya Antariksh Hackathon 2026</span>
              {' '}· Problem Statement #13
            </div>
            <div className="text-white/20 text-xs font-mono mt-2">
              VYOMITRA — Multi-Agent Predictive Copilot for MPLS Network Operations
            </div>
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs font-mono text-white/20">
            <span>Air-gapped · ITAR Compliant · Offline-first</span>
            <span className="hidden md:block">·</span>
            <span>Powered by Llama 3.1 · FAISS · LangGraph · Prophet</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
