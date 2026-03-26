import { useQuery } from "@tanstack/react-query";

import type { JobOffer } from "@/lib/types";

interface ApplicationWithOffer {
  id: number;
  studentId: string;
  cvUrl: string;
  status: "PENDING" | "IN_REVIEW" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  offerId: number;
  offer: JobOffer; // Incluimos la data de la oferta
}

export function useStudentApplications(studentId: string | undefined) {
  return useQuery<ApplicationWithOffer[]>({
    queryKey: ["student-applications", studentId],
    queryFn: async () => {
      if (!studentId) return [];
      const response = await fetch(
        `http://localhost:3000/applications/student/${studentId}`,
      );
      if (!response.ok) throw new Error("Error al cargar tus postulaciones");
      return response.json();
    },
    enabled: !!studentId,
  });
}
