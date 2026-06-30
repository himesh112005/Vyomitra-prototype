'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const PLANETS = [
  { radius: 0.22, orbitRadiusX: 4.0, orbitRadiusZ: 2.4, speed: 0.18, color: '#22d3ee', emissive: '#0891b2', tilt: 0.3 },
  { radius: 0.32, orbitRadiusX: 6.2, orbitRadiusZ: 3.8, speed: 0.11, color: '#a855f7', emissive: '#7c3aed', tilt: -0.5 },
  { radius: 0.18, orbitRadiusX: 8.5, orbitRadiusZ: 5.0, speed: 0.07, color: '#fb923c', emissive: '#ea580c', tilt: 0.8 },
  { radius: 0.14, orbitRadiusX: 10.8, orbitRadiusZ: 6.5, speed: 0.05, color: '#86efac', emissive: '#16a34a', tilt: -0.2 },
]

function Planet({ radius, orbitRadiusX, orbitRadiusZ, speed, color, emissive, tilt }: typeof PLANETS[0]) {
  const meshRef = useRef<THREE.Mesh>(null)
  const angleRef = useRef(Math.random() * Math.PI * 2)

  useFrame((_, delta) => {
    angleRef.current += speed * delta
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(angleRef.current) * orbitRadiusX
      meshRef.current.position.z = Math.sin(angleRef.current) * orbitRadiusZ
      meshRef.current.rotation.y += delta * 0.5
      meshRef.current.rotation.x += delta * 0.1
    }
  })

  return (
    <group rotation={[tilt, 0, 0]}>
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[orbitRadiusX, 0.008, 6, 80]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>

      {/* Planet */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={1.2}
          roughness={0.6}
          metalness={0.2}
        />
        <Sparkles count={12} scale={radius * 6} size={0.8} speed={0.3} color={color} />
      </mesh>
    </group>
  )
}

export default function SolarOrrery({ position = [-5, 1, -8] }: { position?: [number, number, number] }) {
  const sunRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.003
      const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.05 + 1
      sunRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group position={position}>
      {/* Sun */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={3}
          roughness={0.1}
          metalness={0}
        />
      </mesh>
      <pointLight color="#fbbf24" intensity={8} distance={40} decay={2} />
      <Sparkles count={30} scale={5} size={2} speed={0.4} color="#fbbf24" />

      {/* Planets */}
      {PLANETS.map((planet, i) => (
        <Planet key={i} {...planet} />
      ))}
    </group>
  )
}
