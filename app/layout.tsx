import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
 metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
 title:{default:'Piscinas GDS | Cuidado integral para su piscina',template:'%s | Piscinas GDS'},
 description:'Mantenimiento, construcción, remodelación, instalación de equipos, asesoramiento técnico y recuperación de agua para piscinas en Costa Rica.',
 keywords:['Piscinas GDS','piscinas Costa Rica','mantenimiento de piscinas','construcción de piscinas','recuperación de agua'],
 openGraph:{type:'website',locale:'es_CR',siteName:'Piscinas GDS',title:'Piscinas GDS | Cuidado integral para su piscina',description:'Conocé nuestros servicios y proyectos reales. Solicitá asesoramiento y cotizaciones por WhatsApp.',images:[{url:'/media/norberto-despues.webp',width:1280,height:960,alt:'Proyecto real de construcción de Piscinas GDS'}]},
 twitter:{card:'summary_large_image',title:'Piscinas GDS',description:'Cuidado integral para su piscina en Costa Rica.',images:['/media/norberto-despues.webp']},
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
 return <html lang="es-CR"><body>{children}</body></html>;
}
