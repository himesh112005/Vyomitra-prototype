import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 400

interface AsteroidData {
  position: THREE.Vector3
  scale: number
  rotationSpeed: THREE.Vector3
  orbitSpeed: number
  orbitAngle: number
  drift: THREE.Vector3
}

export default function AsteroidBelt() {
  const ref = useRef<THREE.InstancedMesh>(null!)

  const asteroids = useMemo<AsteroidData[]>(() => {
    return Array.from({ length: COUNT }, () => {
      const x = (Math.random() - 0.5) * 60   // -30 to 30
      const y = (Math.random() - 0.5) * 24   // -12 to 12
      const z = Math.random() * 25 - 20       // -20 to 5

      const scale = 0.05 + Math.random() * 1.75   // 0.05 to 1.8

      const rotX = Math.random() * Math.PI * 2
      const rotY = Math.random() * Math.PI * 2
      const rotZ = Math.random() * Math.PI * 2

      const orbitSpeed = 0.001 + Math.random() * 0.009   // 0.001 to 0.01
      const orbitAngle = Math.random() * Math.PI * 2      // initial angle

      // gentle drift — tiny per-frame velocity
      const drift = new THREE.Vector3(
        (Math.random() - 0.5) * 0.0015,
        (Math.random() - 0.5) * 0.0008,
        (Math.random() - 0.5) * 0.0012,
      )

      return {
        position: new THREE.Vector3(x, y, z),
        scale,
        rotationSpeed: new THREE.Vector3(rotX, rotY, rotZ),
        orbitSpeed,
        orbitAngle,
        drift,
      }
    })
  }, [])

  // Scratch objects — allocated once outside the frame loop to avoid GC pressure
  const _matrix   = useMemo(() => new THREE.Matrix4(), [])
  const _euler     = useMemo(() => new THREE.Euler(),   [])
  const _quat      = useMemo(() => new THREE.Quaternion(), [])
  const _pos       = useMemo(() => new THREE.Vector3(), [])
  const _scale     = useMemo(() => new THREE.Vector3(), [])

  // Per-asteroid mutable state stored in parallel arrays for speed
  const orbitAngles = useMemo(
    () => new Float32Array(asteroids.map(a => a.orbitAngle)),
    [asteroids],
  )
  const selfRotations = useMemo(
    () => new Float32Array(
      asteroids.flatMap(a => [
        a.rotationSpeed.x,
        a.rotationSpeed.y,
        a.rotationSpeed.z,
      ]),
    ),
    [asteroids],
  )

  useFrame((_state, delta) => {
    if (!ref.current) return

    const mesh = ref.current

    for (let i = 0; i < COUNT; i++) {
      const asteroid = asteroids[i]

      // Advance orbit angle
      orbitAngles[i] += asteroid.orbitSpeed * delta * 60

      // Advance self-rotation
      const ri = i * 3
      selfRotations[ri]     += 0.0015 * delta * 60
      selfRotations[ri + 1] += 0.002 * delta * 60
      selfRotations[ri + 2] += 0.001 * delta * 60

      // Compute world position = base position orbited around Y-axis + gentle drift
      const angle = orbitAngles[i]
      const cosA  = Math.cos(angle)
      const sinA  = Math.sin(angle)

      // Apply y-axis orbit rotation to the XZ plane of the base position
      const bx = asteroid.position.x
      const bz = asteroid.position.z
      const ox = bx * cosA - bz * sinA
      const oz = bx * sinA + bz * cosA

      // Drift — accumulate directly into stored position
      asteroid.position.x += asteroid.drift.x * delta * 60
      asteroid.position.y += asteroid.drift.y * delta * 60
      asteroid.position.z += asteroid.drift.z * delta * 60

      // Soft boundary wrap so asteroids never disappear permanently
      if (asteroid.position.x >  35) asteroid.drift.x = -Math.abs(asteroid.drift.x)
      if (asteroid.position.x < -35) asteroid.drift.x =  Math.abs(asteroid.drift.x)
      if (asteroid.position.y >  14) asteroid.drift.y = -Math.abs(asteroid.drift.y)
      if (asteroid.position.y < -14) asteroid.drift.y =  Math.abs(asteroid.drift.y)
      if (asteroid.position.z >   8) asteroid.drift.z = -Math.abs(asteroid.drift.z)
      if (asteroid.position.z < -22) asteroid.drift.z =  Math.abs(asteroid.drift.z)

      _pos.set(ox, asteroid.position.y, oz)

      // Self-rotation quaternion
      _euler.set(
        selfRotations[ri],
        selfRotations[ri + 1],
        selfRotations[ri + 2],
      )
      _quat.setFromEuler(_euler)

      _scale.setScalar(asteroid.scale)

      _matrix.compose(_pos, _quat, _scale)
      mesh.setMatrixAt(i, _matrix)
    }

    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, COUNT]}
      castShadow={false}
      receiveShadow={false}
    >
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#8B7355"
        roughness={0.95}
        metalness={0.05}
      />
    </instancedMesh>
  )
}
