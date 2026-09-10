import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { soundFx } from '../../utils/audio';

interface SkillNode {
  name: string;
  category: string;
  position: [number, number, number];
  color: string;
}

const ALL_SKILLS = [
  { name: 'Azure', category: 'Cloud', color: '#0078d4' },
  { name: 'Terraform', category: 'Cloud', color: '#7b42bc' },
  { name: 'Docker', category: 'Cloud', color: '#2496ed' },
  { name: 'Kubernetes', category: 'Cloud', color: '#326ce5' },
  { name: 'AWS Bedrock', category: 'AI', color: '#ff9900' },
  { name: 'Azure OpenAI', category: 'AI', color: '#00f0ff' },
  { name: 'LangChain', category: 'AI', color: '#10b981' },
  { name: 'n8n', category: 'AI', color: '#ea580c' },
  { name: 'Java', category: 'Backend', color: '#f89820' },
  { name: 'Kotlin', category: 'Backend', color: '#7f52ff' },
  { name: 'Spring Boot', category: 'Backend', color: '#6db33f' },
  { name: 'Python', category: 'Backend', color: '#3776ab' },
  { name: 'Kafka', category: 'Data', color: '#ffffff' },
  { name: 'Databricks', category: 'Data', color: '#ff3621' },
  { name: 'PostgreSQL', category: 'Data', color: '#336791' },
  { name: 'React 19', category: 'Frontend', color: '#61dafb' },
  { name: 'Next.js 16', category: 'Frontend', color: '#ffffff' },
  { name: 'Three.js', category: 'Frontend', color: '#00f0ff' },
  { name: 'TypeScript', category: 'Frontend', color: '#3178c6' },
  { name: 'GitLab CI/CD', category: 'DevOps', color: '#fc6d26' },
];

function ConstellationSphere({
  accentColor,
  onSelectSkill,
}: {
  accentColor: string;
  onSelectSkill: (skill: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Distribute skills evenly on a sphere using Fibonacci spiral
  const nodes: SkillNode[] = useMemo(() => {
    const radius = 2.4;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    return ALL_SKILLS.map((skill, i) => {
      const y = 1 - (i / (ALL_SKILLS.length - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY * radius;
      const yPos = y * radius;
      const z = Math.sin(theta) * radiusAtY * radius;

      return {
        ...skill,
        position: [x, yPos, z],
      };
    });
  }, []);

  // Compute connections between close nodes
  const lines = useMemo(() => {
    const linePairs: [THREE.Vector3, THREE.Vector3][] = [];
    const maxDist = 1.9;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const v1 = new THREE.Vector3(...nodes[i].position);
        const v2 = new THREE.Vector3(...nodes[j].position);
        if (v1.distanceTo(v2) < maxDist) {
          linePairs.push([v1, v2]);
        }
      }
    }
    return linePairs;
  }, [nodes]);

  // Flatten lines into a Float32Array for lineSegments
  const linePositions = useMemo(() => {
    const arr = new Float32Array(lines.length * 6);
    lines.forEach(([p1, p2], idx) => {
      arr[idx * 6] = p1.x;
      arr[idx * 6 + 1] = p1.y;
      arr[idx * 6 + 2] = p1.z;
      arr[idx * 6 + 3] = p2.x;
      arr[idx * 6 + 4] = p2.y;
      arr[idx * 6 + 5] = p2.z;
    });
    return arr;
  }, [lines]);

  useFrame((_, delta) => {
    if (hoveredIndex === null) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central glow core */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color={accentColor} wireframe transparent opacity={0.2} />
      </mesh>

      {/* Synaptic connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={accentColor} transparent opacity={0.15} />
      </lineSegments>

      {/* Skill Nodes */}
      {nodes.map((node, i) => {
        const isHovered = hoveredIndex === i;
        return (
          <group key={node.name} position={node.position}>
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredIndex(i);
                soundFx.playHover();
              }}
              onPointerOut={() => setHoveredIndex(null)}
              onClick={(e) => {
                e.stopPropagation();
                onSelectSkill(node.name);
                soundFx.playClick();
              }}
            >
              <sphereGeometry args={[isHovered ? 0.16 : 0.1, 16, 16]} />
              <meshStandardMaterial
                color={isHovered ? '#ffffff' : node.color}
                emissive={isHovered ? accentColor : node.color}
                emissiveIntensity={isHovered ? 1.5 : 0.6}
              />
            </mesh>

            {/* Floating HTML Label */}
            <Html
              position={[0, 0.22, 0]}
              center
              distanceFactor={8}
              style={{
                pointerEvents: 'none',
                transition: 'all 0.2s',
                opacity: isHovered ? 1 : 0.85,
                transform: `scale(${isHovered ? 1.15 : 0.95})`,
              }}
            >
              <div
                className={`px-2 py-0.5 rounded-full text-[11px] font-mono whitespace-nowrap border ${
                  isHovered
                    ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.6)]'
                    : 'bg-[#0b1220]/80 text-gray-300 border-white/10'
                }`}
              >
                {node.name}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export const SkillsConstellation: React.FC<{
  accentColor?: string;
  onSelectSkill?: (skill: string) => void;
}> = ({ accentColor = '#4f98a3', onSelectSkill = () => {} }) => {
  return (
    <div className="w-full h-[480px] relative rounded-2xl glass-panel overflow-hidden">
      <div className="absolute top-4 left-4 z-10 text-xs font-mono text-gray-400 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        Interactive 3D Constellation · Click and drag to orbit
      </div>

      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -5]} color={accentColor} intensity={1} />

        <ConstellationSphere
          accentColor={accentColor}
          onSelectSkill={onSelectSkill}
        />

        <OrbitControls
          enableZoom={false}
          autoRotate={false}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
};
