"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Briefcase,
  GraduationCap,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { useStats } from "@/hooks/useUsers";
import { getOffersStats } from "@/lib/api";

interface StatCardProps {
  label: string;
  value: number | undefined;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

function StatCard({ label, value, icon, color, bg }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-500">{label}</span>
        <div className={`p-2.5 rounded-xl ${bg}`}>
          <div className={color}>{icon}</div>
        </div>
      </div>
      <p className="text-4xl font-black text-gray-900">
        {value ?? <span className="animate-pulse text-gray-300">—</span>}
      </p>
    </div>
  );
}

export default function AdminStatsPage() {
  const { data: stats, isLoading, error } = useStats();
  const { data: offerStats } = useQuery({
    queryKey: ["admin-offer-stats"],
    queryFn: getOffersStats,
  });

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-ucb-yellow text-white rounded-2xl shadow-lg shadow-ucb-yellow">
          <TrendingUp size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900">
            Resumen del Sistema
          </h1>
          <p className="text-gray-500 font-medium">
            Totales en tiempo real de GetOnBoard UCB
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl mb-6">
          Error al cargar estadísticas: {(error as Error).message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          label="Estudiantes"
          value={stats?.students}
          icon={<GraduationCap size={20} />}
          color="text-blue-700"
          bg="bg-blue-50"
        />
        <StatCard
          label="Empleadores"
          value={stats?.employers}
          icon={<Briefcase size={20} />}
          color="text-purple-700"
          bg="bg-purple-50"
        />
        <StatCard
          label="Coordinadores"
          value={stats?.coordinators}
          icon={<Users size={20} />}
          color="text-emerald-700"
          bg="bg-emerald-50"
        />
        <StatCard
          label="Administradores"
          value={stats?.admins}
          icon={<Shield size={20} />}
          color="text-ucb-yellow"
          bg="bg-ucb-yellow/20"
        />
        <StatCard
          label="Total de Usuarios"
          value={stats?.total}
          icon={<Users size={20} />}
          color="text-gray-700"
          bg="bg-gray-100"
        />
        <StatCard
          label="Ofertas publicadas"
          value={offerStats?.total}
          icon={<Briefcase size={20} />}
          color="text-amber-700"
          bg="bg-amber-50"
        />
      </div>

      {isLoading && (
        <p className="text-center text-gray-400 text-sm mt-8 animate-pulse">
          Cargando estadísticas...
        </p>
      )}
    </main>
  );
}
