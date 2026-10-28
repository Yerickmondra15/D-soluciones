# Demo de Piscinas GDS en Netlify Free

Fecha: 27 de octubre de 2026, Costa Rica.

## Alcance y autorizaciones

- Publicar la rama codex/gds-actualizacion-2026 sin modificar main.
- Usar exclusivamente Free, subdominio netlify.app y servicios de costo cero.
- La cuenta se registro mediante GitHub; el propietario completo OAuth.
- El dashboard confirmo Free, 300 creditos y ningun metodo de pago guardado.
- El propietario confirmo autorizacion para los medios que ya usa la web.
- Las dos fotos separadas en docs/media-pendiente-permiso no forman parte del sitio.
- SITE_URL permanece sin configurar: la demo no debe indexarse.
- No se solicitan ni registran contrasenas o tokens en documentos ni codigo.

## Configuracion

- Repositorio unico del proyecto: Yerickmondra15/D-soluciones.
- Base revisada: 8e7b16dc56427664a767829c4019c5f027fd06a0.
- Rama de publicacion elegida: codex/gds-actualizacion-2026.
- Nombre elegido, disponible al revisar: piscinas-gds.
- Next.js 15.5.28, React 19.3.1 y Motion 14.7.1.
- Next.js Runtime/OpenNext oficial detectado automaticamente por Netlify.
- Raiz ./, build npm run build y publish .next.
- Node.js 22 mediante .node-version y engines; sin duplicar en netlify.toml.
- .netlify/ ignorado por Git. vercel.json se conserva como configuracion historica
  de otro proveedor y no configura este despliegue.
- No se hace exportacion estatica ni se eliminan funciones para alojarlo.
- OpenGraph usa URL cuando CONTEXT=production; en otros contextos prioriza
  DEPLOY_PRIME_URL, con URL o DEPLOY_URL como fallback, solo si NETLIFY=true;
  el dominio aprobado SITE_URL prevalece cuando se configure en el futuro.
- Indexacion, canonical y sitemap siguen dependiendo exclusivamente de SITE_URL.
- No se incorporan base de datos, autenticacion del sitio, tienda ni pagos.

## Verificacion previa

- npm ci: correcto, 366 paquetes desde lockfile.
- npm run typecheck: correcto.
- npm run lint: correcto.
- npm run test:seo: 10 pruebas correctas, incluida separacion de OpenGraph y SEO.
- npm run test:media: 3 pruebas correctas, manifiesto, EXIF y seis MP4 sin audio.
- npm audit: 0 vulnerabilidades reportadas.
- npm run build: correcto, paginas y metadatos estaticos; First Load JS de
  187 kB en / y 176 kB en /productos, sin cambios respecto a la base revisada.
- La compilacion local simulo NETLIFY y URLs con hostname reservado .invalid;
  no representa un despliegue real. La verificacion remota se detalla abajo.

## Primer despliegue y correccion

El proyecto se creo inicialmente privado. El acceso anonimo devolvio 401 antes
de publicar. Tras la confirmacion expresa del propietario, se eligio Make public
para produccion; los deploy previews permanecen privados. Inicio, productos,
robots y sitemap devolvieron 200 por HTTPS sin cookies ni sesion de Netlify.

El primer build remoto uso Node.js 22.23.4, npm 10.9.9 y Next.js Runtime 5.16.3.
Compilo correctamente el commit 3ab773f8e4ff5d6915c7a10ff5d7cded9e2fd259.
La prueba remota encontro que OpenGraph tomaba la URL de rama de Netlify en
vez de la URL principal publica. Se interrumpio la primera bateria para corregir
el origen en produccion, agregar una regresion de contexto y comprobar tambien
la descarga publica real de la imagen. La bateria completa se repitio sobre el
despliegue corregido, con los resultados siguientes.

Netlify Free incorporo un distintivo flotante por defecto. Se desactivo mediante
el ajuste oficial sin costo ni cambio de plan, conservando el diseno de la app.

## Publicacion verificada

- URL para compartir: https://piscinas-gds.netlify.app
- Catalogo: https://piscinas-gds.netlify.app/productos
- Dashboard: https://app.netlify.com/projects/piscinas-gds/overview
- Version funcional probada: 8e4dba3c68f9496b9d4843407c03e05f4bc017af.
- Deploy corregido: 6ae17e858480891985526d02, publicado automaticamente por GitHub.
- Rama de produccion: codex/gds-actualizacion-2026. main no se modifico.
- El dashboard confirma auto publishing activo y builds Active.
- Produccion Public, Deploy Previews Private y distintivo desactivado.
- Ninguna variable de entorno personalizada; SITE_URL ausente.
- La cuenta sigue Free, USD 0.00, sin tarjeta guardada ni compras de dominios.
- No se activaron recargas, pruebas de pago ni complementos.

Este informe puede quedar incluido en un commit posterior solo de documentacion.
El SHA del ultimo deploy debe confirmarse en el dashboard; no confundir el hash
del codigo funcional probado con el de una actualizacion posterior del informe.

## Pruebas Reales

Ejecutadas contra la URL publica de Netlify desde contextos sin cookies de login.

| Comprobacion | Resultado |
| --- | --- |
| Playwright, Edge/Chromium escritorio y movil | 31 correctas, 3 omitidas por dispositivo, 0 fallos, 0 flaky. |
| Inicio y /productos | HTTP 200, navegacion y render correctos. |
| Medios | 61 archivos del manifiesto y posters responden 200 con tipo imagen/video. |
| Imagenes renderizadas | 33 en inicio y 7 en catalogo decodificadas por perfil; sin solicitudes fallidas. |
| Videos | Seis clips reproducidos; carga bajo demanda, uno activo y descarga fuera de pantalla. |
| Agua y movimiento | Scroll reversible, alturas intermedias de acordeones, WebGL con pixeles animados, pausa, fallback y reduced-motion correctos. |
| Interacciones | Galeria, foco/Escape, comparador, filtros, busqueda, menu movil y formulario correctos. |
| WhatsApp | +506 8712-9222 y texto codificado correctos; envio interceptado, sin mensajes reales. |
| Accesibilidad axe | Sin infracciones detectadas con reglas WCAG 2 A/AA y 2.1 AA en ambas rutas y perfiles. |
| Consola e hidratacion | Sin errores de consola o de pagina en cuatro comprobaciones de ruta/perfil. |
| HTTPS y cabeceras | CSP, nosniff, DENY, Referrer-Policy, Permissions-Policy y HSTS presentes en ambas rutas. |
| SEO de demo | noindex, robots Disallow, sitemap vacio, sin canonical; imagen OpenGraph publica con HTTP 200. |
| Archivos internos | /.env y ruta de documento interno devuelven 404. |
| Carga inicial | Ninguna solicitud MP4 sin interaccion; un canvas en inicio, ninguno en catalogo. |
| Capturas | Inicio y catalogo revisados en escritorio y movil, sin distintivo ni desbordamientos detectados. |

La muestra remota con 4G simulado y CPU x4 arrojo FCP 1764 ms,
DOMContentLoaded 2194 ms y 182188 bytes de scripts transferidos. Es una muestra
de laboratorio sobre la URL real, no Lighthouse, un promedio ni un telefono real.
No se midieron LCP ni puntuaciones de Core Web Vitals.

En otra comprobacion con CDP, el heap JavaScript observado fue de unos 9.5 MB
en inicio y 6.1 MB en catalogo. No representa la RAM total del navegador o de
las texturas WebGL, ni constituye una garantia para cualquier dispositivo.

Las tres omisiones son el menu movil y el perfil 4G en escritorio, y la prueba
de cursor WebGL en movil. Firefox no se repitio por la restriccion de ejecucion
ya documentada en este equipo. Safari/iOS y telefonos fisicos siguen pendientes.

Evidencias locales ignoradas por Git, no publicadas en Netlify:
.qa/playwright-results.json, .qa/netlify-assets.json, .qa/netlify-browser.json y
capturas .qa/netlify-*.png. Los dos scripts de comprobacion complementaria se
conservan en .qa/netlify-assets.mjs y .qa/netlify-browser.mjs.

Las pruebas SEO importan TypeScript con el soporte nativo de Node 22.18.0.
Node puede mostrar una advertencia de deteccion de tipo de modulo durante esas
pruebas; no cambia el tipo de modulo de la aplicacion ni afecta al build de Next.

## Visibilidad y limites

Los proyectos nuevos pueden estar Private. En ese estado necesitan sesion de
Netlify y no satisfacen el acceso directo desde los celulares de la empresa.
Public permite acceso a cualquiera con la URL, no solo a quienes reciban el
mensaje de WhatsApp. Noindex no es una proteccion de acceso.

Confirmar Public en el dashboard antes de compartir y comprobarlo sin sesion.
No activar proteccion con contrasena de pago ni utilizar enlaces de bypass.

Free incluye 300 creditos mensuales, limite estricto y sin recarga automatica.
Si se agotan, los proyectos pueden pausarse hasta el siguiente periodo. Los
videos consumen transferencia; mantener su reproduccion bajo demanda. No se
promete disponibilidad ilimitada ni ausencia de consumo de creditos.

## Pendientes de la empresa

- Inventario real, marcas, modelos, precios y existencias.
- Dominio definitivo y autorizacion para activar SEO mediante SITE_URL.
- Datos adicionales y politica de privacidad si se requiere publicarlos.
- Pruebas en telefonos fisicos y Safari/iOS; la emulacion no los sustituye.
- El repositorio GitHub es publico. Que docs no se sirva en Netlify no lo hace
  privado en GitHub: revisar los documentos y medios internos ya versionados.
  No se cambio la visibilidad del repositorio ni se reescribio su historial.

## Referencias oficiales

- https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
- https://docs.netlify.com/build/configure-builds/manage-dependencies/
- https://docs.netlify.com/build/configure-builds/environment-variables/
- https://docs.netlify.com/manage/security/secure-access-to-sites/project-visibility/
- https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/
- https://www.netlify.com/pricing/
- https://docs.netlify.com/manage/projects/powered-by-netlify-badge/
