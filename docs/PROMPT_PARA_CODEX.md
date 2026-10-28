# PROMPT PARA CODEX — Implementar actualización final de Piscinas GDS

Actuá como desarrollador full-stack senior con criterio de UI/UX, optimización de medios, seguridad, accesibilidad y conversión comercial. **Trabajá sobre el repositorio existente** `Yerickmondra15/D-soluciones` (Next.js + React + TypeScript + Tailwind), no creés una página nueva aislada sin integrar al proyecto principal. Revisá el estado actual antes de hacer cambios y creá una rama de trabajo.

Recibirás este ZIP `GDS_Actualizacion_2026.zip` con el código preliminar, imágenes y videos optimizados, el manifiesto, los documentos reales de la empresa y esta guía. **Tu objetivo es terminar, probar e integrar la actualización** del proyecto existente, cuidando que la aplicación quede estable, atractiva y segura, sin contenido inventado.

## Antecedentes y lineamientos de 3 conversaciones anteriores

1. Se preparó una propuesta en wireframes para una landing fácil de usar, destinada a clientes que buscan servicios y equipos para piscinas. Secciones: Inicio, Nosotros, Servicios, Productos y Contacto; además de footer y contacto directo por WhatsApp. La propuesta menciona un dominio sugerido y precio del desarrollo: **estos datos NO van en la web**.
2. Se eligió una estética moderna inspirada en páginas de piscinas: fotografías grandes, separación de secciones con forma de ola, transiciones, tarjetas bien trabajadas y **efecto de agua interactivo** cuando el mouse pasa por un área inferior.
3. Se programó una landing inicial Next.js + React + TypeScript + Tailwind con header responsive, hero, servicios, antes/después, proceso, testimonios y métricas, CTA final, mouse tracker y shader WebGL `WaterRippleImage` sin rejilla, integrado en un área glassmorphism. Se compiló en una fase anterior. El repositorio GitHub ya existe; revisalo porque puede haber cambios posteriores.

El diseño nuevo debe sentirse premium y contemporáneo, con microinteracciones sutiles, sin saturar la página de animaciones. Mantener azul acuático / azul profundo / blanco y adaptar al logo verdadero. Atención a celular. Referencias visuales: portafolios con interacciones pulidas y landing de dashboards modernos, **pero con una identidad comercial confiable**; no convertirla en videojuego.

## Material y reglas de veracidad

- **Fuente comercial oficial:** `docs/referencias/Informacion_Piscinas_GDS.docx`. Contiene 6 servicios, descripciones, beneficios, proceso, preguntas frecuentes y WhatsApp **8712 9222**.
- **Estructura propuesta:** `docs/referencias/Propuesta_visual_GDS.pdf`. Los textos del wireframe son ilustrativos; no presentarlos como datos confirmados.
- **Multimedia:** `public/media` + `data/media-manifest.json` + `docs/vistas-previas` (51 fotos, 6 videos). Revisar fotos y clips, no elegir automáticamente por filename.
- Marca usada en documento final: **Piscinas GDS**; el histórico usaba Grupo D Soluciones. Mostrar Piscinas GDS mientras la empresa confirma nombre y eslogan definitivos.
- Nunca afirmar datos que no proporcionó la empresa: años, cantidad de trabajos, satisfacción, reseñas, marcas, modelos, descuentos, precios, horarios, dirección, correo ni disponibilidad 24/7.
- Quitar los datos falsos heredados del sitio: teléfonos mexicanos, dirección Guadalajara, `hola@gds.com.mx`, testimonios y métricas inventadas, imágenes Unsplash genéricas como proyectos reales.

## Diseño e interacciones prioritarias

1. Header fijo y transparente o glassmorphism con logo verdadero, navegación usable y menú móvil que cierre al navegar.
2. Hero con fotografía REAL, copy principal, botón de cotización y acceso a proyectos.
3. 6 cards de servicios verificadas, con detalles expandibles, CTA WhatsApp con nombre del servicio.
4. Comparador antes/después con `Norberto-Antes` y `Norberto-Despues`, **solo porque están identificadas como mismo proyecto**. Usar `<input type="range">` accesible (teclado y tacto), rendimiento fluido.
5. Galería de trabajos reales con ampliación modal, cierre Escape, navegación por flechas, buenas etiquetas y Lazy Loading. Comprobar focus trap y devolución del foco al botón de apertura.
6. Videos optimizados en tarjetas con imagen de portada y reproducción al tocar; no autoplay de todos ni sonido no autorizado. No cargar 6 videos completos de golpe.
7. Tipos de equipos confirmados: bombas, filtros, clorinadores, luces y accesorios. Catálogo avanzado /productos con barra de búsqueda/filtros y estructura de datos de producto; mostrar estado «inventario por confirmar» si no hay SKUs.
8. Sobre nosotros / valores con información auténtica, etapa 1 contacto → evaluación → cotización → ejecución, bloque de asesoramiento técnico, FAQ reales.
9. CTA final con **efecto de agua interactivo**; preservar o mejorar shader WebGL existente. Respetar reduced-motion, fallback sin WebGL, pausarlo cuando no está visible y liberar recursos.
10. Contacto por WhatsApp al `+50687129222`: formulario de cliente que genera mensaje y deja al usuario confirmar su envío; si luego se requiere un formulario real de correo, agregar backend seguro y proveedor configurado en variables de entorno, jamás claves en frontend.
11. SEO semántico en español de Costa Rica, títulos, meta description, OpenGraph con imagen real, estructura H1–H3, navegación por teclado y contraste.
12. Animaciones al scroll suaves y estados hover enfocados en feedback útil, no efectos pesados. Sin bloquear clics ni animaciones que dificulten leer.

## Arquitectura

- Partir de la estructura del repositorio; esta actualización se entregó en archivos `app/`, `components/`, `data/`, `lib/`, `public/media/`. Si hay conflictos con archivos nuevos, hacer merge cuidadoso.
- Reutilizar Server Components en secciones estáticas y Client Components solo en widgets interactivos.
- Catálogo: `data/products.ts` (vacío de forma intencional), estructura tipada; ofrecer una manera simple y sostenible de actualizar referencias. No crear un panel de administración ficticio. Puede bastar un JSON/TS importado para el lanzamiento; prever migración futura a CMS o base de datos.
- Mantener `next/image` para fotos reales. WebP local y `sizes`, `loading=lazy` en medios no prioritarios.
- `public/media` contiene archivos web sin EXIF y sin audio original. Evitar recopilar datos personales o usar imágenes con personas sin validación de autorización pública.

## Seguridad urgente

**El repositorio original declaró Next.js `^15.1.0` y tenía un lockfile heredado de “aquaviva-landing”.** En octubre de 2026 hay advisories críticos; como mínimo usar **Next.js 15.5.28** si se permanece en 15.x. En este ZIP se propone Next 15.5.28 y React 19.3.1, pero verificar versiones seguras y compatibilidad actuales antes de producción. Ejecutar `npm install`, regenerar y COMMIT del lockfile, `npm audit --omit=dev`, typecheck, build y revisión de dependencias. No dejar `next lint` si se decide migrar a Next 16; actualizar script y ESLint.

Verificar: cabeceras `nosniff`, clickjacking, Referrer/Permissions; política CSP realista compatible con Next; HTTPS y HSTS tras definir dominio; secretos solo servidor; sin cargar scripts externos arbitrarios; entradas con longitud máxima y validación; sin endpoints de correo inseguros; no exponer archivos `.env`, rutas internas o datos de clientes. Configurar rate limiting y antispam **si** agregás API para formularios, no hace falta para el formulario WhatsApp local.

## Criterios de aceptación

- Página sin datos mexicanos, testimonios ni cifras falsas.
- Seis servicios oficiales correctos; información fiel al DOCX.
- Hero y galería con imágenes reales, comparador Norberto auténtico, videos usables.
- WhatsApp al +50687129222 y texto adaptado al servicio/equipo.
- Catálogo usable aunque sin inventario, listo para agregar productos reales.
- Header, mobile nav, filtros, antes/después, modal, videos, FAQ, formulario y CTA de agua funcionando.
- Accesibilidad razonable: teclado, labels, alt, foco modal, reduced motion, semántica y contraste.
- Pruebas reales `npm run typecheck`, `npm run build` y análisis de dependencias superadas.
- No publicar ni activar dominio sin aprobación del cliente. Trabajar en rama y mostrar resumen de cambios, archivos tocados y pendientes verificables.

## Entrega solicitada

Implementá y corregí por tu cuenta, no te limitéis a devolver ideas. Reportá el resultado real de las pruebas, los cambios realizados, lo que faltó por información de la empresa y el modo de ejecutar en local. Si hay un bloqueante específico, describilo con claridad; no inventés que las pruebas pasaron.
