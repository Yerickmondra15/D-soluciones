import { Plus } from "lucide-react";
import { FAQ } from "@/data/site";

export function Questions() {
  return <section className="section faq-section" id="preguntas">
    <div className="container faq-layout">
      <div><p className="eyebrow">PREGUNTAS FRECUENTES</p><h2>Tu piscina, <span>sin dudas pendientes.</span></h2><p>Cada instalación es diferente. Estas respuestas te ayudan a dar el primer paso; para una recomendación específica, contanos tu caso.</p></div>
      <div className="faq-items">{FAQ.map(item => <details key={item.question}><summary>{item.question}<Plus size={22} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
    </div>
  </section>;
}
