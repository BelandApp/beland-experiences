import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Beland Experience — Descubre. Compra. Lleva.",
  description:
    "Descubre productos seleccionados en un feed inmersivo y cómpralos en un par de toques.",
  icons: "/icon.png",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${raleway.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
