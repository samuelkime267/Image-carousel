"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

type ImagesGalleryProps = {
  images: string[];
  name: string;
};

export default function ImagesGallery({ images, name }: ImagesGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const clippedImgs = gsap.utils.selector(sectionRef.current)(".clip-me");

      clippedImgs.forEach((clippedImg) => {
        gsap.to(clippedImg, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.25,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: clippedImg,
            start: "top +=75%",
            end: "bottom bottom",
            toggleActions: "play none none reverse",
            // markers: true,
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={sectionRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4"
    >
      <div className="grid grid-cols-1 gap-4 h-fit">
        {images.slice(1).map((image, i) => {
          if (i % 2 === 0) return;
          return (
            <div key={i} className="clip-me">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover bg-gray-400"
              />
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-4 h-fit">
        {images.slice(1).map((image, i) => {
          if (i % 2 !== 0) return;
          return (
            <div key={i} className="clip-me">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover bg-gray-400"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
