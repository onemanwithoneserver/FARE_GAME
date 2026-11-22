import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Html, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PublicIcon from '@mui/icons-material/Public';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HandshakeIcon from '@mui/icons-material/Handshake';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { STAGES } from './data';
import { usePipeGameStore } from './store';
import type { Language, StageId } from './types';

const STAGE_ICONS = [GroupsIcon, PersonAddIcon, PublicIcon, ShoppingCartIcon, HandshakeIcon];

const PIPE_Y = 0.78;
const R = 0.64;
const SEG_LEN = 2.15;
const SPACING = 2.55;
const X_SHIFT = -0.85;
const FLOOR_Y = -1.2;
const segX = (i: number) => (i - 2) * SPACING + X_SHIFT;
const FIRST_EDGE = segX(0) - SEG_LEN / 2;
const LAST_EDGE = segX(4) + SEG_LEN / 2;
const TAP_X = LAST_EDGE + 0.95;
const SCENE_MIN_X = FIRST_EDGE - 1.05;
const SCENE_MAX_X = TAP_X + 1.25;
const SCENE_TOP = PIPE_Y + R + 0.88;
const SCENE_BOTTOM = FLOOR_Y - 0.28;

type SegmentState = 'normal' | 'leak' | 'fixed' | 'starved';

interface Pipe3DProps {
  activeLeakStage: StageId | 'all' | null;
  leakLevel: number;
  isFixed: boolean;
  lang: Language;
  flow?: number;
}

function FitCamera({ onPpu }: { onPpu: (v: number) => void }) {
  const { camera, size } = useThree();
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const aspect = size.width / Math.max(1, size.height);
    const isNarrow = size.width < 520;
    const halfW = (SCENE_MAX_X - SCENE_MIN_X) / 2 + (isNarrow ? 0.06 : 0.28);
    const halfH = (SCENE_TOP - SCENE_BOTTOM) / 2 + (isNarrow ? 0.06 : 0.1);
    const t = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
    const dist = Math.max(halfH / t, halfW / (t * aspect));
    const cx = (SCENE_MAX_X + SCENE_MIN_X) / 2;
    const cy = (SCENE_TOP + SCENE_BOTTOM) / 2 + 0.02;
    cam.position.set(cx, cy + dist * (isNarrow ? 0.06 : 0.08), dist);
    cam.lookAt(cx, cy, 0);
    cam.updateProjectionMatrix();
    onPpu(size.height / (2 * t * dist));
  }, [camera, size.width, size.height, onPpu]);
  return null;
}

function Parallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, state.pointer.x * 0.05, 0.05);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -state.pointer.y * 0.025, 0.05);
  });
  return <group ref={ref}>{children}</group>;
}

function StageLabel({ i, ppu, lang }: { i: number; ppu: number; lang: Language }) {
  const Icon = STAGE_ICONS[i];
  const iconPx = Math.round(Math.max(14, Math.min(44, 0.44 * ppu)));
  const fontPx = Math.round(Math.max(10, Math.min(18, 0.19 * ppu)));
  const showText = ppu >= 46;
  return (
    <Html position={[segX(i), PIPE_Y - 0.02, R + 0.02]} center zIndexRange={[12, 0]} style={{ pointerEvents: 'none' }}>
      <div className="flex select-none flex-col items-center" style={{ gap: Math.round(fontPx * 0.25) }}>
        <Icon sx={{ fontSize: iconPx, color: '#FFFFFF', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.45))' }} />
        {showText && (
          <span
            className="whitespace-nowrap font-extrabold tracking-wide text-white"
            style={{ fontSize: fontPx, textShadow: '0 2px 6px rgba(0,0,0,.55)' }}
          >
            {STAGES[i].name[lang]}
          </span>
        )}
      </div>
    </Html>
  );
}

function StatusBadge({ x, ppu, fixed, lang }: { x: number; ppu: number; fixed: boolean; lang: Language }) {
  const fontPx = Math.round(Math.max(9, Math.min(13, 0.14 * ppu)));
  return (
    <Html position={[x, PIPE_Y + R + 0.42, 0]} center zIndexRange={[12, 0]} style={{ pointerEvents: 'none' }}>
      <div
        className={`flex items-center gap-1 whitespace-nowrap rounded-[6px] border px-2.5 py-1 font-bold uppercase tracking-wider text-white shadow-sm ${
          fixed
            ? 'border-emerald-700 bg-[#16A34A]'
            : 'border-rose-800 bg-[#DC2626]'
        }`}
        style={{ fontSize: fontPx }}
      >
        {fixed ? (
          <VerifiedUserIcon sx={{ fontSize: fontPx + 3, color: '#FFFFFF' }} />
        ) : (
          <WaterDropIcon sx={{ fontSize: fontPx + 3, color: '#FFFFFF' }} />
        )}
        <span>
          {fixed
            ? lang === 'en' ? 'Sealed' : 'సీల్ అయింది'
            : lang === 'en' ? 'Leak' : 'లీక్'}
        </span>
      </div>
    </Html>
  );
}

function Pedestal({ x, color, radius = 0.58, isDark = true }: { x: number; color: string; radius?: number; isDark?: boolean }) {
  const columnH = PIPE_Y - R - FLOOR_Y;
  return (
    <group position={[x, 0, 0]}>
      <mesh position={[0, FLOOR_Y + columnH / 2, 0]}>
        <cylinderGeometry args={[0.13, 0.17, columnH, 24]} />
        <meshStandardMaterial color={isDark ? '#1E293B' : '#94A3B8'} metalness={0.65} roughness={0.4} />
      </mesh>
      <mesh position={[0, PIPE_Y - R - 0.025, 0]}>
        <cylinderGeometry args={[0.26, 0.2, 0.09, 24]} />
        <meshStandardMaterial color={isDark ? '#334155' : '#CBD5E1'} metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0, FLOOR_Y + 0.035, 0]}>
        <cylinderGeometry args={[radius, radius + 0.04, 0.07, 48]} />
        <meshStandardMaterial color={isDark ? '#0D1B35' : '#E2E8F0'} metalness={0.35} roughness={0.48} />
      </mesh>
      <mesh position={[0, FLOOR_Y + 0.072, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.05, radius - 0.008, 64]} />
        <meshStandardMaterial color={color} roughness={0.45} metalness={0.25} />
      </mesh>
    </group>
  );
}

function LeakSpray({ x, leakLevel }: { x: number; leakLevel: number }) {
  const count = 80;
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const parts = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        p: new THREE.Vector3(0, -99, 0),
        v: new THREE.Vector3(),
        age: Math.random() * -1.5,
        s: 0.03 + Math.random() * 0.035,
      })),
    []
  );

  useFrame((_, rawDt) => {
    const mesh = ref.current;
    if (!mesh) return;
    const dt = Math.min(rawDt, 0.05);
    const active = Math.floor(count * Math.min(1, leakLevel + 0.1));
    parts.forEach((q, i) => {
      if (i >= active) {
        dummy.scale.setScalar(0);
      } else {
        q.age += dt;
        if (q.age >= 0 && (q.p.y < FLOOR_Y + 0.02 || q.p.y === -99)) {
          q.p.set(x + (Math.random() - 0.5) * 0.3, PIPE_Y + R * 0.85, 0.18 + Math.random() * 0.15);
          q.v.set((Math.random() - 0.5) * 1.1, 1.3 + Math.random() * 1.4 * leakLevel, 0.6 + Math.random() * 0.9);
        }
        if (q.age >= 0) {
          q.v.y -= 6.5 * dt;
          q.p.addScaledVector(q.v, dt);
        }
        dummy.position.copy(q.p);
        dummy.scale.setScalar(q.age >= 0 ? q.s : 0);
      }
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#7DD3FC" transparent opacity={0.85} toneMapped={false} />
    </instancedMesh>
  );
}

function Puddle({ x, leakLevel }: { x: number; leakLevel: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const s = 0.35 + leakLevel * 0.9 + Math.sin(clock.getElapsedTime() * 3 + x) * 0.04;
    ref.current.scale.set(s * 1.4, s, 1);
  });
  return (
    <mesh ref={ref} position={[x, FLOOR_Y + 0.012, 1.15]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.6, 40]} />
      <meshBasicMaterial color="#38BDF8" transparent opacity={0.45} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

function RepairClamp({ x }: { x: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!ref.current) return;
    const s = THREE.MathUtils.lerp(ref.current.scale.x, 1, 0.12);
    ref.current.scale.set(s, s, s);
  });
  return (
    <group ref={ref} position={[x, PIPE_Y, 0]} scale={0.01}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[R + 0.07, R + 0.07, 0.42, 40]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.85} roughness={0.3} />
      </mesh>
      {[-0.2, 0.2].map((dx) => (
        <mesh key={dx} position={[dx, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[R + 0.08, 0.025, 10, 48]} />
          <meshStandardMaterial color="#16A34A" roughness={0.4} metalness={0.2} />
        </mesh>
      ))}
      {[1, -1].map((dir) => (
        <mesh key={dir} position={[0, dir * (R + 0.12), 0]}>
          <boxGeometry args={[0.28, 0.14, 0.3]} />
          <meshStandardMaterial color="#E2E8F0" metalness={0.85} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}

function Segment({ i, state, leakLevel }: { i: number; state: SegmentState; leakLevel: number }) {
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const x = segX(i);
  const base = STAGES[i].color;

  const { body, rim } = useMemo(() => {
    const c = new THREE.Color(base);
    if (state === 'starved') c.lerp(new THREE.Color('#64748B'), 0.22 + 0.3 * leakLevel);
    return { body: c, rim: c.clone().lerp(new THREE.Color('#ffffff'), 0.14) };
  }, [base, state, leakLevel]);

  useFrame(({ clock }) => {
    const m = matRef.current;
    if (!m) return;
    if (state === 'leak') {
      m.emissive.set('#DC2626');
      m.emissiveIntensity = (0.06 + (Math.sin(clock.getElapsedTime() * 5 + i * 1.2) * 0.5 + 0.5) * 0.16) * Math.max(0.3, leakLevel);
    } else if (state === 'fixed') {
      m.emissive.set('#16A34A');
      m.emissiveIntensity = 0.05;
    } else {
      m.emissiveIntensity = 0;
    }
  });

  return (
    <group>
      <mesh position={[x, PIPE_Y, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[R, R, SEG_LEN - 0.2, 48]} />
        <meshPhysicalMaterial ref={matRef} color={body} roughness={0.36} metalness={0.18} clearcoat={0.5} clearcoatRoughness={0.25} />
      </mesh>
      {[-1, 1].map((dir) => (
        <mesh key={dir} position={[x + dir * (SEG_LEN / 2 - 0.08), PIPE_Y, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[R + 0.07, R + 0.07, 0.16, 48]} />
          <meshPhysicalMaterial color={rim} roughness={0.32} metalness={0.24} clearcoat={0.45} clearcoatRoughness={0.22} />
        </mesh>
      ))}
      {state === 'leak' &&
        [-0.18, 0.05, 0.22].map((dx, k) => (
          <mesh key={k} position={[x + dx, PIPE_Y + R * 0.96, 0.12 + k * 0.05]} rotation={[0, k * 0.9 + 0.4, 0.1]}>
            <boxGeometry args={[0.32, 0.02, 0.03]} />
            <meshBasicMaterial color="#1F0A0A" />
          </mesh>
        ))}
      {state === 'leak' && <LeakSpray x={x} leakLevel={leakLevel} />}
      {state === 'leak' && <Puddle x={x} leakLevel={leakLevel} />}
      {state === 'fixed' && <RepairClamp x={x} />}
    </group>
  );
}

function Connectors() {
  return (
    <group>
      {[0, 1, 2, 3].map((i) => {
        const cx = (segX(i) + segX(i + 1)) / 2;
        return (
          <group key={i} position={[cx, PIPE_Y, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.45, 0.45, SPACING - SEG_LEN + 0.14, 32]} />
              <meshStandardMaterial color="#1E293B" metalness={0.85} roughness={0.3} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.49, 0.49, 0.08, 32]} />
              <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.25} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function Inlet() {
  const count = 26;
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const motes = useMemo(
    () => Array.from({ length: count }, () => ({ t: Math.random(), y: (Math.random() - 0.5) * 0.8, z: (Math.random() - 0.5) * 0.8, s: 0.025 + Math.random() * 0.03 })),
    []
  );
  useFrame((_, dt) => {
    const mesh = ref.current;
    if (!mesh) return;
    motes.forEach((m, i) => {
      m.t = (m.t + dt * 0.45) % 1;
      dummy.position.set(FIRST_EDGE - 1.6 + m.t * 1.5, PIPE_Y + m.y * (1 - m.t * 0.6), m.z * (1 - m.t * 0.6));
      dummy.scale.setScalar(m.s * (0.4 + m.t));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });
  return (
    <group>
      <mesh position={[FIRST_EDGE - 0.05, PIPE_Y, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[R + 0.12, R + 0.12, 0.26, 48]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[FIRST_EDGE - 0.19, PIPE_Y, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <circleGeometry args={[R, 40]} />
        <meshStandardMaterial color="#3B82F6" roughness={0.4} metalness={0.1} />
      </mesh>
      <instancedMesh ref={ref} args={[undefined, undefined, count]} frustumCulled={false}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#93C5FD" transparent opacity={0.75} />
      </instancedMesh>
    </group>
  );
}

const GOLD = { color: '#C99A2E', metalness: 0.88, roughness: 0.24 } as const;

function GoldenTap({ flow }: { flow: number }) {
  const streamRef = useRef<THREE.Mesh>(null);
  const dropsRef = useRef<THREE.InstancedMesh>(null);
  const handleRef = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const drops = useMemo(() => Array.from({ length: 8 }, (_, k) => ({ t: k / 8 })), []);

  const nozzleBottom = PIPE_Y - 0.66;
  const chestTop = FLOOR_Y + 0.06 + 0.64;

  useFrame((_, dt) => {
    if (streamRef.current) {
      const s = THREE.MathUtils.lerp(streamRef.current.scale.x, Math.max(0.001, flow), 0.08);
      streamRef.current.scale.set(s, 1, s);
      streamRef.current.visible = s > 0.05;
    }
    if (handleRef.current) handleRef.current.rotation.y += dt * flow * 0.55;
    if (dropsRef.current) {
      const visible = flow > 0.15;
      dropsRef.current.visible = visible;
      if (visible) {
        const span = Math.max(0.2, nozzleBottom - chestTop);
        drops.forEach((d, i) => {
          d.t = (d.t + dt * (0.85 + flow * 0.6)) % 1;
          dummy.position.set(TAP_X + Math.sin(i * 1.9) * 0.035, nozzleBottom - d.t * span, Math.cos(i * 1.3) * 0.035);
          dummy.rotation.set(d.t * 4, i, 0);
          dummy.scale.setScalar((0.055 + (i % 2) * 0.015) * flow);
          dummy.updateMatrix();
          dropsRef.current!.setMatrixAt(i, dummy.matrix);
        });
        dropsRef.current.instanceMatrix.needsUpdate = true;
      }
    }
  });

  return (
    <group>
      {/* Brass adapter collar on last stage */}
      <mesh position={[LAST_EDGE + 0.04, PIPE_Y, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[R + 0.05, R + 0.05, 0.14, 40]} />
        <meshStandardMaterial {...GOLD} color="#D5AA45" />
      </mesh>
      <mesh position={[LAST_EDGE + 0.16, PIPE_Y, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.42, 0.5, 0.14, 32]} />
        <meshStandardMaterial {...GOLD} />
      </mesh>

      {/* Horizontal brass feeder pipe */}
      <mesh position={[(LAST_EDGE + 0.16 + TAP_X) / 2, PIPE_Y, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.33, 0.33, TAP_X - (LAST_EDGE + 0.16), 32]} />
        <meshStandardMaterial {...GOLD} />
      </mesh>

      {/* Machined elbow valve housing */}
      <mesh position={[TAP_X, PIPE_Y, 0]}>
        <sphereGeometry args={[0.37, 32, 32]} />
        <meshStandardMaterial {...GOLD} />
      </mesh>

      {/* Tapered downward spigot spout */}
      <mesh position={[TAP_X, PIPE_Y - 0.36, 0]}>
        <cylinderGeometry args={[0.27, 0.21, 0.54, 32]} />
        <meshStandardMaterial {...GOLD} />
      </mesh>
      <mesh position={[TAP_X, nozzleBottom + 0.03, 0]}>
        <cylinderGeometry args={[0.25, 0.26, 0.07, 32]} />
        <meshStandardMaterial {...GOLD} color="#E2C068" />
      </mesh>

      {/* Valve stem & brushed-brass handwheel */}
      <mesh position={[TAP_X, PIPE_Y + 0.48, 0]}>
        <cylinderGeometry args={[0.065, 0.08, 0.32, 20]} />
        <meshStandardMaterial {...GOLD} />
      </mesh>
      <group ref={handleRef} position={[TAP_X, PIPE_Y + 0.65, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.34, 0.045, 14, 36]} />
          <meshStandardMaterial {...GOLD} color="#E2C068" />
        </mesh>
        <mesh>
          <boxGeometry args={[0.64, 0.05, 0.05]} />
          <meshStandardMaterial {...GOLD} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.05, 0.05, 0.64]} />
          <meshStandardMaterial {...GOLD} />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.09, 0.1, 0.07, 20]} />
          <meshStandardMaterial color="#0B1D3A" metalness={0.5} roughness={0.35} />
        </mesh>
      </group>

      {/* Golden revenue stream + falling coins */}
      <mesh ref={streamRef} position={[TAP_X, (nozzleBottom + chestTop) / 2, 0]}>
        <cylinderGeometry args={[0.075, 0.1, nozzleBottom - chestTop, 16, 1, true]} />
        <meshBasicMaterial color="#FCD34D" transparent opacity={0.82} />
      </mesh>
      <instancedMesh ref={dropsRef} args={[undefined, undefined, 8]} frustumCulled={false}>
        <cylinderGeometry args={[1, 1, 0.32, 14]} />
        <meshStandardMaterial {...GOLD} color="#FCD34D" />
      </instancedMesh>
    </group>
  );
}

function TreasureVault({ flow, isDark }: { flow: number; isDark: boolean }) {
  const sparkRef = useRef<THREE.InstancedMesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const x = TAP_X;
  const plinthH = 0.06;
  const h = 0.64;
  const y = FLOOR_Y + plinthH + h / 2;
  const top = y + h / 2;
  const sparks = useMemo(() => Array.from({ length: 18 }, () => ({ t: Math.random(), a: Math.random() * Math.PI * 2, r: 0.08 + Math.random() * 0.38 })), []);
  const coins = useMemo(
    () => Array.from({ length: 16 }, (_, k) => ({ x: (Math.random() - 0.5) * 0.8, z: (Math.random() - 0.5) * 0.48, rx: Math.random() * 0.6, ry: k * 0.7 })),
    []
  );

  useFrame(({ clock }, dt) => {
    if (lightRef.current) lightRef.current.intensity = 0.9 + flow * 1.6 + Math.sin(clock.getElapsedTime() * 3.5) * 0.18;
    const mesh = sparkRef.current;
    if (!mesh) return;
    sparks.forEach((s, i) => {
      s.t = (s.t + dt * (0.35 + flow * 0.45)) % 1;
      dummy.position.set(x + Math.cos(s.a) * s.r, top + 0.08 + s.t * 0.95, Math.sin(s.a) * s.r * 0.55);
      dummy.scale.setScalar(0.028 * (1 - s.t) * flow);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* Clean chamfered rectangular plinth matching vault footprint (no circular ring) */}
      <mesh position={[x, FLOOR_Y + plinthH / 2, 0]}>
        <boxGeometry args={[1.38, plinthH, 0.96]} />
        <meshStandardMaterial color={isDark ? '#0D1B35' : '#CBD5E1'} metalness={0.35} roughness={0.5} />
      </mesh>

      {/* Armored FARE Navy Vault Body */}
      <mesh position={[x, y, 0]}>
        <boxGeometry args={[1.22, h, 0.82]} />
        <meshStandardMaterial color="#0B1D3A" metalness={0.55} roughness={0.38} />
      </mesh>

      {/* Brushed Brass Vertical Straps & Corner Trim */}
      {[-0.44, 0.44].map((dx) => (
        <mesh key={dx} position={[x + dx, y, 0]}>
          <boxGeometry args={[0.09, h + 0.02, 0.85]} />
          <meshStandardMaterial {...GOLD} />
        </mesh>
      ))}
      <mesh position={[x, top - 0.035, 0]}>
        <boxGeometry args={[1.26, 0.07, 0.86]} />
        <meshStandardMaterial {...GOLD} />
      </mesh>

      {/* Front Brass Clasp & Lock Escutcheon */}
      <mesh position={[x, y + 0.06, 0.42]}>
        <boxGeometry args={[0.22, 0.24, 0.04]} />
        <meshStandardMaterial {...GOLD} color="#E2C068" />
      </mesh>
      <mesh position={[x, y + 0.04, 0.445]}>
        <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
        <meshStandardMaterial color="#0B1D3A" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Hinged Open Vault Lid angled at rear */}
      <group position={[x, top, -0.41]} rotation={[-0.65, 0, 0]}>
        <mesh position={[0, 0.14, 0.34]}>
          <boxGeometry args={[1.22, 0.12, 0.78]} />
          <meshStandardMaterial color="#0B1D3A" metalness={0.55} roughness={0.38} />
        </mesh>
        <mesh position={[0, 0.14, 0.72]}>
          <boxGeometry args={[1.25, 0.14, 0.05]} />
          <meshStandardMaterial {...GOLD} />
        </mesh>
      </group>

      {/* Subtle gold coin bed inside open top */}
      <mesh position={[x, top - 0.01, 0.02]} scale={[0.52, 0.11 + flow * 0.05, 0.32]}>
        <sphereGeometry args={[1, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#D5AA45" metalness={0.88} roughness={0.26} />
      </mesh>
      {coins.map((c, k) => (
        <mesh key={k} position={[x + c.x, top + 0.02, c.z]} rotation={[c.rx, c.ry, 0]}>
          <cylinderGeometry args={[0.078, 0.078, 0.02, 20]} />
          <meshStandardMaterial {...GOLD} color="#FCD34D" />
        </mesh>
      ))}

      <instancedMesh ref={sparkRef} args={[undefined, undefined, 18]} frustumCulled={false}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color="#FDE68A" />
      </instancedMesh>
      <pointLight ref={lightRef} position={[x, top + 0.55, 0.7]} color="#E2C068" distance={4} />
    </group>
  );
}

function Floor({ isDark }: { isDark: boolean }) {
  return (
    <mesh position={[(SCENE_MIN_X + SCENE_MAX_X) / 2, FLOOR_Y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[18, 5]} />
      <meshStandardMaterial color={isDark ? '#0A1A3A' : '#E2E8F0'} metalness={isDark ? 0.7 : 0.35} roughness={0.38} transparent opacity={0.9} />
    </mesh>
  );
}

function PipelineScene({ activeLeakStage, leakLevel, isFixed, flow, ppu, lang, isDark }: Pipe3DProps & { flow: number; ppu: number; isDark: boolean }) {
  const states: SegmentState[] = STAGES.map((_, i) => {
    if (activeLeakStage === 'all') return isFixed ? 'fixed' : 'leak';
    if (activeLeakStage === null) return 'normal';
    if (i === activeLeakStage) return isFixed ? 'fixed' : 'leak';
    if (i > activeLeakStage && !isFixed) return 'starved';
    return 'normal';
  });

  return (
    <Parallax>
      <Floor isDark={isDark} />
      <Inlet />
      <Connectors />
      {STAGES.map((st, i) => (
        <group key={st.id}>
          <Pedestal x={segX(i)} color={st.color} isDark={isDark} />
          <Segment i={i} state={states[i]} leakLevel={leakLevel} />
          {ppu > 0 && <StageLabel i={i} ppu={ppu} lang={lang} />}
        </group>
      ))}
      {typeof activeLeakStage === 'number' && ppu > 0 && (
        <StatusBadge x={segX(activeLeakStage)} ppu={ppu} fixed={isFixed} lang={lang} />
      )}
      {activeLeakStage === 'all' && ppu > 0 && (
        STAGES.map((_, i) => (
          <StatusBadge key={i} x={segX(i)} ppu={ppu} fixed={isFixed} lang={lang} />
        ))
      )}
      <GoldenTap flow={flow} />
      <TreasureVault flow={flow} isDark={isDark} />
    </Parallax>
  );
}

export default function Pipe3D({ activeLeakStage, leakLevel, isFixed, lang, flow }: Pipe3DProps) {
  const isDark = usePipeGameStore((s) => s.theme === 'dark');
  const [ppu, setPpu] = useState(0);
  const handlePpu = useCallback((v: number) => setPpu((prev) => (Math.abs(prev - v) > 0.5 ? v : prev)), []);
  const resolvedFlow = flow ?? (activeLeakStage === null || isFixed ? 1 : Math.max(0.12, 1 - leakLevel * 0.88));
  return (
    <div className="absolute inset-0">
      <Canvas dpr={[1, 1.75]} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }} camera={{ fov: 34, near: 0.1, far: 100 }}>
        <FitCamera onPpu={handlePpu} />
        <ambientLight intensity={isDark ? 0.55 : 0.75} />
        <hemisphereLight args={[isDark ? '#BFDBFE' : '#FFFFFF', isDark ? '#0B1D3A' : '#CBD5E1', isDark ? 0.65 : 0.8]} />
        <directionalLight position={[4, 7, 6]} intensity={1.6} />
        <directionalLight position={[-6, 3, -4]} intensity={0.5} color="#93C5FD" />
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={2.2} position={[0, 5, 2]} scale={[12, 2, 1]} rotation-x={Math.PI / 2} />
          <Lightformer form="rect" intensity={1.2} color="#93C5FD" position={[-6, 1, 3]} scale={[4, 3, 1]} rotation-y={Math.PI / 3} />
          <Lightformer form="rect" intensity={1.4} color="#F5D98B" position={[6, 1, 3]} scale={[4, 3, 1]} rotation-y={-Math.PI / 3} />
          <Lightformer form="ring" intensity={0.8} position={[0, 0, 6]} scale={3} />
        </Environment>
        <PipelineScene activeLeakStage={activeLeakStage} leakLevel={leakLevel} isFixed={isFixed} flow={resolvedFlow} ppu={ppu} lang={lang} isDark={isDark} />
      </Canvas>
    </div>
  );
}
