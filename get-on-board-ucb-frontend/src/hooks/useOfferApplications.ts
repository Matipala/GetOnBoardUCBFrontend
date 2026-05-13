import { useQuery } from "@tanstack/react-query";
import { getApplicationsByOffer } from "@/lib/api";

interface Application {
  id: number;
  studentId: string;
  student: {
    name: string;
    email?: string;
  };
  cvUrl: string;
  status: string;
  createdAt: string;
}

export function useOfferApplications(offerId: string | number) {
  return useQuery<Application[]>({
    queryKey: ["applications", offerId],
    queryFn: () => getApplicationsByOffer(Number(offerId)),
    enabled: !!offerId,
  });
}
