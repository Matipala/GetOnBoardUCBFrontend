import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOffer } from "@/lib/api";
import type { JobOffer } from "@/lib/types";

type CreateOfferInput = Omit<JobOffer, "id" | "createdAt" | "employerId">;

export function useCreateOffer() {
  const queryClient = useQueryClient();

  return useMutation<JobOffer, Error, CreateOfferInput>({
    mutationFn: (data) => createOffer(data as Record<string, unknown>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-offers"] });
      queryClient.invalidateQueries({ queryKey: ["offers"] });
    },
  });
}
