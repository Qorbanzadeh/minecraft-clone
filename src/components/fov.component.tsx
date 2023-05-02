import { PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useStore } from "../hooks/use-store.hook";

function FOV() {
  const { camera, gl } = useThree();
  const [toggleMenu] = useStore((state) => [state.toggleMenu]);
  return (
    <PointerLockControls
      args={[camera, gl.domElement]}
      onPointerOver={() => {
        console.log("pointer over");

        toggleMenu();
      }}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default FOV;
