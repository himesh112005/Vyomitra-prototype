'use client'
import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, OrbitControls, useDetectGPU } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'
import MassivePlanet from './MassivePlanet'
import AsteroidBelt from './AsteroidBelt'
import NetworkGlobe from './NetworkGlobe'
import Galaxy from './Galaxy'
import OrbitalStation from './OrbitalStation'

function StarfieldWithParallax({ count }: { count: number }) {
  const { camera } = useThree()
  const starsRef = useRef<any>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state, delta) => {
    if (starsRef.current) {
      // Automatic continuous rotation
      starsRef.current.rotation.y += delta * 0.02
      starsRef.current.rotation.x += delta * 0.01

      // Parallax effect added on top
      starsRef.current.rotation.x += (mouse.current.y * 0.04 - starsRef.current.rotation.x) * 0.05
      starsRef.current.rotation.y += (mouse.current.x * 0.04 - starsRef.current.rotation.y) * 0.05
    }
  })

  return <Stars ref={starsRef} radius={120} depth={60} count={count} factor={4} saturation={0.3} fade speed={0.5} />
}

function SceneContent({ isLowEnd }: { isLowEnd: boolean }) {
  return (
    <>
      <ambientLight intensity={0.08} />
      <StarfieldWithParallax count={isLowEnd ? 1500 : 5000} />
      <Galaxy />
      <MassivePlanet />
      <AsteroidBelt />
      <NetworkGlobe />
      <OrbitalStation />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        dampingFactor={0.08}
        enableDamping
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI * 0.75}
      />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          intensity={1.8}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.1} darkness={0.7} />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new Vector2(0.0008, 0.0008)}
          radialModulation={false}
          modulationOffset={0.15}
        />
      </EffectComposer>
    </>
  )
}

export default function HeroSpace3D() {
  const [isLowEnd, setIsLowEnd] = useState(false)

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const lowMemory = (navigator as any).deviceMemory !== undefined && (navigator as any).deviceMemory < 4
    setIsLowEnd(isMobile || lowMemory)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 2, 12], fov: 60 }}
      dpr={isLowEnd ? 1 : [1, 2]}
      gl={{ antialias: !isLowEnd, alpha: true }} // Alpha true so background can bleed through if needed, though we set background here
      style={{ background: 'transparent' }} // Let the page CSS handle the background gradient
    >
      <Suspense fallback={null}>
        <SceneContent isLowEnd={isLowEnd} />
      </Suspense>
    </Canvas>
  )
}
