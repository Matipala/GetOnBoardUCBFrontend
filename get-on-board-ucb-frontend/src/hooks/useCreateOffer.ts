import { useState } from "react";
import type { JobOffer } from "@/lib/types";

export function useCreateOffer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOffer = async (
    offerData: Omit<JobOffer, "id" | "createdAt" | "employerId">,
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];

      const savedUser = localStorage.getItem("auth_user");
      const employerId = savedUser
        ? JSON.parse(savedUser).id
        : "uuid-falso-si-falla";

      const payloadBackend = {
        tittle: offerData.title,
        company: offerData.company,
        location: offerData.location,
        salary: Number(offerData.salary) || 0,
        employerId: employerId,
      };

      const response = await fetch("http://localhost:3000/offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payloadBackend),
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error("Detalles del rechazo del backend:", errData);
        throw new Error("Error al crear la oferta. Revisa la consola.");
      }

      const newOffer = await response.json();
      return newOffer;
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Error de conexión");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createOffer, isLoading, error };
}
