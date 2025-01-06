"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import useWindowSize from "@/utils/useWindowSize";

export default function Footer() {
  const pathname = usePathname();
  const { width } = useWindowSize();

  return (
    <footer
      className={cn("w-full p-4 flex items-center justify-between", {
        "fixed bottom-0 left-0": pathname === "/" && width >= 768,
      })}
    >
      <div className="flex items-start justify-start flex-col group gap-[1px]">
        <Link
          href={"https://www.linkedin.com/in/samuelkime"}
          target="_blank"
          className="text-xs capitalize font-light leading-[1]"
        >
          Made by Samuel Kime
        </Link>
        <div className="h-[1px] w-0 group-hover:w-full duration-300 bg-neutral-600" />
      </div>

      <p className="text-xs capitalize font-light">
        ©{new Date().getFullYear()}
      </p>
    </footer>
  );
}
