import { useStore } from "../hooks/use-store.hook";
import MenuButton from "./menu-button.component";
import { pauseImage } from "../assets";
import { DEFAULT_CUBES } from "../constant";
import KeyBindings from "./key-bindings.component";

export const Menu = () => {
  const [saveWorld, resetWorld, cubes, toggleMenu, isMenuVisible] = useStore(
    (state) => [
      state.saveWorld,
      state.resetWorld,
      state.cubes,
      state.toggleMenu,
      state.isMenuVisible,
    ]
  );

  const cubesExist = cubes.length > 0 && cubes.length !== DEFAULT_CUBES.length;

  const buttonVisibility = !cubesExist || !isMenuVisible;

  return isMenuVisible ? (
    <div
      className={`absolute w-full h-full bg-opacity-50 -translate-x-1/2 -translate-y-1/2 bg-neutral-950 rounded-md top-1/2 left-1/2 flex flex-col items-center justify-center transition-all duration-300 ease-linear z-[1000] gap-2`}
    >
      <h1 className="absolute text-4xl font-bold text-neutral-100 top-5">
        Minecraft Clone
      </h1>
      <MenuButton onClick={toggleMenu} disabled={!isMenuVisible}>
        {cubesExist ? "Continue" : "Start"}
      </MenuButton>
      <MenuButton disabled={buttonVisibility} onClick={saveWorld}>
        Save
      </MenuButton>
      <MenuButton disabled={buttonVisibility} onClick={resetWorld}>
        Reset
      </MenuButton>
    </div>
  ) : (
    <div
      className="absolute top-0 right-0 flex flex-col items-end justify-center gap-2 p-4 text-4xl"
      onClick={toggleMenu}
    >
      <img src={pauseImage} alt="pause" className="w-10 h-10 cursor-pointer" />
      <KeyBindings />
    </div>
  );
};
