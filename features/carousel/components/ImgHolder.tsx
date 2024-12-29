"use client";

import { sections } from "@/data/sections.data";
import Img from "./Img";
import { useState, useEffect } from "react";

type ImgContainerType = {
  planeHeight: number;
  planeWidth: number;
  planeGap: number;
  activeWidth: number;
};

export default function ImgHolder({
  planeGap,
  planeHeight,
  planeWidth,
  activeWidth,
}: ImgContainerType) {
  const length = sections.length;
  const arrCenterLength = length - 1;
  const [activeImgIndex, setActiveImgIndex] = useState(
    arrCenterLength % 2 === 0
      ? arrCenterLength / 2
      : Math.floor(arrCenterLength / 2) + 1
  );
  const [activeGroup, setActiveGroup] = useState(0);
  const [iteration, setIteration] = useState({
    curIteration: 0,
    nextIteration: 1,
  });

  const calcGroupPosition = (groupNum: number) => {
    const groupWidth =
      planeWidth * (length - 1) + planeGap * length + activeWidth;

    if (groupNum === activeGroup) return iteration.curIteration * groupWidth;

    return groupWidth * iteration.nextIteration;
  };

  const calcGroupHolderPos = () => {
    // const groupWidth =
    // planeWidth * (length - 1) + planeGap * length + activeWidth;
    console.log({ activeGroup, activeImgIndex, length });
    return 0;
  };

  /*
  Todos
  - make sure each image has it's individual active state
  - make sure position of each group is correct depending on the active index ✅
  - make sure image moves to the center of the screen if active
  */

  return (
    <>
      <group position={[calcGroupHolderPos(), 0, 0]}>
        <group position={[calcGroupPosition(0), 0, 0]}>
          {sections.map(({ images }, i) => (
            <Img
              setIteration={setIteration}
              group={0}
              setActiveGroup={setActiveGroup}
              key={i}
              index={i}
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
              index={i}
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
      </group>
    </>
  );
}
