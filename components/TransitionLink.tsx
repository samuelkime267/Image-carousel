import React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import sleep from "@/utils/sleep";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  callback?: () => void;
  runBefore?: boolean;
}

export default function TransitionLink({
  children,
  href,
  callback,
  runBefore,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    // run exit animation here
    await sleep(1000);

    if (runBefore && callback) callback();
    router.push(href);
    if (!runBefore && callback) callback();

    // run entry animation here
    await sleep(1000);
  };

  return (
    <Link href={href} onClick={handleTransition} {...props}>
      {children}
    </Link>
  );
}
