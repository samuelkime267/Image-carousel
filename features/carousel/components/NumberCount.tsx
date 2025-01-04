"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import gsap from "gsap";

type NumberCountProps = {
  index: number;
  img: {
    activeImgIndex: number;
    prevActiveImgIndex: number;
  };
  animationFinished: boolean;
};

export default function NumberCount({
  index,
  img: { activeImgIndex, prevActiveImgIndex },
  animationFinished,
}: NumberCountProps) {
  const pRef = useRef<HTMLParagraphElement>(null);
  const isActive = index === activeImgIndex;
  const isPrev = index === prevActiveImgIndex;

  useEffect(() => {
    if (!pRef.current || !animationFinished) return;
    const ctx = gsap.context(() => {
      const pEl = pRef.current;

      if (isActive) {
        gsap.to(pEl, { y: 0, duration: 0.5 });
        return;
      }
      if (isPrev) {
        gsap.fromTo(pEl, { y: 0 }, { y: "-100%", duration: 0.5 });
      }
    });

    return () => {
      ctx.revert();
    };
  }, [isActive, isPrev, animationFinished]);

  return (
    <div className="absolute top-0 left-0 overflow-hidden">
      <p
        ref={pRef}
        className={cn("font-light text-xs text-neutral-600 translate-y-full")}
      >
        {index + 1 > 9 ? index + 1 : `0${index + 1}`}
      </p>
    </div>
  );
}