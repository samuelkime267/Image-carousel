"use client";

import React from "react";

type ImagesGalleryProps = {
  images: string[];
  name: string;
};

export default function ImagesGallery({ images, name }: ImagesGalleryProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
      <div className="grid grid-cols-1 gap-4 h-fit">
        {images.slice(1).map((image, i) => {
          if (i % 2 === 0) return;
          return (
            <div key={i} className="bg-gray-400">
              <img src={image} alt={name} className="w-full h-auto" />
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-4 h-fit">
        {images.slice(1).map((image, i) => {
          if (i % 2 !== 0) return;
          return (
            <div key={i} className="bg-gray-400">
              <img src={image} alt={name} className="w-full h-auto" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
