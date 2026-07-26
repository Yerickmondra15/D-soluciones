"use client";

import { Icon } from "./Icon";

const steps = [
  ["Idea", "Escuchamos tu visión y necesidades para crear el punto de partida perfecto.", "lightbulb"],
  ["Diseño", "Diseñamos una propuesta personalizada en 3D para visualizar cada detalle.", "clipboard"],
  ["Construcción", "Construimos con precisión, materiales premium y control de calidad.", "hardhat"],
  ["Entrega", "Entregamos tu piscina lista para disfrutar y te damos soporte continuo.", "waves"]
] as const;

export function ProcessTimeline() {
  return (
    <section id="proceso" className="bg-white px-5 py-24">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-aqua-600">Nuestro proceso</p>
        <h2 className="mt-4 text-4xl font-black">Así hacemos realidad tu piscina soñada</h2>
        <div className="relative mt-16 grid gap-8 md:grid-cols-4">
          <svg className="absolute left-0 top-12 hidden h-24 w-full text-aqua-300 md:block" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M0,55 C120,0 180,120 300,58 C420,-2 480,120 600,58 C720,-2 780,120 1000,55"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
          {steps.map(([title, text, iconName], index) => (
            <article key={title} className="reveal-up relative rounded-[1.5rem] bg-white p-5 text-left md:bg-transparent" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-aqua-200 bg-white text-aqua-500 shadow-soft md:mx-0">
                <Icon name={iconName} className="h-8 w-8" />
              </div>
              <p className="mt-5 text-sm font-black text-aqua-500">0{index + 1}</p>
              <h3 className="mt-1 text-lg font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-navy/68">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
