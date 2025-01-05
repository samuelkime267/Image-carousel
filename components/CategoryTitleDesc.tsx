"use client";

import { useEffect, useRef } from "react";
import splitText from "@/utils/splitText";
import React from "react";
import gsap from "gsap";
import { useSelector } from "@/utils/useSelector";

type CategoryTitleDescProp = {
  name: string;
  description: string;
};

export default function CategoryTitleDesc({
  description,
  name,
}: CategoryTitleDescProp) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useSelector((state) => state.loader);

  useEffect(() => {
    if (!containerRef.current || isLoading) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef.current);
      const charTitle = q(".chars-title");
      const descWords = q(".words-desc");
      const tl = gsap.timeline();
      tl.to(charTitle, {
        y: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.04,
      }).to(
        descWords,
        {
          y: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.03,
        },
        "-=1"
      );
    });

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <div
      ref={containerRef}
      className="p-4 absolute top-0 left-0 w-full h-full flex flex-col justify-end items-start bg-black/50"
    >
      <h1 className="mb-2 text-white uppercase">
        {splitText({
          text: name,
          isWord: false,
          className: "font-philosopher chars-title translate-y-full",
          containerClass: "overflow-hidden",
        })}
      </h1>
      <p className="w-full text-white font-light max-w-[600px] leading-[1]">
        {splitText({
          text: description,
          className: "translate-y-full words-desc",
          containerClass: "overflow-hidden",
        })}
      </p>
    </div>
  );
}
