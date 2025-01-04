"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import splitText from "@/utils/splitText";
import gsap from "gsap";

type SectionNameProp = {
  index: number;
  name: string;
  img: {
    activeImgIndex: number;
    prevActiveImgIndex: number;
  };
  animationFinished: boolean;
};

export default function SectionName({
  index,
  img: { activeImgIndex, prevActiveImgIndex },
  name,
  animationFinished,
}: SectionNameProp) {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const isActive = index === activeImgIndex;
  const isPrev = index === prevActiveImgIndex;

  useEffect(() => {
    if (!headerRef.current || !animationFinished) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(headerRef.current);
      const titleChars = q(".header-chars");

      if (isActive) {
        gsap.to(titleChars, {
          y: 0,
          stagger: 0.04,
          ease: "power3.inOut",
          duration: 0.5,
        });
        return;
      }
      if (isPrev) {
        gsap.fromTo(
          titleChars,
          { y: 0 },
          {
            y: "-100%",
            stagger: 0.04,
            ease: "power3.inOut",
            duration: 0.5,
          }
        );
      }
    });

    return () => {
      ctx.revert();
    };
  }, [isActive, isPrev, animationFinished]);

  return (
    <div className="absolute top-0 left-0 overflow-hidden">
      <h2 ref={headerRef} className={cn("text-nowrap inline-block")}>
        {splitText({
          text: name,
          className: "font-philosopher header-chars translate-y-full",
          containerClass: "overflow-hidden",
          isWord: false,
        })}
      </h2>
    </div>
  );
}
