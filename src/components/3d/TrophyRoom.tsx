import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface TrophyProps {
  type: 'amazon' | 'gold' | 'research' | 'hackathon';
  accentColor?: string;
  isHovered?: boolean;
}

function AmazonTrophy({ isHovered }: { isHovered?: boolean }) {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * (isHovered ? 1.2 : 0.4);
  });

  return (
    <group ref={meshRef}>
      {/* Trophy Cup */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.7, 0.3, 0.9, 32]} />
        <meshStandardMaterial
          color="#ff9900"
          metalness={0.9}
          roughness={0.2}
          emissive="#ff9900"
          emissiveIntensity={isHovered ? 0.6 : 0.2}
        />
      </mesh>
      {/* Stem */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.4, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
      </mesh>
      {/* Pedestal */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[0.8, 0.25, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Handles */}
      {[-0.65, 0.65].map((x, i) => (
        <mesh key={i} position={[x, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.25, 0.04, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#ff9900" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function GoldMedal({ isHovered }: { isHovered?: boolean }) {
  const medalRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    medalRef.current.rotation.y += delta * (isHovered ? 1.5 : 0.5);
  });

  return (
    <mesh ref={medalRef} rotation={[0, 0, 0]}>
      <cylinderGeometry args={[0.8, 0.8, 0.12, 32]} />
      <meshStandardMaterial
        color="#eab308"
        metalness={0.95}
        roughness={0.1}
        emissive="#ca8a04"
        emissiveIntensity={isHovered ? 0.7 : 0.3}
      />
    </mesh>
  );
}

function ResearchPillar({ isHovered }: { isHovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * (isHovered ? 1.0 : 0.35);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#38bdf8"
          metalness={0.8}
          roughness={0.2}
          wireframe={!isHovered}
          emissive="#0284c7"
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.0, 0.02, 16, 64]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

export const TrophyRoom: React.FC<TrophyProps> = ({
  type,
  accentColor = '#4f98a3',
  isHovered = false,
}) => {
  return (
    <div className="w-full h-40 relative rounded-xl overflow-hidden bg-gradient-to-b from-[#0e1626]/60 to-[#070b14]/60">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, -5, -2]} intensity={1.2} color={accentColor} />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
          {type === 'amazon' && <AmazonTrophy isHovered={isHovered} />}
          {type === 'gold' && <GoldMedal isHovered={isHovered} />}
          {(type === 'research' || type === 'hackathon') && (
            <ResearchPillar isHovered={isHovered} />
          )}
        </Float>

        <Sparkles count={20} scale={2.5} size={2} speed={0.6} color="#ffea75" />
      </Canvas>
    </div>
  );
};
