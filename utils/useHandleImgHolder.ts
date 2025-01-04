"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useSelector } from "./useSelector";
import useDurEase from "./useDurEase";

type UseHandleImgHolderType = {
  planeWidth: number;
  planeGap: number;
  activeWidth: number;
};

export default function useHandleImgHolder({
  activeWidth,
  planeGap,
  planeWidth,
}: UseHandleImgHolderType) {
  const { camera } = useThree();

  const { centerImg, length, group, img, iteration } = useSelector(
    (state) => state.activeImg
  );

  const { duration, ease } = useDurEase();

  // This function calculates the position of the group
  // Animation is not needed for this since it's instant function works well
  const calcGroupPosition = (groupNum: number) => {
    const groupWidth =
      planeWidth * (length - 1) + planeGap * length + activeWidth;

    if (groupNum === group.activeGroup)
      return iteration.curIteration * groupWidth;

    return iteration.nextIteration * groupWidth;
  };

  //This effect positions the camera based on the active image
  useEffect(() => {
    if (camera.type !== "OrthographicCamera") return;
    const cameraPosClone = camera.position.clone();
    let newCamPosX = 0;
    const isSameGroup = group.activeGroup === group.prevGroup;

    if (isSameGroup) {
      newCamPosX =
        cameraPosClone.x +
        ((planeWidth + planeGap) * img.activeImgIndex - img.prevActiveImgIndex);
    }
    if (!isSameGroup && iteration.curIteration > iteration.nextIteration) {
      // this is for forward movement when the active group changes

      const adjustedWidth = activeWidth - planeWidth;

      newCamPosX =
        cameraPosClone.x +
        adjustedWidth +
        (planeWidth + planeGap) *
          (img.activeImgIndex + length - img.prevActiveImgIndex);
    }
    if (!isSameGroup && iteration.curIteration < iteration.nextIteration) {
      // this is for backward movement when the active group changes

      const adjustedWidth = activeWidth - planeWidth;

      newCamPosX =
        cameraPosClone.x -
        (adjustedWidth +
          (planeWidth + planeGap) *
            (length - img.activeImgIndex + img.prevActiveImgIndex));
    }

    gsap.to(camera.position, { x: newCamPosX, duration, ease });
  }, [
    group,
    img,
    iteration,
    camera,
    planeGap,
    planeWidth,
    centerImg,
    length,
    activeWidth,
    duration,
    ease,
  ]);

  return {
    iteration,
    calcGroupPosition,
  };
}
