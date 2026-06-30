import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function OrbitalStation(props: any) {
  const ringRef = useRef<THREE.Group>(null!)
  const stationRef = useRef<THREE.Group>(null!)

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15 // Slow rotation for the habitation ring
    }
    if (stationRef.current) {
      // Gentle bobbing and floating
      stationRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      stationRef.current.rotation.y += delta * 0.05
    }
  })

  const emissiveCyan = "#00ffff"
  const emissivePurple = "#b026ff"

  return (
    <group {...props} position={props.position || [2, 1, 4]} dispose={null}>
      <group ref={stationRef} rotation={[0.2, -0.4, 0.1]} scale={0.4}>
        
        {/* Core Cylinder */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 4, 32]} />
          <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.2} />
        </mesh>
        
        {/* Emissive Core Accents */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.52, 0.52, 1.5, 32]} />
          <meshStandardMaterial color="#111" emissive={emissiveCyan} emissiveIntensity={2} toneMapped={false} />
        </mesh>
        
        {/* Antenna/Spire */}
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[0.05, 0.2, 2, 16]} />
          <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.3} />
        </mesh>
        
        <mesh position={[0, 3.5, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive={emissivePurple} emissiveIntensity={3} toneMapped={false} />
        </mesh>

        {/* Habitation Ring */}
        <group ref={ringRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <torusGeometry args={[2, 0.3, 16, 64]} />
            <meshStandardMaterial color="#888888" metalness={0.7} roughness={0.4} />
          </mesh>
          
          {/* Connecting Spokes */}
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} rotation={[0, 0, (i * Math.PI) / 2]} position={[0, 1, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 2, 16]} />
              <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
            </mesh>
          ))}

          {/* Glowing Windows on Ring */}
          <mesh>
            <torusGeometry args={[2.05, 0.1, 16, 64]} />
            <meshStandardMaterial color="#000" emissive={emissiveCyan} emissiveIntensity={1.5} wireframe toneMapped={false} />
          </mesh>
        </group>
        
        {/* Base module */}
        <mesh position={[0, -2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.6, 1, 32]} />
          <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Solar Panels */}
        <group position={[0, -1, 0]}>
          <mesh position={[2.2, 0, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[3, 0.05, 1]} />
            <meshStandardMaterial color="#112244" metalness={0.9} roughness={0.1} emissive="#001133" emissiveIntensity={0.5} />
          </mesh>
          {/* Panel Support Right */}
          <mesh position={[0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
            <meshStandardMaterial color="#555555" metalness={1} roughness={0.2} />
          </mesh>

          <mesh position={[-2.2, 0, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[3, 0.05, 1]} />
            <meshStandardMaterial color="#112244" metalness={0.9} roughness={0.1} emissive="#001133" emissiveIntensity={0.5} />
          </mesh>
          {/* Panel Support Left */}
          <mesh position={[-0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
            <meshStandardMaterial color="#555555" metalness={1} roughness={0.2} />
          </mesh>
        </group>

      </group>
    </group>
  )
}
