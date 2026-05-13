"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  Mail,
  Search,
  Shield,
  UserCheck,
  UserPlus,
  Users,
  UserX,
} from "lucide-react";
import { useState } from "react";
import { RegisterUserModal } from "@/components/users/RegisterUserModal";
import { useUsers } from "@/hooks/useUsers";
import { assignRole, deactivateUser, reactivateUser } from "@/lib/api";
import type { UserRole, User as UserType } from "@/lib/types";

const ROLES: UserRole[] = ["student", "employer", "coordinator", "admin"];
const ROLE_LABELS: Record<UserRole, string> = {
  student: "Estudiante",
  employer: "Empleador",
  coordinator: "Coordinador",
  admin: "Admin",
};
const ROLE_COLORS: Record<UserRole, string> = {
  student: "bg-blue-50 text-blue-700",
  employer: "bg-purple-50 text-purple-700",
  coordinator: "bg-emerald-50 text-emerald-700",
  admin: "bg-rose-50 text-rose-700",
};

export default function AdminUsersPage() {
  const queryClient = useQueryClient();
  const { data: users, isLoading, error } = useUsers();
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<UserRole | "all">("all");
  const [showModal, setShowModal] = useState(false);

  const assignRoleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) =>
      assignRole(id, role),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const deactivateMutation = useMutation({
    mutationFn: (id: string) => deactivateUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const reactivateMutation = useMutation({
    mutationFn: (id: string) => reactivateUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const filtered =
    users?.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = filterRole === "all" || u.role === filterRole;
      return matchesSearch && matchesRole;
    }) ?? [];

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-ucb-yellow text-white rounded-2xl shadow-lg shadow-ucb-yellow">
          <Users size={28} />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-black text-gray-900">
            Gestión de Usuarios
          </h1>
          <p className="text-gray-500 font-medium">
            Administra cuentas, roles y accesos del sistema
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-ucb-yellow hover:bg-ucb-yellow/80 text-white font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm"
        >
          <UserPlus size={16} />
          Registrar Usuario
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ucb-yellow w-64"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value as UserRole | "all")}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ucb-yellow"
        >
          <option value="all">Todos los roles</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {ROLE_LABELS[r]}
            </option>
          ))}
        </select>
        <span className="ml-auto text-sm text-gray-400 self-center">
          {filtered.length} usuario{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-20 bg-gray-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl">
          {(error as Error).message}
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((user: UserType) => (
          <div
            key={user.id}
            className={`bg-white rounded-2xl border p-5 flex flex-col md:flex-row md:items-center gap-4 shadow-sm transition-all ${
              user.isActive === false
                ? "border-red-100 opacity-60"
                : "border-gray-100 hover:shadow-md"
            }`}
          >
            {/* Avatar + info */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-11 h-11 bg-gray-900 rounded-xl flex items-center justify-center text-white font-black text-lg shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-gray-900 truncate">{user.name}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1 truncate">
                  <Mail size={12} /> {user.email}
                </p>
                {user.career && (
                  <p className="text-xs text-emerald-600 font-medium mt-0.5">
                    <BookOpen size={11} className="inline mr-1" />
                    {user.career}
                  </p>
                )}
              </div>
            </div>

            {/* Controles */}
            <div className="flex items-center gap-3 flex-wrap shrink-0">
              {user.isActive === false && (
                <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                  Inactivo
                </span>
              )}

              <div className="flex items-center gap-2">
                <Shield size={14} className="text-gray-400" />
                <select
                  value={user.role}
                  onChange={(e) =>
                    assignRoleMutation.mutate({
                      id: user.id,
                      role: e.target.value as UserRole,
                    })
                  }
                  disabled={assignRoleMutation.isPending}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer ${ROLE_COLORS[user.role]}`}
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {ROLE_LABELS[r]}
                    </option>
                  ))}
                </select>
              </div>

              {user.isActive !== false ? (
                <button
                  type="button"
                  onClick={() => deactivateMutation.mutate(user.id)}
                  disabled={deactivateMutation.isPending}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-xl border border-red-100 transition-all"
                >
                  <UserX size={14} />
                  Desactivar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => reactivateMutation.mutate(user.id)}
                  disabled={reactivateMutation.isPending}
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 transition-all"
                >
                  <UserCheck size={14} />
                  Activar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal extraído como componente */}
      {showModal && (
        <RegisterUserModal
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}
    </main>
  );
}
