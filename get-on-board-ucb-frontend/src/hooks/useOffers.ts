import { useQuery } from "@tanstack/react-query";
import { getOffers } from "@/lib/api";
import type { JobOffer } from "@/lib/types";

//hook para obtener lista de ofertas
export function useOffers() {
  return useQuery<JobOffer[]>({ queryKey: ["offers"], queryFn: getOffers });
}
