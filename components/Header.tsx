"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { whatsappLink } from "@/lib/whatsapp";

const links = [["Inicio", "/#inicio"], ["Servicios", "/#servicios"], ["Proyectos", "/#proyectos"], ["Equipos", "/productos"], ["Nosotros", "/#nosotros"], ["Contacto", "/#contacto"]] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const menuLinks = useRef<HTMLDivElement>(null);
  const animatedMenuHeight = useMotionValue(0);
  const compact = useRef(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", value => {
    if ((value > 24) !== compact.current) {
      compact.current = value > 24;
      setScrolled(compact.current);
    }
  });
  function closeMenu() { setClosing(true); setOpen(false); }
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const control = animate(animatedMenuHeight, open ? menuHeight : 0, {
      duration: reduce ? 0 : .26, ease: [.22, 1, .36, 1],
      onComplete: () => { if (!open) setClosing(false); }
    });
    return () => control.stop();
  }, [open, menuHeight, reduce, animatedMenuHeight]);

  useEffect(() => {
    const links = menuLinks.current;
    if (!links) return;
    const observer = new ResizeObserver(() => {
      const height = links.getBoundingClientRect().height;
      if (height > 0) setMenuHeight(height);
    });
    observer.observe(links);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        menuButton.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) closeMenu();
    };
    const desktop = window.matchMedia("(min-width: 901px)");
    const resize = () => { if (desktop.matches) { setOpen(false); setClosing(false); } };
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
    <header className="site-header" ref={header} data-scrolled={scrolled}>
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
        <button ref={menuButton} className="menu-toggle icon-button" type="button" onClick={() => { if (open) closeMenu(); else { setClosing(false); setOpen(true); } }} title={open ? "Cerrar menú" : "Abrir menú"} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="mobile-nav">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <motion.nav id="mobile-nav" className="mobile-nav" aria-label="Navegación móvil" hidden={!open && !closing} inert={!open} aria-hidden={!open}
        initial={false} style={{ height: animatedMenuHeight }} animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : .26, ease: [.22, 1, .36, 1] }}>
        <div className="mobile-nav-links" ref={menuLinks}>
          {links.map(([text, href]) => <a key={href} href={href} onClick={closeMenu}>{text}</a>)}
          <a href={whatsappLink("Hola, quisiera una cotización para mi piscina.")} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Cotizar por WhatsApp <ArrowUpRight size={16} /></a>
        </div>
      </motion.nav>
    </header>
  );
}
