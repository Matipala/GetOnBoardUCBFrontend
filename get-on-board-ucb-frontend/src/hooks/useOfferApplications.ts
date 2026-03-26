import { useQuery } from "@tanstack/react-query";

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
      const response = await fetch(
        `http://localhost:3000/applications/offer/${offerId}`,
      );
      if (!response.ok) throw new Error("Error al cargar postulaciones");
      return response.json();
    },
    enabled: !!offerId,
  });
}
