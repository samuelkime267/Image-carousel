"use client";

import { sections } from "@/data/sections.data";
import { useSelector } from "@/utils/useSelector";
import NumberCount from "./NumberCount";
import SectionName from "./SectionName";

export default function CarouselText() {
  const { img, animationFinished } = useSelector((state) => state.activeImg);

  return (
    <section className="fixed top-[81.3%] left-[18.75%] p-2 flex items-start justify-start gap-4">
      <div className="relative">
        {sections.map((_, i) => (
          <NumberCount
            key={i}
            index={i}
            img={img}
            animationFinished={animationFinished}
          />
        ))}
      </div>
      <div className="relative">
        {sections.map((section, i) => (
          <SectionName
            key={i}
            index={i}
            img={img}
            animationFinished={animationFinished}
            name={section.name}
          />
        ))}
      </div>
    </section>
  );
}
