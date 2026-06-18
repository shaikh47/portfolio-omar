import type { AnimationClip, Object3D } from 'three'

/** Supported rigged-character file formats. */
export type CharacterFormat = 'fbx' | 'glb' | 'vrm'

/** Logical locomotion states the controller can request from a character. */
export type AnimationName = 'idle' | 'walk'

/** A 3D asset resolved to a bundler URL plus the format it should be loaded as. */
export type AssetSource = {
  url: string
  format: CharacterFormat
}

/** An animation clip source, optionally stripped of horizontal root motion. */
export type AnimationSource = AssetSource & {
  /**
   * Remove horizontal hip translation so a movement controller can own the
   * character's position. Defaults to `true` — almost always wanted for
   * locomotion clips authored with in-world root motion (e.g. Mixamo).
   */
  lockRootMotion?: boolean
}

/** Declarative description of a playable character and its animation set. */
export type CharacterConfig = {
  /** The rigged mesh. */
  model: AssetSource
  /** Uniform scale applied to the model (Mixamo FBX exports are authored in cm). */
  scale: number
  /**
   * Animation clips keyed by logical state. Each lives in its own file so the
   * model and its motions can be sourced and swapped independently.
   */
  animations: Partial<Record<AnimationName, AnimationSource>>
}

/** Normalized result every format loader resolves to. */
export type LoadedAsset = {
  scene: Object3D
  clips: AnimationClip[]
}
