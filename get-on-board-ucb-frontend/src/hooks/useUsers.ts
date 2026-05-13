import { useQuery } from "@tanstack/react-query";
import { getStats, getUsers } from "@/lib/api";
import type { StatsData, User } from "@/lib/types";

export function useUsers(career?: string) {
  return useQuery<User[]>({
    queryKey: ["users", career],
    queryFn: () => getUsers(career),
  });
}

export function useStats() {
  return useQuery<StatsData>({
    queryKey: ["stats"],
    queryFn: getStats,
  });
}
