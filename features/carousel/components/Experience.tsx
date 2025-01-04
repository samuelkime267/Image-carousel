"use client";

import { useControls } from "leva";

import { sections } from "@/data/sections.data";
import Img from "./Img";
import useHandleImgHolder from "@/utils/useHandleImgHolder";

export default function Experience() {
  const { planeHeight, planeWidth, planeGap, activeWidth } = useControls({
    planeWidth: {
      value: 0.9,
      step: 0.01,
      min: 0.01,
      max: 10,
    },
    planeHeight: {
      value: 5.63,
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

  const { calcGroupPosition } = useHandleImgHolder({
    activeWidth,
    planeGap,
    planeWidth,
  });

  return (
    <>
      <group position={[calcGroupPosition(0), 0, 0]}>
        {sections.map(({ images }, i) => (
          <Img
            group={0}
            key={i}
            imgIndex={i}
            gap={planeGap}
            height={planeHeight}
            img={images[0]}
            width={planeWidth}
            activeWidth={activeWidth}
          />
        ))}
      </group>
      <group position={[calcGroupPosition(1), 0, 0]}>
        {sections.map(({ images }, i) => (
          <Img
            group={1}
            key={i}
            imgIndex={i}
            gap={planeGap}
            height={planeHeight}
            img={images[0]}
            width={planeWidth}
            activeWidth={activeWidth}
          />
        ))}
      </group>
    </>
  );
}
