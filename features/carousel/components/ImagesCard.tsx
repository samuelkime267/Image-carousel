import React, { useEffect, useRef } from "react";
import { sections } from "@/data/sections.data";
import Image from "next/image";
import { TransitionLink } from "@/components";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import splitText from "@/utils/splitText";
import { useSelector } from "@/utils/useSelector";

export default function ImagesCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useSelector((state) => state.loader);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || isLoading) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef.current);
      const sectionLinks = q(".section-link");

      sectionLinks.forEach((link) => {
        const qLink = gsap.utils.selector(link);
        const sectionContainer = qLink(".section-container");
        const charTitle = qLink(".chars-title");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: link,
            start: "top +=85%",
            end: "bottom top",
            // markers: true,
            toggleActions: "play none none reverse",
          },
        });

        tl.to(sectionContainer, {
          y: 0,
          duration: 0.75,
          ease: "power1.inOut",
        }).to(charTitle, {
          y: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.04,
        });
      });
    });

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <div ref={containerRef} className="grid grid-cols-1 gap-4">
      {sections.map(({ images, name }, i) => (
        <TransitionLink
          key={i}
          href={`/category/${i}`}
          className="overflow-hidden section-link"
        >
          <div className="relative group overflow-hidden translate-y-full section-container">
            <Image
              src={images[0]}
              alt={name}
              width={1200}
              height={675}
              className="group-hover:scale-110 duration-300"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 p-2 flex items-start justify-end flex-col">
              <h4 className="text-white">
                {splitText({
                  text: name,
                  isWord: false,
                  className: "font-philosopher chars-title translate-y-full",
                  containerClass: "overflow-hidden",
                })}
              </h4>
            </div>
          </div>
        </TransitionLink>
      ))}
    </div>
  );
}
