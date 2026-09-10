import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';
import { SectionModel } from './SectionModels';

interface Props { paused: boolean; quality: boolean; project: string; projectIndex: number; lights: boolean; exploded: boolean; onProject: () => void; onDesk: () => void; onReady: () => void }
const accent = '#4f98a3';
function Block({ at, size, color = '#20292a', metal = .35 }: { at: [number, number, number]; size: [number, number, number]; color?: string; metal?: number }) {
  return <mesh position={at} castShadow receiveShadow><boxGeometry args={size}/><meshStandardMaterial color={color} metalness={metal} roughness={.42}/></mesh>;
}
function Strip({ at, size, color = accent }: { at: [number, number, number]; size: [number, number, number]; color?: string }) {
  return <mesh position={at}><boxGeometry args={size}/><meshBasicMaterial color={color}/></mesh>;
}
function Desk({ lights, onDesk }: Pick<Props, 'lights' | 'onDesk'>) {
  return <group position={[2, -.15, 0]} rotation={[0,-.25,0]}>
    <RoundedBox args={[5,.16,2.6]} radius={.07} position={[0,0,0]} castShadow receiveShadow><meshStandardMaterial color="#425457" metalness={.6} roughness={.32}/></RoundedBox>
    {[-2.05,2.05].map(x=><group key={x}><Block at={[x,-.75,-.85]} size={[.12,1.45,.12]}/><Block at={[x,-.75,.85]} size={[.12,1.45,.12]}/><Block at={[x,-1.46,0]} size={[.14,.08,2]}/></group>)}
    <group position={[.15,1.15,-.55]} onClick={e=>{e.stopPropagation();onDesk();}}>
      <RoundedBox args={[2.6,1.55,.13]} radius={.055} castShadow><meshStandardMaterial color="#0e1719" metalness={.8} roughness={.25}/></RoundedBox>
      <Block at={[0,-.86,-.04]} size={[.13,.3,.12]}/><Block at={[0,-1.01,.05]} size={[.7,.055,.42]}/>
      <mesh position={[0,0,.072]}><planeGeometry args={[2.44,1.38]}/><meshBasicMaterial color={lights ? '#163a40' : '#11191b'}/></mesh>
      {lights && <group position={[-.99,.47,.085]}>{Array.from({length:9},(_,i)=><Strip key={i} at={[i%3===0?.2:.05,-i*.108,0]} size={[i%3===0?1.5:.8+Math.sin(i)*.3,.024,.006]} color={i%3===0?'#73bac3':'#446c71'}/>)}<Strip at={[1.85,-.84,0]} size={[.025,.11,.006]} color="#c8d9d9"/></group>}
    </group>
    <RoundedBox args={[1.45,.07,.48]} radius={.02} position={[0,.14,.67]}><meshStandardMaterial color="#b1bdbb" metalness={.45} roughness={.45}/></RoundedBox>
    {Array.from({length:4},(_,row)=><Strip key={row} at={[0,.18,.49+row*.1]} size={[1.31,.006,.025]} color="#486060"/>)}
    <mesh position={[1.18,.13,.6]} scale={[1,.45,1.4]}><sphereGeometry args={[.17,16,12]}/><meshStandardMaterial color="#8ba3a3" metalness={.5} roughness={.3}/></mesh>
    <group position={[-1.92,.08,-.6]}><mesh><cylinderGeometry args={[.28,.34,.055,32]}/><meshStandardMaterial color="#182325" metalness={.8}/></mesh><Block at={[0,.65,0]} size={[.045,1.3,.045]}/><Block at={[.3,1.28,0]} size={[.65,.045,.045]}/><mesh position={[.59,1.17,0]}><coneGeometry args={[.3,.25,32,1,true]}/><meshStandardMaterial color={accent} side={THREE.DoubleSide} metalness={.7} roughness={.3}/></mesh><mesh position={[.59,1.055,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.23,32]}/><meshBasicMaterial color={lights?'#ffe3b9':'#566161'}/></mesh>{lights&&<pointLight position={[.59,.85,0]} intensity={5} color="#e8c29a" distance={4}/>}</group>
    <group position={[1.88,.26,.15]}><mesh><cylinderGeometry args={[.16,.145,.37,24]}/><meshStandardMaterial color="#b3c2bd" roughness={.3}/></mesh><mesh position={[.17,0,0]}><torusGeometry args={[.11,.03,8,20]}/><meshStandardMaterial color="#b3c2bd"/></mesh><mesh position={[0,.187,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.13,24]}/><meshStandardMaterial color="#251910"/></mesh></group>
    <Block at={[-1.3,.16,.7]} size={[.55,.14,.76]} color="#23444a"/><Strip at={[-1.3,.24,.7]} size={[.02,.005,.69]} color="#91b0ad"/>
  </group>;
}
function Architecture({ exploded, paused }: Pick<Props,'exploded'|'paused'>) {
  const layers = useRef<(THREE.Group|null)[]>([]);
  useFrame((_,delta)=>layers.current.forEach((layer,i)=>{if(layer) layer.position.y=paused ? i*(exploded?.74:.42) : THREE.MathUtils.damp(layer.position.y,i*(exploded?.74:.42),5,Math.min(delta,.05));}));
  return <group position={[2,-1,-32]} rotation={[0,-.25,0]}>
    {[0,1,2,3].map(i=><group key={i} ref={el=>{layers.current[i]=el;}} position={[0,i*.42,0]}><RoundedBox args={[3.15,.32,2.1]} radius={.035} castShadow><meshStandardMaterial color={i%2?'#394a4c':'#243436'} metalness={.75} roughness={.3}/></RoundedBox>{Array.from({length:12},(_,j)=><Strip key={j} at={[-1.24+j*.18,.01,1.06]} size={[.025,.17,.012]} color={j<3?accent:'#0f1d20'}/>)}<Strip at={[1.22,.01,1.07]} size={[.045,.045,.02]} color="#98cdc8"/></group>)}
    <mesh position={[0,-.44,0]}><cylinderGeometry args={[2.5,2.5,.16,64]}/><meshStandardMaterial color="#263234" metalness={.7} roughness={.35}/></mesh>
  </group>;
}
function Library() {
  return <group position={[2,-.2,-48]} rotation={[0,-.35,0]}><Block at={[0,-1.3,0]} size={[4,.2,2]}/><Block at={[-1.7,.1,-.5]} size={[.12,2.8,1]}/><Block at={[1.7,.1,-.5]} size={[.12,2.8,1]}/>{[-.8,.3,1.4].map((y,row)=><group key={y}><Block at={[0,y,-.5]} size={[3.5,.06,1]}/>{Array.from({length:7},(_,i)=><group key={i} position={[-1.4+i*.41,y+.4,-.5]} rotation={[0,0,i===6?-.2:0]}><Block at={[0,0,0]} size={[.23,.74+(i%2)*.15,.6]} color={['#365d62','#829493','#c3c4b7','#20393d'][i%4]}/><Strip at={[0,-.2,.305]} size={[.16,.018,.01]} color="#d1d5cb"/></group>)}</group>)}</group>;
}
function Room() {
  return <group>
    <mesh position={[0,-1.8,-30]} rotation={[-Math.PI/2,0,0]} receiveShadow><planeGeometry args={[100,140]}/><meshStandardMaterial color="#11191a" metalness={.12} roughness={.72}/></mesh>
    {Array.from({length:19},(_,i)=><Strip key={i} at={[0,-1.787,10-i*5]} size={[24,.006,.012]} color="#263437"/>)}
    {[-6,-3,0,3,6,9].map(x=><Strip key={x} at={[x,-1.787,-34]} size={[.012,.006,100]} color="#263437"/>)}
    <Strip at={[-1,-1.77,-32]} size={[.028,.01,88]} color="#5b969d"/><Strip at={[5.6,-1.77,-32]} size={[.014,.01,88]} color="#456c71"/>
    {[0,-16,-32,-48,-64].map((z,i)=><group key={z} position={[2,0,z]}><mesh position={[0,-1.65,0]} receiveShadow><cylinderGeometry args={[3.75,3.85,.28,64]}/><meshStandardMaterial color="#233033" metalness={.28} roughness={.62}/></mesh><mesh position={[0,-1.496,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[3.6,3.62,64]}/><meshBasicMaterial color={accent}/></mesh><Block at={[7,1.4,-5]} size={[.13,6.4,.17]}/><Block at={[-7,1.4,-5]} size={[.13,6.4,.17]}/><Block at={[0,4.55,-5]} size={[14,.13,.17]}/><Strip at={[0,4.47,-5]} size={[13.75,.022,.07]} color="#a0bab9"/>{i>0&&<Strip at={[6.91,1.4,-5]} size={[.018,6.2,.045]}/>}</group>)}
    <group position={[2,1.1,-65]}><mesh><torusGeometry args={[2.45,.17,12,96]}/><meshStandardMaterial color={accent} metalness={.75} roughness={.25}/></mesh><mesh position={[0,0,-.04]}><torusGeometry args={[2.16,.024,8,96]}/><meshBasicMaterial color="#a8d8d6"/></mesh></group>
  </group>;
}
function CameraJourney({ paused, onReady }: Pick<Props,'paused'|'onReady'>) {
  const travel=useRef(0); const current=useRef(0); const target=useRef(new THREE.Vector3()); const look=useRef(new THREE.Vector3(0,0,0));
  const {invalidate,size}=useThree();
  useEffect(()=>{
    let stops: number[]=[];
    const measure=()=>{stops=Array.from(document.querySelectorAll<HTMLElement>('[data-stop]')).map(el=>el.offsetTop);read();};
    const read=()=>{const y=window.scrollY; let index=stops.findIndex((v,i)=>y>=v&&(i===stops.length-1||y<stops[i+1])); index=Math.max(0,index);const fraction=index<stops.length-1?(y-stops[index])/(stops[index+1]-stops[index]):0;const t=THREE.MathUtils.smoothstep(fraction,.26,1);travel.current=Math.min(4,index+t);invalidate();};
    const resize=new ResizeObserver(measure); resize.observe(document.body); measure();onReady();
    window.addEventListener('scroll',read,{passive:true});window.addEventListener('resize',measure);
    return()=>{resize.disconnect();window.removeEventListener('scroll',read);window.removeEventListener('resize',measure);};
  },[invalidate,onReady]);
  useFrame(({camera,pointer},delta)=>{
    const dt=Math.min(delta,.05); current.current=paused?Math.round(travel.current):THREE.MathUtils.damp(current.current,travel.current,4.5,dt);
    const p=current.current, mobile=size.width<760;
    const z=-p*16;const sway=Math.sin(p*Math.PI)*1.8;
    target.current.set((mobile?7:7.2)+sway+(paused?0:pointer.x*.25),mobile?5.2:3.8,z+(mobile?12.5:10.5));
    if(paused) camera.position.copy(target.current);else camera.position.lerp(target.current,1-Math.exp(-5*dt));
    target.current.set(mobile?1.6:-.7,mobile?-3:.35,z);
    if(paused)look.current.copy(target.current);else look.current.lerp(target.current,1-Math.exp(-5*dt));
    camera.lookAt(look.current);
  });return null;
}
function Scene(props:Props) {
  const {invalidate}=useThree();
  useEffect(()=>{invalidate();},[props.lights,props.exploded,props.projectIndex,props.paused,invalidate]);
  return <><color attach="background" args={['#0d1416']}/><fog attach="fog" args={['#0d1416',18,58]}/><ambientLight intensity={.65}/><directionalLight position={[4,10,6]} intensity={2.6} color="#d8eeee"/><directionalLight position={[-6,4,-24]} intensity={1.4} color="#78aeb8"/>
    <Environment resolution={64} frames={1}><Lightformer intensity={3} position={[0,8,0]} rotation={[Math.PI/2,0,0]} scale={[20,20,1]}/><Lightformer intensity={3} position={[8,2,0]} rotation={[0,-Math.PI/2,0]} scale={[10,8,1]}/></Environment>
    <CameraJourney paused={props.paused} onReady={props.onReady}/><Room/><Desk lights={props.lights} onDesk={props.onDesk}/><Architecture exploded={props.exploded} paused={props.paused}/><Library/>
    <group position={[2,.6,-16]} onClick={e=>{e.stopPropagation();props.onProject();}}><group scale={1.12}><SectionModel kind="project" projectType={props.project} variant={props.projectIndex} accent={accent} paused={props.paused}/></group><Html position={[2.2,.7,0]} center zIndexRange={[8,1]}><button className="world-hotspot" onClick={props.onProject} aria-label="Open selected project details">↗</button></Html></group>
  </>;
}
class Boundary extends Component<{children:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return{failed:true};}render(){return this.state.failed?<div className="world-unavailable">The studio could not load. All work and contact details are available below.</div>:this.props.children;}}
export default function WorldScene(props:Props) {
  const [visible,setVisible]=useState(!document.hidden);const [lost,setLost]=useState(false); const [dpr,setDpr]=useState(Math.min(devicePixelRatio,1.5));
  useEffect(()=>{const change=()=>setVisible(!document.hidden);document.addEventListener('visibilitychange',change);return()=>document.removeEventListener('visibilitychange',change);},[]);
  return <div className="world-canvas"><Boundary><Canvas camera={{position:[7.2,3.8,10.5],fov:43,near:.1,far:110}} dpr={props.quality?dpr:1} frameloop={!props.paused&&visible&&!lost?'always':'demand'} gl={{antialias:true,powerPreference:'high-performance'}}><CanvasLifecycle onLost={setLost}/><Scene {...props} paused={props.paused||!visible}/><PerformanceBudget onSlow={()=>setDpr(1)}/></Canvas></Boundary>{lost&&<div className="world-unavailable">The studio is paused. Continue exploring using the page controls.</div>}</div>;
}
function PerformanceBudget({onSlow}:{onSlow:()=>void}){const frames=useRef({count:0,time:0});useFrame((_,dt)=>{if(dt>.2)return;frames.current.count++;frames.current.time+=dt;if(frames.current.count===180){if(frames.current.time>5)onSlow();frames.current={count:0,time:0};}});return null;}

function CanvasLifecycle({onLost}:{onLost:(lost:boolean)=>void}) {
 const gl=useThree(s=>s.gl);
 useEffect(()=>{const canvas=gl.domElement;const lost=(e:Event)=>{e.preventDefault();onLost(true);};const restored=()=>onLost(false);onLost(false);canvas.addEventListener('webglcontextlost',lost);canvas.addEventListener('webglcontextrestored',restored);return()=>{canvas.removeEventListener('webglcontextlost',lost);canvas.removeEventListener('webglcontextrestored',restored);};},[gl,onLost]);
 return null;
}
