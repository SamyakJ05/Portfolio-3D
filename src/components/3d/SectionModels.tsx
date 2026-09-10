import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export type SceneKind = 'hero' | 'project' | 'skills' | 'architecture' | 'recognition';
interface Props { accent: string; paused: boolean; variant?: number; projectType?: string }
const pearl = '#d8e0df';
const dark = '#182b2e';

function useMotion(paused: boolean, variant: unknown, update: (t: number, dt: number) => void) {
  const time = useRef(0);
  const invalidate = useThree(s => s.invalidate);
  useEffect(() => { invalidate(); }, [paused, variant, invalidate]);
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    if (!paused) time.current += dt;
    update(time.current, paused ? 0 : dt);
  });
}
const approach = (current: number, target: number, dt: number) => dt ? THREE.MathUtils.damp(current, target, 5, dt) : target;

function Connection({ from, to, color, opacity = 0.35 }: { from: number[]; to: number[]; color: string; opacity?: number }) {
  const { midpoint, quaternion, length } = useMemo(() => {
    const a = new THREE.Vector3(...from), b = new THREE.Vector3(...to);
    const direction = b.clone().sub(a);
    return { midpoint: a.add(b).multiplyScalar(0.5), quaternion: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize()), length: direction.length() };
  }, [from, to]);
  return <mesh position={midpoint} quaternion={quaternion}><cylinderGeometry args={[0.009, 0.009, length, 6]} /><meshBasicMaterial color={color} transparent opacity={opacity} /></mesh>;
}

const networkNodes = Array.from({ length: 12 }, (_, i) => {
  const y = 1 - i / 11 * 2;
  const radius = Math.sqrt(1 - y * y) * 1.7;
  return [Math.cos(i * 2.39996) * radius, y * 1.7, Math.sin(i * 2.39996) * radius];
});
const center = [0, 0, 0];

function Knowledge({ accent, paused }: Props) {
  const group = useRef<THREE.Group>(null!);
  const signals = useRef<(THREE.Mesh | null)[]>([]);
  useMotion(paused, accent, (t, dt) => {
    if (dt) group.current.rotation.y += dt * 0.16;
    signals.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = (t * 0.19 + i / 12) % 1;
      mesh.position.set(networkNodes[i][0] * phase, networkNodes[i][1] * phase, networkNodes[i][2] * phase);
      mesh.scale.setScalar(Math.sin(phase * Math.PI) * 0.9 + 0.15);
    });
  });
  return <group ref={group} rotation={[0.18, 0, -0.1]}>
    <RoundedBox args={[0.65, 0.65, 0.65]} radius={0.12} smoothness={3}><meshStandardMaterial color={accent} metalness={0.8} roughness={0.2} emissive={accent} emissiveIntensity={0.25} /></RoundedBox>
    {networkNodes.map((p, i) => <group key={i}>
      <Connection from={center} to={p} color={accent} />
      {i < 11 && <Connection from={p} to={networkNodes[i + 1]} color={accent} opacity={0.15} />}
      <mesh position={p as [number, number, number]}><sphereGeometry args={[i % 3 === 0 ? 0.16 : 0.1, 20, 16]} /><meshStandardMaterial color={i % 3 === 0 ? pearl : accent} metalness={0.72} roughness={0.18} /></mesh>
      <mesh ref={m => { signals.current[i] = m; }}><sphereGeometry args={[0.045, 10, 8]} /><meshBasicMaterial color="#a9f2ef" /></mesh>
    </group>)}
  </group>;
}

function Circuit({ accent, paused }: Props) {
  const group = useRef<THREE.Group>(null!);
  const beacon = useRef<THREE.Mesh>(null!);
  const trail = useRef<(THREE.Mesh | null)[]>([]);
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    [-1.9, 0, 0.8], [-1.3, 0, -0.3], [-0.9, 0, -1], [0, 0, -1.2], [1.5, 0, -0.8], [1.7, 0, -0.3], [0.9, 0, 0.1], [1.5, 0, 0.8], [0.4, 0, 1.1], [-0.5, 0, 0.4], [-1.3, 0, 1.1],
  ].map(v => new THREE.Vector3(...v)), true, 'catmullrom', 0.25), []);
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 160, 0.07, 8, true), [curve]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useMotion(paused, accent, (t, dt) => {
    if (dt) group.current.rotation.y = Math.sin(t * 0.15) * 0.2;
    curve.getPointAt((t * 0.1) % 1, beacon.current.position);
    trail.current.forEach((m, i) => { if (m) curve.getPointAt(((t * 0.1 - (i + 1) * 0.007) % 1 + 1) % 1, m.position); });
  });
  return <group ref={group} rotation={[0.5, 0, 0.16]}>
    <mesh geometry={geometry}><meshStandardMaterial color={accent} metalness={0.6} roughness={0.26} emissive={accent} emissiveIntensity={0.24} /></mesh>
    <mesh ref={beacon}><sphereGeometry args={[0.115, 20, 16]} /><meshBasicMaterial color="#ff9900" /></mesh>
    {Array.from({ length: 10 }, (_, i) => <mesh key={i} ref={m => { trail.current[i] = m; }}><sphereGeometry args={[0.075 - i * 0.004, 10, 8]} /><meshBasicMaterial color="#ff9900" transparent opacity={0.65 - i * 0.05} /></mesh>)}
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, 0]}><ringGeometry args={[2.35, 2.36, 80]} /><meshBasicMaterial color={accent} transparent opacity={0.22} side={THREE.DoubleSide} /></mesh>
  </group>;
}

function Evidence({ accent, paused, variant = 0 }: Props) {
  const group = useRef<THREE.Group>(null!);
  const cards = useRef<(THREE.Group | null)[]>([]);
  useMotion(paused, variant, (t, dt) => {
    if (dt) group.current.rotation.y = Math.sin(t * 0.25) * 0.2;
    cards.current.forEach((card, i) => {
      if (!card) return;
      card.position.y = approach(card.position.y, (i - 1) * (0.68 + variant * 0.1) + Math.sin(t * 0.7 + i) * 0.07, dt);
    });
  });
  return <group ref={group} rotation={[0.3, -0.4, -0.14]}>
    {[0, 1, 2].map(i => <group key={i} ref={g => { cards.current[i] = g; }} position={[(i - 1) * 0.36, (i - 1) * 0.68, -i * 0.24]}>
      <RoundedBox args={[2.2, 1.25, 0.09]} radius={0.08} smoothness={3}><meshStandardMaterial color={i === 1 ? accent : dark} metalness={0.65} roughness={0.24} /></RoundedBox>
      {[0, 1, 2].map(j => <mesh key={j} position={[-0.18, 0.25 - j * 0.24, 0.056]}><boxGeometry args={[1.3 - j * 0.26, 0.035, 0.012]} /><meshBasicMaterial color={pearl} transparent opacity={0.8 - j * 0.2} /></mesh>)}
      <mesh position={[0.75, 0.36, 0.07]}><sphereGeometry args={[0.065, 12, 10]} /><meshBasicMaterial color={i === 1 ? '#d8f4f1' : accent} /></mesh>
    </group>)}
  </group>;
}

function Gyroscope({ accent, paused }: Props) {
  const rings = useRef<(THREE.Group | null)[]>([]);
  useMotion(paused, accent, (t, dt) => {
    if (!dt) return;
    rings.current.forEach((g, i) => { if (g) { g.rotation.x = t * (0.17 + i * 0.055) + i; g.rotation.y = t * (0.1 + i * 0.04); } });
  });
  return <group rotation={[0.3, 0.2, 0]}>{[0, 1, 2].map(i => <group key={i} ref={g => { rings.current[i] = g; }} rotation={[i, 0, 0]}><mesh><torusGeometry args={[1.7 - i * 0.38, 0.065, 12, 100]} /><meshStandardMaterial color={i === 1 ? pearl : accent} metalness={0.86} roughness={0.2} /></mesh><mesh position={[1.7 - i * 0.38, 0, 0]}><sphereGeometry args={[0.13, 16, 12]} /><meshStandardMaterial color={pearl} emissive={accent} emissiveIntensity={0.4} /></mesh></group>)}<mesh><octahedronGeometry args={[0.45, 0]} /><meshStandardMaterial color={accent} metalness={0.8} roughness={0.22} /></mesh></group>;
}

function Waveform({ accent, paused }: Props) {
  const bars = useRef<(THREE.Mesh | null)[]>([]);
  const group = useRef<THREE.Group>(null!);
  useMotion(paused, accent, (t, dt) => {
    if (dt) group.current.rotation.y += dt * 0.1;
    bars.current.forEach((m, i) => { if (m) m.scale.y = 0.4 + (Math.sin(t * 2 + i * 0.55) + 1) * 0.5; });
  });
  return <group ref={group} rotation={[0.24, 0, -0.12]}>{Array.from({ length: 48 }, (_, i) => {
    const angle = i / 48 * Math.PI * 2;
    return <mesh key={i} ref={m => { bars.current[i] = m; }} position={[Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5]} rotation={[0, -angle, 0]}><boxGeometry args={[0.085, 0.95, 0.085]} /><meshStandardMaterial color={i % 6 === 0 ? pearl : accent} metalness={0.65} roughness={0.25} emissive={accent} emissiveIntensity={0.2} /></mesh>;
  })}<mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.5, 0.015, 8, 96]} /><meshBasicMaterial color={accent} /></mesh></group>;
}

function Scanner({ accent, paused }: Props) {
  const sweep = useRef<THREE.Group>(null!);
  useMotion(paused, accent, (_, dt) => { if (dt) sweep.current.rotation.y -= dt * 0.55; });
  return <group rotation={[0.65, 0, 0.15]}>{[0.6, 1.15, 1.7].map(r => <mesh key={r} rotation={[-Math.PI / 2, 0, 0]}><torusGeometry args={[r, 0.018, 8, 80]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.45} /></mesh>)}<group ref={sweep}><mesh rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.05, 1.7, 64, 1, 0, 0.6]} /><meshBasicMaterial color={accent} transparent opacity={0.22} side={THREE.DoubleSide} depthWrite={false} /></mesh><mesh position={[0.85, 0.02, 0]}><boxGeometry args={[1.7, 0.025, 0.025]} /><meshBasicMaterial color="#c5ffff" /></mesh></group>{[[0.8, 0.1, 0.6], [-0.6, 0.1, -0.9], [0.2, 0.1, -0.35]].map((p, i) => <mesh key={i} position={p as [number, number, number]}><sphereGeometry args={[0.065, 12, 10]} /><meshBasicMaterial color={pearl} /></mesh>)}</group>;
}

const skillLabels = ['Cloud', 'AI', 'Backend', 'Data', 'Web', 'Dev tools'];
const skillPositions = skillLabels.map((_, i) => { const a = i / 6 * Math.PI * 2; return [Math.cos(a) * 1.8, Math.sin(a) * 1.25, Math.sin(a * 2) * 0.45]; });
function Skills({ accent, paused, variant = 0 }: Props) {
  const group = useRef<THREE.Group>(null!);
  const core = useRef<THREE.Mesh>(null!);
  useMotion(paused, variant, (t, dt) => {
    group.current.rotation.y = approach(group.current.rotation.y, (variant - 2.5) * 0.12 + Math.sin(t * 0.22) * 0.07, dt);
    if (dt) core.current.rotation.y += dt * 0.3;
  });
  return <group ref={group}>
    <mesh ref={core}><icosahedronGeometry args={[0.55, 0]} /><meshStandardMaterial color={accent} metalness={0.8} roughness={0.15} /></mesh>
    {skillPositions.map((p, i) => <group key={i}>
      <Connection from={center} to={p} color={i === variant ? '#c6ffff' : accent} opacity={i === variant ? 0.95 : 0.2} />
      <mesh position={p as [number, number, number]} scale={i === variant ? 1.45 : 1}><octahedronGeometry args={[0.13, 0]} /><meshStandardMaterial color={i === variant ? pearl : accent} emissive={accent} emissiveIntensity={i === variant ? 0.8 : 0.15} /></mesh>
      <Html position={[p[0], p[1] - 0.3, p[2]]} center style={{ pointerEvents: 'none' }}><span className={`spatial-label ${i === variant ? 'selected' : ''}`}>{skillLabels[i]}</span></Html>
    </group>)}
    <mesh rotation={[0.2, 0.3, 0]}><torusGeometry args={[2.15, 0.009, 6, 100]} /><meshBasicMaterial color={accent} transparent opacity={0.16} /></mesh>
  </group>;
}

function Architecture({ accent, paused, variant = 0 }: Props) {
  const group = useRef<THREE.Group>(null!);
  const layers = useRef<(THREE.Group | null)[]>([]);
  useMotion(paused, variant, (t, dt) => {
    if (dt) group.current.rotation.y = -0.45 + Math.sin(t * 0.2) * 0.15;
    layers.current.forEach((g, i) => { if (g) g.position.y = approach(g.position.y, (i - 1.5) * 0.7 + (i === variant ? 0.17 : 0), dt); });
  });
  return <group ref={group} rotation={[0.32, -0.45, 0.08]}>{[0, 1, 2, 3].map(i => <group key={i} ref={g => { layers.current[i] = g; }} position={[0, (i - 1.5) * 0.7, 0]}>
    <RoundedBox args={[2, 0.17, 1.4]} radius={0.07} smoothness={3}><meshStandardMaterial color={i === variant ? accent : dark} metalness={0.75} roughness={0.27} /></RoundedBox>
    {[-0.6, 0, 0.6].map(x => <mesh key={x} position={[x, 0.1, 0.1]}><boxGeometry args={[0.32, 0.06, 0.4]} /><meshStandardMaterial color={pearl} metalness={0.4} roughness={0.3} /></mesh>)}
    <mesh position={[0.65, 0, 0.72]}><boxGeometry args={[0.18, 0.035, 0.018]} /><meshBasicMaterial color={accent} /></mesh>
  </group>)}{[-0.75, 0.75].map(x => <mesh key={x} position={[x, 0, -0.45]}><cylinderGeometry args={[0.012, 0.012, 3.2, 8]} /><meshBasicMaterial color={accent} transparent opacity={0.35} /></mesh>)}</group>;
}

function Recognition({ accent, paused, variant = 0 }: Props) {
  const group = useRef<THREE.Group>(null!);
  const medal = useRef<THREE.Group>(null!);
  useMotion(paused, variant, (t, dt) => {
    if (dt) { group.current.rotation.y = Math.sin(t * 0.25) * 0.22; medal.current.rotation.y += dt * 0.18; }
  });
  return <group ref={group} position={[0, -0.15, 0]}>
    <RoundedBox args={[1.8, 0.25, 1.35]} radius={0.06} smoothness={3} position={[0, -1.1, 0]}><meshStandardMaterial color="#1d2526" metalness={0.7} roughness={0.27} /></RoundedBox>
    <mesh position={[0, -0.6, 0]}><cylinderGeometry args={[0.09, 0.14, 0.9, 24]} /><meshStandardMaterial color={accent} metalness={0.85} roughness={0.2} /></mesh>
    <group ref={medal} position={[0, 0.4, 0]} rotation={[0.12, -0.3, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[1, 1, 0.16, 80]} /><meshStandardMaterial color={variant === 0 ? '#d6a956' : accent} metalness={0.92} roughness={0.23} /></mesh>
      <mesh position={[0, 0, 0.1]}><torusGeometry args={[0.86, 0.025, 10, 80]} /><meshStandardMaterial color={pearl} metalness={0.86} roughness={0.2} /></mesh>
      <mesh position={[0, 0, 0.17]} rotation={[0, 0, Math.PI / 4]}><octahedronGeometry args={[0.47, 0]} /><meshStandardMaterial color={pearl} metalness={0.9} roughness={0.18} /></mesh>
    </group>
  </group>;
}

export function SectionModel({ kind, ...props }: Props & { kind: SceneKind }) {
  if (kind === 'skills') return <Skills {...props} />;
  if (kind === 'architecture') return <Architecture {...props} />;
  if (kind === 'recognition') return <Recognition {...props} />;
  switch (props.projectType) {
    case 'f1': return <Circuit {...props} />;
    case 'research': return <Evidence {...props} />;
    case 'motion': return <Gyroscope {...props} />;
    case 'audio': return <Waveform {...props} />;
    case 'scanner': return <Scanner {...props} />;
    case 'generic': return <Architecture {...props} variant={props.variant! % 4} />;
    default: return <Knowledge {...props} />;
  }
}
