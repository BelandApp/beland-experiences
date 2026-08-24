import { apiFetch } from "@/lib/core";
import { Publication } from "./types";

const SAMPLE_VIDEOS = [
  "https://videos.pexels.com/video-files/8628285/8628285-hd_1080_1920_25fps.mp4",
  "https://videos.pexels.com/video-files/18211069/18211069-sd_360_640_30fps.mp4",
  "https://videos.pexels.com/video-files/7296317/7296317-sd_506_960_30fps.mp4",
] as const;

const CATALOG: Publication[] = [
  {
    id: "beland-glasses",
    name: "Gafas recicladas",
    video_url: SAMPLE_VIDEOS[0],
    image_url:
      "https://images.pexels.com/photos/28773168/pexels-photo-28773168/free-photo-of-autumn-fashion-eyeglasses-display-with-fall-leaves.jpeg?",
    likes: 1284,
    tags: ["green", "verano", "aura"],
    price: 68,
    creator: "Beland",
    description: "Gafas recicladas, colores marron y negro.",
  },
  {
    id: "beland-riñonera",
    name: "Riñonera unisex",
    video_url: SAMPLE_VIDEOS[1],
    image_url:
      "https://images.pexels.com/photos/17448037/pexels-photo-17448037/free-photo-of-a-man-wearing-a-cap.jpeg?",

    likes: 986,
    tags: ["Reciclada", "oversize", "compacta"],
    price: 120,
    creator: "Beland",
    description: "Riñonera reciclada unisex, espaciosa y compacta",
  },
  {
    id: "beland-aros",
    name: "Aros reciclados",
    video_url: SAMPLE_VIDEOS[2],
    image_url:
      "https://images.pexels.com/photos/33222149/pexels-photo-33222149/free-photo-of-elegant-gold-and-silver-earrings-on-display.jpeg?",

    likes: 742,
    tags: ["Facheros", "unisex"],
    price: 95,
    creator: "Beland",
    description: "Par de aros reciclados, metal purificado y sanitizado",
  },
];

// export function getPublications(): Publication[] {
//   return CATALOG;
// }

// export function getPublicationById(
//   id: string | undefined,
// ): Publication | undefined {
//   if (!id) return undefined;
//   return CATALOG.find((publication) => publication.id === id);
// }

// export async function postLike(id: string) {
//   return await fetch(`${api}/experience-products-like/${id}`);
// }

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatLikes(count: number): string {
  return new Intl.NumberFormat("es-EC", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count);
}

export const experiencesApi = {
  // GET /api/experiences (Sin token)
  getAll: () => apiFetch<Publication[]>("/api/experiences"),

  // GET /api/experiences/:id (Sin token)
  getById: (id: string) => apiFetch<Publication>(`/api/experiences/${id}`),

  // POST /api/experiences/:id/like (Con token)
  like: (id: string, token: string) =>
    apiFetch<{ likesCount: number }>(`/api/experiences/${id}/like`, {
      method: "POST",
      token,
    }),

  // DELETE /api/experiences/:id/like (Con token)
  unlike: (id: string, token: string) =>
    apiFetch<{ likesCount: number }>(`/api/experiences/${id}/like`, {
      method: "DELETE",
      token,
    }),
};
