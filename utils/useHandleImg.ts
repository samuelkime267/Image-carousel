"use client";

import * as THREE from "three";
import { useEffect, useMemo, useState } from "react";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";
import { imgType } from "@/typings";
import { useDispatch } from "@/utils/useDispatch";
import { useSelector } from "@/utils/useSelector";
import {
  setImg,
  setGroup,
  setIteration,
  setAnimationFinished,
} from "@/redux/activeImg/activeImg.slice";
import { resetActiveImgAction } from "@/redux/activeImg/activeImg.action";
import useDurEase from "./useDurEase";
import { useRouter } from "next/navigation";
import {
  setPageTransitionStart,
  setPageTransitionEnd,
} from "@/redux/loader/loader.slice";
import sleep from "./sleep";

export default function useHandleImg(
  { activeWidth, gap, group, height, img, imgIndex, width }: imgType,
  shaderMaterial: React.RefObject<THREE.ShaderMaterial | null>,
  planeMesh: React.RefObject<THREE.Mesh | null>
) {
  const {
    img: { activeImgIndex },
    centerImg,
    group: stateGroup,
    iteration,
    animationFinished,
  } = useSelector((state) => state.activeImg);

  const dispatch = useDispatch();
  const isActive = imgIndex === activeImgIndex;
  const { duration, ease } = useDurEase();
  const [isHovered, setIsHovered] = useState(false);
  const { isLoading } = useSelector((state) => state.loader);

  // This effect updates the plane width
  useEffect(() => {
    if (!planeMesh.current) return;
    if (isLoading) return;
    if (isActive) {
      gsap.to(planeMesh.current.scale, {
        x: activeWidth,
        duration,
        ease,
      });
    } else {
      gsap.to(planeMesh.current.scale, {
        x: width,
        duration,
        ease,
      });
    }
  }, [isActive, activeWidth, width, planeMesh, duration, ease, isLoading]);

  // This effect updates the plane resolution in the shader
  useEffect(() => {
    if (!shaderMaterial.current) return;

    if (isLoading) return;
    if (isActive) {
      gsap.to(shaderMaterial.current.uniforms.uRes.value, {
        x: activeWidth,
        y: height,
        duration,
        ease,
      });
    } else {
      gsap.to(shaderMaterial.current.uniforms.uRes.value, {
        x: width,
        y: height,
        duration,
        ease,
      });
    }
  }, [
    height,
    width,
    isActive,
    activeWidth,
    shaderMaterial,
    duration,
    ease,
    isLoading,
  ]);

  // This effect updates the plane position
  useEffect(() => {
    if (!planeMesh.current) return;

    const distanceToFirstImg = activeWidth / 2 + width / 2 + gap;
    let position = 0;

    if (isActive) {
      if (activeImgIndex === centerImg) {
        position = 0;
      }
      if (activeImgIndex > centerImg) {
        position = (width + gap) * (imgIndex - centerImg);
      } else {
        position = -(width + gap) * (centerImg - imgIndex);
      }
    }

    // // order: 3d, sports, architecture, animals, fashion, food, nature
    if (activeImgIndex > imgIndex) {
      position = -(
        distanceToFirstImg -
        (width + gap) * (imgIndex - centerImg + 1)
      );
    }
    if (activeImgIndex < imgIndex) {
      position =
        distanceToFirstImg + (width + gap) * (imgIndex - centerImg - 1);
    }

    if (isLoading) return;

    gsap.to(planeMesh.current.position, {
      x: position,
      duration,
      ease,
      onComplete() {
        if (!animationFinished) dispatch(setAnimationFinished(true));
      },
    });
  }, [
    activeImgIndex,
    activeWidth,
    centerImg,
    gap,
    imgIndex,
    isActive,
    width,
    planeMesh,
    duration,
    dispatch,
    animationFinished,
    ease,
    isLoading,
  ]);

  // This effect updates the image saturation
  useEffect(() => {
    if (!shaderMaterial.current) return;

    if (isHovered) {
      gsap.to(shaderMaterial.current.uniforms.uScale, {
        value: 0.95,
        duration: 0.3,
      });
    } else {
      gsap.to(shaderMaterial.current.uniforms.uScale, {
        value: 1,
        duration: 0.3,
      });
    }

    if (isActive) {
      gsap.to(shaderMaterial.current.uniforms.uProgress, { value: 1 });
      return;
    } else {
      gsap.to(shaderMaterial.current.uniforms.uProgress, { value: 0 });
    }

    if (isHovered) {
      gsap.to(shaderMaterial.current.uniforms.uProgress, { value: 1 });
    } else {
      gsap.to(shaderMaterial.current.uniforms.uProgress, { value: 0 });
    }
  }, [shaderMaterial, isActive, isHovered]);

  const texture = useTexture(img);

  const uniforms = useMemo(() => {
    const uniforms = {
      uRes: { value: new THREE.Vector2(width, height) },
      uImgRes: {
        value: new THREE.Vector2(
          texture.source.data.width,
          texture.source.data.height
        ),
      },
      uTexture: { value: texture },
      uProgress: { value: 0 },
      uScale: { value: 1 },
    };

    return uniforms;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texture]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const router = useRouter();

  const handleMeshClick = async () => {
    if (!animationFinished) return;
    const clickedGroup = group;
    const isCenter = imgIndex === centerImg;
    const isPosRight = imgIndex > centerImg;
    const isCurrentGroup = clickedGroup === stateGroup.activeGroup;

    if (activeImgIndex === imgIndex) {
      dispatch(setPageTransitionStart());
      await sleep(1500);
      dispatch(resetActiveImgAction());
      router.push(`/category/${imgIndex}`);
      await sleep(1500);
      dispatch(setPageTransitionEnd());
      return;
    }

    if (!isCenter) {
      const curIteration = isCurrentGroup
        ? iteration.curIteration
        : iteration.nextIteration;
      const nextIteration = isCurrentGroup
        ? iteration.curIteration
        : iteration.nextIteration;
      const nextIterationFinal = isPosRight
        ? nextIteration + 1
        : nextIteration - 1;

      dispatch(
        setIteration({ curIteration, nextIteration: nextIterationFinal })
      );
    }

    dispatch(
      setGroup({ activeGroup: group, prevGroup: stateGroup.activeGroup })
    );
    dispatch(
      setImg({ activeImgIndex: imgIndex, prevActiveImgIndex: activeImgIndex })
    );
  };

  return { uniforms, handleMeshClick, handleMouseEnter, handleMouseLeave };
}
