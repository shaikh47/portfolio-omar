import { useRef, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import * as THREE from 'three'
import { BOUNDS, PLAYER_SPEED, SPAWN, clamp, resolveCollisions } from './layout'
import { inputState } from './inputState'
import { Character, type MotionState } from './character/Character'
import { PLAYER_CHARACTER } from './character/config'

// The follow camera always sits on the +z / +y side of the player looking
// toward -z, so it can safely overhang the south wall without ever occluding
// the view — no clamping needed.
const CAM_OFFSET = new THREE.Vector3(0, 6.5, 9)

function lerpAngle(a: number, b: number, t: number) {
  let diff = b - a
  while (diff > Math.PI) diff -= Math.PI * 2
  while (diff < -Math.PI) diff += Math.PI * 2
  return a + diff * t
}

type Props = {
  /** Published every frame so hotspots (e.g. the exit door) can do proximity checks. */
  playerPos: RefObject<THREE.Vector3>
  /** Disable movement while a modal is open. */
  locked?: boolean
}

export function Player({ playerPos, locked }: Props) {
  const group = useRef<Group>(null)
  const camTarget = useRef(new THREE.Vector3())
  const lookTarget = useRef(new THREE.Vector3(SPAWN.x, 1, SPAWN.z))
  // Drives the character's idle/walk crossfade; mutated each frame, never causes
  // a React re-render.
  const motion = useRef<MotionState>({ moving: false })

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    let dx = locked ? 0 : inputState.right
    let dz = locked ? 0 : -inputState.forward
    const len = Math.hypot(dx, dz)
    const moving = len > 0.01
    motion.current.moving = moving

    if (moving) {
      dx /= len
      dz /= len
      let nx = g.position.x + dx * PLAYER_SPEED * delta
      let nz = g.position.z + dz * PLAYER_SPEED * delta
      nx = clamp(nx, -BOUNDS.x, BOUNDS.x)
      nz = clamp(nz, -BOUNDS.z, BOUNDS.z)
      const resolved = resolveCollisions(nx, nz)
      g.position.x = resolved.x
      g.position.z = resolved.z

      const targetAngle = Math.atan2(dx, dz)
      g.rotation.y = lerpAngle(g.rotation.y, targetAngle, 1 - Math.pow(0.001, delta))
    }

    playerPos.current.copy(g.position)

    // Third-person follow camera: damped toward an offset behind the player.
    const ct = camTarget.current.copy(g.position).add(CAM_OFFSET)
    const k = 1 - Math.pow(0.0015, delta)
    state.camera.position.lerp(ct, k)
    const lt = lookTarget.current
    lt.x = THREE.MathUtils.lerp(lt.x, g.position.x, k)
    lt.y = THREE.MathUtils.lerp(lt.y, g.position.y + 1.2, k)
    lt.z = THREE.MathUtils.lerp(lt.z, g.position.z, k)
    state.camera.lookAt(lt)
  })

  // Spawn facing into the room (-z), away from the follow camera. The model's
  // own forward (+z) is flipped by this base rotation.
  return (
    <group ref={group} position={[SPAWN.x, 0, SPAWN.z]} rotation={[0, Math.PI, 0]}>
      <Character config={PLAYER_CHARACTER} motion={motion} />
    </group>
  )
}
