export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Función auxiliar para obtener el token de las cookies
const getDefaultHeaders = (): Record<string, string> => {
  if (typeof document === "undefined") return {};

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="))
    ?.split("=")[1];

  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Obtener todas las ofertas
export async function getOffers() {
  const response = await fetch(`${BASE_URL}/offers`, {
    headers: {
      ...getDefaultHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las ofertas");
  }
  return response.json();
}

// Eliminar una oferta
export async function deleteOffer(id: string) {
  const response = await fetch(`${BASE_URL}/offers/${id}`, {
    method: "DELETE",
    headers: {
      ...getDefaultHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la oferta");
  }

  // Retornamos true en vez de response.json() porque NestJS no devuelve contenido
  return true;
}
