import { useMutation, useQueryClient } from "@tanstack/react-query";

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
      const response = await fetch(
        `http://localhost:3000/applications/${applicationId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        },
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el estado");
      }

      return response.json();
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["applications", variables.offerId],
      });
      queryClient.invalidateQueries({ queryKey: ["student-applications"] });
    },
  });
}
