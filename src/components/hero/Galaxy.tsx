import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Galaxy() {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const parameters = {
    count: 100000,
    size: 0.04,
    radius: 12,
    branches: 4,
    spin: 1.5,
    randomness: 0.6,
    randomnessPower: 3,
    coreColor: '#ffffff', // Intense white at core
    innerColor: '#ff7733', // Intense orange inner
    middleColor: '#22aaff', // Cyan/blue
    outerColor: '#090a1f', // Deep dark blue
  };

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);

    const colorCore = new THREE.Color(parameters.coreColor);
    const colorInner = new THREE.Color(parameters.innerColor);
    const colorMiddle = new THREE.Color(parameters.middleColor);
    const colorOuter = new THREE.Color(parameters.outerColor);
    const colorDust = new THREE.Color('#010101'); // Dust lane color

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;

      // Position
      // Push more particles towards the center using a power function
      const rRatio = Math.pow(Math.random(), 1.5); 
      const radius = rRatio * parameters.radius;
      
      const spinAngle = radius * parameters.spin;
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      // Adjust randomness based on radius (thicker at core, flatter at edges)
      const randomSpread = parameters.randomness * (1 - (radius / parameters.radius) * 0.4);

      const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomSpread * radius;
      const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomSpread * radius * 0.3; // Flatter
      const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomSpread * radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Color
      const mixedColor = new THREE.Color();
      const normalizedRadius = radius / parameters.radius;

      if (normalizedRadius < 0.1) {
        mixedColor.copy(colorCore).lerp(colorInner, normalizedRadius / 0.1);
      } else if (normalizedRadius < 0.4) {
        mixedColor.copy(colorInner).lerp(colorMiddle, (normalizedRadius - 0.1) / 0.3);
      } else {
        mixedColor.copy(colorMiddle).lerp(colorOuter, (normalizedRadius - 0.4) / 0.6);
      }

      // Simulate dust lanes
      // Dust lanes typically trail the spiral arms
      const angleOffset = Math.atan2(positions[i3 + 2], positions[i3]) - (branchAngle + spinAngle);
      // We look for particles that are slightly behind the main arm
      const isDust = angleOffset > 0.1 && angleOffset < 0.5 && Math.random() < 0.6;

      if (isDust) {
        mixedColor.lerp(colorDust, 0.85); // Darken heavily
      } else {
        // Randomize color slightly for realism
        const colorRandomness = Math.random() * 0.15;
        mixedColor.r += (Math.random() - 0.5) * colorRandomness;
        mixedColor.g += (Math.random() - 0.5) * colorRandomness;
        mixedColor.b += (Math.random() - 0.5) * colorRandomness;
      }
      
      // Give a tiny fraction of stars extra brightness (supernovas/bright stars)
      if (Math.random() > 0.99) {
        mixedColor.multiplyScalar(1.5);
      }

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return [positions, colors];
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.015; // Slow majestic rotation
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05; // Very slight wobble
    }
  });

  // Create a soft glowing particle texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    if (context) {
      const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.3)');
      gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 64, 64);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <group ref={groupRef} rotation={[0.4, 0, 0.15]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={parameters.size}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors={true}
          transparent={true}
          map={particleTexture}
          alphaMap={particleTexture}
          opacity={1.0}
        />
      </points>
    </group>
  );
}
