import { create } from "zustand";
import { nanoid } from "nanoid";
import { DEFAULT_CUBES } from "../constant";

export interface Cube {
  key: string;
  pos: [number, number, number];
  texture: string;
}

export interface Store {
  texture: string;
  cubes: Cube[];
  addCube: (x: number, y: number, z: number) => void;
  removeCube: (x: number, y: number, z: number) => void;
  setTexture: (texture: string) => void;
  saveWorld: () => void;
  resetWorld: () => void;
  isMenuVisible: boolean;
  toggleMenu: () => void;
}

const getLocalStorage = (key: string) =>
  JSON.parse(window.localStorage.getItem(key) || "[]");
const setLocalStorage = (key: string, value: Cube[]) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create<Store>((set) => ({
  texture: "dirt",
  cubes: getLocalStorage("cubes") || DEFAULT_CUBES,
  isMenuVisible: true,
  toggleMenu: () => {
    set((state) => ({ isMenuVisible: !state.isMenuVisible }));
  },
  addCube: (x, y, z) => {
    set((prev) => ({
      cubes: [
        ...prev.cubes,
        {
          key: nanoid(),
          pos: [x, y, z],
          texture: prev.texture,
        },
      ],
    }));
  },
  removeCube: (x, y, z) => {
    set((prev) => ({
      cubes: prev.cubes.filter((cube) => {
        const [X, Y, Z] = cube.pos;
        return X !== x || Y !== y || Z !== z;
      }),
    }));
  },
  setTexture: (texture) => {
    set(() => ({
      texture,
    }));
  },
  saveWorld: () => {
    set((prev) => {
      setLocalStorage("cubes", prev.cubes);
      return {
        ...prev,
      };
    });
  },
  resetWorld: () => {
    set(() => ({
      cubes: [],
    }));
  },
}));
