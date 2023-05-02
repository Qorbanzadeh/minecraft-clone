import { useBox } from "@react-three/cannon";
import { Ref, useEffect, useState } from "react";
import { useStore } from "../hooks/use-store.hook";
import * as textures from "../assets/textures";
import { ThreeEvent } from "@react-three/fiber";
import { BufferGeometry, Material, Mesh } from "three";
import { useKeyboard } from "../hooks/use-controls.hook";

interface CubeProps {
  position: [number, number, number];
  texture: string;
}

export const Cube: React.FC<CubeProps> = ({ position, texture }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));
  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);

  const activeTexture = textures[texture + "Texture"];

  const handleClick = (e: ThreeEvent<MouseEvent>): void => {
    e.stopPropagation();
    const clickedFace = Math.floor(e.faceIndex! / 2);
    const { x, y, z } = ref.current!.position;
    if (e.altKey) {
      removeCube(x, y, z);
      return;
    } else if (clickedFace === 0) {
      addCube(x + 1, y, z);
      return;
    } else if (clickedFace === 1) {
      addCube(x - 1, y, z);
      return;
    } else if (clickedFace === 2) {
      addCube(x, y + 1, z);
      return;
    } else if (clickedFace === 3) {
      addCube(x, y - 1, z);
      return;
    } else if (clickedFace === 4) {
      addCube(x, y, z + 1);
      return;
    } else if (clickedFace === 5) {
      addCube(x, y, z - 1);
      return;
    }
  };

  return (
    <mesh
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      onClick={handleClick}
      ref={ref as Ref<Mesh<BufferGeometry, Material | Material[]>> | undefined}
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHovered ? "grey" : "white"}
        map={activeTexture}
        transparent={true}
        opacity={texture === "glass" ? 0.6 : 1}
        attach="material"
      />
    </mesh>
  );
};
