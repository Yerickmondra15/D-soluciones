"use client";

import { Icon } from "./Icon";

const heroImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85";

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-[760px] overflow-hidden pt-20">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/82 to-white/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-aqua-50/70 via-transparent to-aqua-100/60" />

      <div className="pointer-events-none absolute left-14 top-28 h-32 w-32 rounded-full border border-aqua-300/40 opacity-60" style={{ animation: "floatBubble 8s ease-in-out infinite" }} />
      <div className="pointer-events-none absolute bottom-24 right-24 h-44 w-44 rounded-full border border-white/60 bg-white/10 blur-[1px]" style={{ animation: "floatBubble 10s ease-in-out infinite" }} />

      <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center px-5 lg:px-8">
        <div className="max-w-xl">
          <div className="reveal-up mb-6 text-aqua-600">
            <Icon name="waves" />
          </div>
          <h1 className="reveal-up-delay-1 text-5xl font-black leading-[0.96] tracking-normal text-navy md:text-7xl">
            Diseñamos piscinas que transforman espacios
          </h1>
          <p className="reveal-up-delay-2 mt-7 max-w-lg text-lg leading-8 text-navy/70">
            Combinamos diseño, tecnología y materiales premium para crear piscinas únicas, funcionales y hechas para disfrutar.
          </p>
          <div className="reveal-up-delay-3 mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#contacto" className="inline-flex items-center justify-center gap-3 rounded-full bg-aqua-500 px-7 py-4 text-sm font-extrabold text-white shadow-glow transition hover:-translate-y-1 hover:bg-aqua-600">
              Solicitar cotización <Icon name="arrow" className="h-[18px] w-[18px]" />
            </a>
            <a href="#proyectos" className="inline-flex items-center justify-center gap-3 rounded-full border border-aqua-500/70 bg-white/45 px-7 py-4 text-sm font-extrabold text-navy backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/70">
              Ver proyectos <Icon name="play" className="h-[17px] w-[17px]" />
            </a>
          </div>
        </div>
      </div>

      <div className="floating-card absolute bottom-28 right-[10%] hidden w-48 rounded-3xl border border-white/45 bg-aqua-500/38 p-5 text-navy shadow-soft backdrop-blur-xl md:block">
        <p className="text-sm font-semibold">Diseño personalizado</p>
        <p className="mt-1 text-3xl font-black">100%</p>
        <div className="mt-4 h-2 rounded-full bg-white/40">
          <div className="h-full w-full rounded-full bg-aqua-300" />
        </div>
      </div>
    </section>
  );
}
