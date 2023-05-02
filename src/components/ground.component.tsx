// libs
import { usePlane } from "@react-three/cannon";
import {
  BufferGeometry,
  Material,
  Mesh,
  NearestFilter,
  RepeatWrapping,
} from "three";

// assets
import { groundTexture } from "../assets";
import { useStore } from "../hooks/use-store.hook";
import { ThreeEvent } from "@react-three/fiber";

//
function Ground() {
  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);
  // This is a custom hook that simplifies the creation of a physics-enabled plane,
  // which is required for collision detection with other objects in the scene.
  const [ref] = usePlane(() => ({
    rotation: [
      // Rotation of -90 degrees around the X-axis, which makes it lie flat on the XZ plane.
      -Math.PI / 2, // -90 degrees in radians
      0,
      0,
    ],
    // Position to the center of the plane
    position: [0, 0.5, 0],
  }));

  groundTexture.magFilter = NearestFilter;
  groundTexture.wrapS = groundTexture.wrapT = RepeatWrapping;
  groundTexture.repeat.set(100, 100);

  return (
    <mesh
      ref={
        ref as
          | React.Ref<Mesh<BufferGeometry, Material | Material[]>>
          | undefined
      }
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        const [x, y, z] = Object.values(e.point).map((val) => Math.ceil(val));
        addCube(x, y, z);
      }}
    >
      {/* This is the geometry of the ground plane */}
      <planeGeometry attach="geometry" args={[100, 100]} />
      {/* This applies the `groundTexture` to the surface of the ground plane. */}
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
}

export default Ground;
