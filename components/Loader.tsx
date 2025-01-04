"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useDispatch } from "@/utils/useDispatch";
// import { useSelector } from "@/utils/useSelector";
import { setIsLoading } from "@/redux/loader/loader.slice";
import gsap from "gsap";
import { cn } from "@/utils/cn";

export default function Loader() {
  const { progress } = useProgress();
  // const [prevProgress, setPrevProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  // const { isLoading } = useSelector((state) => state.loader);

  useEffect(() => {
    if (!containerRef.current) return;
    const handleLoadingFinish = () => {
      console.log("loading finish");

      dispatch(setIsLoading(false));
    };

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const q = gsap.utils.selector(container);
      const counter = q(".counter");
      const scaleContainer = q(".scale-container");

      gsap.to(counter, {
        innerText: progress,
        snap: { innerText: 1 },
        onComplete() {
          if (progress === 100) {
            gsap.to(scaleContainer, {
              scale: 1,
              ease: "power1.inOut",
              onComplete() {
                gsap.to(container, {
                  opacity: 0,
                  onComplete: () => {
                    handleLoadingFinish();
                  },
                });
              },
            });
          }
        },
      });
    });
    return () => {
      ctx.revert();
    };
  }, [progress, dispatch]);

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

        <div className="mt-auto mr-auto p-4">
          <p className="text-7xl text-white counter">0</p>
        </div>

        {/* <div className="absolute top-1/2 -translate-y-1/2 left-0 w-0 h-0.5 bg-white z-[2]" /> */}
      </div>
    </div>
  );
}
