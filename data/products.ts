/**
 * Catálogo listo para completar con productos reales.
 * El ZIP recibido contiene fotografías de trabajos, NO fichas técnicas de venta.
 * No inventar marca, SKU, disponibilidad, precios o imágenes de productos.
 * En una fase posterior puede conectarse una base de datos o CMS protegido.
 */
export type ProductCategory='bombas'|'filtros'|'clorinadores'|'iluminacion'|'accesorios';
export type Product={
 id:string;
 category:ProductCategory;
 name:string;
 description:string;
 image?:string;
 brand?:string;
 model?:string;
 // Publicar sólo después de que la empresa confirme precios/stock:
 priceCRC?:number;
 stock?:'disponible'|'por_consultar'|'agotado';
};
export const PRODUCTS:Product[]=[];
