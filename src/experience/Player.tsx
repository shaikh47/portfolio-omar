import { useEffect, useRef, type RefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
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

// Cinematic entrance: the camera orbits in across the room from a high, wide
// angle and converges onto the follow offset. The orbit is parameterised so its
// end state (angle 0, radius 9, height 6.5) is exactly CAM_OFFSET — no seam when
// it hands off to the follow camera.
const INTRO_DURATION = 4.5
const INTRO_START_ANGLE = -2.3
const INTRO_START_RADIUS = 17
const INTRO_START_HEIGHT = 11

// Orbit-follow camera: the user can drag to rotate around the player and scroll
// to zoom. The default spherical pose (yaw 0, pitch, distance) is chosen so it
// reproduces the old fixed CAM_OFFSET exactly — the entrance sweep hands off to
// it without a visible jump.
const DEFAULT_YAW = 0
const DEFAULT_PITCH = Math.asin(CAM_OFFSET.y / CAM_OFFSET.length()) // ≈ 0.62 rad
const DEFAULT_DISTANCE = CAM_OFFSET.length() // ≈ 11.1
const MIN_PITCH = 0.15
const MAX_PITCH = 1.35
const MIN_DISTANCE = 5
const MAX_DISTANCE = 18
const ORBIT_SENSITIVITY = 0.005
const ZOOM_SENSITIVITY = 0.012

function lerpAngle(a: number, b: number, t: number) {
  let diff = b - a
  while (diff > Math.PI) diff -= Math.PI * 2
  while (diff < -Math.PI) diff += Math.PI * 2
  return a + diff * t
}

// Smooth ease-in-out so the sweep accelerates and settles gently.
function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
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
  // Seconds elapsed into the cinematic entrance; once it passes INTRO_DURATION
  // the regular follow camera takes over.
  const introT = useRef(0)
  // User-controllable orbit pose around the player (mutated by pointer/wheel).
  const yaw = useRef(DEFAULT_YAW)
  const pitch = useRef(DEFAULT_PITCH)
  const distance = useRef(DEFAULT_DISTANCE)
  // Drives the character's idle/walk crossfade; mutated each frame, never causes
  // a React re-render.
  const motion = useRef<MotionState>({ moving: false })

  const { gl } = useThree()

  // Drag-to-orbit + scroll-to-zoom. Listening on the canvas (and window for
  // move/up so a drag survives leaving the element) keeps R3F's own click
  // raycasting intact: a click with no movement still reaches the hotspots.
  useEffect(() => {
    const el = gl.domElement
    let dragging = false
    let lastX = 0
    let lastY = 0

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging || introT.current < INTRO_DURATION) return
      yaw.current -= (e.clientX - lastX) * ORBIT_SENSITIVITY
      pitch.current = clamp(pitch.current + (e.clientY - lastY) * ORBIT_SENSITIVITY, MIN_PITCH, MAX_PITCH)
      lastX = e.clientX
      lastY = e.clientY
    }
    const onPointerUp = () => {
      dragging = false
    }
    const onWheel = (e: WheelEvent) => {
      if (introT.current < INTRO_DURATION) return
      e.preventDefault()
      distance.current = clamp(distance.current + e.deltaY * ZOOM_SENSITIVITY, MIN_DISTANCE, MAX_DISTANCE)
    }

    el.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('wheel', onWheel)
    }
  }, [gl])

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return

    // ---- cinematic entrance: lock input and orbit the camera in ----
    if (introT.current < INTRO_DURATION) {
      introT.current += delta
      motion.current.moving = false
      const t = easeInOut(Math.min(introT.current / INTRO_DURATION, 1))
      const angle = THREE.MathUtils.lerp(INTRO_START_ANGLE, 0, t)
      const radius = THREE.MathUtils.lerp(INTRO_START_RADIUS, CAM_OFFSET.z, t)
      const height = THREE.MathUtils.lerp(INTRO_START_HEIGHT, CAM_OFFSET.y, t)
      state.camera.position.set(
        g.position.x + Math.sin(angle) * radius,
        height,
        g.position.z + Math.cos(angle) * radius,
      )
      // Pan from the room centre onto the player as the sweep settles.
      const lt = lookTarget.current
      lt.x = THREE.MathUtils.lerp(0, g.position.x, t)
      lt.y = THREE.MathUtils.lerp(2.2, g.position.y + 1.2, t)
      lt.z = THREE.MathUtils.lerp(0, g.position.z, t)
      state.camera.lookAt(lt)
      playerPos.current.copy(g.position)
      return
    }

    // Movement is relative to where the camera is looking: rotate the raw input
    // (forward = into the screen, right = screen-right) by the orbit yaw so the
    // controls stay intuitive after the camera is dragged around. At yaw 0 this
    // reduces to the original world-space mapping (forward → -z, right → +x).
    const fwd = locked ? 0 : inputState.forward
    const strafe = locked ? 0 : inputState.right
    const sy = Math.sin(yaw.current)
    const cy = Math.cos(yaw.current)
    let dx = strafe * cy - fwd * sy
    let dz = -strafe * sy - fwd * cy
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

    // Third-person orbit-follow: the camera sits on a user-controlled sphere
    // around the player and damps toward it each frame.
    const cp = Math.cos(pitch.current)
    const ct = camTarget.current.set(
      g.position.x + distance.current * cp * Math.sin(yaw.current),
      g.position.y + distance.current * Math.sin(pitch.current),
      g.position.z + distance.current * cp * Math.cos(yaw.current),
    )
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
