"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useDispatch } from "@/utils/useDispatch";
import { setIsLoading } from "@/redux/loader/loader.slice";
import gsap from "gsap";
import { cn } from "@/utils/cn";
import { useSelector } from "@/utils/useSelector";

export default function Loader() {
  const { progress, total } = useProgress();

  const { loadingType, showLoader } = useSelector((state) => state.loader);

  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!containerRef.current) return;
    const handleLoadingFinish = () => {
      dispatch(setIsLoading(false));
    };

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const q = gsap.utils.selector(container);
      const counter = q(".counter");
      const scaleContainer = q(".scale-container");

      const tl = gsap.timeline({ paused: true });
      tl.to(counter, {
        innerText: progress,
        snap: { innerText: 1 },
      })
        .to(scaleContainer, {
          scale: 1,
          duration: 1,
          ease: "power3.in",
        })
        .to(container, {
          opacity: 0,
          onComplete: () => {
            handleLoadingFinish();
          },
        });

      if (progress === 100) {
        tl.play();
        return;
      }
    });
    return () => {
      ctx.revert();
    };
  }, [progress, dispatch]);

  useEffect(() => {
    const pageContainer = document.getElementById("page-container");
    if (!containerRef.current || !pageContainer || loadingType === "initial")
      return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const q = gsap.utils.selector(container);
      const scaleContainer = q(".scale-container");

      const tl = gsap.timeline({ paused: true });
      tl.to(container, {
        opacity: 1,
      }).to(scaleContainer, {
        scale: 0,
        duration: 1,
        ease: "power3.in",
      });

      if (showLoader) tl.play();
      if (!showLoader) tl.reverse(0);
    });
    return () => {
      ctx.revert();
    };
  }, [loadingType, showLoader]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed top-0 left-0 w-full h-full z-[100] bg-black pointer-events-none"
      )}
    >
      <div className="relative w-full h-full flex items-center justify-center flex-col">
        <div className="scale-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white z-[2] scale-0 " />
        <div className="mt-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="logo-text font-philosopher text-3xl uppercase text-white text-nowrap text-center">
            Vision in motion
          </p>
        </div>

        <div
          className={cn("mt-auto mr-auto p-4 opacity-0", {
            "opacity-100": loadingType === "initial" && total > 0,
          })}
        >
          <p className="text-7xl text-white counter">0</p>
        </div>
      </div>
    </div>
  );
}
