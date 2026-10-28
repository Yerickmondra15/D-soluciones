"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({ children, className, index = 0, as = "div", image = false }: {
  children: ReactNode;
  className?: string;
  index?: number;
  as?: "article" | "div";
  image?: boolean;
}) {
  const ref = useRef<HTMLElement & HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: .12 });
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const Component = as === "article" ? motion.article : motion.div;
  return <Component ref={ref} className={className} initial={false}
    animate={ready && visible && !reduced
      ? { opacity: [.75, 1], y: [14, 0], clipPath: image ? ["inset(0 0 6% 0)", "inset(0 0 0% 0)"] : undefined }
      : { opacity: 1, y: 0, clipPath: image ? "inset(0 0 0% 0)" : undefined }}
    transition={{ duration: reduced ? 0 : .52, ease: [.22, 1, .36, 1], delay: reduced ? 0 : Math.min(index, 3) * .07 }}>
    {children}
  </Component>;
}
