import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beland.app"), // Reemplaza por tu dominio real
  title: {
    default: "Beland Experience — Descubre. Compra. Lleva.",
    template: "%s | Beland Experience",
  },
  description:
    "Descubre productos seleccionados en un feed inmersivo, cómpralos en un par de toques.",
  icons: "/icon.png",
  openGraph: {
    title: "Beland Experience — Descubre. Compra. Lleva.",
    description:
      "Descubre productos seleccionados en un feed inmersivo, cómpralos en un par de toques.",
    url: "https://beland.app",
    siteName: "Beland Experience",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Beland Experience",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beland Experience — Descubre. Compra. Lleva.",
    description:
      "Descubre productos seleccionados en un feed inmersivo y cómpralos en un par de toques.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${raleway.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
