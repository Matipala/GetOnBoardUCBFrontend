"use client";

import { useQuery } from "@tanstack/react-query";
import { BookOpen, Briefcase, GraduationCap } from "lucide-react";
import { getCoordinatorStats } from "@/lib/api";

export default function CoordinatorPage() {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ["coordinator-stats"],
    queryFn: getCoordinatorStats,
  });

  const stats = [
    {
      label: "Estudiantes en carrera",
      value: statsData?.students ?? "—",
      icon: GraduationCap,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Ofertas activas",
      value: statsData?.offers ?? "—",
      icon: Briefcase,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Carreras gestionadas",
      value: statsData?.managedCareers ?? "—",
      icon: BookOpen,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Panel del Coordinador
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        Gestión de prácticas y estudiantes de tu carrera.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`bg-white rounded-xl border border-gray-200 p-5 ${
                isLoading ? "animate-pulse" : ""
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}
              >
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {isLoading ? "..." : stat.value}
              </p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
