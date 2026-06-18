import modelUrl from '../../assets/3d/X Bot.fbx?url'
import walkUrl from '../../assets/3d/Walking.fbx?url'
import idleUrl from '../../assets/3d/breathing-Idle.fbx?url'
import type { CharacterConfig } from './types'

/**
 * The player avatar. Swapping to a glb/vrm character later only means changing
 * the URLs and `format` fields here — the loader, animation and controller code
 * is format-agnostic.
 */
export const PLAYER_CHARACTER: CharacterConfig = {
  model: { url: modelUrl, format: 'fbx' },
  // Mixamo FBX is authored in centimetres; 0.013 brings it to metre-scale with
  // a slightly larger, more present figure in the room.
  scale: 0.013,
  animations: {
    idle: { url: idleUrl, format: 'fbx', lockRootMotion: true },
    walk: { url: walkUrl, format: 'fbx', lockRootMotion: true },
  },
}
