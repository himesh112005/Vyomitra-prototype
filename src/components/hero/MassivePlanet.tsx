import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function MassivePlanet() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.015
    }
  })

  return (
    <group position={[5, 0, -12]}>
      {/* Sunlight — distant blue-tinted star casting light from the left */}
      <pointLight
        position={[-15, 5, 5]}
        color="#60a5fa"
        intensity={800}
        distance={100}
      />

      {/* Dark-side fill light — prevents total blackness on the shadowed hemisphere */}
      <pointLight
        position={[15, -5, -5]}
        color="#001133"
        intensity={4}
        distance={100}
      />

      {/* Rotating planet group */}
      <group ref={groupRef}>
        {/* Core planet sphere */}
        <mesh>
          <sphereGeometry args={[6, 128, 128]} />
          <meshStandardMaterial
            color="#0a1a6e"
            emissive="#0033cc"
            emissiveIntensity={0.35}
            roughness={0.85}
            metalness={0.0}
          />
        </mesh>

        {/* Atmospheric glow ring — BackSide creates inner atmosphere halo */}
        <mesh>
          <sphereGeometry args={[6.4, 64, 64]} />
          <meshBasicMaterial
            color="#3b82f6"
            transparent
            opacity={0.12}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Outer aura ring — wide, faint backlit corona */}
        <mesh>
          <sphereGeometry args={[8.5, 64, 64]} />
          <meshBasicMaterial
            color="#1e40af"
            transparent
            opacity={0.05}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </group>
  )
}
