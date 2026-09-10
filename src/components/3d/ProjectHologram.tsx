import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface HologramProps {
  type: 'retainiq' | 'f1' | 'research' | 'motion' | 'audio' | 'scanner' | 'generic';
  accentColor?: string;
  isHovered?: boolean;
}

// ── 1. RetainIQ: Neural Cloud & Knowledge Cluster ─────────────────
function RetainIQModel({ accentColor = '#4f98a3', isHovered }: { accentColor: string; isHovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    const speed = isHovered ? 0.8 : 0.3;
    groupRef.current.rotation.y += delta * speed;
    groupRef.current.rotation.x += delta * (speed * 0.4);
  });

  const nodes = useMemo(() => [
    [0, 0.8, 0],
    [-0.7, 0.2, 0.5],
    [0.7, 0.2, -0.4],
    [-0.5, -0.6, -0.5],
    [0.6, -0.6, 0.4],
    [0, -0.2, 0.8],
  ], []);

  return (
    <group ref={groupRef}>
      {/* Central Knowledge Node */}
      <mesh>
        <octahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={isHovered ? 0.9 : 0.5}
          wireframe
        />
      </mesh>

      {/* Cloud boundary ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.2, 0.02, 16, 64]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.5} />
      </mesh>

      {/* Sub nodes */}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#38bdf8' : accentColor}
            emissive={i % 2 === 0 ? '#38bdf8' : accentColor}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── 2. Apex Atlas: F1 Telemetry Circuit ───────────────────────────
function F1CircuitModel({ accentColor = '#4f98a3', isHovered }: { accentColor: string; isHovered?: boolean }) {
  const curveRef = useRef<THREE.Group>(null!);
  const carRef = useRef<THREE.Mesh>(null!);

  // Circuit points
  const curve = useMemo(() => {
    const points = [
      new THREE.Vector3(-1.2, 0, -0.8),
      new THREE.Vector3(-0.2, 0.4, -1.1),
      new THREE.Vector3(1.1, 0, -0.6),
      new THREE.Vector3(1.3, -0.3, 0.4),
      new THREE.Vector3(0.5, 0.2, 1.1),
      new THREE.Vector3(-0.8, -0.2, 0.9),
      new THREE.Vector3(-1.4, 0, 0.1),
    ];
    return new THREE.CatmullRomCurve3(points, true);
  }, []);

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.04, 8, true), [curve]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * (isHovered ? 0.6 : 0.25);
    curveRef.current.rotation.y = t * 0.4;

    // Move race car beacon along track
    const progress = (clock.getElapsedTime() * 0.4) % 1;
    const point = curve.getPointAt(progress);
    if (carRef.current) {
      carRef.current.position.copy(point);
    }
  });

  return (
    <group ref={curveRef}>
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.6}
          wireframe={isHovered}
        />
      </mesh>
      {/* Racing beacon */}
      <mesh ref={carRef}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ff3366" emissive="#ff3366" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

// ── 3. ProofBoard: Layered Evidence Cards ─────────────────────────
function ProofBoardModel({ accentColor = '#4f98a3', isHovered }: { accentColor: string; isHovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * (isHovered ? 0.6 : 0.2);
  });

  return (
    <group ref={groupRef}>
      {[-0.3, 0, 0.3].map((yOffset, i) => (
        <mesh
          key={i}
          position={[i * 0.1, yOffset, -i * 0.1]}
          rotation={[0.2, i * 0.3, 0]}
        >
          <boxGeometry args={[1.4, 0.8, 0.04]} />
          <meshStandardMaterial
            color={i === 1 ? '#ffffff' : accentColor}
            emissive={accentColor}
            emissiveIntensity={isHovered ? 0.6 : 0.3}
            transparent
            opacity={0.85}
            wireframe={i === 0}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── 4. KineticFlow: Gyroscope Vector Rings ────────────────────────
function KineticFlowModel({ accentColor = '#4f98a3', isHovered }: { accentColor: string; isHovered?: boolean }) {
  const r1 = useRef<THREE.Mesh>(null!);
  const r2 = useRef<THREE.Mesh>(null!);
  const r3 = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    const mult = isHovered ? 1.8 : 1;
    r1.current.rotation.x += delta * 0.5 * mult;
    r2.current.rotation.y += delta * 0.7 * mult;
    r3.current.rotation.z += delta * 0.6 * mult;
  });

  return (
    <group>
      <mesh ref={r1}>
        <torusGeometry args={[1.2, 0.03, 16, 64]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.6} />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[0.9, 0.03, 16, 64]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.7} />
      </mesh>
      <mesh ref={r3}>
        <torusGeometry args={[0.6, 0.03, 16, 64]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.8} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

// ── 5. Soul Train: Audio Waveform Sphere ──────────────────────────
function SoulTrainModel({ accentColor = '#4f98a3', isHovered }: { accentColor: string; isHovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  const bars = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * Math.PI * 2;
      return {
        x: Math.cos(angle) * 1.1,
        z: Math.sin(angle) * 1.1,
        angle,
      };
    });
  }, []);

  useFrame(({ clock }) => {
    groupRef.current.rotation.y += 0.01;
    const t = clock.getElapsedTime() * 4;
    groupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh && i > 0) {
        const scale = 0.5 + Math.sin(t + i * 0.5) * 0.4;
        child.scale.y = isHovered ? scale * 1.4 : scale;
      }
    });
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshStandardMaterial
          color={accentColor}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
      {bars.map((b, i) => (
        <mesh key={i} position={[b.x, 0, b.z]} rotation={[0, -b.angle, 0]}>
          <boxGeometry args={[0.08, 0.8, 0.08]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#10b981' : accentColor}
            emissive={i % 2 === 0 ? '#10b981' : accentColor}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── 6. SignalScan: Radar Scanner ──────────────────────────────────
function SignalScanModel({ accentColor = '#4f98a3', isHovered }: { accentColor: string; isHovered?: boolean }) {
  const sweepRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    sweepRef.current.rotation.z -= delta * (isHovered ? 4 : 2);
  });

  return (
    <group rotation={[Math.PI / 3, 0, 0]}>
      {/* Concentric rings */}
      {[0.5, 0.9, 1.3].map((r, i) => (
        <mesh key={i}>
          <ringGeometry args={[r - 0.02, r, 32]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      {/* Radar sweep */}
      <mesh ref={sweepRef}>
        <ringGeometry args={[0, 1.3, 32, 1, 0, Math.PI / 3]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ── 7. Generic Tech Hub ───────────────────────────────────────────
function GenericHubModel({ accentColor = '#4f98a3', isHovered }: { accentColor: string; isHovered?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta * 0.4;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={accentColor}
        emissive={accentColor}
        emissiveIntensity={isHovered ? 0.7 : 0.4}
        wireframe
      />
    </mesh>
  );
}

// ── Exported Project Hologram Component ───────────────────────────
export const ProjectHologram: React.FC<HologramProps> = ({
  type,
  accentColor = '#4f98a3',
  isHovered = false,
}) => {
  return (
    <div className="w-full h-48 relative overflow-hidden rounded-t-xl bg-gradient-to-b from-[#0b1220]/80 to-[#05080c]/80">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-5, -5, -2]} intensity={1} color={accentColor} />

        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
          {type === 'retainiq' && <RetainIQModel accentColor={accentColor} isHovered={isHovered} />}
          {type === 'f1' && <F1CircuitModel accentColor={accentColor} isHovered={isHovered} />}
          {type === 'research' && <ProofBoardModel accentColor={accentColor} isHovered={isHovered} />}
          {type === 'motion' && <KineticFlowModel accentColor={accentColor} isHovered={isHovered} />}
          {type === 'audio' && <SoulTrainModel accentColor={accentColor} isHovered={isHovered} />}
          {type === 'scanner' && <SignalScanModel accentColor={accentColor} isHovered={isHovered} />}
          {type === 'generic' && <GenericHubModel accentColor={accentColor} isHovered={isHovered} />}
        </Float>
      </Canvas>
    </div>
  );
};
