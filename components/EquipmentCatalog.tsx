"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { forwardRef, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion, useIsPresent, useReducedMotion } from "motion/react";
import { EQUIPMENT_CATEGORIES } from "@/data/site";
import { PRODUCTS } from "@/data/products";
import { whatsappLink } from "@/lib/whatsapp";

const normalize = (text: string) => text.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase("es-CR").trim();

const CatalogCard = forwardRef<HTMLElement, { children: ReactNode; reduced: boolean }>(function CatalogCard({ children, reduced }, ref) {
  const present = useIsPresent();
  return <motion.article ref={ref} layout className="catalog-card" inert={!present} aria-hidden={!present}
    initial={{ opacity: .5, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: reduced ? 1 : .98 }}
    transition={{ duration: reduced ? 0 : .26, ease: [.22, 1, .36, 1] }}>
    {children}
  </motion.article>;
});

export function EquipmentCatalog({ directory = false }: { directory?: boolean }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("todos");
  const reduced = useReducedMotion();
  const grid = useRef<HTMLDivElement>(null);
  const [gridHeight, setGridHeight] = useState<number>();
  useEffect(() => {
    const element = grid.current;
    if (!element) return;
    const observer = new ResizeObserver(() => setGridHeight(element.getBoundingClientRect().height + 8));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const cardTransition = { duration: reduced ? 0 : .26, ease: [.22, 1, .36, 1] as const };
  const query = normalize(search);
  const categories = EQUIPMENT_CATEGORIES.filter(item =>
    (category === "todos" || item.id === category) && normalize(item.title + " " + item.description).includes(query));
  const products = PRODUCTS.filter(item =>
    (category === "todos" || item.category === category) && normalize([item.name, item.description, item.brand, item.model].join(" ")).includes(query));
  const showProducts = directory && PRODUCTS.length > 0;
  const count = showProducts ? products.length : categories.length;
  const title = <>Equipos para <span>un sistema en equilibrio.</span></>;

  return <section className={directory ? "section product-directory" : "section products-section"} id="productos">
    <div className="container">
      <div className="section-intro">
        <div><p className="eyebrow">EQUIPOS Y ACCESORIOS</p>{directory ? <h1>Catálogo de Piscinas GDS</h1> : <h2>{title}</h2>}</div>
        <p>Bombas, filtros, clorinadores, luces y accesorios. Te ayudamos a elegir según las condiciones de tu piscina.</p>
      </div>
      <div className="catalog-tools">
        <label className="catalog-search"><span className="sr-only">{showProducts ? "Buscar productos" : "Buscar equipos"}</span><Search size={19} aria-hidden="true" /><input type="search" value={search} maxLength={90} placeholder={showProducts ? "Nombre, marca o modelo" : "Buscar equipos"} onChange={event => setSearch(event.target.value)} /></label>
        <div className="catalog-filters" role="group" aria-label="Filtrar equipos por categoría">
          <button type="button" aria-pressed={category === "todos"} onClick={() => setCategory("todos")}>Todos</button>
          {EQUIPMENT_CATEGORIES.map(item => <button type="button" key={item.id} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.title}</button>)}
        </div>
      </div>
      {!showProducts && <p className="catalog-disclaimer"><strong>Inventario por confirmar.</strong> Consultá las referencias, marcas, precios y existencias directamente con Piscinas GDS. Fotografías de instalaciones, no de productos en stock.</p>}
      <p className="sr-only" role="status">{count} {showProducts ? "productos" : "categorías"} encontrados</p>
      <LayoutGroup><motion.div className="catalog-height" initial={false} animate={{ height: gridHeight ?? "auto" }} transition={cardTransition}>
        <div className="catalog-grid" ref={grid}>
        <AnimatePresence initial={false} mode="popLayout">
        {showProducts ? products.map(product => <CatalogCard key={product.id} reduced={Boolean(reduced)}>
          {product.image && <div className="catalog-photo"><Image src={product.image} fill alt={product.name} sizes="(max-width:680px) 95vw, (max-width:900px) 46vw, 33vw" /></div>}
          <div className="catalog-info">
            <p className="catalog-kicker">{product.brand || "EQUIPOS PARA PISCINAS"}</p><h3>{product.name}</h3>
            <p>{product.description}</p>{product.model && <p>Modelo: {product.model}</p>}
            {typeof product.priceCRC === "number" && <p>{new Intl.NumberFormat("es-CR", { style: "currency", currency: "CRC", maximumFractionDigits: 0 }).format(product.priceCRC)}</p>}
            <p>{product.stock === "disponible" ? "Disponible" : product.stock === "agotado" ? "Agotado" : "Disponibilidad por confirmar"}</p>
            <a className="text-link" href={whatsappLink(`Hola, me interesa ${product.name}${product.model ? " modelo " + product.model : ""}. Quisiera confirmar precio y disponibilidad.`)} target="_blank" rel="noopener noreferrer">Consultar producto <ArrowUpRight size={18} /></a>
          </div>
        </CatalogCard>) : categories.map(item => <CatalogCard key={item.id} reduced={Boolean(reduced)}>
          <div className="catalog-photo"><Image src={item.photo} fill alt={`Detalle de instalación de ${item.title.toLowerCase()} en un trabajo de Piscinas GDS`} sizes="(max-width:680px) 95vw, (max-width:900px) 46vw, 33vw" /></div>
          <div className="catalog-info"><p className="catalog-kicker">ASESORAMIENTO Y VENTA</p><h3>{item.title}</h3><p>{item.description}</p>
            <a className="text-link" target="_blank" rel="noopener noreferrer" href={whatsappLink(`Hola, me gustaría consultar disponibilidad y precio de ${item.title.toLowerCase()} para mi piscina.`)}>Consultar disponibilidad <ArrowUpRight size={18} /></a>
          </div>
        </CatalogCard>)}
        {count === 0 && <motion.div key="empty" className="empty-catalog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={cardTransition}><h3>No encontramos resultados.</h3><p>Probá otra búsqueda o consultanos sobre el equipo que necesitás.</p><button className="btn btn-outline" type="button" onClick={() => { setSearch(""); setCategory("todos"); }}>Limpiar filtros</button></motion.div>}
        </AnimatePresence>
        </div>
      </motion.div></LayoutGroup>
      {!directory && <div className="catalog-more"><Link className="btn btn-primary" href="/productos">Abrir catálogo completo <ArrowRight size={18} /></Link></div>}
      {directory && <div className="directory-empty"><h2>¿Necesitás ayuda para elegir?</h2><p>El equipo adecuado depende del volumen de agua, las tuberías y la instalación. Consultanos para evaluar tu caso.</p><a className="btn btn-primary" href={whatsappLink("Hola, quiero asesoramiento para elegir un equipo para mi piscina.")} target="_blank" rel="noopener noreferrer">Consultar por WhatsApp <ArrowUpRight size={18} /></a></div>}
    </div>
  </section>;
}
