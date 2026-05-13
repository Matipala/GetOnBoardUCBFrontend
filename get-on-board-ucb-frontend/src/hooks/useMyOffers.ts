import { useQuery } from "@tanstack/react-query";
import { getMyOffers } from "@/lib/api";
import type { JobOffer } from "@/lib/types";

export function useMyOffers() {
  return useQuery<JobOffer[]>({
    queryKey: ["my-offers"],
    queryFn: getMyOffers,
  });
}
