# Piscinas GDS

Actualización integrada al proyecto Next.js, React, TypeScript y Tailwind existente.
Rama de trabajo: `codex/gds-actualizacion-2026`. No se publica automáticamente.

## Desarrollo local

Requiere Node.js 22 LTS y npm.

```sh
npm ci
npm run dev
```

Abrir http://localhost:3000. Para revisar la versión de producción:

```sh
npm run build
npm start
```

Si la red utiliza certificados del almacén de Windows, usar
`$env:NODE_OPTIONS = "--use-system-ca"` en PowerShell antes de npm.
No desactivar la verificación TLS.

## Comprobaciones

```sh
npm run typecheck
npm run test:media
npm run build
npm audit --omit=dev
```

Con el servidor local en ejecución:

```sh
npm run test:e2e
```

Las pruebas de Playwright utilizan Microsoft Edge instalado y perfiles de escritorio
y celular. Se puede cambiar la URL con `PLAYWRIGHT_BASE_URL`. Las pruebas del
formulario interceptan WhatsApp: no envían mensajes reales.

## Contenido y estructura

- `data/site.ts`: seis servicios, preguntas frecuentes, contacto, galería y videos.
- `data/products.ts`: estructura tipada; inventario vacío de forma intencional.
- `data/media-manifest.json`: trazabilidad de las 57 piezas originales.
- `docs/referencias`: información comercial oficial y propuesta visual.
- `public/media`: imágenes WebP y videos locales utilizados por el sitio.
- `docs/media-pendiente-permiso`: dos fotografías con personas, fuera del área pública.
- `components/WaterHoverSection.tsx`: seguimiento suavizado y variables CSS del agua.
- `components/ui/water-ripple-image.tsx`: shader, pausa por visibilidad, movimiento
  reducido, fallback estático y liberación de recursos WebGL.

El formulario prepara un mensaje para **+506 8712-9222**. No existe API de correo,
almacenamiento de consultas, seguimiento comercial ni envío automático.

## Actualizar productos

Agregar referencias confirmadas a `PRODUCTS` en `data/products.ts`, con `id`,
`category`, `name` y `description`. Imagen, marca, modelo, precio en colones y
existencia son opcionales. Las categorías válidas están definidas en ese archivo.
No cargar fotos de instalaciones como si fueran productos disponibles en stock.
La ruta `/productos` usa el inventario cuando tiene elementos; mientras tanto,
muestra las cinco categorías con el aviso "Inventario por confirmar".

## Seguridad y publicación

Next 15.5.28 y React 19.3.1 están fijados en el lockfile. Los overrides de PostCSS,
Nanoid, Source Map JS y Sharp actualizan dependencias transitivas señaladas por npm.
Revisarlos junto con futuras actualizaciones, no eliminarlos sin repetir la auditoría.

Las cabeceras incluyen CSP, nosniff, bloqueo de iframes, Referrer-Policy y
Permissions-Policy. La CSP admite los scripts inline generados por Next para
conservar la generación estática; no permite scripts de terceros ni eval en
producción. Una CSP estricta con nonces requeriría renderizado dinámico.

Antes de publicar: confirmar marca y eslogan, permisos de fotos y propiedades,
inventario, dominio y política de privacidad. Configurar `SITE_URL` con el dominio
aprobado para los enlaces OpenGraph (ver `.env.example`). HTTPS, HSTS, canonical,
robots y sitemap se deben finalizar con el alojamiento y hostname definitivos.
Correo, dirección, horarios, redes, reseñas y cifras no se muestran sin confirmación.

La auditoría de dependencias no sustituye una revisión completa de seguridad.
