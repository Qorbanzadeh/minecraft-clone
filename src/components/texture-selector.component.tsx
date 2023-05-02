import { useEffect, useState } from "react";
import { useStore } from "../hooks/use-store.hook";
import { useKeyboard } from "../hooks/use-controls.hook";
import {
  dirtImage,
  grassImage,
  glassImage,
  logImage,
  woodImage,
} from "../assets/index";

const images = {
  dirt: dirtImage,
  grass: grassImage,
  glass: glassImage,
  wood: woodImage,
  log: logImage,
};

export const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);
  const { dirt, grass, glass, wood, log } = useKeyboard();

  useEffect(() => {
    const textures = {
      dirt,
      grass,
      glass,
      wood,
      log,
    };
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    if (pressedTexture) {
      setTexture(pressedTexture[0]);
    }
  }, [setTexture, dirt, grass, glass, wood, log]);

  useEffect(() => {
    setVisible(true);
  }, [activeTexture]);

  return visible ? (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 bottom-20 left-1/2 scale-[5] flex justify-center items-center">
      {Object.entries(images).map(([k, src], i) => {
        return (
          <div className="relative">
            <img
              key={k}
              src={src}
              alt={k}
              className={`${
                k === activeTexture
                  ? "border-2 divide-solid border-neutral-100 border-opacity-50"
                  : ""
              }`}
            />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 text-[0.3rem] text-neutral-950 font-bold">
              {i + 1}
            </span>
          </div>
        );
      })}
    </div>
  ) : (
    <div></div>
  );
};
