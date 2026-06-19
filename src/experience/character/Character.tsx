import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations } from "@react-three/drei";
import { Group } from "three";
import { useCharacter } from "./useCharacter";
import type { AnimationName, CharacterConfig } from "./types";

/** Live locomotion signal the controller mutates each frame (no re-render). */
export type MotionState = { moving: boolean };

const CROSSFADE = 0.18;

type Props = {
  config: CharacterConfig;
  motion: RefObject<MotionState>;
};

/**
 * Renders a loaded character and crossfades between locomotion clips based on
 * the controller's `motion` ref. With no `idle` clip configured the rig simply
 * relaxes to its bind pose when stationary.
 */
export function Character({ config, motion }: Props) {
  const { scene, clips } = useCharacter(config);
  const ref = useRef<Group>(null);
  const { actions } = useAnimations(clips, ref);
  const current = useRef<AnimationName | null>(null);

  useFrame(() => {
    const next: AnimationName = motion.current.moving ? "walk" : "idle";
    if (next === current.current) return;
    const prev = current.current ? actions[current.current] : undefined;
    current.current = next;
    actions[next]?.reset().fadeIn(CROSSFADE).play();
    prev?.fadeOut(CROSSFADE);
  });

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
}
