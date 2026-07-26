"use client";

import { useState } from "react";
import { Icon } from "./Icon";

const before = "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?auto=format&fit=crop&w=1100&q=80";
const after = "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1100&q=80";

export function BeforeAfterSlider() {
  const [value, setValue] = useState(50);

  return (
    <section id="proyectos" className="bg-aqua-50/70 px-5 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-aqua-600">Renovaciones que impactan</p>
          <h2 className="mt-4 text-4xl font-black">Antes / Después</h2>
          <div className="mt-4 h-4 w-16 rounded-full border-t-4 border-aqua-400" />
          <p className="mt-6 max-w-sm leading-7 text-navy/70">Descubre cómo transformamos espacios comunes en experiencias extraordinarias.</p>
          <a href="#contacto" className="mt-8 inline-flex items-center gap-3 rounded-full border border-aqua-500 px-6 py-3 text-sm font-bold text-aqua-600 transition hover:bg-white">
            Ver más transformaciones <Icon name="image" className="h-[17px] w-[17px]" />
          </a>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] shadow-soft">
          <img src={after} alt="Piscina renovada con iluminación y acabados modernos" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${value}%` }}>
            <img src={before} alt="Piscina antes de la remodelación" className="h-full w-[calc(100vw-2.5rem)] max-w-none object-cover lg:w-[760px]" />
          </div>
          <span className="absolute left-6 top-5 rounded-full bg-navy/70 px-4 py-2 text-sm font-bold text-white backdrop-blur">Antes</span>
          <span className="absolute right-6 top-5 rounded-full bg-aqua-500 px-4 py-2 text-sm font-bold text-white">Después</span>
          <div className="absolute inset-y-0 w-1 bg-white shadow-[0_0_18px_rgba(255,255,255,0.8)]" style={{ left: `${value}%` }} />
          <div className="absolute top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-soft" style={{ left: `${value}%` }} aria-hidden="true">
            <span className="font-black">‹ ›</span>
          </div>
          <input
            aria-label="Comparar antes y después"
            type="range"
            min="18"
            max="82"
            value={value}
            onChange={(event) => setValue(Number(event.target.value))}
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>
      </div>
    </section>
  );
}
