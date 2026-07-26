import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GDS | Grupo D Soluciones",
  description: "Diseño, construcción y renovación de piscinas premium por Grupo D Soluciones."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
