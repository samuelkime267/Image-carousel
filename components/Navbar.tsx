import Link from "next/link";
import React from "react";
import { navLinks } from "@/data/navLinks.data";
import TransitionLink from "./TransitionLink";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full p-4 flex items-center justify-between z-50 text-white mix-blend-difference">
      <TransitionLink
        className="uppercase font-philosopher text-xl relative"
        href="/"
      >
        vision in motion
      </TransitionLink>

      <div className="flex items-center justify-center gap-4">
        {navLinks.map(({ name, path }, i) => (
          <div
            key={i}
            className="flex items-start justify-start flex-col w-full group gap-[1px]"
          >
            <Link
              href={path}
              className="capitalize font-light leading-[1] text-sm"
            >
              {name}
            </Link>
            <div className="h-[1px] w-0 group-hover:w-full duration-300" />
          </div>
        ))}
      </div>
    </nav>
  );
}
