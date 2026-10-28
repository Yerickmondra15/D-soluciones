"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { BUSINESS, SERVICES } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { WaterHoverSection } from "./WaterHoverSection";
import { Reveal } from "./Reveal";

export function Contact() {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [zone, setZone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const n = name.trim(), z = zone.trim(), m = message.trim();
    if (!n || !z || m.length < 10 || !consent) {
      setError("Completá tu nombre, ubicación y una consulta de al menos 10 caracteres.");
      return;
    }
    setError("");
    const text = `Hola, soy ${n}.\nServicio: ${service || "Consulta general"}.\nUbicación: ${z}.\nMi consulta: ${m}`;
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  }

  return <WaterHoverSection>
    <Reveal className="container contact-grid">
      <div className="contact-copy">
        <p className="eyebrow">HABLEMOS DE TU PROYECTO</p>
        <h2 id="contact-title">El siguiente paso empieza <em>con una conversación.</em></h2>
        <p>Una piscina nueva, un cambio de equipos o agua que necesita atención. Contanos en qué te podemos ayudar.</p>
        <a className="contact-phone" href={`tel:+${BUSINESS.phoneE164}`}><Phone size={24} /><span><small>Llamanos o escribinos</small><strong>+506 {BUSINESS.phoneDisplay}</strong></span><ArrowUpRight size={22} /></a>
        <div className="contact-area"><MapPin size={22} /><p>{BUSINESS.serviceArea}</p></div>
      </div>
      <div className="contact-panel">
        <p className="eyebrow">SOLICITAR COTIZACIÓN</p><h3>Contanos sobre tu piscina</h3>
        <form onSubmit={submit}>
          <div className="form-two">
            <label htmlFor="contact-name">Tu nombre<input id="contact-name" name="name" required autoComplete="name" value={name} onChange={e => setName(e.target.value)} maxLength={80} /></label>
            <label htmlFor="contact-zone">Ubicación<input id="contact-zone" name="zone" required autoComplete="address-level2" value={zone} onChange={e => setZone(e.target.value)} maxLength={100} placeholder="Provincia o zona" /></label>
          </div>
          <label htmlFor="contact-service">Servicio de interés<select id="contact-service" name="service" value={service} onChange={e => setService(e.target.value)}><option value="">Consulta general</option>{SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}</select></label>
          <label htmlFor="contact-message">Tu consulta<textarea id="contact-message" name="message" required minLength={10} maxLength={750} rows={4} value={message} onChange={e => setMessage(e.target.value)} placeholder="Medidas aproximadas, estado de la piscina o el servicio que buscás…" /></label>
          <label className="form-consent"><input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} /><span>Entiendo que mis datos se pasarán a WhatsApp para preparar mi consulta.</span></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn-light water-button">Continuar en WhatsApp <ArrowUpRight size={18} /></button>
          <p className="form-note">No guardamos tu consulta. El mensaje solo se envía cuando lo confirmés en WhatsApp.</p>
        </form>
      </div>
    </Reveal>
  </WaterHoverSection>;
}
