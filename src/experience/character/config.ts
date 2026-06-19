import modelUrlOmar from "../../assets/3d/omar-model.glb?url";
import walkUrl from "../../assets/3d/Walking.fbx?url";
import idleUrl from "../../assets/3d/breathing-Idle.fbx?url";
import type { CharacterConfig } from "./types";

/**
 * The player avatar. Swapping to a glb/vrm character later only means changing
 * the URLs and `format` fields here — the loader, animation and controller code
 * is format-agnostic.
 */
export const PLAYER_CHARACTER: CharacterConfig = {
  model: { url: modelUrlOmar, format: "glb" },
  // GLB model is already in metre-scale.
  scale: 1.0,
  animations: {
    idle: { url: idleUrl, format: "fbx", lockRootMotion: true },
    walk: { url: walkUrl, format: "fbx", lockRootMotion: true },
  },
  // Mixamo FBX tracks are prefixed with 'mixamorig'; strip it to match the GLB bones.
  retargetTrackName: (name) => name.replace(/^mixamorig/, ""),
};
