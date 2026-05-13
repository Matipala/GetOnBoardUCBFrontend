"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GraduationCap, Mail, UserX } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/UseAuth";
import { useUsers } from "@/hooks/useUsers";
import { deactivateUser } from "@/lib/api";
import type { User } from "@/lib/types";

export default function CoordinatorStudentsPage() {
  const { user: coordinator } = useAuth();
  const career = coordinator?.career ?? "";
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { data: students, isLoading, error } = useUsers(career || undefined);

  const deactivateMutation = useMutation({
    mutationFn: (id: string) => deactivateUser(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["users", career] }),
  });

  const filtered =
    students?.filter(
      (s) =>
        s.role === "student" &&
        (s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.email.toLowerCase().includes(search.toLowerCase())),
    ) ?? [];

  if (!career) {
    return (
      <div className="p-8 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 inline-block">
          <p className="text-yellow-700 font-semibold">
            Tu cuenta no tiene una carrera asignada. Contacta al administrador.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-ucb-yellow text-white rounded-2xl shadow-lg shadow-ucb-yellow">
          <GraduationCap size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900">
            Estudiantes de {career}
          </h1>
          <p className="text-gray-500 font-medium">
            Gestiona los estudiantes de tu carrera
          </p>
        </div>
      </div>

      {/* Buscador */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre o correo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ucb-blue"
        />
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-gray-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-2xl">
          {(error as Error).message}
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center">
          <GraduationCap size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">
            No hay estudiantes registrados en {career}.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((student: User) => (
          <div
            key={student.id}
            className={`bg-white rounded-2xl border p-5 flex items-center justify-between gap-4 shadow-sm transition-all ${
              student.isActive === false
                ? "border-red-100 opacity-60"
                : "border-gray-100 hover:shadow-md"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-ucb-blue rounded-xl flex items-center justify-center text-white font-black text-lg">
                {student.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-gray-900">{student.name}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Mail size={12} /> {student.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {student.isActive !== false ? (
                <span className="text-xs font-bold text-white bg-green-600 px-3 py-1 rounded-full">
                  Activo
                </span>
              ) : (
                <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                  Inactivo
                </span>
              )}

              {student.isActive !== false && (
                <button
                  type="button"
                  onClick={() => deactivateMutation.mutate(student.id)}
                  disabled={deactivateMutation.isPending}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-xl border border-red-100 transition-all"
                >
                  <UserX size={14} />
                  Desactivar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
