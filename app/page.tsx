"use client";

import CanvasContainer from "@/features/carousel/components/CanvasContainer";
import CarouselText from "@/features/carousel/components/CarouselText";
import ImagesCard from "@/features/carousel/components/ImagesCard";
import useWindowSize from "@/utils/useWindowSize";

export default function Home() {
  const { width } = useWindowSize();

  if (width === 0) return;

  return (
    <main className="p-4 mt-16 pt-0">
      {width >= 768 ? (
        <>
          <CarouselText />
          <CanvasContainer />
        </>
      ) : (
        <>
          <ImagesCard />
        </>
      )}
    </main>
  );
}
