import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { Ref, useEffect, useRef } from "react";
import { BufferGeometry, Material, Mesh, Vector3 } from "three";
import { useKeyboard } from "../hooks/use-controls.hook";

// constants
const JUMP_FORCE = 4;
const SPEED = 4;

const Player = () => {
  const { moveBackward, moveForward, moveRight, moveLeft, jump } =
    useKeyboard();
  // get the camera instance
  const { camera } = useThree();
  // `ref` is a reference to the sphere object
  // `api` is a set of methods for manipulating it.
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 2, 0],
  }));

  // creates a reference to the velocity of the sphere object
  // and sets up a subscription to updates to that value.
  const vel = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (vel.current = v));
  }, [api.velocity]);

  // creates a reference to the position of the sphere object
  // and sets up a subscription to updates to that value.
  const pos = useRef([0, 0, 0]);
  useEffect(() => {
    api.position.subscribe((p) => (pos.current = p));
  }, [api.position]);

  // called on each frame update
  useFrame(() => {
    // set the position of the camera to be equal to
    // the current position of the player (as stored in the pos ref).
    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1], pos.current[2])
    );

    const direction = new Vector3();
    // determine if the player is moving forward or backward
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );
    // determine if the player is moving left or right
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    // determine the player's movement direction and speed
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    // set the velocity of the player's sphere to match the movement direction and speed determined above
    api.velocity.set(
      direction.x,
      vel.current[1], // maintain the current velocity in the y-axis (i.e. the vertical direction)
      direction.z
    );

    if (jump && Math.abs(vel.current[1]) < 0.05) {
      api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
    }
  });

  return (
    <mesh ref={ref as Ref<Mesh<BufferGeometry, Material | Material[]>>}></mesh>
  );
};

export default Player;
