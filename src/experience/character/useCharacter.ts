import { useMemo } from "react";
import { suspend } from "suspend-react";
import { AnimationClip, type KeyframeTrack, type Object3D } from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { loadAsset } from "./loaders";
import type { AnimationName, AnimationSource, CharacterConfig } from "./types";

// Remove the hip position track entirely so the movement controller owns the
// character's world position and the model's bind pose keeps its natural height.
function lockRootMotion(clip: AnimationClip): AnimationClip {
  const locked = clip.clone();
  locked.tracks = locked.tracks.filter(
    (t: KeyframeTrack) =>
      !(t.name.endsWith(".position") && /hips/i.test(t.name)),
  );
  return locked;
}

type LoadedCharacter = {
  /** Cloned, scaled, shadow-casting model ready to mount via <primitive>. */
  scene: Object3D;
  /** One clip per configured animation, named by its logical `AnimationName`. */
  clips: AnimationClip[];
};

/**
 * Load a character and its animation set, format-agnostically. The model is
 * cloned per instance (so the cached asset stays pristine) and every clip is
 * renamed to its logical state for keyed playback via drei's `useAnimations`.
 */
export function useCharacter(config: CharacterConfig): LoadedCharacter {
  const model = suspend(() => loadAsset(config.model), [config.model.url]);

  const entries = Object.entries(config.animations) as [
    AnimationName,
    AnimationSource,
  ][];
  const sources = entries.map(([name, source]) => ({
    name,
    source,
    asset: suspend(() => loadAsset(source), [source.url]),
  }));

  const scene = useMemo(() => {
    const root = clone(model.scene);
    root.scale.setScalar(config.scale);
    root.traverse((o) => {
      o.castShadow = true;
      o.receiveShadow = true;
    });
    return root;
  }, [model.scene, config.scale]);

  const clips = useMemo(
    () =>
      sources
        .map(({ name, source, asset }) => {
          const raw = asset.clips[0];
          if (!raw) return null;
          const clip =
            source.lockRootMotion === false ? raw.clone() : lockRootMotion(raw);
          clip.name = name;
          // Retarget track names to match the target model's skeleton.
          if (config.retargetTrackName) {
            for (const track of clip.tracks) {
              track.name = config.retargetTrackName(track.name);
            }
          }
          return clip;
        })
        .filter((c): c is AnimationClip => c !== null),
    // `sources` is derived fresh each render; the clip set only changes when the
    // configured animation URLs change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config.animations],
  );

  return { scene, clips };
}
