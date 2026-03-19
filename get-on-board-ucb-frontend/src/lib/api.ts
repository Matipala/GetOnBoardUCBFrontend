const BASE_URL = "http://localhost:3001";

//obtener las ofertas todas
export async function getOffers() {
  const response = await fetch(`${BASE_URL}/offers`);
  if (!response.ok) {
    throw new Error("Error al obtener las ofertas");
  }
  return response.json();
}

//eliminar oferta
export async function deleteOffer(id: string) {
  const response = await fetch(`${BASE_URL}/offers/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error al eliminar la oferta");
  }
  return response.json();
}
