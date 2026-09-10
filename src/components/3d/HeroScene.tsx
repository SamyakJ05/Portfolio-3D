import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// ── Quantum AI Hyper-Core ──────────────────────────────────────────
function QuantumCore({ accentColor = '#4f98a3' }: { accentColor?: string }) {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Group>(null!);
  const ring2Ref = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    // Rotation
    outerRef.current.rotation.x += delta * 0.2;
    outerRef.current.rotation.y += delta * 0.3;

    innerRef.current.rotation.x -= delta * 0.4;
    innerRef.current.rotation.y -= delta * 0.2;

    ring1Ref.current.rotation.z += delta * 0.25;
    ring1Ref.current.rotation.x += delta * 0.15;

    ring2Ref.current.rotation.y += delta * 0.35;
    ring2Ref.current.rotation.z -= delta * 0.2;

    // Interactive cursor follow
    const mouseX = state.pointer.x * 0.5;
    const mouseY = state.pointer.y * 0.5;
    outerRef.current.position.x = THREE.MathUtils.lerp(outerRef.current.position.x, mouseX, 0.05);
    outerRef.current.position.y = THREE.MathUtils.lerp(outerRef.current.position.y, mouseY, 0.05);
  });

  return (
    <group>
      {/* Outer Wireframe Polyhedron */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.8, 2]} />
        <meshStandardMaterial
          color={accentColor}
          wireframe
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.9}
          emissive={accentColor}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Glowing Inner Core */}
      <mesh ref={innerRef}>
        <dodecahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.2}
          metalness={0.8}
          emissive={accentColor}
          emissiveIntensity={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Orbital Ring 1 */}
      <group ref={ring1Ref}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.6}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>

      {/* Orbital Ring 2 */}
      <group ref={ring2Ref}>
        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[2.9, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.4}
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>

      {/* Floating Orbital Tech Nodes */}
      <OrbitingTechNodes count={8} radius={2.5} accentColor={accentColor} />
    </group>
  );
}

// ── Orbiting Tech Badges ──────────────────────────────────────────
function OrbitingTechNodes({ count = 8, radius = 2.5, accentColor }: { count: number; radius: number; accentColor: string }) {
  const nodesRef = useRef<THREE.Group>(null!);

  const nodes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.4,
        z: Math.sin(angle) * radius * 0.8,
        size: 0.12 + Math.random() * 0.08,
      };
    });
  }, [count, radius]);

  useFrame((_, delta) => {
    nodesRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={nodesRef}>
      {nodes.map((n, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1.5}>
          <mesh position={[n.x, n.y, n.z]}>
            <octahedronGeometry args={[n.size, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? accentColor : '#00f0ff'}
              emissive={i % 2 === 0 ? accentColor : '#00f0ff'}
              emissiveIntensity={0.8}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// ── Starfield Particle Matrix ─────────────────────────────────────
function ParticleStarfield({ count = 600, accentColor = '#4f98a3' }: { count?: number; accentColor?: string }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const baseColor = new THREE.Color(accentColor);
    const whiteColor = new THREE.Color('#ffffff');
    const cyanColor = new THREE.Color('#00f0ff');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const mixed = Math.random() > 0.6 ? cyanColor : Math.random() > 0.3 ? baseColor : whiteColor;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, [count, accentColor]);

  useFrame((state, delta) => {
    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x = state.pointer.y * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

// ── Hero Scene Canvas ─────────────────────────────────────────────
interface HeroSceneProps {
  accentColor?: string;
  isHighQuality?: boolean;
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  accentColor = '#4f98a3',
  isHighQuality = true,
}) => {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={isHighQuality ? [1, 1.5] : [0.8, 1]}
        gl={{
          antialias: isHighQuality,
          powerPreference: 'high-performance',
          alpha: true,
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -5, -5]} intensity={1.5} color={accentColor} />
        <pointLight position={[5, -5, 5]} intensity={1} color="#00f0ff" />

        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
          <QuantumCore accentColor={accentColor} />
        </Float>

        <ParticleStarfield count={isHighQuality ? 700 : 250} accentColor={accentColor} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};
