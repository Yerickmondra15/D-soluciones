"use client";

import { useState } from "react";
import { Icon } from "./Icon";

const links = ["Inicio", "Servicios", "Proyectos", "Proceso", "Nosotros", "Contacto"];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/30 bg-white/74 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#inicio" className="flex items-center gap-3 font-black text-navy" aria-label="Grupo D Soluciones">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-aqua-400 to-blue-700 text-white shadow-glow">
            <Icon name="waves" />
          </span>
          <span className="leading-tight">
            <span className="block text-xl">GDS</span>
            <span className="block text-sm text-aqua-600">Grupo D Soluciones</span>
          </span>
        </a>

        <nav className="hidden items-center gap-9 text-sm font-semibold text-navy/80 lg:flex" aria-label="Navegación principal">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="transition hover:text-aqua-600">
              {link}
            </a>
          ))}
        </nav>

        <a href="#contacto" className="hidden rounded-full bg-aqua-500 px-6 py-3 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-aqua-600 lg:inline-flex">
          Solicitar cotización
        </a>

        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="grid h-11 w-11 place-items-center rounded-full border border-aqua-200 text-navy lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? "x" : "menu"} />
        </button>
      </div>

      {open && (
        <div className="border-t border-aqua-100 bg-white px-5 py-5 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-4 font-semibold text-navy/80">
            {links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>
                {link}
              </a>
            ))}
            <a href="#contacto" className="rounded-full bg-aqua-500 px-5 py-3 text-center text-white" onClick={() => setOpen(false)}>
              Solicitar cotización
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
