// @/lib/api.ts

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://beland-backend-develop.up.railway.app";

interface RequestOptions extends RequestInit {
  token?: string;
}

export async function apiFetch<T = unknown>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { token, headers, ...customConfig } = options;

  // 1. Cabeceras por defecto
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // 2. Inyección opcional del Bearer token
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  // 3. Petición nativa con la URL base antepuesta
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...customConfig,
    // TODO REVISAR COMO HACEMOS CON LA AUTENTICATION PARA EL LIKE
    // credentials: "include",
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  });

  // 4. Manejo centralizado de errores HTTP (4xx, 5xx)
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error HTTP: ${response.status}`);
  }

  // 5. Manejo de respuestas vacías (ej. status 204 en DELETE)
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
