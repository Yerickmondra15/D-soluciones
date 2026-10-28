import Image from "next/image";
import Link from "next/link";
import { BUSINESS, SERVICES } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

const links = [["Inicio", "/#inicio"], ["Servicios", "/#servicios"], ["Proyectos", "/#proyectos"], ["Productos", "/productos"], ["Nosotros", "/#nosotros"], ["Contacto", "/#contacto"]];

export function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div className="footer-brand"><Link href="/#inicio" aria-label="Piscinas GDS, volver al inicio"><Image src="/media/logo-horizontal.webp" width={867} height={332} sizes="180px" alt="Piscinas GDS" /></Link><p>{BUSINESS.tagline}. Soluciones técnicas para piscinas en Costa Rica.</p></div>
      <div><h3>Navegación</h3>{links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div>
      <div><h3>Servicios</h3>{SERVICES.map(service => <Link href="/#servicios" key={service.id}>{service.title}</Link>)}</div>
      <div><h3>Contacto</h3><a href={`tel:+${BUSINESS.phoneE164}`}>+506 {BUSINESS.phoneDisplay}</a><a href={whatsappLink("Hola, quisiera información sobre sus servicios.")} target="_blank" rel="noopener noreferrer">Escribir por WhatsApp</a><p>{BUSINESS.serviceArea}</p></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Piscinas GDS. Todos los derechos reservados.</span><span>Costa Rica · Cuidado integral para su piscina</span></div>
  </footer>;
}
