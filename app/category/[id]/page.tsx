import React from "react";
import { sections } from "@/data/sections.data";
import Image from "next/image";
import CategoryTitleDesc from "@/components/CategoryTitleDesc";
import ImagesGallery from "@/components/ImagesGallery";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const section = sections[Number(id)];

  if (!section) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1>Category not found</h1>
      </div>
    );
  }

  return (
    <main>
      <section className="w-full h-screen mb-4 relative">
        <Image
          src={section.images[0]}
          alt={section.name}
          width={1200}
          height={720}
          className="w-full h-full object-cover"
        />

        <CategoryTitleDesc {...section} />
      </section>

      <ImagesGallery {...section} />
    </main>
  );
}
