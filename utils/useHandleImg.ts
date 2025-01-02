"use client";

import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";
import { imgType } from "@/typings";

export default function useHandleImg(
  {
    activeGroup,
    activeImgIndex,
    activeWidth,
    gap,
    group,
    height,
    img,
    imgIndex,
    length,
    setActiveGroup,
    setActiveImgIndex,
    setIteration,
    width,
  }: imgType,
  shaderMaterial: React.RefObject<THREE.ShaderMaterial | null>,
  planeMesh: React.RefObject<THREE.Mesh | null>
) {
  const isActive = imgIndex === activeImgIndex.activeImgIndex;
  const centerImgIndex = Math.floor(length / 2);

  // This effect updates the plane width
  useEffect(() => {
    if (!planeMesh.current) return;
    if (isActive) {
      gsap.to(planeMesh.current.scale, {
        x: activeWidth,
      });
    } else {
      gsap.to(planeMesh.current.scale, {
        x: width,
      });
    }
  }, [isActive, activeWidth, width, planeMesh]);

  // This effect updates the plane resolution in the shader
  useEffect(() => {
    if (!shaderMaterial.current) return;

    if (isActive) {
      gsap.to(shaderMaterial.current.uniforms.uRes.value, {
        x: activeWidth,
        y: height,
      });
    } else {
      gsap.to(shaderMaterial.current.uniforms.uRes.value, {
        x: width,
        y: height,
      });
    }
  }, [height, width, isActive, activeWidth, shaderMaterial]);

  // This effect updates the plane position
  useEffect(() => {
    if (!planeMesh.current) return;

    const distanceToFirstImg = activeWidth / 2 + width / 2 + gap;
    let position = 0;

    if (isActive) {
      if (activeImgIndex.activeImgIndex === centerImgIndex) {
        position = 0;
      }
      if (activeImgIndex.activeImgIndex > centerImgIndex) {
        position = (width + gap) * (imgIndex - centerImgIndex);
      } else {
        position = -(width + gap) * (centerImgIndex - imgIndex);
      }
    }

    // // order: 3d, sports, architecture, animals, fashion, food, nature
    if (activeImgIndex.activeImgIndex > imgIndex) {
      position = -(
        distanceToFirstImg -
        (width + gap) * (imgIndex - centerImgIndex + 1)
      );
    }
    if (activeImgIndex.activeImgIndex < imgIndex) {
      position =
        distanceToFirstImg + (width + gap) * (imgIndex - centerImgIndex - 1);
    }

    gsap.to(planeMesh.current.position, { x: position });
  }, [
    activeImgIndex,
    activeWidth,
    centerImgIndex,
    gap,
    imgIndex,
    isActive,
    width,
    planeMesh,
  ]);

  // This effect updates the image saturation
  useEffect(() => {
    if (!shaderMaterial.current) return;

    if (isActive) {
      gsap.to(shaderMaterial.current.uniforms.uProgress, { value: 1 });
    } else {
      gsap.to(shaderMaterial.current.uniforms.uProgress, { value: 0 });
    }
  }, [shaderMaterial, isActive]);

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
    };

    return uniforms;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texture]);

  const handleMeshClick = () => {
    const clickedGroup = group;
    setIteration((iteration) => {
      const isCenter = imgIndex === centerImgIndex;
      const isPosRight = imgIndex > centerImgIndex;
      const isCurrentGroup = clickedGroup === activeGroup.activeGroup;

      if (isCenter) return iteration;

      const curIteration = isCurrentGroup
        ? iteration.curIteration
        : iteration.nextIteration;

      const nextIteration = isCurrentGroup
        ? iteration.curIteration
        : iteration.nextIteration;

      return {
        curIteration,
        nextIteration: isPosRight ? nextIteration + 1 : nextIteration - 1,
      };
    });
    setActiveGroup((prev) => ({
      activeGroup: group,
      prevGroup: prev.activeGroup,
    }));
    setActiveImgIndex((prev) => ({
      activeImgIndex: imgIndex,
      prevActiveImgIndex: prev.activeImgIndex,
    }));
  };

  return { uniforms, handleMeshClick };
}
