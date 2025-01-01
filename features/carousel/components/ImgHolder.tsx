"use client";

import { sections } from "@/data/sections.data";
import Img from "./Img";
import { useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";

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
  const { camera } = useThree();
  const length = sections.length;
  const arrCenterLength = length - 1;
  const centerImg =
    arrCenterLength % 2 === 0
      ? arrCenterLength / 2
      : Math.floor(arrCenterLength / 2) + 1;
  const [activeImgIndex, setActiveImgIndex] = useState({
    activeImgIndex: centerImg,
    prevActiveImgIndex: centerImg,
  });
  const [activeGroup, setActiveGroup] = useState({
    activeGroup: 0,
    prevGroup: 0,
  });
  const [iteration, setIteration] = useState({
    curIteration: 0,
    nextIteration: 1,
  });

  // This function calculates the position of the group
  // Animation is not needed for this since it's instant function works well
  const calcGroupPosition = (groupNum: number) => {
    const groupWidth =
      planeWidth * (length - 1) + planeGap * length + activeWidth;

    if (groupNum === activeGroup.activeGroup)
      return iteration.curIteration * groupWidth;

    return iteration.nextIteration * groupWidth;
  };

  //This effect positions the camera based on the active image
  useEffect(() => {
    if (camera.type !== "OrthographicCamera") return;
    const cameraPosClone = camera.position.clone();
    let newCamPosX = 0;
    console.log({
      activeGroup,
      activeImgIndex,
      length,
      centerImg,
      iteration,
    });
    const isSameGroup = activeGroup.activeGroup === activeGroup.prevGroup;

    if (isSameGroup) {
      newCamPosX =
        cameraPosClone.x +
        ((planeWidth + planeGap) * activeImgIndex.activeImgIndex -
          activeImgIndex.prevActiveImgIndex);
    }
    if (!isSameGroup && iteration.curIteration > iteration.nextIteration) {
      console.log("forward movement");
      newCamPosX =
        cameraPosClone.x +
        9.1 +
        ((planeWidth + planeGap) * activeImgIndex.activeImgIndex + 1) +
        (planeWidth + planeGap) *
          (length - activeImgIndex.prevActiveImgIndex - 1);
    }
    if (!isSameGroup && iteration.curIteration < iteration.nextIteration) {
      console.log("backward movement");
    }
    gsap.to(camera.position, { x: newCamPosX });
  }, [
    activeGroup,
    iteration,
    activeImgIndex,
    camera,
    planeGap,
    planeWidth,
    centerImg,
    length,
    activeWidth,
  ]);

  /*
  Todos
  - make sure each image has it's individual active state
  - make sure position of each group is correct depending on the active index ✅
  - make sure image moves to the center of the screen if active
  */

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
