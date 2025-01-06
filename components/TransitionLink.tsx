"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import sleep from "@/utils/sleep";
import { useDispatch } from "@/utils/useDispatch";
import {
  setPageTransitionEnd,
  setPageTransitionStart,
} from "@/redux/loader/loader.slice";
import { webglPath } from "@/data/routes.data";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  callback?: () => Promise<void>;
  className?: string;
  endTransition?: boolean;
}

export default function TransitionLink({
  children,
  href,
  callback,
  endTransition,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (pathname === href) return;

    dispatch(setPageTransitionStart());
    await sleep(1000);

    router.push(href);
    if (callback) await callback();

    await sleep(1000);
    if (!webglPath.includes(href) || endTransition)
      dispatch(setPageTransitionEnd());
  };

  return (
    <Link href={href} onClick={handleTransition} {...props}>
      {children}
    </Link>
  );
}
