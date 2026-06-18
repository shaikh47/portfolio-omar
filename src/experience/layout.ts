// Shared geometry, collision data and hotspot placement for the 3D room.
// Kept in one module so the renderer (Room / Hotspots) and the controller
// (Player collision) never drift out of sync.

export const ROOM = {
  width: 24, // along X
  depth: 24, // along Z
  height: 6,
  wall: 0.3,
}

export const PLAYER_RADIUS = 0.45
export const PLAYER_SPEED = 5

// Bounds the player's *center* is clamped to (inner face of the walls).
export const BOUNDS = {
  x: ROOM.width / 2 - ROOM.wall - PLAYER_RADIUS,
  z: ROOM.depth / 2 - ROOM.wall - PLAYER_RADIUS,
}

export type AABB = { minX: number; maxX: number; minZ: number; maxZ: number }

// Furniture / props the player should not walk through. Stored as the
// footprint already expanded conceptually; the player radius is added at
// resolve time.
export const OBSTACLES: AABB[] = [
  // Projects desk (east side)
  { minX: 7.2, maxX: 10.4, minZ: -1.8, maxZ: 1.8 },
  // Corner plant pots
  { minX: -11.2, maxX: -10.0, minZ: -11.2, maxZ: -10.0 },
  { minX: 10.0, maxX: 11.2, minZ: -11.2, maxZ: -10.0 },
  // Central display pedestal / bench
  { minX: -1.6, maxX: 1.6, minZ: -1.0, maxZ: 1.0 },
]

// Hotspot anchor points used by both the meshes and the camera framing.
export const WALL_Z = -ROOM.depth / 2 + ROOM.wall // north wall inner face
export const WALL_X_WEST = -ROOM.width / 2 + ROOM.wall

export const EDUCATION_SLOTS_X = [-7, -2.3, 2.3, 7] // up to 4 frames on north wall
export const SKILL_BOARD = { x: WALL_X_WEST + 0.05, z: 0, y: 3 }
export const DESK = { x: 9, z: 0, height: 1.5, top: 1.5 }
export const EXIT_DOOR = { x: 0, z: ROOM.depth / 2 - ROOM.wall, width: 2.2, height: 3.6 }

export const SPAWN = { x: 0, z: 2 }

export function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v
}

// Resolve a circle (player) against the AABB obstacles by pushing it out
// along the axis of least penetration. Returns the corrected position.
export function resolveCollisions(x: number, z: number, r = PLAYER_RADIUS) {
  for (const o of OBSTACLES) {
    const minX = o.minX - r
    const maxX = o.maxX + r
    const minZ = o.minZ - r
    const maxZ = o.maxZ + r
    if (x > minX && x < maxX && z > minZ && z < maxZ) {
      const penLeft = x - minX
      const penRight = maxX - x
      const penTop = z - minZ
      const penBottom = maxZ - z
      const min = Math.min(penLeft, penRight, penTop, penBottom)
      if (min === penLeft) x = minX
      else if (min === penRight) x = maxX
      else if (min === penTop) z = minZ
      else z = maxZ
    }
  }
  return { x, z }
}
