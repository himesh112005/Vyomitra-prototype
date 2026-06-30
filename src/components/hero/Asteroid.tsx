'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Trail } from '@react-three/drei'
import * as THREE from 'three'

function createAsteroidGeometry() {
  const geo = new THREE.IcosahedronGeometry(0.7, 2)
  const positions = geo.attributes.position
  const noiseScale = 0.35
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i)
    const y = positions.getY(i)
    const z = positions.getZ(i)
    const noise =
      Math.sin(x * 4.3) * Math.cos(y * 3.7) * Math.sin(z * 5.1) * noiseScale +
      Math.cos(x * 8.1) * Math.sin(y * 6.4) * Math.cos(z * 7.2) * noiseScale * 0.4
    const len = Math.sqrt(x * x + y * y + z * z)
    const scale = (len + noise) / len
    positions.setXYZ(i, x * scale, y * scale, z * scale)
  }
  geo.computeVertexNormals()
  return geo
}

export default function Asteroid({ isLowEnd = false }: { isLowEnd?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const geo = useMemo(() => createAsteroidGeometry(), [])
  const timeRef = useRef(Math.random() * Math.PI * 2)

  useFrame((_, delta) => {
    timeRef.current += delta * 0.15
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(timeRef.current * 0.7) * 6
      meshRef.current.position.y = Math.cos(timeRef.current * 0.4) * 3 + 1
      meshRef.current.position.z = Math.sin(timeRef.current * 0.5 + 1) * 3
      meshRef.current.rotation.x += delta * 0.3
      meshRef.current.rotation.y += delta * 0.18
      meshRef.current.rotation.z += delta * 0.12
    }
  })

  const asteroidMesh = (
    <mesh ref={meshRef} geometry={geo}>
      <meshStandardMaterial
        color="#6b5c4a"
        roughness={0.95}
        metalness={0.1}
        emissive="#2a1f15"
        emissiveIntensity={0.2}
      />
    </mesh>
  )

  if (isLowEnd) return asteroidMesh

  return (
    <Trail
      width={1.2}
      length={8}
      color={new THREE.Color('#c2834a')}
      attenuation={(t) => t * t}
    >
      {asteroidMesh}
    </Trail>
  )
}
