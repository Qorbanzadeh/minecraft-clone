import { NearestFilter, RepeatWrapping, TextureLoader } from "three";

import {
  dirtImage,
  glassImage,
  grassImage,
  logImage,
  woodImage,
} from "./index";

const dirtTexture = new TextureLoader().load(dirtImage);
const logTexture = new TextureLoader().load(logImage);
const grassTexture = new TextureLoader().load(grassImage);
const glassTexture = new TextureLoader().load(glassImage);
const woodTexture = new TextureLoader().load(woodImage);
const groundTexture = new TextureLoader().load(grassImage);

dirtTexture.magFilter = NearestFilter;
logTexture.magFilter = NearestFilter;
grassTexture.magFilter = NearestFilter;
glassTexture.magFilter = NearestFilter;
woodTexture.magFilter = NearestFilter;
groundTexture.magFilter = NearestFilter;
groundTexture.wrapS = RepeatWrapping;
groundTexture.wrapT = RepeatWrapping;

export {
  dirtTexture,
  logTexture,
  grassTexture,
  glassTexture,
  woodTexture,
  groundTexture,
};
