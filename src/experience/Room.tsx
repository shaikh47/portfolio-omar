import { useRef } from 'react'
import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'
import { ROOM } from './layout'

const HALF_W = ROOM.width / 2
const HALF_D = ROOM.depth / 2
const H = ROOM.height
const DOOR_GAP = 2.4

// Slowly rotating, gently bobbing centrepiece sitting on the display pedestal —
// the one piece of constant motion that keeps the empty room feeling alive.
function Centerpiece() {
  const ring1 = useRef<Mesh>(null)
  const ring2 = useRef<Mesh>(null)
  const core = useRef<Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (core.current) core.current.position.y = 0.95 + Math.sin(t * 1.2) * 0.06
    if (ring1.current) ring1.current.rotation.z = t * 0.5
    if (ring2.current) {
      ring2.current.rotation.x = t * 0.7
      ring2.current.rotation.y = t * 0.35
    }
  })

  return (
    <group>
      <group ref={core}>
        <mesh castShadow>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshStandardMaterial color="#60a5fa" emissive="#1d4ed8" emissiveIntensity={0.7} roughness={0.2} metalness={0.3} />
        </mesh>
        {/* orbiting rings */}
        <mesh ref={ring1} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[0.72, 0.025, 16, 80]} />
          <meshStandardMaterial color="#93c5fd" emissive="#3b82f6" emissiveIntensity={1.2} toneMapped={false} />
        </mesh>
        <mesh ref={ring2} rotation={[0, 0, Math.PI / 3]}>
          <torusGeometry args={[0.92, 0.02, 16, 80]} />
          <meshStandardMaterial color="#c4b5fd" emissive="#8b5cf6" emissiveIntensity={1.1} toneMapped={false} />
        </mesh>
      </group>
      <pointLight position={[0, 1.4, 0]} intensity={6} distance={6} color="#7dd3fc" />
    </group>
  )
}

// Hanging pendant lamp: a thin cord, a warm emissive bulb and a soft pool of
// light beneath it.
function Pendant({ x }: { x: number }) {
  return (
    <group position={[x, 0, 0]}>
      <mesh position={[0, H - 0.9, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.8, 8]} />
        <meshStandardMaterial color="#2a2e36" />
      </mesh>
      <mesh position={[0, H - 1.85, 0]}>
        <coneGeometry args={[0.4, 0.5, 24, 1, true]} />
        <meshStandardMaterial color="#1f2530" roughness={0.4} metalness={0.5} side={2} />
      </mesh>
      <mesh position={[0, H - 2.0, 0]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#fff7e6" emissive="#ffd27f" emissiveIntensity={2.2} toneMapped={false} />
      </mesh>
      <pointLight position={[0, H - 2.0, 0]} intensity={14} distance={9} color="#ffe2b0" castShadow />
    </group>
  )
}

// A backlit window letting a soft gradient of "daylight" into the room.
function Window({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* frame */}
      <mesh>
        <boxGeometry args={[3.6, 2.4, 0.18]} />
        <meshStandardMaterial color="#e3e3ea" roughness={0.7} />
      </mesh>
      {/* glowing sky pane */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[3.1, 1.95]} />
        <meshStandardMaterial color="#cfe8ff" emissive="#bfe0ff" emissiveIntensity={0.9} toneMapped={false} />
      </mesh>
      {/* muntins */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[0.06, 1.95, 0.04]} />
        <meshStandardMaterial color="#e3e3ea" />
      </mesh>
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[3.1, 0.06, 0.04]} />
        <meshStandardMaterial color="#e3e3ea" />
      </mesh>
      <pointLight position={[0, 0, 1.2]} intensity={10} distance={10} color="#dcefff" />
    </group>
  )
}

// Simple framed abstract panel to dress otherwise-empty wall space.
function WallArt({ position, rotation, color }: { position: [number, number, number]; rotation: [number, number, number]; color: string }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[1.4, 1.8, 0.08]} />
        <meshStandardMaterial color="#2b2f38" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[1.2, 1.6]} />
        <meshStandardMaterial color={color} roughness={0.6} emissive={color} emissiveIntensity={0.15} />
      </mesh>
    </group>
  )
}

function Plant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* pot */}
      <mesh castShadow position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.35, 0.28, 0.7, 16]} />
        <meshStandardMaterial color="#9a6b4f" roughness={0.8} />
      </mesh>
      {/* foliage */}
      {[
        [0, 1.0, 0, 0.55],
        [0.18, 1.35, 0.1, 0.4],
        [-0.16, 1.3, -0.08, 0.36],
      ].map(([x, y, z, r], idx) => (
        <mesh key={idx} castShadow position={[x, y, z]}>
          <icosahedronGeometry args={[r, 1]} />
          <meshStandardMaterial color={idx % 2 ? '#3f8f56' : '#357a49'} roughness={0.9} flatShading />
        </mesh>
      ))}
    </group>
  )
}

export function Room() {
  const wallColor = '#e9e9ee'
  const wallMat = <meshStandardMaterial color={wallColor} roughness={0.95} />

  return (
    <group>
      {/* ---- lighting ---- */}
      <ambientLight intensity={0.55} />
      <hemisphereLight args={['#ffffff', '#b8bccb', 0.5]} />
      <directionalLight
        position={[6, 14, 8]}
        intensity={1.15}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
        shadow-bias={-0.0005}
      />
      {/* warm accent lights washing the certificate wall */}
      <pointLight position={[-5, 4, -HALF_D + 2.5]} intensity={20} distance={12} color="#fff3e0" />
      <pointLight position={[5, 4, -HALF_D + 2.5]} intensity={20} distance={12} color="#fff3e0" />
      {/* cool accent over the skills board */}
      <pointLight position={[-HALF_W + 2.5, 4, 0]} intensity={16} distance={11} color="#cfe0ff" />

      {/* ---- floor ---- */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM.width, ROOM.depth]} />
        <meshStandardMaterial color="#cfd2d9" roughness={0.35} metalness={0.05} />
      </mesh>
      {/* exhibition rug in the centre */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#3b4252" roughness={0.9} />
      </mesh>

      {/* ---- ceiling ---- */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, H, 0]}>
        <planeGeometry args={[ROOM.width, ROOM.depth]} />
        <meshStandardMaterial color="#f4f4f7" roughness={1} />
      </mesh>
      {/* recessed light strips */}
      {[-6, 0, 6].map((x) => (
        <mesh key={x} position={[x, H - 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.6, ROOM.depth - 4]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.4} toneMapped={false} />
        </mesh>
      ))}

      {/* ---- walls ---- */}
      {/* north */}
      <mesh position={[0, H / 2, -HALF_D]} receiveShadow>
        <boxGeometry args={[ROOM.width, H, ROOM.wall]} />
        {wallMat}
      </mesh>
      {/* west */}
      <mesh position={[-HALF_W, H / 2, 0]} receiveShadow>
        <boxGeometry args={[ROOM.wall, H, ROOM.depth]} />
        {wallMat}
      </mesh>
      {/* east */}
      <mesh position={[HALF_W, H / 2, 0]} receiveShadow>
        <boxGeometry args={[ROOM.wall, H, ROOM.depth]} />
        {wallMat}
      </mesh>
      {/* south — split around the exit doorway */}
      <mesh position={[-(HALF_W + DOOR_GAP / 2) / 2 - DOOR_GAP / 4, H / 2, HALF_D]} receiveShadow>
        <boxGeometry args={[HALF_W - DOOR_GAP / 2, H, ROOM.wall]} />
        {wallMat}
      </mesh>
      <mesh position={[(HALF_W + DOOR_GAP / 2) / 2 + DOOR_GAP / 4, H / 2, HALF_D]} receiveShadow>
        <boxGeometry args={[HALF_W - DOOR_GAP / 2, H, ROOM.wall]} />
        {wallMat}
      </mesh>
      {/* lintel above the door */}
      <mesh position={[0, H - 0.6, HALF_D]} receiveShadow>
        <boxGeometry args={[DOOR_GAP, 1.2, ROOM.wall]} />
        {wallMat}
      </mesh>

      {/* baseboards for a finished look */}
      {[
        { pos: [0, 0.1, -HALF_D + 0.16] as [number, number, number], size: [ROOM.width, 0.2, 0.05] as [number, number, number] },
        { pos: [-HALF_W + 0.16, 0.1, 0] as [number, number, number], size: [0.05, 0.2, ROOM.depth] as [number, number, number] },
        { pos: [HALF_W - 0.16, 0.1, 0] as [number, number, number], size: [0.05, 0.2, ROOM.depth] as [number, number, number] },
      ].map((b, i) => (
        <mesh key={i} position={b.pos}>
          <boxGeometry args={b.size} />
          <meshStandardMaterial color="#b9bcc6" roughness={0.7} />
        </mesh>
      ))}

      {/* central display pedestal (matches collision footprint) */}
      <RoundedBox args={[3, 0.9, 2]} radius={0.08} smoothness={4} position={[0, 0.45, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#2e3440" roughness={0.5} />
      </RoundedBox>
      <Centerpiece />

      {/* hanging pendant lamps over the central rug */}
      <Pendant x={-4} />
      <Pendant x={4} />

      {/* backlit windows high on the side walls */}
      <Window position={[HALF_W - 0.15, H - 2, -5]} rotation={[0, -Math.PI / 2, 0]} />
      <Window position={[HALF_W - 0.15, H - 2, 5]} rotation={[0, -Math.PI / 2, 0]} />

      {/* framed art filling the bare south-wall sections beside the door */}
      <WallArt position={[-7, 3.2, HALF_D - 0.16]} rotation={[0, Math.PI, 0]} color="#7c8cff" />
      <WallArt position={[7, 3.2, HALF_D - 0.16]} rotation={[0, Math.PI, 0]} color="#ff9bb0" />

      {/* corner plants — front two footprints match OBSTACLES; rear two are
          decorative dressing tucked against the south wall */}
      <Plant position={[-HALF_W + 1.4, 0, -HALF_D + 1.4]} />
      <Plant position={[HALF_W - 1.4, 0, -HALF_D + 1.4]} />
      <Plant position={[-HALF_W + 1.4, 0, HALF_D - 1.4]} />
      <Plant position={[HALF_W - 1.4, 0, HALF_D - 1.4]} />
    </group>
  )
}
