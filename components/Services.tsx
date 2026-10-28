import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AnimatedDisclosure } from "./AnimatedDisclosure";
import { Reveal } from "./Reveal";
import { SERVICES } from "@/data/site";
import { serviceMessage, whatsappLink } from "@/lib/whatsapp";

export function Services() {
  return <section id="servicios" className="section services-section">
    <div className="container">
      <div className="section-intro"><div><p className="eyebrow">LO QUE HACEMOS</p><h2>Una solución para cada <span>etapa de tu piscina.</span></h2></div><p>Desde la primera idea hasta el mantenimiento periódico. Te acompañamos con soluciones para cada necesidad.</p></div>
      <div className="services-grid">{SERVICES.map((service, index) => <Reveal key={service.id} className="service-card" as="article" index={index % 3}>
        <div className="service-image"><Image src={service.image} fill alt={`${service.title}: trabajo de Piscinas GDS`} sizes="(max-width:680px) 95vw, (max-width:900px) 46vw, 33vw" /><span className="service-number">0{index + 1}</span></div>
        <div className="service-body"><p className="service-subtitle">{service.subtitle}</p><h3>{service.title}</h3><p>{service.description}</p>
          <AnimatedDisclosure className="service-details" title="¿Qué incluye?"><ul>{service.details.map(detail => <li key={detail}>{detail}</li>)}</ul></AnimatedDisclosure>
          <a className="text-link" href={whatsappLink(serviceMessage(service.title))} rel="noopener noreferrer" target="_blank">Consultar servicio <ArrowUpRight size={18} /></a>
        </div>
      </Reveal>)}</div>
    </div>
  </section>;
}
