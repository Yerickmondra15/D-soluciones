"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { useState } from "react";
import { EQUIPMENT_CATEGORIES } from "@/data/site";
import { PRODUCTS } from "@/data/products";
import { whatsappLink } from "@/lib/whatsapp";

const normalize = (text: string) => text.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase("es-CR").trim();

export function EquipmentCatalog({ directory = false }: { directory?: boolean }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("todos");
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
      <div className="catalog-grid">
        {showProducts ? products.map(product => <article className="catalog-card" key={product.id}>
          {product.image && <div className="catalog-photo"><Image src={product.image} fill alt={product.name} sizes="(max-width:680px) 95vw, (max-width:900px) 46vw, 33vw" /></div>}
          <div className="catalog-info">
            <p className="catalog-kicker">{product.brand || "EQUIPOS PARA PISCINAS"}</p><h3>{product.name}</h3>
            <p>{product.description}</p>{product.model && <p>Modelo: {product.model}</p>}
            {typeof product.priceCRC === "number" && <p>{new Intl.NumberFormat("es-CR", { style: "currency", currency: "CRC", maximumFractionDigits: 0 }).format(product.priceCRC)}</p>}
            <p>{product.stock === "disponible" ? "Disponible" : product.stock === "agotado" ? "Agotado" : "Disponibilidad por confirmar"}</p>
            <a className="text-link" href={whatsappLink(`Hola, me interesa ${product.name}${product.model ? " modelo " + product.model : ""}. Quisiera confirmar precio y disponibilidad.`)} target="_blank" rel="noopener noreferrer">Consultar producto <ArrowUpRight size={18} /></a>
          </div>
        </article>) : categories.map(item => <article key={item.id} className="catalog-card">
          <div className="catalog-photo"><Image src={item.photo} fill alt={`Detalle de instalación de ${item.title.toLowerCase()} en un trabajo de Piscinas GDS`} sizes="(max-width:680px) 95vw, (max-width:900px) 46vw, 33vw" /></div>
          <div className="catalog-info"><p className="catalog-kicker">ASESORAMIENTO Y VENTA</p><h3>{item.title}</h3><p>{item.description}</p>
            <a className="text-link" target="_blank" rel="noopener noreferrer" href={whatsappLink(`Hola, me gustaría consultar disponibilidad y precio de ${item.title.toLowerCase()} para mi piscina.`)}>Consultar disponibilidad <ArrowUpRight size={18} /></a>
          </div>
        </article>)}
        {count === 0 && <div className="empty-catalog"><h3>No encontramos resultados.</h3><p>Probá otra búsqueda o consultanos sobre el equipo que necesitás.</p><button className="btn btn-outline" type="button" onClick={() => { setSearch(""); setCategory("todos"); }}>Limpiar filtros</button></div>}
      </div>
      {!directory && <div className="catalog-more"><Link className="btn btn-primary" href="/productos">Abrir catálogo completo <ArrowRight size={18} /></Link></div>}
      {directory && <div className="directory-empty"><h2>¿Necesitás ayuda para elegir?</h2><p>El equipo adecuado depende del volumen de agua, las tuberías y la instalación. Consultanos para evaluar tu caso.</p><a className="btn btn-primary" href={whatsappLink("Hola, quiero asesoramiento para elegir un equipo para mi piscina.")} target="_blank" rel="noopener noreferrer">Consultar por WhatsApp <ArrowUpRight size={18} /></a></div>}
    </div>
  </section>;
}
