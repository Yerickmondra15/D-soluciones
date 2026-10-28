import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><h1>No encontramos esta página</h1><p>Podés volver al inicio para explorar nuestros servicios.</p><Link href="/">Volver al inicio</Link></main>;
}
