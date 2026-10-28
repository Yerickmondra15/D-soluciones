import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { Reveal } from "./Reveal";

const steps = [
  ["01", "Contactanos", "Contanos qué necesitás."],
  ["02", "Evaluamos", "Revisamos las condiciones del proyecto."],
  ["03", "Cotizamos", "Te presentamos una propuesta."],
  ["04", "Ejecutamos", "Coordinamos el trabajo acordado."]
];
const values = [
  ["01", "Asesoramiento técnico", "Evaluamos antes de recomendar."],
  ["02", "Trato profesional", "Soluciones adaptadas a cada proyecto."],
  ["03", "Atención coordinada", "En distintas zonas de Costa Rica."]
];

export function About() {
  return <>
    <section id="nosotros" className="section about-section">
      <div className="container about-layout">
        <Reveal className="about-photos" image>
          <div className="about-photo-main"><Image src="/media/recuperacion-resultado.webp" fill alt="Agua clara en una piscina atendida por Piscinas GDS" sizes="(max-width:900px) 80vw, 40vw" /></div>
          <div className="about-photo-small"><Image src="/media/asesoria-06.webp" fill alt="Bomba, filtro y tuberías de una instalación de piscina" sizes="(max-width:900px) 35vw, 20vw" /></div>
          <span className="about-label">EL DETALLE IMPORTA</span>
        </Reveal>
        <Reveal className="about-copy" index={1}>
          <p className="eyebrow">QUIÉNES SOMOS</p><h2>Tu piscina, <span>en buenas manos.</span></h2>
          <p>En Piscinas GDS combinamos trabajo técnico con atención personalizada para ayudarte a mantener, construir o mejorar tu piscina.</p>
          <p>Nuestras recomendaciones parten de las condiciones reales del agua y de los equipos. Cada proyecto merece una solución a su medida.</p>
          <div className="about-values">{values.map(([number, title, description]) => <div key={number}><b>{number}</b><strong>{title}</strong><span>{description}</span></div>)}</div>
        </Reveal>
      </div>
    </section>
    <section id="proceso" className="process-section">
      <div className="container"><div className="process-header"><p className="eyebrow">ASÍ TRABAJAMOS</p><h2>De tu consulta a la solución.</h2><p>Un proceso claro para atender las necesidades de tu piscina.</p></div>
        <div className="process-steps">{steps.map(([number, title, description], index) => <Reveal as="article" index={index} key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></Reveal>)}</div>
      </div>
    </section>
    <section className="technical-banner">
      <div className="container technical-inner"><div><p className="eyebrow">TRABAJEMOS EN EQUIPO</p><h2>Una bomba más grande no siempre significa una mejor piscina.</h2><p>Bomba, filtro, tuberías y accesorios deben trabajar de manera compatible. Analizamos tu instalación antes de recomendar un equipo.</p></div>
        <div className="technical-action"><span>Diagnóstico → Cálculo → Selección → Instalación → Puesta en marcha</span><a className="btn btn-light" href={whatsappLink("Hola, necesito asesoramiento técnico para mi piscina.")} target="_blank" rel="noopener noreferrer">Necesito asesoramiento <ArrowUpRight size={18} /></a></div>
      </div>
    </section>
  </>;
}
