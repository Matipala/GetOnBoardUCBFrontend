"use client";

import { useQuery } from "@tanstack/react-query";
import {
  BarChart3,
  Briefcase,
  GraduationCap,
  Shield,
  TrendingUp,
  User as UserIcon,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import { getOffersStats, getStats } from "@/lib/api";

export default function AdminPage() {
  const { data: userStats } = useQuery({
    queryKey: ["admin-user-stats"],
    queryFn: getStats,
  });

  const { data: offerStats } = useQuery({
    queryKey: ["admin-offer-stats"],
    queryFn: getOffersStats,
  });

  const statCards = [
    {
      label: "Usuarios totales",
      value: userStats?.total,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Estudiantes",
      value: userStats?.students,
      icon: GraduationCap,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Empleadores",
      value: userStats?.employers,
      icon: Briefcase,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Coordinadores",
      value: userStats?.coordinators,
      icon: Users,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Administradores",
      value: userStats?.admins,
      icon: Shield,
      color: "bg-rose-50 text-rose-600",
    },
    {
      label: "Ofertas publicadas",
      value: offerStats?.total,
      icon: TrendingUp,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  const quickActions = [
    {
      label: "Registrar Usuario",
      href: "/admin/users",
      icon: UserPlus,
      color: "bg-rose-700 hover:bg-rose-800",
    },
    {
      label: "Ver Ofertas",
      href: "/admin/offers",
      icon: Briefcase,
      color: "bg-gray-800 hover:bg-gray-900",
    },
    {
      label: "Ver Estadísticas",
      href: "/admin/stats",
      icon: BarChart3,
      color: "bg-emerald-700 hover:bg-emerald-800",
    },
    {
      label: "Mi Perfil",
      href: "/admin/settings",
      icon: UserIcon,
      color: "bg-blue-700 hover:bg-blue-800",
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-1">
          Panel de Administración
        </h1>
        <p className="text-gray-500 font-medium">
          Resumen general de la plataforma GetOnBoard UCB
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-500">
                  {s.label}
                </span>
                <div className={`p-2.5 rounded-xl ${s.color}`}>
                  <Icon size={18} strokeWidth={2} />
                </div>
              </div>
              <p className="text-4xl font-black text-gray-900">
                {s.value !== undefined ? (
                  s.value
                ) : (
                  <span className="animate-pulse text-gray-300">—</span>
                )}
              </p>
            </div>
          );
        })}
      </div>

      {/* Accesos rápidos */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Accesos rápidos
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.href}
                href={a.href}
                className={`${a.color} text-white rounded-2xl p-5 flex flex-col items-center gap-3 transition-all shadow-sm hover:shadow-lg active:scale-95`}
              >
                <Icon size={24} strokeWidth={1.75} />
                <span className="text-sm font-bold text-center">{a.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
