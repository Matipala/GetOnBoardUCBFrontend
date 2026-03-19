"use client";

import { Bell, Briefcase, ClipboardList, GraduationCap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Fetch de cada colección en JSON Server
const fetchCount = (endpoint: string) =>
  fetch(`http://localhost:3001/${endpoint}`).then((r) => r.json());

export default function StudentPage() {
  const { data: offers } = useQuery<unknown[]>({
    queryKey: ["offers"],
    queryFn: () => fetchCount("offers"),
  });

  const { data: applications } = useQuery<unknown[]>({
    queryKey: ["applications"],
    queryFn: () => fetchCount("applications"),
  });

  const { data: interviews } = useQuery<unknown[]>({
    queryKey: ["interviews"],
    queryFn: () => fetchCount("interviews"),
  });

  const stats = [
    {
      label: "Ofertas disponibles",
      value: offers?.length ?? "—",
      icon: Briefcase,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Mis postulaciones",
      value: applications?.length ?? "—",
      icon: ClipboardList,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Entrevistas pendientes",
      value: interviews?.length ?? "—",
      icon: Bell,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Perfil completado",
      value: "—",
      icon: GraduationCap,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Mi Dashboard</h1>
      <p className="text-gray-500 text-sm mb-6">
        Tu resumen de prácticas y postulaciones.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
