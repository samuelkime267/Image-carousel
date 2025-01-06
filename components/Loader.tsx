"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useDispatch } from "@/utils/useDispatch";
import { setIsLoading, setShowLoader } from "@/redux/loader/loader.slice";
import gsap from "gsap";
import { cn } from "@/utils/cn";
import { useSelector } from "@/utils/useSelector";
import { usePathname } from "next/navigation";
import { webglPath } from "@/data/routes.data";
import useWindowSize from "@/utils/useWindowSize";

let isInitial = true;

export default function Loader() {
  const pathname = usePathname();
  const { width } = useWindowSize();
  const { progress, total } = useProgress();

  const { showLoader } = useSelector((state) => state.loader);

  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  // this handles showing and hiding the loader
  useEffect(() => {
    const pageContainer = document.getElementById("page-container");
    if (!containerRef.current || !pageContainer || isInitial) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const q = gsap.utils.selector(container);
      const scaleContainer = q(".scale-container");

      if (showLoader) {
        const tl = gsap.timeline();
        tl.fromTo(
          container,
          {
            opacity: 0,
          },
          {
            opacity: 1,
          }
        ).fromTo(
          scaleContainer,
          {
            scale: 1,
          },
          {
            scale: 0,
            duration: 0.7,
            ease: "power3.in",
            onStart: () => {
              dispatch(setIsLoading(true));
            },
          }
        );
        return;
      }
      if (!showLoader) {
        const tl = gsap.timeline();
        tl.fromTo(
          scaleContainer,
          {
            scale: 0,
          },
          {
            scale: 1,
            duration: 0.7,
            ease: "power3.in",
          }
        ).fromTo(
          container,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            onComplete: () => {
              dispatch(setIsLoading(false));
            },
          }
        );
      }
    });

    return () => {
      ctx.revert();
    };
  }, [showLoader, dispatch]);

  // handles initial load if three js is used
  useEffect(() => {
    const isWebgl = webglPath.includes(pathname);

    if (!containerRef.current || !isWebgl) return;
    const handleLoadingFinish = () => {
      isInitial = false;
      dispatch(setShowLoader(false));
    };

    const ctx = gsap.context(() => {
      if (progress === 100) {
        const counter = gsap.utils.selector(containerRef.current)(".counter");
        const tl = gsap.timeline();

        tl.to(counter, { opacity: 1 })
          .to(counter, {
            innerText: progress,
            snap: { innerText: 1 },
          })
          .to(counter, {
            opacity: 0,
            onComplete: handleLoadingFinish,
          });
      }
    });

    return () => ctx.revert();
  }, [progress, dispatch, total, pathname]);

  // handles initial load if no three js is used
  useEffect(() => {
    const isWebgl = webglPath.includes(pathname);

    if (pathname === "/" && width < 768 && width !== 0) {
      isInitial = false;
      dispatch(setShowLoader(false));
      return;
    }

    if (isInitial && !isWebgl) {
      const timeout = setTimeout(() => {
        isInitial = false;
        dispatch(setShowLoader(false));
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [pathname, dispatch, width]);

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
          <p className="logo-text font-philosopher text-3xl uppercase text-white text-nowrap text-center animate-pulse">
            Vision in motion
          </p>
        </div>

        <p
          className={cn(
            "mt-auto mr-auto p-4 opacity-0 text-7xl text-white counter",
            { "opacity-100": isInitial && total > 0 }
          )}
        >
          0
        </p>
      </div>
    </div>
  );
}
