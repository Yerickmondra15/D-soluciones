import Image from "next/image";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { BUSINESS } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { ScrollWaterTransition } from "./ScrollWaterTransition";

export function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero-photo">
        <Image src="/media/proyecto-construccion-despues.webp" fill priority sizes="100vw"
          alt="Piscina terminada con revestimiento azul y escalones del proyecto Norberto" />
      </div>
      <div className="hero-overlay" />
      <div className="hero-content container">
        <div className="hero-copy">
          <p className="eyebrow">COSTA RICA · SOLUCIONES PARA PISCINAS</p>
          <h1 id="hero-title">Piscinas GDS</h1>
          <h2>{BUSINESS.tagline}.</h2>
          <p>Construimos, renovamos y cuidamos tu piscina. Soluciones técnicas que parten de lo que tu proyecto realmente necesita.</p>
          <div className="hero-buttons">
            <a className="btn btn-primary" href={whatsappLink("Hola, visité la página web y quiero solicitar una cotización.")} target="_blank" rel="noopener noreferrer">Solicitar cotización <ArrowUpRight size={18} /></a>
            <a className="btn btn-outline" href="#proyectos">Ver proyectos <ArrowDown size={18} /></a>
          </div>
          <div className="hero-points">
            <span><Check size={15} /> Asesoramiento técnico</span>
            <span><Check size={15} /> Atención personalizada</span>
          </div>
        </div>
        <p className="hero-caption">PROYECTO NORBERTO <span>Construcción de piscina</span></p>
      </div>
      <ScrollWaterTransition />
    </section>
  );
}
