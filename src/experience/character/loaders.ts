import type { Loader } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import {
  GLTFLoader,
  type GLTF,
} from "three/examples/jsm/loaders/GLTFLoader.js";
import type { AssetSource, CharacterFormat, LoadedAsset } from "./types";

type LoaderCtor = new () => Loader & {
  loadAsync: (url: string) => Promise<unknown>;
};

// Loader constructor per format. `glb` and `vrm` both decode glTF; VRM layers a
// plugin on top (registered in `configureLoader`).
const LOADER_FOR: Record<CharacterFormat, LoaderCtor> = {
  fbx: FBXLoader,
  glb: GLTFLoader,
  vrm: GLTFLoader,
};

// Per-instance loader configuration. VRM needs `@pixiv/three-vrm`'s
// VRMLoaderPlugin registered here once it is added as a dependency; until then
// we fail loudly rather than silently loading a glTF without VRM extensions.
function configureLoader(format: CharacterFormat, loader: Loader): void {
  if (format === "vrm") {
    throw new Error(
      "VRM support is not wired up yet: register VRMLoaderPlugin from '@pixiv/three-vrm' in character/loaders.ts.",
    );
  }
  void loader;
}

// Collapse a raw loader result into the normalized { scene, clips } shape.
function normalizeAsset(format: CharacterFormat, raw: unknown): LoadedAsset {
  if (format === "fbx") {
    // FBXLoader resolves to a Group carrying its clips on `.animations`.
    const group = raw as LoadedAsset["scene"] & {
      animations: LoadedAsset["clips"];
    };
    return { scene: group, clips: group.animations };
  }
  const gltf = raw as GLTF;
  return { scene: gltf.scene, clips: gltf.animations };
}

/** Load and normalize a single character asset from its source descriptor. */
export async function loadAsset(source: AssetSource): Promise<LoadedAsset> {
  const loader = new LOADER_FOR[source.format]();
  configureLoader(source.format, loader);
  return normalizeAsset(source.format, await loader.loadAsync(source.url));
}
