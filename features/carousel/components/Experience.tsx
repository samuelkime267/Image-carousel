"use client";

import { useControls } from "leva";

import { sections } from "@/data/sections.data";
import Img from "./Img";
import useHandleImgHolder from "@/utils/useHandleImgHolder";
import { useMemo } from "react";

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

  const { centerImg, length } = useMemo(() => {
    const length = sections.length;
    const arrCenterLength = length - 1;
    const centerImg =
      arrCenterLength % 2 === 0
        ? arrCenterLength / 2
        : Math.floor(arrCenterLength / 2) + 1;

    return { length, centerImg };
  }, []);

  const {
    activeGroup,
    activeImgIndex,
    calcGroupPosition,
    setActiveGroup,
    setActiveImgIndex,
    setIteration,
  } = useHandleImgHolder(
    { activeWidth, planeGap, planeWidth },
    centerImg,
    length
  );

  return (
    <>
      <group position={[calcGroupPosition(0), 0, 0]}>
        {sections.map(({ images }, i) => (
          <Img
            setIteration={setIteration}
            group={0}
            setActiveGroup={setActiveGroup}
            key={i}
            imgIndex={i}
            length={length}
            gap={planeGap}
            height={planeHeight}
            img={images[0]}
            width={planeWidth}
            activeImgIndex={activeImgIndex}
            activeWidth={activeWidth}
            setActiveImgIndex={setActiveImgIndex}
            activeGroup={activeGroup}
          />
        ))}
      </group>
      <group position={[calcGroupPosition(1), 0, 0]}>
        {sections.map(({ images }, i) => (
          <Img
            setIteration={setIteration}
            setActiveGroup={setActiveGroup}
            group={1}
            key={i}
            imgIndex={i}
            length={length}
            gap={planeGap}
            height={planeHeight}
            img={images[0]}
            width={planeWidth}
            activeImgIndex={activeImgIndex}
            activeWidth={activeWidth}
            setActiveImgIndex={setActiveImgIndex}
            activeGroup={activeGroup}
          />
        ))}
      </group>
    </>
  );
}
