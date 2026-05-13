import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApplicationStatus } from "@/lib/api";

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      applicationId,
      status,
      offerId: _offerId,
    }: {
      applicationId: number;
      status: "PENDING" | "IN_REVIEW" | "ACCEPTED" | "REJECTED";
      offerId: number;
    }) => {
      return updateApplicationStatus(applicationId, status);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["applications", variables.offerId],
      });
      queryClient.invalidateQueries({ queryKey: ["student-applications"] });
    },
  });
}
