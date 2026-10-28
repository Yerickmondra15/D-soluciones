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
- OpenGraph usa DEPLOY_PRIME_URL, URL o DEPLOY_URL solo si NETLIFY=true;
  el dominio aprobado SITE_URL prevalece cuando se configure en el futuro.
- Indexacion, canonical y sitemap siguen dependiendo exclusivamente de SITE_URL.
- No se incorporan base de datos, autenticacion del sitio, tienda ni pagos.

## Verificacion previa

- npm ci: correcto, 366 paquetes desde lockfile.
- npm run typecheck: correcto.
- npm run lint: correcto.
- npm run test:seo: 9 pruebas correctas, incluida separacion de OpenGraph y SEO.
- npm run test:media: 3 pruebas correctas, manifiesto, EXIF y seis MP4 sin audio.
- npm audit: 0 vulnerabilidades reportadas.
- npm run build: correcto, paginas y metadatos estaticos; First Load JS de
  187 kB en / y 176 kB en /productos, sin cambios respecto a la base revisada.
- La compilacion local simulo NETLIFY y URLs con hostname reservado .invalid;
  no representa un despliegue real. La verificacion remota sigue pendiente.

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

## Referencias oficiales

- https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
- https://docs.netlify.com/build/configure-builds/manage-dependencies/
- https://docs.netlify.com/build/configure-builds/environment-variables/
- https://docs.netlify.com/manage/security/secure-access-to-sites/project-visibility/
- https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/
- https://www.netlify.com/pricing/
