import { useStore } from "../hooks/use-store.hook";
import { Cube } from "./cube.component";
const Cubes = () => {
  const [cubes] = useStore((state) => [state.cubes]);
  return (
    <>
      {cubes.map(({ key, pos, texture }) => {
        return <Cube key={key} position={pos} texture={texture} />;
      })}
    </>
  );
};

export default Cubes;
