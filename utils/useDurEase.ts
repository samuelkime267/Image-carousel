"use client";

import { useMemo } from "react";
import { useSelector } from "@/utils/useSelector";

export default function useDurEase() {
  const { animationFinished } = useSelector((state) => state.activeImg);

  const duration = useMemo(() => {
    if (animationFinished) return 1;
    return 1.5;
  }, [animationFinished]);

  const ease = useMemo(() => {
    const ease: gsap.EaseString = "power2.inOut";
    return ease;
  }, []);

  return { duration, ease };
}
