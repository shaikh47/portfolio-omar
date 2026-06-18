import { RoundedBox } from '@react-three/drei'
import { ROOM } from './layout'

const HALF_W = ROOM.width / 2
const HALF_D = ROOM.depth / 2
const H = ROOM.height
const DOOR_GAP = 2.4

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
      <mesh position={[0, 0.95, 0]} castShadow>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial color="#60a5fa" emissive="#1d4ed8" emissiveIntensity={0.5} roughness={0.2} metalness={0.3} />
      </mesh>

      {/* corner plants — footprints match OBSTACLES */}
      <Plant position={[-HALF_W + 1.4, 0, -HALF_D + 1.4]} />
      <Plant position={[HALF_W - 1.4, 0, -HALF_D + 1.4]} />
    </group>
  )
}
