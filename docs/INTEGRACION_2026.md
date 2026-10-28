# Integración de Piscinas GDS

Fecha de revisión: 27 de octubre de 2026, Costa Rica.
Repositorio: `Yerickmondra15/D-soluciones`.
Rama: `codex/gds-actualizacion-2026`.

## Revisión de los materiales

Se compararon el prompt, el ZIP preliminar, el documento comercial oficial,
los contactos fotográficos y las seis páginas de la propuesta visual con el
repositorio existente. El remoto se consultó sin cambiar la rama principal;
no había commits posteriores a la copia local.

El documento comercial se utilizó como fuente de servicios, proceso, FAQ y
contacto. El PDF se utilizó como guía de estructura, no como confirmación de
precios, dominio, inventario o datos comerciales ilustrativos. El código del
ZIP se integró y corrigió; no se reemplazó el repositorio sin revisión.

## Implementado

- Marca Piscinas GDS, logo real y WhatsApp +506 8712-9222.
- Hero con fotografía real del proyecto Norberto y seis servicios oficiales.
- Comparador accesible con imágenes identificadas del mismo proyecto.
- Galería modal con flechas, Escape, ciclo de foco y devolución al disparador.
- Seis videos bajo demanda, uno activo por vez; sin pistas de audio.
- Catálogo de cinco categorías, búsqueda sin distinción de tildes, filtros,
  estado vacío y estructura de productos tipada sin inventario inventado.
- Información de empresa, proceso, asesoría técnica y ocho preguntas frecuentes.
- Formulario local con límites, validación, consentimiento y mensaje escapado.
  El visitante confirma el envío en WhatsApp; no hay API ni almacenamiento.
- WaterHoverSection con variables --x y --y, seguimiento suavizado por tiempo,
  reflejos inferiores, ondas sin rejilla y una sola superficie glass.
- WebGL con carga diferida, pausa real fuera de pantalla y pestaña oculta,
  reduced-motion, fallback estático, manejo de pérdida de contexto y limpieza.
- SEO es-CR, OpenGraph con imagen real, enlace para saltar al contenido,
  controles con etiquetas, menú móvil y estados de foco.
- CSP compatible con Next estático, nosniff, protección de iframes,
  Referrer-Policy y Permissions-Policy.

Se eliminaron componentes antiguos que contenían cifras, reseñas e imágenes
de ejemplo. Dos fotos con personas se conservaron en docs/media-pendiente-permiso,
fuera de public; el manifiesto registra su estado.

## Dependencias

Next 15.5.28 y React/React DOM 19.3.1. Se renovó el lockfile con nombre
piscinas-gds. Sharp 0.35.5, PostCSS 8.5.23, Nanoid 3.3.18 y Source Map JS
1.2.2 se fijan mediante overrides para evitar versiones transitivas señaladas
por npm. Las herramientas de desarrollo también se actualizaron sin force ni
saltos mayores. La instalación usa los certificados del sistema, sin desactivar TLS.

Referencia de seguridad consultada:
https://nextjs.org/blog/nextjs-security-update-october-14-2026

La CSP permite scripts inline generados por Next; no es una CSP estricta con
nonces. No permite scripts de terceros ni eval en producción. Mantiene la
generación estática y no se añadieron endpoints que reciban datos de clientes.

## Verificación

- TypeScript: correcto.
- Build de producción: correcto.
- Tres pruebas de medios: correctas. Manifiesto, archivos, EXIF y pistas MP4.
- npm audit --omit=dev: cero vulnerabilidades reportadas.
- npm audit completo: cero vulnerabilidades reportadas tras actualizar herramientas.
- Navegador: 16 pruebas correctas, 2 omitidas por dispositivo. El ciclo de foco,
  Escape y devolución del foco pasaron en escritorio y móvil. Se probaron tap y
  teclado en el comparador, filtros, formulario interceptado, seis videos,
  menú móvil, reduced-motion, pausa WebGL, pérdida de contexto y píxeles animados.
- Capturas revisadas en escritorio y móvil; pruebas de desbordamiento entre
  320 y 1920 px, carga de imágenes reales y fondo de agua no vacío.

No se midieron puntuaciones Lighthouse ni se probó en un teléfono físico.
Las pruebas móviles son emulación Chromium/Edge, no validación de Safari iOS.

## Pendientes de la empresa

1. Aprobar nombre, eslogan y permisos de publicación de fotos/videos/propiedades.
2. Entregar SKUs, modelos, marcas, fotos y existencias confirmadas para el inventario.
3. Confirmar dominio, correo, dirección, horarios, redes y política de privacidad,
   si se desea mostrarlos. Actualmente no se inventan ni se publican estos datos.
4. Configurar SITE_URL, HTTPS, HSTS y SEO de dominio al definir el alojamiento.
5. Aprobar publicación. No se desplegó ni se activó un dominio.

## Archivos principales

App: app/page.tsx, app/layout.tsx, app/globals.css, app/productos/page.tsx,
app/not-found.tsx. Secciones y widgets: components/. Contenido: data/ y lib/.
Medios: public/media y docs/. Infraestructura: next.config.mjs, package.json,
package-lock.json, eslint.config.mjs, playwright.config.ts y tests/.

Para ejecutar y mantener el proyecto, ver README.md.
