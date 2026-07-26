import { Icon } from "./Icon";

const testimonials = [
  ["Mariana G.", "Superaron nuestras expectativas. El diseño y la calidad son increíbles."],
  ["Carlos L.", "Profesionales, puntuales y atentos en cada detalle del proyecto."],
  ["Familia Ramírez", "Ahora nuestra casa tiene el lugar favorito de todos. Gracias GDS."]
];

const stats = [
  ["+250", "Proyectos realizados", "waves"],
  ["98%", "Clientes satisfechos", "star"],
  ["+10", "Años de experiencia", "shield"],
  ["24/7", "Soporte y asesoría", "headset"]
];

export function TestimonialsStats() {
  return (
    <section id="nosotros" className="bg-gradient-to-b from-white to-aqua-50 px-5 pb-24">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-aqua-100 bg-white/72 p-6 shadow-soft backdrop-blur lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
        <div>
          <h2 className="text-center text-2xl font-black">Lo que dicen nuestros clientes</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {testimonials.map(([name, quote]) => (
              <article key={name} className="rounded-2xl bg-white p-5 shadow-soft">
                <div className="flex justify-center gap-1 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Icon key={index} name="star" className="h-4 w-4" />
                  ))}
                </div>
                <p className="mt-4 text-center text-sm leading-6 text-navy/70">“{quote}”</p>
                <p className="mt-5 text-center text-sm font-black">{name}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="border-aqua-100 lg:border-l lg:pl-10">
          <h2 className="text-center text-2xl font-black">Confianza que se construye</h2>
          <div className="mt-8 grid grid-cols-2 gap-6">
            {stats.map(([number, label, iconName]) => (
              <div key={label} className="text-center">
                <Icon name={iconName} className="mx-auto h-10 w-10 text-aqua-500" />
                <p className="mt-3 text-4xl font-black text-aqua-500">{number}</p>
                <p className="mt-2 text-sm font-semibold text-navy/68">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
