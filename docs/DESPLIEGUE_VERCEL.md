# Preparacion de Vercel: Piscinas GDS

Revision: 27 de octubre de 2026, Costa Rica.

## Estado

El propietario autorizo el acceso oficial de Vercel CLI y posteriormente eligio
no activar pagos y dejar el despliegue pendiente. No se ha contratado un plan,
activado un periodo de prueba, comprado un dominio ni publicado el sitio.

La cuenta autorizada dispone de un equipo Hobby. El unico proyecto encontrado
en ese equipo pertenece a otro repositorio; no existe un proyecto GDS asociado.
Hobby limita el uso a proyectos personales no comerciales. Pro parte de
USD 20/mes para un desarrollador, mas impuestos y posible consumo adicional.
Cualquier contratacion requiere una nueva aprobacion expresa.

No hay URL remota de GDS, conexion GitHub-Vercel ni despliegues automaticos
activos. La autenticacion del CLI no establece por si sola esa conexion.
No se configuraron variables de entorno en Vercel. SITE_URL debe permanecer
sin configurar hasta aprobar el dominio HTTPS definitivo.

## Codigo revisado

- Repositorio: https://github.com/Yerickmondra15/D-soluciones
- Rama nueva: codex/gds-actualizacion-2026.
- Base funcional: df91ab1864ec7b5e8935a9ced177248cab71aaed.
- main remoto ya integra esa base en 653255ed963d30ef575eda754180992097c833aa.
- No se realizo un merge ni se modifico main durante esta preparacion.

Se uso un worktree separado para conservar el checkout original del propietario.
Los cambios de esta etapa son exclusivamente de preparacion y verificacion:

- Node.js 22.x fijado en package.json y lockfile.
- vercel.json: Next.js, npm ci y npm run build, raiz ./.
- .vercelignore: excluye documentos, pruebas, resultados y archivos de entorno
  del envio por CLI. No sustituye la proteccion de acceso del despliegue.
- .vercel/ ignorado por Git para no versionar la vinculacion local.
- metadataBase usa el dominio aprobado o el fallback de Next para Vercel;
  no fuerza localhost en un alojamiento remoto. El fallback no activa SEO.
- La plantilla .env.example deja SITE_URL vacio, sin sugerir un dominio aprobado.
- Prueba de regresion: preview noindex, sin canonical ni URLs en sitemap, e
  imagen OpenGraph absoluta con origen comprobable por variable de pruebas.

## Verificacion local

Ejecutada sobre Node.js 22.18.0, npm 10.9.3 y la compilacion de produccion,
servida temporalmente en 127.0.0.1:3001 sin alterar el servidor del propietario.
El servidor temporal de QA se detuvo al terminar.

| Comprobacion | Resultado |
| --- | --- |
| npm ci | Correcto, 366 paquetes desde el lockfile. |
| npm run typecheck | Correcto. |
| npm run lint | Correcto, sin errores ni advertencias. |
| npm run build | Correcto; paginas y metadatos estaticos. |
| npm run test:media | 3 pruebas correctas: manifiesto, EXIF y seis MP4 sin audio. |
| npm audit y npm audit --omit=dev | 0 vulnerabilidades reportadas. |
| npm run test:e2e | 31 correctas, 3 omitidas por dispositivo, 0 fallos y 0 flaky. |
| Axe en / y /productos | Sin infracciones detectadas con WCAG 2 A/AA y 2.1 AA, escritorio y movil. |
| Capturas | Inicio y contacto revisados en escritorio y movil; sin cambios visuales deliberados. |
| Configuracion | vercel.json y engines coherentes con el lockfile; git diff --check correcto. |

La compilacion uso VERCEL, VERCEL_ENV, VERCEL_URL y VERCEL_BRANCH_URL simuladas
con un hostname reservado .invalid. PLAYWRIGHT_EXPECTED_METADATA_ORIGIN hizo
que la regresion comprobara el origen exacto de OpenGraph. No representan una
URL remota ni variables configuradas en Vercel. SITE_URL estuvo ausente:
noindex, robots bloqueado, sitemap sin URLs y ausencia de canonical pasaron.

Se probaron acordeones, agua por scroll y WebGL (incluidos pixeles animados y
pausa fuera de pantalla), reduced-motion, modo liviano, fallback sin JavaScript,
menu movil, galeria, comparador, filtros, seis videos bajo demanda, formulario
y telefono correcto. WhatsApp se intercepto; no se enviaron mensajes reales.
Las rutas de documentos privados y .env devolvieron 404. Pasaron los controles
de cabeceras, ausencia de desbordamientos y errores de pagina capturados.
La busqueda local de patrones habituales de claves privadas y tokens no tuvo
coincidencias; no equivale a una auditoria exhaustiva de secretos.

Muestra local de 4G con CPU x4: FCP 2296 ms, DOMContentLoaded 4281 ms y
190018 bytes de scripts transferidos. No es Lighthouse ni una medicion remota
o un promedio. Next informa 187 kB de First Load JS en / y 176 kB en /productos.

El informe detallado y las capturas quedan en .qa/ (ignorado por Git y excluido
del despliegue). Las tres omisiones son el perfil 4G y el menu movil en
escritorio, y el cursor WebGL en movil. Firefox no se repitio por la restriccion
documentada de su ejecutable en este equipo. Safari y telefonos fisicos siguen
sin validar. Emulacion Chromium/Edge no equivale a iOS real.

No se declara verificacion remota ni equivalencia con una compilacion en Vercel.

## Pasos pendientes

1. Obtener autorizacion para un plan compatible con el uso comercial, o acordar
   otro proveedor. No activar pagos con la autorizacion antigua de OAuth.
2. Revisar de nuevo proyectos y plan para evitar duplicados.
3. Crear o vincular piscinas-gds con proteccion Vercel Authentication para
   All Deployments antes del primer despliegue o conexion que pueda dispararlo.
   No activar Password Protection ni otros complementos de pago.
4. Conectar solamente este repositorio mediante la autorizacion oficial de
   GitHub y comprobar los despliegues automaticos.
5. Desplegar primero la rama actualizada, registrar su SHA exacto y verificar
   la URL real bajo proteccion. La persona cliente debera iniciar sesion en
   Vercel y contar con acceso autorizado. No publicar enlaces de bypass.
6. Solicitar aprobacion antes de integrar nuevos cambios en main o promover
   una version a produccion. Mantener SITE_URL ausente para la demo.
7. Confirmar permisos de fotos, videos y propiedades, inventario y dominio.
   Las dos fotos con personas siguen fuera de public. No hacer publicos los
   demas medios mientras falten autorizaciones.
8. Repetir QA en el alojamiento real: rutas, medios, interacciones, consola,
   cabeceras, HTTPS, accesibilidad, rendimiento y dispositivos fisicos.

## Referencias oficiales

- https://vercel.com/docs/plans/hobby
- https://vercel.com/pricing
- https://vercel.com/docs/deployment-protection
- https://vercel.com/docs/project-configuration/vercel-json
- https://vercel.com/docs/environment-variables/system-environment-variables
