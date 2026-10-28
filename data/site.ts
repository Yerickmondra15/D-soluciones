/** Información obtenida del documento oficial remitido por Piscinas GDS.
 * Evitar cifras, testimonios, precios, certificaciones o correos no verificados.
 */
export const BUSINESS = {
  name: 'Piscinas GDS',
  legacyName: 'Grupo D Soluciones',
  tagline: 'Cuidado integral para su piscina',
  phoneDisplay: '8712-9222',
  phoneE164: '50687129222',
  serviceArea: 'Atendemos diferentes zonas de Costa Rica. Fuera del GAM, coordinamos según el proyecto.',
} as const;

export type Service = { id: string; title: string; subtitle: string; description: string; details: string[]; image: string; };
export const SERVICES: Service[] = [
  {id:'mantenimiento', title:'Mantenimiento de piscinas', subtitle:'Agua limpia, equipos en buenas condiciones',
    description:'Atención periódica del agua y de los sistemas de circulación y filtración para conservar tu piscina limpia y segura.',
    details:['Aspirado, cepillado y retiro de residuos','Limpieza o retrolavado de filtros, según corresponda','Medición y balance de pH, cloro y alcalinidad','Revisión visual de bombas, válvulas, tuberías y circulación'],
    image:'/media/mantenimiento-resultado.webp'},
  {id:'construccion', title:'Construcción de piscinas', subtitle:'Del proyecto a la primera inmersión',
    description:'Construcción integral de piscinas residenciales y comerciales, espejos de agua y SPA, de acuerdo con cada proyecto.',
    details:['Estructura en concreto','Instalaciones hidráulicas y electromecánicas','Impermeabilización y revestimientos','Iluminación y accesorios básicos'],
    image:'/media/proyecto-construccion-despues.webp'},
  {id:'remodelacion', title:'Remodelación de piscinas', subtitle:'Una nueva vida para tu piscina',
    description:'Renovación de piscinas existentes, corrección de deterioros y actualización de acabados, accesorios o equipos.',
    details:['Revisión general de la piscina','Reparación de áreas deterioradas','Cambio o renovación de revestimientos','Corrección de fugas visibles y puntos de reparación'],
    image:'/media/remodelacion-resultado.webp'},
  {id:'equipos', title:'Instalación de equipos', subtitle:'El sistema correcto hace la diferencia',
    description:'Selección, suministro e instalación de equipos según el tamaño y las necesidades de la piscina.',
    details:['Selección de bombas, filtros, clorinadores y luces','Instalación y conexión','Configuración básica','Pruebas de funcionamiento'],
    image:'/media/equipos-25.webp'},
  {id:'asesoria', title:'Asesoramiento técnico', subtitle:'Decisiones respaldadas por análisis',
    description:'Apoyo para planificar, revisar o mejorar piscinas y sus sistemas durante la construcción o el uso.',
    details:['Cálculo de volumen y capacidad','Asesoría sobre cuarto de máquinas','Revisión de tuberías y equipos','Recomendaciones de mejoras y correcciones'],
    image:'/media/asesoria-06.webp'},
  {id:'recuperacion', title:'Recuperación de agua', subtitle:'Recuperar la claridad es posible',
    description:'Tratamiento de piscinas con agua verde o turbia para restablecer su condición sin necesariamente vaciarla.',
    details:['Evaluación y medición de parámetros','Ajuste de pH, alcalinidad y cloro','Aplicación de productos para recuperación','Seguimiento hasta la estabilización'],
    image:'/media/recuperacion-resultado.webp'},
];

/** Familias comerciales confirmadas, NO SKUs ni inventario confirmado. */
export const EQUIPMENT_CATEGORIES = [
  {id:'bombas',title:'Bombas',description:'Equipos de circulación adecuados al caudal y al sistema de la piscina.',photo:'/media/equipos-23.webp'},
  {id:'filtros',title:'Filtros',description:'Opciones de filtración para diferentes características de instalación.',photo:'/media/equipos-21.webp'},
  {id:'clorinadores',title:'Clorinadores',description:'Soluciones de cloración según las condiciones del proyecto.',photo:'/media/equipos-25.webp'},
  {id:'iluminacion',title:'Iluminación',description:'Iluminación y complementos para piscinas.',photo:'/media/equipos-22.webp'},
  {id:'accesorios',title:'Accesorios',description:'Componentes y accesorios para sistemas de piscina.',photo:'/media/equipos-26.webp'},
] as const;

export const FAQ = [
  {question:'¿Cómo sé qué bomba y filtro necesita mi piscina?', answer:'La selección depende del volumen de agua, caudal requerido, tuberías y características de la instalación. Revisamos estos factores antes de recomendar un equipo.'},
  {question:'¿Pueden ayudarme si mi piscina está en construcción?', answer:'Sí. Podemos brindar acompañamiento técnico en diferentes etapas para revisar tuberías, accesorios, equipos y aspectos generales del sistema.'},
  {question:'¿Una piscina con agua verde siempre necesita vaciarse?', answer:'No necesariamente. En muchos casos es posible recuperar el agua mediante diagnóstico, ajuste químico, filtración y limpieza.'},
  {question:'¿Qué equipos puedo automatizar?', answer:'Dependiendo de la instalación, se pueden automatizar horarios de filtración, iluminación, cloración, calentamiento y otros sistemas.'},
  {question:'¿Pueden revisar una instalación hecha por otra empresa?', answer:'Sí. Podemos realizar una revisión general del sistema y brindar recomendaciones técnicas sobre mejoras o correcciones.'},
  {question:'¿Trabajan únicamente con piscinas nuevas?', answer:'No. Atendemos piscinas nuevas y existentes para mantenimiento, remodelación, recuperación de agua, instalación de equipos y asesoría técnica.'},
  {question:'¿Qué información necesitan para una cotización?', answer:'Generalmente solicitamos medidas aproximadas de la piscina, ubicación y una descripción de la necesidad. Dependiendo del trabajo, puede requerirse una visita técnica.'},
  {question:'¿Atienden proyectos fuera del GAM?', answer:'Sí. La atención se coordina según la ubicación, el tipo de servicio y las características del proyecto.'},
];

export const GALLERY = [
  {src:'/media/proyecto-construccion-despues.webp',label:'Construcción · Proyecto Norberto'},
  {src:'/media/proyecto-construccion-antes.webp',label:'Construcción · Etapa inicial'},
  {src:'/media/remodelacion-resultado.webp',label:'Remodelación · Resultado'},
  {src:'/media/remodelacion-resultado-2.webp',label:'Remodelación · Acabados'},
  {src:'/media/recuperacion-resultado.webp',label:'Recuperación de agua · Resultado'},
  {src:'/media/mantenimiento-resultado-2.webp',label:'Mantenimiento de piscinas'},
  {src:'/media/equipos-25.webp',label:'Instalación de equipos'},
  {src:'/media/asesoria-06.webp',label:'Asesoramiento técnico'},
  {src:'/media/proyecto-remodelacion-proceso.webp',label:'Remodelación · En proceso'},
] as const;

export const VIDEOS = [
 {src:'/media/asesoria-05.mp4',poster:'/media/asesoria-05-poster.webp',title:'Asesoramiento técnico',subtitle:'Equipos e instalaciones en campo'},
 {src:'/media/asesoria-07.mp4',poster:'/media/asesoria-07-poster.webp',title:'Revisión del sistema',subtitle:'Configuración y controles de la instalación'},
 {src:'/media/asesoria-11.mp4',poster:'/media/asesoria-11-poster.webp',title:'Detalle técnico',subtitle:'Una mirada al cuarto de máquinas'},
 {src:'/media/equipos-29.mp4',poster:'/media/equipos-29-poster.webp',title:'Instalación de equipos',subtitle:'Detalles del trabajo de instalación'},
 {src:'/media/recuperacion-43.mp4',poster:'/media/recuperacion-43-poster.webp',title:'Recuperación de agua',subtitle:'Estado del agua durante el proceso'},
 {src:'/media/remodelacion-57.mp4',poster:'/media/remodelacion-57-poster.webp',title:'Detalle de remodelación',subtitle:'Un breve detalle del acabado'},
] as const;
