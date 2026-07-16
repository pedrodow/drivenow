"use client";

import { useInViewReveal } from "@/hooks/use-in-view-reveal";
import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
};

export function Reveal({ children, as: Tag = "div", className, delay = 0 }: RevealProps) {
  const { ref, state } = useInViewReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      data-reveal={state}
      className={cn(className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
