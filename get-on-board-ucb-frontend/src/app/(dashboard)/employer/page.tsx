"use client";

import { useQuery } from "@tanstack/react-query";
import { Briefcase, ClipboardList, Users } from "lucide-react";

const fetchCount = (endpoint: string) =>
  fetch(`http://localhost:3001/${endpoint}`).then((r) => r.json());

export default function EmployerPage() {
  const { data: offers } = useQuery<unknown[]>({
    queryKey: ["offers"],
    queryFn: () => fetchCount("offers"),
  });

  const { data: applications } = useQuery<unknown[]>({
    queryKey: ["applications"],
    queryFn: () => fetchCount("applications"),
  });

  const stats = [
    {
      label: "Ofertas publicadas",
      value: offers?.length ?? "—",
      icon: Briefcase,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Total candidatos",
      value: applications?.length ?? "—",
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Postulaciones activas",
      value: applications?.length ?? "—",
      icon: ClipboardList,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Panel del Empleador
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        Gestiona tus ofertas y candidatos.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <div
                className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}
              >
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
