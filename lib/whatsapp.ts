import { BUSINESS } from '@/data/site';

/** WhatsApp recibe el mensaje escapado; el visitante confirma el envio. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${BUSINESS.phoneE164}?text=${encodeURIComponent(message)}`;
}
export function serviceMessage(service: string): string {
  return `Hola, vi la página de Piscinas GDS. Me gustaría solicitar información sobre ${service}.`;
}
