"use client";

import { MouseEvent, useRef, useState } from "react";
import { Icon } from "./Icon";
import { WaterRippleImage } from "./ui/water-ripple-image";

export function WaterHoverSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const targetRef = useRef({ x: 50, y: 78 });
  const currentRef = useRef({ x: 50, y: 78 });
  const frameRef = useRef<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  function paintTracker() {
    const section = sectionRef.current;
    if (!section) return;

    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.22;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.22;

    section.style.setProperty("--x", `${currentRef.current.x}%`);
    section.style.setProperty("--y", `${currentRef.current.y}%`);

    if (
      Math.abs(targetRef.current.x - currentRef.current.x) > 0.08 ||
      Math.abs(targetRef.current.y - currentRef.current.y) > 0.08
    ) {
      frameRef.current = requestAnimationFrame(paintTracker);
    } else {
      frameRef.current = null;
    }
  }

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = Math.max(50, ((event.clientY - rect.top) / rect.height) * 100);

    targetRef.current = { x, y };
    if (!frameRef.current) frameRef.current = requestAnimationFrame(paintTracker);
  }

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="water-hover-section px-5 py-20 text-white md:py-24"
      data-hover={isHovering}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        targetRef.current = { x: 50, y: 82 };
        if (!frameRef.current) frameRef.current = requestAnimationFrame(paintTracker);
      }}
      onMouseMove={handleMouseMove}
    >
      <WaterRippleImage className="h-[78%] opacity-50" />
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <filter id="water-turbulence">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.035" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="cursor-light" />

      <div className="relative z-10 mx-auto max-w-7xl rounded-[2rem] border border-white/28 bg-white/10 p-6 shadow-[0_30px_90px_rgba(4,47,73,0.22)] backdrop-blur-md md:p-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.8fr_0.95fr]">
          <div>
            <h2 className="max-w-md text-4xl font-black leading-tight md:text-5xl">¿Listo para dar el siguiente paso?</h2>
            <div className="mt-4 h-4 w-16 rounded-full border-t-4 border-white/80" />
            <p className="mt-6 max-w-md text-lg leading-8 text-white/86">Cuéntanos tu proyecto y recibe una propuesta a la medida sin compromiso.</p>
          </div>

          <div className="grid gap-4">
            <a href="mailto:hola@gds.com.mx" className="water-button inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-black text-aqua-600 shadow-soft transition hover:-translate-y-1">
              <span className="relative z-10">Solicitar cotización</span>
              <Icon name="arrow" className="relative z-10 h-[18px] w-[18px]" />
            </a>
            <a href="https://wa.me/5213312345678" className="water-button inline-flex items-center justify-center gap-3 rounded-2xl border border-white/65 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:-translate-y-1">
              <span className="relative z-10">Hablemos por WhatsApp</span>
              <Icon name="message" className="relative z-10 h-[18px] w-[18px]" />
            </a>
          </div>

          <address className="grid gap-5 not-italic">
            <a href="tel:+523312345678" className="flex items-center gap-4 font-bold">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white/18"><Icon name="phone" className="h-5 w-5" /></span>
              33 1234 5678
            </a>
            <a href="mailto:hola@gds.com.mx" className="flex items-center gap-4 font-bold">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white/18"><Icon name="mail" className="h-5 w-5" /></span>
              hola@gds.com.mx
            </a>
            <p className="flex items-center gap-4 font-bold">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white/18"><Icon name="map" className="h-5 w-5" /></span>
              Guadalajara, Jalisco, México
            </p>
          </address>
        </div>
      </div>
    </section>
  );
}
