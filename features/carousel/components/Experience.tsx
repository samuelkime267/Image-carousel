"use client";

import { useControls } from "leva";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import ImgHolder from "./ImgHolder";

export default function Experience() {
  const { planeHeight, planeWidth, planeGap, activeWidth } = useControls({
    planeWidth: {
      value: 0.9,
      step: 0.01,
      min: 0.01,
      max: 10,
    },
    planeHeight: {
      value: 5.5,
      step: 0.01,
      min: 0.01,
      max: 10,
    },
    planeGap: {
      value: 0.1,
      step: 0.01,
      min: 0.01,
      max: 2,
    },
    activeWidth: {
      value: 10,
      step: 0.01,
      min: 0.01,
      max: 20,
    },
  });
  const camWidth = 16;
  const camHeight = 9;

  return (
    <>
      <OrthographicCamera
        makeDefault
        left={-camWidth / 2}
        right={camWidth / 2}
        top={camHeight / 2}
        bottom={-camHeight / 2}
        position={[0, 0, 1]}
      />

      <OrbitControls />

      <ImgHolder
        activeWidth={activeWidth}
        planeGap={planeGap}
        planeHeight={planeHeight}
        planeWidth={planeWidth}
      />
    </>
  );
}
