import { useQuery } from "@tanstack/react-query";
import { getMyApplications } from "@/lib/api";
import type { Application } from "@/lib/types";

// Usa el endpoint /student/mine que toma el studentId del JWT
// No necesita recibir el studentId como parámetro
export function useMyApplications() {
  return useQuery<Application[]>({
    queryKey: ["my-applications"],
    queryFn: getMyApplications,
  });
}

// Mantiene compatibilidad si algún componente usa useStudentApplications(id)
// (para admin/coordinator que necesitan ver aplicaciones de un estudiante específico)
export function useStudentApplications(studentId: string | undefined) {
  return useQuery<Application[]>({
    queryKey: ["student-applications", studentId],
    queryFn: async () => {
      if (!studentId) return [];
      const { getApplicationsByStudent } = await import("@/lib/api");
      return getApplicationsByStudent(studentId);
    },
    enabled: !!studentId,
  });
}
