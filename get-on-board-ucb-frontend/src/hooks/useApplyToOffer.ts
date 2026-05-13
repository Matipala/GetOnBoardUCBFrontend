import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyToOffer } from "@/lib/api";

interface ApplyParams {
  offerId: number;
  studentId: string;
  cvFile: File;
}

export function useApplyToOffer() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ offerId, cvFile }: ApplyParams) => {
      return applyToOffer(offerId, cvFile);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["my-applications"],
      });
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
