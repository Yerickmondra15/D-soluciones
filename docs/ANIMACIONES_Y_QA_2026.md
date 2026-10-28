# Piscinas GDS: animaciones y revisión final

Trabajo local sobre `codex/gds-actualizacion-2026`, partiendo de `0134a48`.
No se hace push, merge, deploy ni registro de dominio.

## Cambios implementados

- AnimatedDisclosure: altura real 0/altura natural medida, texto y rotación coordinados, cierre
  completo antes de cerrar el details nativo, IDs estables, aria-expanded y
  aria-controls. Sin JavaScript conserva el comportamiento nativo.
- ScrollWaterTransition: cinta fotográfica en los últimos 115 px del hero
  (84 px móvil). useScroll/useTransform/useSpring relacionan el borde de agua,
  refracción visual y reflejos con el desplazamiento en ambos sentidos.
  Responde al cursor, no captura scroll y no agrega altura a la página.
- El hero conserva foto y contenido; entrada escalonada visible desde SSR.
- Reveal: entradas de tarjetas, fotografías y proceso, sin ocultar secciones
  antes de cargar JavaScript. Hover discreto y foco visible.
- Galería: apertura/cierre y cambio de fotografía animados, conservando dialog
  nativo, Escape, ciclo de foco, bloqueo de scroll y retorno al disparador.
- Catálogo: entradas/salidas y cambios de posición al filtrar; los elementos
  retirados son inert y no reciben foco durante su salida.
- Menú: expansión/cierre animados e inert durante el cierre. Header compacto
  después de 24 px; actualiza React solo al cruzar ese umbral.
- Videos: poster primero, un clip activo, pausa y descarga al salir de pantalla
  o al ocultar la pestaña. Sin reproducción automática masiva.
- CTA: se conserva el único canvas WebGL. Pausa de RAF y ondas CSS por
  visibilidad, DPR máximo 1 en táctil, fallback en ahorro de datos, equipos de
  memoria limitada y reduced-motion. Recursos con cleanup.

Se añade Motion como único motor de animación. No se utilizan Three.js, GSAP,
Lenis ni un scroll personalizado. La transición superior es fotográfica/CSS,
no otra simulación, para no duplicar el coste de WebGL.

## Cobertura de la propuesta

La matriz se verificó contra el PDF de seis páginas en docs/referencias.
Los ejemplos y el precio interno de la propuesta no son contenido comercial.

| PDF | Ruta / componente | Estado | Evidencia |
| --- | --- | --- | --- |
| 1. Inicio | /, Hero, Header | Cumple | Logo y marca, frase oficial, foto real, cotización WhatsApp y navegación a servicios/proyectos. |
| 2. Nosotros | /#nosotros, About | Cumple | Presentación, asesoría y trato profesional, sin cifras ni experiencia inventadas. |
| 3. Servicios | /#servicios, Services | Cumple | Seis áreas oficiales, descripción, detalles y mensaje específico por servicio. |
| 4. Productos | /productos, EquipmentCatalog | Parcial por datos del cliente | Cinco categorías verificadas, búsqueda y filtros; referencias, precios y stock pendientes. |
| 5. Contacto | /#contacto, Contact | Cumple; datos adicionales pendientes | WhatsApp +50687129222, formulario local y zona atendida. No se inventan correo ni redes. |
| 6. Footer | Footer en ambas rutas | Cumple | Marca, navegación, servicios, teléfono y zona. Redes omitidas por falta de datos. |

## Seguridad, SEO y accesibilidad

Se conservan los servicios y datos del DOCX, el emparejamiento del proyecto
Norberto, las fotos y los videos de la empresa. Los nombres de los archivos
públicos se neutralizaron; el manifiesto conserva su trazabilidad original.
Las dos fotos con personas continúan fuera de public.

Se añaden robots y sitemap condicionados al dominio aprobado. Sin SITE_URL
HTTPS válido, el preview es noindex, robots impide indexación y sitemap queda
vacío. Canonical se genera por ruta solo con hostname configurado.

La CSP mantiene scripts inline necesarios para Next estático y estilos
dinámicos; no scripts de terceros ni eval en producción. Siguen nosniff,
X-Frame-Options, Referrer-Policy y Permissions-Policy. Una CSP estricta con
nonces no se introduce sin evaluar el coste de renderizado dinámico.

No hay API, base de datos ni almacenamiento de consultas. WhatsApp recibe
texto codificado y el visitante confirma el envío. Se revisan enlaces externos,
campos limitados, datos no confirmados y rutas privadas.

## QA

Capturas de referencia de 1440 y 375 px antes de editar: .qa/before-motion-*.
Pruebas de regresión existentes conservadas y nuevos escenarios en
tests/motion.spec.ts.

| Verificación ejecutada | Resultado final |
| --- | --- |
| npm ci | Correcto; instalación limpia desde el lockfile con certificados del sistema. |
| npm run typecheck | Correcto. |
| npm run lint | Correcto, sin errores ni advertencias. |
| npm run build | Correcto; páginas y rutas de metadatos estáticas. |
| npm run test:media | 3 pruebas correctas. |
| npm run test:e2e | 31 correctas, 3 omitidas por dispositivo, 0 fallos, 0 flaky. |
| Auditoría axe | Sin infracciones detectadas con reglas WCAG 2 A/AA y 2.1 AA en / y /productos, escritorio y móvil. |
| npm audit --omit=dev y npm audit completo | 0 vulnerabilidades reportadas. |

Se conservaron los 16 escenarios aplicables de la entrega anterior y se
añadieron 15 comprobaciones aplicables. Las omisiones corresponden al menú
móvil en escritorio, al perfil 4G en escritorio y al cursor WebGL en móvil.
Se comprobaron anchos de 320, 360, 375, 390, 680, 768, 1024, 1440 y 1920 px
entre pruebas y capturas; mouse, tap, teclado, Escape y reduced-motion.

La medición por RAF verifica una altura inicial cerrada de 0 px y múltiples
alturas intermedias, no solo el cambio del icono. En escritorio: máximo 135.95 px,
3 muestras intermedias de apertura y cierre hasta 0. En móvil de 360 px:
máximo 182.73 px, 4 muestras intermedias de apertura y cierre hasta 0.
También pasaron apertura repetida, dos tarjetas abiertas y FAQ por Enter/Espacio.

Las ejecuciones exploratorias detectaron el salto de la primera apertura
nativa; se corrigió con altura medida y MotionValues inicializados en cero,
controles con cleanup y fallback nativo antes de la mejora progresiva. La
aserción del catálogo ahora espera la lista final durante la animación de salida,
manteniendo las verificaciones de búsqueda, filtros y estado vacío.

Firefox se descargó, pero su ejecutable no firmado no pudo iniciarse en este
equipo (spawn UNKNOWN). No se desactivaron políticas de seguridad ni se declara
ese motor como aprobado. Su proyecto queda opcional con PLAYWRIGHT_FIREFOX=1
para un entorno que permita ejecutar el runtime. Safari/iOS y teléfonos físicos
siguen pendientes; emular un iPhone con Chromium no los sustituye.

El perfil de rendimiento usa Chromium móvil con 1.6 Mbps de bajada, 750 kbps
de subida, 150 ms de latencia y CPU x4. No equivale a Lighthouse ni a un
teléfono real. Los resultados se adjuntan a las pruebas, sin prometer métricas
comerciales. La auditoría automática tampoco certifica cumplimiento WCAG total.

Muestra final 4G/CPU x4: FCP 1748 ms (1,75 s); DOMContentLoaded 7330 ms (7,33 s); transferencia
de scripts 190,016 bytes. Es una muestra local simulada, no un promedio ni una
puntuación Lighthouse. La información y los enlaces SSR son visibles antes de
terminar la hidratación. No se midió LCP ni una mejora temporal frente al estado anterior.

First Load JS de Next: inicio 187 kB y catálogo 176 kB; entrega anterior 123 kB
y 117 kB, respectivamente. Motion añade aproximadamente 64 kB al inicio. No se
oculta ese coste ni se afirma una mejora de velocidad: se compensa evitando
otra simulación, reutilizando una textura ya usada por el contacto, limitando
DPR, cargando videos bajo demanda y manteniendo contenido SSR y scroll nativo.

Evidencias locales de la versión final:
- [Escritorio](qa-animations/desktop.png) y [móvil](qa-animations/mobile.png).
- [Acordeón abierto en escritorio](qa-animations/acordeon-desktop.png) y [móvil](qa-animations/acordeon-mobile.png).
- [Movimiento en escritorio](qa-animations/interacciones-desktop.webm) y [móvil](qa-animations/interacciones-mobile.webm).
- Informe detallado de ejecución: .qa/playwright-results.json (no versionado).

## Pendientes de la empresa

1. Inventario real, referencias, marcas, modelos, imágenes, precios y stock.
2. Confirmar marca/eslogan finales y permisos de medios, terceros y propiedades.
3. Correo, redes, horarios y dirección, solo si se desea publicarlos.
4. Dominio, alojamiento, HTTPS/HSTS y política de privacidad antes del lanzamiento.
5. Revisión física en iOS/Android y aprobación para compartir el preview.

## Subir manualmente sin tocar main

Desde esta carpeta, después de revisar los cambios:

```sh
git status
git log -2 --oneline
git push -u origin codex/gds-actualizacion-2026
```

Esto sube la rama, no hace merge a main ni publica la web. En Windows, ante
problemas de certificados de Git, usar el almacén del sistema por comando:
`git -c http.sslBackend=schannel push -u origin codex/gds-actualizacion-2026`.
No desactivar la verificación TLS. Un PR puede dejarse como borrador.

## Preview para revisión

La opción sin publicación es `npm ci`, `npm run dev` y abrir localhost:3000.
Para revisar producción local: `npm run build`, luego `npm start`.

Solo cuando se autorice compartir los medios, una opción manual de preview
remoto es ejecutar `npx vercel deploy` y seleccionar el proyecto correcto,
sin --prod, sin asignar dominio y con Deployment Protection configurada antes
de compartir la URL. El acceso a esa URL depende de los ajustes de la cuenta;
un preview sin protección no debe tratarse como privado. Mantener SITE_URL
sin dominio definitivo para conservar noindex. No se ejecutó ese comando.

Referencias oficiales consultadas:
- https://motion.dev/docs/react-animate-presence
- https://motion.dev/docs/react-layout-animations
- https://motion.dev/docs/react-scroll-animations
- https://nextjs.org/docs/app/api-reference/config/next-config-js/headers
- https://nextjs.org/blog/nextjs-security-update-october-14-2026
- https://vercel.com/docs/cli/deploy
- https://vercel.com/docs/deployment-protection
