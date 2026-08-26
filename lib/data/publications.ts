import { apiFetch } from "@/lib/core";
import { Publication } from "./types";

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
  like: (id: string) =>
    apiFetch<{ likesCount: number }>(`/api/products/${id}/like`, {
      method: "POST",
    }),
};
