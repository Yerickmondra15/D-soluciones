import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EquipmentCatalog } from "@/components/EquipmentCatalog";
import { approvedSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  alternates: approvedSiteUrl() ? { canonical: "/productos" } : undefined,
  title: "Productos y equipos",
  description: "Consultá por bombas, filtros, clorinadores, iluminación y accesorios para piscinas en Costa Rica. Inventario por confirmar con Piscinas GDS."
};

export default function ProductsPage() {
  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <Header />
    <main id="contenido" className="directory-main"><EquipmentCatalog directory /></main>
    <Footer />
  </>;
}
