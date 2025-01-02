"use client";

import { useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";

type UseHandleImgHolderType = {
  planeWidth: number;
  planeGap: number;
  activeWidth: number;
};

export default function useHandleImgHolder(
  { activeWidth, planeGap, planeWidth }: UseHandleImgHolderType,
  centerImg: number,
  length: number
) {
  const { camera } = useThree();

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
    const isSameGroup = activeGroup.activeGroup === activeGroup.prevGroup;

    if (isSameGroup) {
      newCamPosX =
        cameraPosClone.x +
        ((planeWidth + planeGap) * activeImgIndex.activeImgIndex -
          activeImgIndex.prevActiveImgIndex);
    }
    if (!isSameGroup && iteration.curIteration > iteration.nextIteration) {
      // this is for forward movement when the active group changes

      const adjustedWidth = activeWidth - planeWidth;

      newCamPosX =
        cameraPosClone.x +
        adjustedWidth +
        (planeWidth + planeGap) *
          (activeImgIndex.activeImgIndex +
            length -
            activeImgIndex.prevActiveImgIndex);
    }
    if (!isSameGroup && iteration.curIteration < iteration.nextIteration) {
      // this is for backward movement when the active group changes

      const adjustedWidth = activeWidth - planeWidth;

      newCamPosX =
        cameraPosClone.x -
        (adjustedWidth +
          (planeWidth + planeGap) *
            (length -
              activeImgIndex.activeImgIndex +
              activeImgIndex.prevActiveImgIndex));
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

  return {
    activeImgIndex,
    setActiveImgIndex,
    activeGroup,
    setActiveGroup,
    iteration,
    setIteration,
    calcGroupPosition,
  };
}
