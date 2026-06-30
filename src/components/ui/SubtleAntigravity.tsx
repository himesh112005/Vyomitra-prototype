'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function FloatingDust({ count = 80 }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Generate random positions, speeds, and scales for the dust particles
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40
      const y = (Math.random() - 0.5) * 40
      const z = (Math.random() - 0.5) * 20 - 10
      const scale = Math.random() * 0.15 + 0.05
      const speed = Math.random() * 0.015 + 0.005
      const rotationSpeedX = (Math.random() - 0.5) * 0.02
      const rotationSpeedY = (Math.random() - 0.5) * 0.02
      temp.push({ x, y, z, scale, speed, rotationSpeedX, rotationSpeedY, rotX: 0, rotY: 0 })
    }
    return temp
  }, [count])

  useFrame(() => {
    if (!mesh.current) return

    particles.forEach((particle, i) => {
      // Antigravity drift upwards
      particle.y += particle.speed
      // Wrap around if it goes too high
      if (particle.y > 20) particle.y = -20

      // Spin slowly
      particle.rotX += particle.rotationSpeedX
      particle.rotY += particle.rotationSpeedY

      dummy.position.set(particle.x, particle.y, particle.z)
      dummy.rotation.set(particle.rotX, particle.rotY, 0)
      dummy.scale.setScalar(particle.scale)
      dummy.updateMatrix()

      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#22d3ee" transparent opacity={0.15} wireframe />
    </instancedMesh>
  )
}

function FloatingShapes() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-8, -2, -5]} rotation={[0.5, 0.5, 0]}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.05} wireframe />
        </mesh>
      </Float>
      
      <Float speed={1} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[8, 4, -8]} rotation={[-0.5, 0.2, 0]}>
          <octahedronGeometry args={[2, 0]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.03} wireframe />
        </mesh>
      </Float>
    </>
  )
}

export default function SubtleAntigravity() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <fog attach="fog" args={['#000408', 5, 25]} />
        <FloatingDust count={150} />
        <FloatingShapes />
      </Canvas>
    </div>
  )
}
