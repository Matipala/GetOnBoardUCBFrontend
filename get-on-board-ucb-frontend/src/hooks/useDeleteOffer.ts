import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOffer } from "@/lib/api";

export function useDeleteOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteOffer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offers"] });
      queryClient.invalidateQueries({ queryKey: ["my-offers"] });
    },
  });
}
