"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { WaterRippleImage } from "./ui/water-ripple-image";

export function WaterHoverSection({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const target = useRef({ x: 50, y: 78 });
  const pointer = useRef({ x: 50, y: 78, active: false });
  const frame = useRef<number | null>(null);
  const reduced = useRef(true);
  const last = useRef(0);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reduced.current = preference.matches;
      if (preference.matches) {
        pointer.current.active = false;
        if (frame.current !== null) cancelAnimationFrame(frame.current);
        frame.current = null;
        sectionRef.current?.setAttribute("data-hover", "false");
      }
    };
    update();
    preference.addEventListener("change", update);
    return () => {
      preference.removeEventListener("change", update);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  function paint(time: number) {
    const el = sectionRef.current;
    if (!el) return;
    const delta = Math.min(50, time - last.current || 16);
    last.current = time;
    const ease = 1 - Math.exp(-delta / 55);
    pointer.current.x += (target.current.x - pointer.current.x) * ease;
    pointer.current.y += (target.current.y - pointer.current.y) * ease;
    el.style.setProperty("--x", `${pointer.current.x}%`);
    el.style.setProperty("--y", `${pointer.current.y}%`);
    if (Math.abs(target.current.x - pointer.current.x) + Math.abs(target.current.y - pointer.current.y) > 0.05) {
      frame.current = requestAnimationFrame(paint);
    } else {
      frame.current = null;
    }
  }

  function schedule() {
    if (frame.current === null && !reduced.current) {
      last.current = performance.now();
      frame.current = requestAnimationFrame(paint);
    }
  }

  function move(event: MouseEvent<HTMLElement>) {
    if (reduced.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    target.current = {
      x: Math.max(0, Math.min(100, (event.clientX - rect.left) / rect.width * 100)),
      y: Math.max(55, Math.min(100, (event.clientY - rect.top) / rect.height * 100))
    };
    pointer.current.active = true;
    event.currentTarget.dataset.hover = "true";
    schedule();
  }

  return <section id="contacto" ref={sectionRef} className="water-hover-section contact-section" aria-labelledby="contact-title" data-hover="false"
    onMouseMove={move}
    onMouseEnter={event => { if (!reduced.current) { pointer.current.active = true; event.currentTarget.dataset.hover = "true"; } }}
    onMouseLeave={event => {
      pointer.current.active = false;
      event.currentTarget.dataset.hover = "false";
      target.current = { x: 50, y: 82 };
      schedule();
    }}>
    <WaterRippleImage src="/media/recuperacion-resultado.webp" pointer={pointer} />
    <div className="contact-glow" aria-hidden="true" />
    {children}
  </section>;
}
