import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/lib/api";

interface Application {
  id: number;
  studentId: string;
  student: {
    name: string;
    email?: string;
  };
  cvUrl: string;
  status: string;
  createdAt: string;
}

export function useOfferApplications(offerId: string | number) {
  return useQuery<Application[]>({
    queryKey: ["applications", offerId],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/applications/offer/${offerId}`);
      if (!response.ok) throw new Error("Error al cargar postulaciones");
      return response.json();
    },
    enabled: !!offerId,
  });
}
