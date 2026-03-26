import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "@/lib/api";

interface ApplyParams {
  offerId: number;
  studentId: string;
  cvFile: File;
}

export function useApplyToOffer() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ offerId, studentId, cvFile }: ApplyParams) => {
      const formData = new FormData();
      formData.append("offerId", offerId.toString());
      formData.append("studentId", studentId);
      formData.append("cv", cvFile);

      const response = await fetch(`${BASE_URL}/applications`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al enviar la postulación");
      }

      return response.json();
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["student-applications", variables.studentId],
      });
    },
  });

  return {
    applyToOffer: (offerId: number, studentId: string, cvFile: File) =>
      mutation.mutateAsync({ offerId, studentId, cvFile }),
    isLoading: mutation.isPending,
    error: mutation.error ? (mutation.error as Error).message : null,
    success: mutation.isSuccess,
  };
}
