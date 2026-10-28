# Decisiones, contenido y pendientes — Piscinas GDS

## Marca
- El documento más reciente entregado por la empresa usa **Piscinas GDS**, frase **Cuidado integral para su piscina** y número **8712 9222**.
- El wireframe anterior dice **GDS / Grupo D Soluciones**, mientras que el archivo de imagen oficial muestra **PISCINAS GDS** y otro banner muestra «Soluciones integrales para tu piscina». Preguntar cuál denominación y eslogan es definitivo antes de publicación. Por ahora se usa Piscinas GDS.
- Se adjuntan dos variaciones del logotipo y una imagen «PYME Costa Rica». No utilizar el gráfico PYME para alegar certificación oficial sin confirmación.

## Media revisada
- **51 fotos** y **6 videos** entregados. Todas las piezas están en `public/media` optimizadas (con originales nombrados en el manifiesto).
- Identificadores por los contactos (`docs/vistas-previas/contact_sheet_*.jpg`) para ordenar visualmente:
  - 01: logo blanco horizontal. 02: logo sobre fondo oscuro. 03: gráfico PYME.
  - 13: Norberto antes (excavación), 16–17: durante, 14–15: después. Estas sí están claramente etiquetadas como mismo proyecto; usar 13 + 14 en el comparador.
  - 44–45: Remodelación Villaseñor en ejecución; **no** emparejar automáticamente con otras fotos de piscina terminada sin validar que sean del mismo trabajo.
  - 31/34: mantenimiento con piscina limpia; 32/33: agua con residuos/mantenimiento.
  - 35–38: fotos de piscina clara o agua tratada; 39–42: agua verde/turbia. **No** afirmar que todas son la misma piscina antes/después.
  - 04–12 y 18–29: asesoría, cuarto de máquinas, bomba, filtros y equipos.
  - 47–56: remodelaciones y resultados; fotos útiles para galería y cards.
- Videos:
  - 05 (25s), 07 (23,7s) y 11 (23,7s): asesoramiento técnico/cuarto de máquinas.
  - 29 (16s): instalación de equipos.
  - 43 (11,4s): recuperación de agua (agua verde).
  - 57 (0,5s): clip de remodelación demasiado corto para un bloque principal; conservar para posible detalle.
- Los MP4 de uso web son versiones H.264 **sin audio**, decisión intencional para no mostrar conversación, ruidos o música de los originales. Los archivos originales permanecen en el ZIP que entregó la empresa.

## Servicios oficiales a presentar
1. Mantenimiento (aspirado, cepillado, limpieza filtros, parámetros químicos, revisión visual).
2. Construcción (residencial/comercial, espejo de agua, SPA; concreto, hidráulica, acabados, accesorios).
3. Remodelación (reparaciones, fugas visibles, cambio de revestimiento).
4. Instalación de equipos (bombas, filtros, clorinadores, luces y accesorios).
5. Asesoramiento técnico (dimensionamiento, equipos, cuarto de máquinas, obras).
6. Recuperación de agua (diagnóstico, ajustes químicos y seguimiento).

## Catálogo
- Se confirma la **venta de tipos de equipos**, no hay inventario detallado ni precios.
- `data/products.ts` define una estructura extensible de productos que sigue vacía. En `/productos` se ofrece contacto honesto mientras se espera el inventario.
- Para alimentar el catálogo, solicitar tabla Excel/CSV con `id`, `category`, `name`, `description`, `image`, `brand`, `model`, `priceCRC` (opcional), `stock` (opcional). No inventar valor de stock.
- Futuro: un panel de administración solo si lo necesitan y con autenticación, permisos, protección CSRF, validación de entradas, auditoría, backups y bloqueo de accesos. No implementar autenticación ficticia.

## Contacto y privacidad
- Canal de ventas confirmado: `+506 8712 9222`. Usa https://wa.me/50687129222.
- Formulario de contacto: no hace solicitudes al servidor; crea texto para WhatsApp desde el navegador. No guarda nombres, ubicaciones o conversaciones.
- Correo/dirección/horarios/redes: no confirmados; no mostrarlos.
- Confirmar permiso de uso público de fotos/videos y si aparecen personas o propiedades privadas antes del lanzamiento.

## Seguridad y publicación
- Cabeceras presentes: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`; sin APIs de envío ni credenciales en código.
- Pendiente: revisar CSP por origen de scripts, imágenes, estilos y hosts; no aplicar una regla que rompa Next/WebGL.
- Configurar HTTPS, HSTS **solo cuando el dominio y sus subdominios estén correctamente preparados**, análisis de dependencias, auditoría de accesibilidad y pruebas móviles.
- No anunciar una fecha de lanzamiento hasta verificar compilación, funcionalidad y dominio.
- El dominio `piscinasgds.com` era una **propuesta** de la presentación, no se comprobó disponibilidad ni propiedad.

## Validaciones exigidas antes del despliegue
- `npm install`, `npm run typecheck`, `npm run build`, `npm audit --omit=dev`.
- Usar teléfono móvil real para navegación, galería, formulario, videos, contraste y legibilidad.
- Lighthouse para rendimiento, accesibilidad y SEO (evitar afirmar métricas que no se han medido).
- Verificar enlaces WhatsApp y dominio final, páginas 404, robots/sitemap cuando haya hostname, manejo de privacidad.
