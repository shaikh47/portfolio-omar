import { useMemo } from 'react'
import { suspend } from 'suspend-react'
import { AnimationClip, type KeyframeTrack, type Object3D } from 'three'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { loadAsset } from './loaders'
import type { AnimationName, AnimationSource, CharacterConfig } from './types'

// Zero a clip's horizontal hip translation so the movement controller — not the
// baked root motion — owns the character's world position. Vertical bob is kept.
function lockRootMotion(clip: AnimationClip): AnimationClip {
  const locked = clip.clone()
  const hips = locked.tracks.find(
    (t: KeyframeTrack) => t.name.endsWith('.position') && /hips/i.test(t.name),
  )
  if (hips) {
    for (let i = 0; i < hips.values.length; i += 3) {
      hips.values[i] = 0 // x
      hips.values[i + 2] = 0 // z
    }
  }
  return locked
}

type LoadedCharacter = {
  /** Cloned, scaled, shadow-casting model ready to mount via <primitive>. */
  scene: Object3D
  /** One clip per configured animation, named by its logical `AnimationName`. */
  clips: AnimationClip[]
}

/**
 * Load a character and its animation set, format-agnostically. The model is
 * cloned per instance (so the cached asset stays pristine) and every clip is
 * renamed to its logical state for keyed playback via drei's `useAnimations`.
 */
export function useCharacter(config: CharacterConfig): LoadedCharacter {
  const model = suspend(() => loadAsset(config.model), [config.model.url])

  const entries = Object.entries(config.animations) as [AnimationName, AnimationSource][]
  const sources = entries.map(([name, source]) => ({
    name,
    source,
    asset: suspend(() => loadAsset(source), [source.url]),
  }))

  const scene = useMemo(() => {
    const root = clone(model.scene)
    root.scale.setScalar(config.scale)
    root.traverse((o) => {
      o.castShadow = true
      o.receiveShadow = true
    })
    return root
  }, [model.scene, config.scale])

  const clips = useMemo(
    () =>
      sources
        .map(({ name, source, asset }) => {
          const raw = asset.clips[0]
          if (!raw) return null
          const clip = source.lockRootMotion === false ? raw.clone() : lockRootMotion(raw)
          clip.name = name
          return clip
        })
        .filter((c): c is AnimationClip => c !== null),
    // `sources` is derived fresh each render; the clip set only changes when the
    // configured animation URLs change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config.animations],
  )

  return { scene, clips }
}
