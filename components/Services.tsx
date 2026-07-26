"use client";

import { Icon } from "./Icon";

const services = [
  {
    title: "Construcción",
    description: "Piscinas modernas con acabados premium y tecnología de última generación.",
    icon: "hardhat"
  },
  {
    title: "Mantenimiento",
    description: "Cuidado integral para mantener tu piscina cristalina, segura y eficiente.",
    icon: "waves"
  },
  {
    title: "Remodelación",
    description: "Transformamos tu piscina actual en un espacio renovado, moderno y funcional.",
    icon: "brush"
  }
];

export function Services() {
  return (
    <section id="servicios" className="relative bg-white px-5 py-24">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-aqua-600">Nuestros servicios</p>
        <h2 className="mx-auto mt-4 max-w-xl text-4xl font-black leading-tight text-navy">Soluciones a la medida de tu estilo de vida</h2>
        <div className="mx-auto mt-4 h-4 w-16 rounded-full border-t-4 border-aqua-400" />

        <div className="mt-16 grid gap-7 md:grid-cols-3">
          {services.map((service, index) => {
            return (
              <article
                key={service.title}
                className="reveal-up group rounded-[2rem] border border-aqua-100 bg-white p-8 shadow-soft transition duration-300 hover:-translate-y-2 hover:shadow-glow"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="mx-auto -mt-16 grid h-24 w-24 place-items-center rounded-full border-[10px] border-aqua-100 bg-aqua-500 text-white shadow-glow transition group-hover:scale-105">
                  <Icon name={service.icon} className="h-10 w-10" />
                </div>
                <h3 className="mt-7 text-2xl font-black">{service.title}</h3>
                <p className="mt-4 leading-7 text-navy/68">{service.description}</p>
                <a href="#contacto" className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-aqua-600">
                  Saber más <Icon name="arrow" className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
