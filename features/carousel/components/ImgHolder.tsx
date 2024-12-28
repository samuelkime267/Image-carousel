"use client";

import { sections } from "@/data/sections.data";
import Img from "./Img";
import { useState } from "react";

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

  return (
    <>
      {/* <group position={[planeWidth * length + planeGap * length, 0, 0]}>
        {sections.map(({ images }, i) => (
          <Img
            key={i}
            index={i}
            length={length}
            gap={planeGap}
            height={planeHeight}
            img={images[0]}
            width={planeWidth}
          />
        ))}
      </group> */}
      <group position={[0, 0, 0]}>
        {sections.map(({ images }, i) => (
          <Img
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
          />
        ))}
      </group>
      {/* <group position={[-(planeWidth * length + planeGap * length), 0, 0]}>
        {sections.map(({ images }, i) => (
          <Img
            key={i}
            index={i}
            length={length}
            gap={planeGap}
            height={planeHeight}
            img={images[0]}
            width={planeWidth}
          />
        ))}
      </group> */}
    </>
  );
}
