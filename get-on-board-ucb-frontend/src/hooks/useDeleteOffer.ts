import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOffer } from "@/lib/api";

//hook para eliminar ofertas
// el mutation es para operaciones de modifican datos

export function useDeleteOffer() {
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: deleteOffer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["offers"] });
        },
    });
}