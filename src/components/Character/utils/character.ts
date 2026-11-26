import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async (
    shouldCancel?: () => boolean
  ): Promise<GLTF | null> => {
    const encryptedBlob = await decryptFile(
      "/models/character.enc",
      "Character3D#@"
    );
    if (shouldCancel?.()) {
      dracoLoader.dispose();
      return null;
    }
    const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

    return new Promise<GLTF | null>((resolve, reject) => {
      try {
        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            URL.revokeObjectURL(blobUrl);
            if (shouldCancel?.()) {
              dracoLoader.dispose();
              resolve(null);
              return;
            }
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            if (shouldCancel?.()) {
              dracoLoader.dispose();
              resolve(null);
              return;
            }
            character.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            URL.revokeObjectURL(blobUrl);
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        URL.revokeObjectURL(blobUrl);
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
