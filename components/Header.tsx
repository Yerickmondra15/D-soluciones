"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { whatsappLink } from "@/lib/whatsapp";

const links = [["Inicio", "/#inicio"], ["Servicios", "/#servicios"], ["Proyectos", "/#proyectos"], ["Equipos", "/productos"], ["Nosotros", "/#nosotros"], ["Contacto", "/#contacto"]] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 901px)");
    const resize = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
      desktop.removeEventListener("change", resize);
    };
  }, [open]);

  return (
    <header className="site-header" ref={header}>
      <div className="header-inner container">
        <Link href="/#inicio" className="brand" aria-label="Piscinas GDS, ir al inicio">
          <Image src="/media/logo-horizontal.webp" width={867} height={332} alt="Piscinas GDS" priority className="brand-logo" sizes="168px" />
        </Link>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {links.map(([text, href]) => <a key={href} href={href}>{text}</a>)}
        </nav>
        <a className="btn btn-primary header-cta" href={whatsappLink("Hola, quisiera una cotización para mi piscina.")} target="_blank" rel="noopener noreferrer">
          Cotizar por WhatsApp <ArrowUpRight size={17} />
        </a>
        <button ref={menuButton} className="menu-toggle icon-button" type="button" onClick={() => setOpen(!open)} title={open ? "Cerrar menú" : "Abrir menú"} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="mobile-nav">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav id="mobile-nav" className="mobile-nav" aria-label="Navegación móvil" hidden={!open}>
        {links.map(([text, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{text}</a>)}
        <a href={whatsappLink("Hola, quisiera una cotización para mi piscina.")} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Cotizar por WhatsApp <ArrowUpRight size={16} /></a>
      </nav>
    </header>
  );
}
