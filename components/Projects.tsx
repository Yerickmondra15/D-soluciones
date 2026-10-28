"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowLeftRight, ArrowUpRight, X, Maximize2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";
import { GALLERY } from "@/data/site";

export function Projects() {
  const [slider, setSlider] = useState(50);
  const [active, setActive] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  const reduce = useReducedMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const isOpen = active !== null;

  useEffect(() => {
    const modal = dialog.current;
    if (!modal || !isOpen) return;
    modal.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      modal.close();
      document.body.style.overflow = previous;
      opener.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const change = (direction: number) => setActive(index => index === null ? null : (index + direction + GALLERY.length) % GALLERY.length);
  const item = active !== null ? GALLERY[active] : null;
  const close = () => setClosing(true);

  return (
    <section id="proyectos" className="section projects-section">
      <div className="container">
        <div className="section-intro">
          <div><p className="eyebrow">TRABAJOS REALES</p><h2>El cambio se <span>ve y se siente.</span></h2></div>
          <p>Una mirada al proceso de construcción y a los espacios en los que hemos trabajado.</p>
        </div>
        <div className="compare-layout">
          <div className="compare-frame">
            <div className="compare-after"><Image src="/media/proyecto-construccion-despues.webp" fill alt="Proyecto Norberto después: piscina terminada con revestimiento azul" sizes="(max-width: 900px) 95vw, 60vw" /></div>
            <div className="compare-before" style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}><Image src="/media/proyecto-construccion-antes.webp" fill alt="Proyecto Norberto antes: excavación y estructura inicial" sizes="(max-width: 900px) 95vw, 60vw" /></div>
            <span className="compare-tag compare-tag-before">Antes</span>
            <span className="compare-tag compare-tag-after">Después</span>
            <span className="compare-line" style={{ left: `${slider}%` }} aria-hidden="true"><span><ArrowLeftRight size={23} /></span></span>
            <input type="range" min="0" max="100" value={slider} onChange={event => setSlider(Number(event.target.value))} aria-label="Comparar antes y después del proyecto Norberto" aria-valuetext={`${slider}% de la fotografía anterior visible`} className="compare-range" />
          </div>
          <div className="compare-copy">
            <p className="eyebrow">PROYECTO NORBERTO</p>
            <h3>De la primera idea al primer chapuzón.</h3>
            <p>El mismo proyecto, en dos etapas. Desde el terreno inicial hasta la piscina finalizada.</p>
            <a href="#contacto" className="text-link">Quiero un proyecto así <ArrowUpRight size={18} /></a>
          </div>
        </div>
        <div className="gallery-heading"><div><p className="eyebrow">GALERÍA</p><h3>Más de nuestro trabajo</h3></div><span>Construcción · Cuidado · Soluciones técnicas</span></div>
        <div className="gallery-grid">
          {GALLERY.map((photo, index) => (
            <button className={`gallery-item gallery-${index + 1}`} key={photo.src} type="button" onClick={event => { opener.current = event.currentTarget; setActive(index); }} aria-label={`Ampliar fotografía: ${photo.label}`}>
              <Reveal image className="gallery-photo" index={index % 3}><Image src={photo.src} fill sizes={index === 0 ? "(max-width: 680px) 95vw, 50vw" : "(max-width: 680px) 46vw, 25vw"} alt={photo.label} /></Reveal>
              <span>{photo.label}<Maximize2 size={17} aria-hidden="true" /></span>
            </button>
          ))}
        </div>
      </div>
      <dialog ref={dialog} className="gallery-dialog" aria-labelledby="gallery-caption"
        onCancel={event => { event.preventDefault(); close(); }}
        onClick={event => { if (event.target === event.currentTarget) close(); }}
        onKeyDown={event => {
          if (event.key === "Tab") {
            const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button");
            const first = buttons[0], last = buttons[buttons.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }
          if (event.key === "ArrowRight") { event.preventDefault(); change(1); }
          if (event.key === "ArrowLeft") { event.preventDefault(); change(-1); }
        }}>
        {item && <motion.div className="gallery-dialog-content" initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12, scale: reduce ? 1 : .985 }}
          animate={{ opacity: closing ? 0 : 1, y: closing && !reduce ? 12 : 0, scale: closing && !reduce ? .985 : 1 }}
          transition={{ duration: reduce ? 0 : .22 }} onAnimationComplete={() => { if (closing) { setActive(null); setClosing(false); } }}>
          <button className="gallery-close icon-button" autoFocus type="button" onClick={close} aria-label="Cerrar galería" title="Cerrar galería"><X /></button>
          <div className="gallery-large"><AnimatePresence initial={false}><motion.div className="gallery-slide" key={item.src} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : .18 }}><Image src={item.src} fill sizes="(max-width: 1000px) 92vw, 1000px" alt={item.label} /></motion.div></AnimatePresence></div>
          <div className="gallery-controls">
            <button className="icon-button" type="button" onClick={() => change(-1)} aria-label="Fotografía anterior" title="Fotografía anterior"><ArrowLeft /></button>
            <p id="gallery-caption" aria-live="polite">{item.label}<span>{(active ?? 0) + 1} / {GALLERY.length}</span></p>
            <button className="icon-button" type="button" onClick={() => change(1)} aria-label="Fotografía siguiente" title="Fotografía siguiente"><ArrowRight /></button>
          </div>
        </motion.div>}
      </dialog>
    </section>
  );
}
