"use client";

import * as THREE from "three";
import React, { useEffect, useMemo, useRef } from "react";
import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";

type imgType = {
  img: string;
  width: number;
  height: number;
  imgIndex: number;
  gap: number;
  length: number;
  activeImgIndex: {
    activeImgIndex: number;
    prevActiveImgIndex: number;
  };
  activeWidth: number;
  setActiveImgIndex: React.Dispatch<
    React.SetStateAction<{
      activeImgIndex: number;
      prevActiveImgIndex: number;
    }>
  >;
  group: number;
  activeGroup: {
    activeGroup: number;
    prevGroup: number;
  };
  setActiveGroup: React.Dispatch<
    React.SetStateAction<{
      activeGroup: number;
      prevGroup: number;
    }>
  >;
  setIteration: React.Dispatch<
    React.SetStateAction<{
      curIteration: number;
      nextIteration: number;
    }>
  >;
};

export default function Img({
  height,
  img,
  width,
  gap,
  imgIndex,
  length,
  activeImgIndex,
  activeWidth,
  setActiveImgIndex,
  group,
  setActiveGroup,
  setIteration,
  activeGroup,
}: imgType) {
  const isActive = imgIndex === activeImgIndex.activeImgIndex;
  const centerImgIndex = Math.floor(length / 2);
  const shaderMaterial = useRef<THREE.ShaderMaterial>(null);
  const planeMesh = useRef<THREE.Mesh>(null);

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
  }, [isActive, activeWidth, width]);

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
  }, [height, width, isActive, activeWidth]);

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
    };

    return uniforms;
  }, [texture]);

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
  ]);

  return (
    <>
      <mesh
        ref={planeMesh}
        onClick={() => {
          const clickedGroup = group;
          setIteration((iteration) => {
            const isPosRight = imgIndex >= centerImgIndex;

            const curIteration =
              activeGroup.activeGroup === clickedGroup
                ? iteration.curIteration
                : iteration.nextIteration;

            const nextIteration =
              activeGroup.activeGroup === clickedGroup
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
        }}
        position={[0, 0, 0]}
      >
        <planeGeometry args={[1, height]} />
        <shaderMaterial
          ref={shaderMaterial}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
    </>
  );
}
