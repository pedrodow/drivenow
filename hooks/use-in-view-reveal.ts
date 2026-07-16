"use client";

import { useEffect, useRef, useState } from "react";

type RevealState = "pending" | "visible" | undefined;

/**
 * Progressive-enhancement scroll reveal. Content is visible by default
 * (no JS, failed hydration, or a crawler all just see the final state).
 * Only once mounted do we check whether the element starts off-screen;
 * if so we hide it and fade it back in on intersection. Elements already
 * in the initial viewport are never hidden, avoiding a flash of invisible
 * above-the-fold content.
 */
export function useInViewReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [state, setState] = useState<RevealState>(undefined);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyInView) {
      return;
    }

    setState("pending");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, state };
}
