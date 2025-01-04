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

let isInitial = true;

export default function SectionName({
  index,
  img: { activeImgIndex, prevActiveImgIndex },
  name,
  animationFinished,
}: SectionNameProp) {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const isActive = index === activeImgIndex;
  const isPrev = index === prevActiveImgIndex;
  const isSame = index === activeImgIndex && index === prevActiveImgIndex;

  useEffect(() => {
    if (!headerRef.current || !animationFinished) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(headerRef.current);
      const titleChars = q(".header-chars");

      const showText: (isPrev?: boolean) => void = (isPrev) => {
        if (!isPrev) {
          gsap.to(titleChars, {
            y: 0,
            stagger: 0.04,
            ease: "power3.inOut",
            duration: 0.5,
          });
        } else {
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
      };

      if (isActive && isPrev) {
        if (isInitial) {
          showText();
        } else {
          gsap.set(titleChars, { y: 0 });
        }

        isInitial = false;
        return;
      }

      if (isActive) {
        showText();

        isInitial = false;
        return;
      }
      if (isPrev) {
        showText(isPrev);
        isInitial = false;
      }
    });

    return () => {
      ctx.revert();
    };
  }, [isActive, isPrev, animationFinished, isSame]);

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
