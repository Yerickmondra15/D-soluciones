"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { prefersLightweightEffects } from "@/lib/motion";

const STILL = "M0 58 C240 7 430 96 720 56 C1020 12 1210 90 1440 49 L1440 100 L0 100Z";
const HIGH = "M0 25 C240 63 430 0 720 24 C1020 63 1210 0 1440 20 L1440 100 L0 100Z";

export function ScrollWaterTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [lightweight, setLightweight] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "end 12%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: .45 });
  const path = useTransform(progress, [0, 1], [STILL, HIGH]);
  const y = useTransform(progress, [0, 1], [10, -14]);
  const x = useTransform(progress, [0, 1], [0, -34]);
  const shine = useTransform(progress, [0, 1], [.18, .6]);
  const still = reduced || lightweight;

  useEffect(() => setLightweight(prefersLightweightEffects()), []);
  useEffect(() => {
    const element = ref.current;
    const hero = element?.parentElement;
    if (!element || !hero || still) return;
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const box = hero.getBoundingClientRect();
      element.style.setProperty("--water-x", `${(event.clientX - box.left) / box.width * 100}%`);
    };
    hero.addEventListener("pointermove", move, { passive: true });
    return () => hero.removeEventListener("pointermove", move);
  }, [still]);

  return <div ref={ref} className="scroll-water-transition" aria-hidden="true" data-motion={still ? "static" : "scroll"}>
    <motion.div className="scroll-water-photo" style={{ y: still ? 0 : y, x: still ? 0 : x }} />
    <motion.div className="scroll-water-reflection" style={{ opacity: still ? .2 : shine }} />
    <svg className="scroll-water-edge" viewBox="0 0 1440 100" preserveAspectRatio="none">
      <motion.path className="scroll-water-crest" d={still ? STILL : path} />
      <motion.path className="scroll-water-reveal" d={still ? STILL : path} />
    </svg>
  </div>;
}
