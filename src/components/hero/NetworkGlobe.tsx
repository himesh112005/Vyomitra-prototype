'use client'
import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = []
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = goldenAngle * i
    points.push(new THREE.Vector3(r * Math.cos(theta) * radius, y * radius, r * Math.sin(theta) * radius))
  }
  return points
}

export default function NetworkGlobe({ position = [3, 0, -2] }: { position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const nodeRefs = useRef<THREE.Mesh[]>([])
  const lineRefs = useRef<THREE.LineSegments | null>(null)
  const pulseState = useRef<{ index: number; phase: 'fault' | 'resolved'; timer: number }>({
    index: 0,
    phase: 'fault',
    timer: 0,
  })

  const radius = 2.2
  const nodeCount = 60

  const nodes = useMemo(() => fibonacciSphere(nodeCount, radius), [])

  const links = useMemo(() => {
    const pairs: [number, number][] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 1.4) {
          pairs.push([i, j])
        }
      }
    }
    return pairs
  }, [nodes])

  const lineGeometry = useMemo(() => {
    const positions: number[] = []
    const colors: number[] = []
    for (const [a, b] of links) {
      positions.push(nodes[a].x, nodes[a].y, nodes[a].z)
      positions.push(nodes[b].x, nodes[b].y, nodes[b].z)
      colors.push(0.1, 0.5, 0.8, 0.1, 0.5, 0.8)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    return geo
  }, [nodes, links])

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.5,
      }),
    []
  )

  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.08

    pulseState.current.timer += delta
    if (pulseState.current.timer > 1.2) {
      pulseState.current.timer = 0
      const linkIdx = Math.floor(Math.random() * links.length)
      pulseState.current.index = linkIdx

      const colorAttr = lineGeometry.attributes.color as THREE.BufferAttribute
      const i = linkIdx * 2
      if (pulseState.current.phase === 'fault') {
        colorAttr.setXYZ(i, 1.0, 0.2, 0.1)
        colorAttr.setXYZ(i + 1, 1.0, 0.2, 0.1)
        pulseState.current.phase = 'resolved'
      } else {
        colorAttr.setXYZ(i, 0.1, 0.9, 0.4)
        colorAttr.setXYZ(i + 1, 0.1, 0.9, 0.4)
        pulseState.current.phase = 'fault'
        setTimeout(() => {
          const ca = lineGeometry.attributes.color as THREE.BufferAttribute
          ca.setXYZ(i, 0.1, 0.5, 0.8)
          ca.setXYZ(i + 1, 0.1, 0.5, 0.8)
          ca.needsUpdate = true
        }, 800)
      }
      colorAttr.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Wireframe sphere outline */}
      <mesh>
        <sphereGeometry args={[radius + 0.05, 24, 24]} />
        <meshBasicMaterial color="#1e3a5f" wireframe transparent opacity={0.06} />
      </mesh>

      {/* Nodes */}
      {nodes.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}

      {/* Links */}
      <lineSegments ref={lineRefs} geometry={lineGeometry} material={lineMaterial} />
    </group>
  )
}
