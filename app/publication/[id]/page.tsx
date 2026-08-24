import { Feed } from "@/components/feed/Feed";
import { experiencesApi } from "@/lib/data/publications";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

// 1. Método Server-Side para generar la metadata dinámica según el ID
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const publications = await experiencesApi.getAll();
  const publication = publications.find((p) => p.id === id);

  if (!publication) {
    return {
      title: "Publicación no encontrada",
    };
  }

  return {
    title: publication.name || "Descubre esta publicación en Beland",
    description:
      publication.description ||
      "Toca para ver los detalles en Beland Experience.",
    openGraph: {
      title: publication.name,
      description: publication.description,
      // Asegúrate de enviar la URL de la imagen del producto (debe ser absoluta o partir desde /)
      images: [
        {
          url: publication.image_url,
          width: 1200,
          height: 630,
          alt: publication.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: publication.name,
      description: publication.description,
      images: [publication.image_url],
    },
  };
}

// 2. Componente de la página
export default async function PublicationPage({ params }: Props) {
  const { id } = await params;
  const publications = await experiencesApi.getAll();
  const exists = publications.some((p) => p.id === id);

  if (!exists) {
    notFound();
  }

  // Renderiza el mismo Feed pasándole la publicación inicial/activa
  return <Feed initialActiveId={id} />;
}
