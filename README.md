# Piscinas GDS

Actualización integrada al proyecto Next.js, React, TypeScript y Tailwind existente.
Rama de trabajo: `codex/gds-actualizacion-2026`. El despliegue en Vercel queda
pendiente por decisión del propietario de no activar un plan de pago.

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
npm run lint
npm run test:media
npm run build
npm audit
npm audit --omit=dev
```

Con el servidor local en ejecución:

```sh
npm run test:e2e
```

Las pruebas de Playwright utilizan Microsoft Edge instalado y perfiles de escritorio
y celular. Se puede cambiar la URL con `PLAYWRIGHT_BASE_URL`. Las pruebas del
formulario interceptan WhatsApp: no envían mensajes reales.

La iteración de animaciones usa Motion para altura, layout y scroll nativo.
Incluye pruebas de movimiento real y auditoría axe de las dos rutas. Firefox es
opcional con `PLAYWRIGHT_FIREFOX=1`; requiere un runtime de Playwright que el
equipo permita ejecutar. En este equipo se descargó pero no pudo iniciarse,
por lo que no se declara validación en ese motor.

Ver `docs/ANIMACIONES_Y_QA_2026.md` para la matriz de la propuesta, evidencias,
resultados de QA y pasos de subida manual sin merge ni publicación automática.

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
inventario, dominio y política de privacidad. Configurar `SITE_URL` solamente con
el dominio definitivo aprobado (ver `.env.example`). Sin esa variable, Next usa
las variables de sistema de Vercel para las imágenes OpenGraph sin habilitar
indexación, canonical ni entradas en sitemap. HTTPS y HSTS se
configuran en el alojamiento con el dominio aprobado. Canonical, robots y sitemap
ya se generan de forma condicionada al hostname definitivo.
Sin SITE_URL HTTPS aprobado, el preview lleva noindex y robots bloquea indexación.
Correo, dirección, horarios, redes, reseñas y cifras no se muestran sin confirmación.

La auditoría de dependencias no sustituye una revisión completa de seguridad.

## Preparación de Vercel

`vercel.json` fija Next.js, `npm ci` y `npm run build`; el directorio raíz es `./`
y `engines` fija Node.js 22.x. `.vercelignore` excluye documentos internos,
pruebas, resultados y archivos de entorno del envío por CLI. No sustituye el
control de acceso del repositorio ni la protección del despliegue.

No hay proyecto GDS creado o conectado a Vercel ni despliegue automático activo.
Hobby solo permite uso personal no comercial. No contratar ni activar Pro sin
autorización expresa del propietario. Antes del primer despliegue, configurar
Vercel Authentication para All Deployments y verificar que las fotografías y
videos no queden accesibles sin autorización. Mantener `SITE_URL` sin configurar
en la demo. No habilitar Password Protection ni otros complementos de pago.

Ver `docs/DESPLIEGUE_VERCEL.md` para el estado y las comprobaciones de esta etapa.
