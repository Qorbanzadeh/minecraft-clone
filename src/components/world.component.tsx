// libs
import { Canvas } from "@react-three/fiber"; //fiber: for 3D rendering in React
import { Sky, Stars } from "@react-three/drei"; // drei: for 3D effects
import { Physics } from "@react-three/cannon"; // cannon: for physics simulation

// components
import Ground from "./ground.component";
import Player from "./player.component";
import FOV from "./fov.component";
import Cubes from "./cubes.component";
import { TextureSelector } from "./texture-selector.component";
import { useKeyboard } from "../hooks/use-controls.hook";
import { useEffect } from "react";
import { useStore } from "../hooks/use-store.hook";
import { DEFAULT_CUBES } from "../constant";

function World() {
  const { exit } = useKeyboard();
  const [toggleMenu, isMenuVisible] = useStore((state) => [
    state.toggleMenu,
    state.isMenuVisible,
    state.setDefaultCubes,
  ]);

  const setDefaultCubes = useStore((state) => state.setDefaultCubes);

  useEffect(() => {
    if (exit) {
      toggleMenu();
    }
  }, [exit, toggleMenu]);

  useEffect(() => {
    setDefaultCubes(DEFAULT_CUBES);
  }, []);

  return (
    <>
      {!isMenuVisible ? (
        <>
          <Canvas>
            <Sky sunPosition={[100, 10, 100]} />
            <Stars />
            <ambientLight intensity={0.3} />
            <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
            <FOV />
            <Physics gravity={[0, -30, 0]}>
              <Cubes />
              <Player />
              <Ground />
            </Physics>
          </Canvas>
          <div className="absolute right-0 text-white text-opacity-50 -bottom-60">
            &#10010;
          </div>
          <TextureSelector />
        </>
      ) : (
        <img src="../assets/bg.webp" />
      )}
    </>
  );
}

export default World;
