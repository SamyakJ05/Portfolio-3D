import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { SectionModel, type SceneKind } from './SectionModels';

interface SceneProps {
  accent: string;
  paused: boolean;
  quality: boolean;
  expanded?: boolean;
  variant?: number;
  kind?: SceneKind;
  projectType?: string;
}

// A family of machined ribbons. Each section has a rounded rectangular profile,
// a slight helical pitch, and a different radius: the negative space is the subject.
function ribbonGeometry(index: number, count: number) {
  const segments = 180;
  const sides = 12;
  const vertices: number[] = [];
  const indices: number[] = [];
  const radius = 1.22 + index * 0.085;
  for (let i = 0; i <= segments; i++) {
    const angle = i / segments * Math.PI * 2;
    const wave = Math.sin(angle * 2 + index * 0.16) * 0.17;
    for (let j = 0; j <= sides; j++) {
      const profile = j / sides * Math.PI * 2;
      const r = radius + Math.cos(profile) * 0.034;
      const y = (index - (count - 1) / 2) * 0.125 + Math.sin(profile) * 0.052 + wave;
      vertices.push(Math.cos(angle) * r, y, Math.sin(angle) * r);
      if (i < segments && j < sides) {
        const a = i * (sides + 1) + j;
        const b = a + sides + 1;
        indices.push(a, a + 1, b, b, a + 1, b + 1);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function Sculpture({ accent, paused, expanded = false, variant = 0 }: SceneProps) {
  const group = useRef<THREE.Group>(null!);
  const ribbons = useRef<(THREE.Mesh | null)[]>([]);
  const time = useRef(0);
  const travel = useRef(0);
  const smoothTravel = useRef(0);
  const previousExpanded = useRef<boolean | null>(null);
  const invalidate = useThree(s => s.invalidate);
  useEffect(() => { invalidate(); }, [expanded, accent, paused, invalidate]);
  const rotation = useRef({ x: 0, y: 0 });
  const size = useThree(s => s.size);
  const geometries = useMemo(() => Array.from({ length: 15 }, (_, i) => ribbonGeometry(i, 15)), []);
  useEffect(() => () => geometries.forEach(g => g.dispose()), [geometries]);
  useEffect(() => {
    const readScroll = () => { travel.current = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.5); };
    readScroll();
    window.addEventListener('scroll', readScroll, { passive: true });
    return () => window.removeEventListener('scroll', readScroll);
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 20);
    if (!paused) time.current += dt;
    const t = time.current;
    group.current.scale.setScalar(size.width < 500 ? 0.78 : 0.92);
    // Demand rendering needs one explicit frame for a reduced-motion interaction.
    // Pause preserves the current pose instead of snapping back to the initial one.
    if (paused) {
      if (expanded !== previousExpanded.current) {
        ribbons.current.forEach((mesh, i) => {
          if (mesh) mesh.position.y = expanded ? (i - 7) * 0.13 : 0;
        });
      }
      previousExpanded.current = expanded;
      return;
    }
    previousExpanded.current = expanded;
    rotation.current.x = THREE.MathUtils.damp(rotation.current.x, state.pointer.y * 0.13, 4, dt);
    rotation.current.y = THREE.MathUtils.damp(rotation.current.y, state.pointer.x * 0.18, 4, dt);
    smoothTravel.current = THREE.MathUtils.damp(smoothTravel.current, travel.current, 4, dt);
    group.current.rotation.set(
      0.72 + rotation.current.x + Math.sin(t * 0.17) * 0.08,
      -0.32 + rotation.current.y + t * 0.065,
      -0.42 + smoothTravel.current * 0.12,
    );
    group.current.position.y = Math.sin(t * 0.35) * 0.065;
    ribbons.current.forEach((mesh, i) => {
      if (!mesh) return;
      const spread = expanded ? (i - 7) * 0.13 : 0;
      mesh.position.y = THREE.MathUtils.damp(mesh.position.y, spread, 4, dt);
      const target = Math.sin(t * 0.3 + i * 0.11) * 0.12 + variant * 0.11 * (i / 14);
      mesh.rotation.z = THREE.MathUtils.damp(mesh.rotation.z, target, 3, dt);
    });
  });

  return <group ref={group} rotation={[0.72, -0.32, -0.42]}>
    {geometries.map((geometry, i) => <mesh key={i} geometry={geometry} ref={node => { ribbons.current[i] = node; }}>
      <meshStandardMaterial color={i % 4 < 2 ? accent : '#d6e2e2'} metalness={0.94} roughness={0.24} envMapIntensity={1.5} />
    </mesh>)}
  </group>;
}

function Studio() {
  return <>
    <ambientLight intensity={0.35} />
    <directionalLight position={[4, 6, 5]} intensity={3} color="#edf9fa" />
    <directionalLight position={[-4, -2, 3]} intensity={1.5} color="#b9c9de" />
    <Environment resolution={128} frames={1}>
      <Lightformer form="rect" intensity={5} position={[0, 5, -2]} rotation={[Math.PI / 2, 0, 0]} scale={[10, 4, 1]} />
      <Lightformer form="rect" intensity={4} position={[-5, 1, 2]} rotation={[0, Math.PI / 2, 0]} scale={[3, 8, 1]} />
      <Lightformer form="rect" intensity={3} position={[5, -2, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[2, 7, 1]} />
      <Lightformer form="rect" intensity={2} position={[0, 1, 5]} scale={[6, 2, 1]} />
    </Environment>
  </>;
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="scene-fallback"><span>Samyak Jain</span><p>Engineering in every dimension.</p></div> : this.props.children; }
}

export default function KineticScene(props: SceneProps) {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [started, setStarted] = useState(false);
  const [lost, setLost] = useState(false);
  const [dpr, setDpr] = useState(Math.min(window.devicePixelRatio || 1, 1.5));
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      setStarted(entry.isIntersecting);
      if (entry.isIntersecting) setLost(false);
    }, { rootMargin: '80px' });
    if (container.current) observer.observe(container.current);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);
  useEffect(() => {
    const canvas = container.current?.querySelector('canvas');
    if (!canvas) return;
    const onLost = (event: Event) => { event.preventDefault(); setLost(true); };
    const onRestored = () => setLost(false);
    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', onRestored);
    return () => { canvas.removeEventListener('webglcontextlost', onLost); canvas.removeEventListener('webglcontextrestored', onRestored); };
  }, [started]);
  const active = visible && pageVisible && !props.paused && !lost;
  return <div ref={container} className="kinetic-canvas" aria-hidden="true">
    <SceneBoundary>
      {started && <Canvas camera={{ position: [0, 0, props.kind && props.kind !== 'hero' ? 6.4 : 7.9], fov: 39 }} dpr={props.quality ? dpr : 1}
        frameloop={active ? 'always' : 'demand'} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        onCreated={({ gl }) => { gl.setClearColor('#0d0d0d', 0); }}>
        <Studio />
        {(!props.kind || props.kind === 'hero') ? <Sculpture {...props} /> : <SectionModel {...props} kind={props.kind} />}
        <AdaptiveResolution active={active && props.quality} onSlow={() => setDpr(1)} />
      </Canvas>}
    </SceneBoundary>
    {lost && <div className="scene-fallback"><p>3D preview paused. Your portfolio is still here.</p></div>}
  </div>;
}

function AdaptiveResolution({ active, onSlow }: { active: boolean; onSlow: () => void }) {
  const sample = useRef({ frames: 0, time: 0, settled: 0 });
  useEffect(() => { sample.current = { frames: 0, time: 0, settled: 0 }; }, [active]);
  useFrame((_, delta) => {
    if (!active) return;
    const s = sample.current;
    s.settled += delta;
    if (s.settled < 3) return;
    s.frames++; s.time += Math.min(delta, 0.1);
    if (s.frames === 120) {
      if (s.frames / s.time < 42) onSlow();
      s.frames = 0; s.time = 0;
    }
  });
  return null;
}
