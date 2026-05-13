"use client";

import { useMutation } from "@tanstack/react-query";
import { BookOpen, Save, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/UseAuth";
import { updateUser } from "@/lib/api";

export default function CoordinatorProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const updateMutation = useMutation({
    mutationFn: (data: { name: string; email: string }) =>
      updateUser(user?.id, data),
    onSuccess: () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    updateMutation.mutate({ name, email });
  };

  if (!user) {
    return (
      <div className="p-8 text-center text-gray-400">Cargando perfil...</div>
    );
  }

  return (
    <main className="p-8 max-w-lg mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-ucb-yellow text-white rounded-2xl shadow-lg shadow-ucb-yellow">
          <User size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900">Mi Perfil</h1>
          <p className="text-gray-500 font-medium">
            Actualiza tu información personal
          </p>
        </div>
      </div>

      {/* Avatar */}
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 bg-ucb-yellow rounded-2xl flex items-center justify-center text-white font-black text-4xl shadow-xl shadow-ucb-yellow">
          {name.charAt(0).toUpperCase()}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-bold text-gray-700 mb-1.5"
          >
            Nombre completo
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-bold text-gray-700 mb-1.5"
          >
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="pt-2">
          <div className="block text-sm font-bold text-gray-700 mb-1.5">
            Carrera Gestionada
          </div>
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-600 border border-gray-100">
            <BookOpen size={16} className="text-gray-400" />
            <span className="font-semibold text-gray-700">
              {user.career || "No asignada"}
            </span>
          </div>
          <p className="text-[10px] text-gray-400 mt-1 ml-1 italic">
            * La carrera solo puede ser modificada por un administrador.
          </p>
        </div>

        <div className="pt-1">
          <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500">
            <span className="font-semibold text-gray-700">Rol: </span>
            <span className="capitalize">{user.role}</span>
          </div>
        </div>

        {updateMutation.isError && (
          <p className="text-red-600 text-sm font-medium">
            {updateMutation.error?.message}
          </p>
        )}

        {saved && (
          <p className="text-emerald-600 text-sm font-bold">
            Perfil actualizado correctamente
          </p>
        )}

        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="w-full flex items-center justify-center gap-2 bg-ucb-yellow text-white font-bold py-3 rounded-xl hover:bg-ucb-yellow transition-all shadow-md shadow-blue-100 disabled:opacity-60"
        >
          <Save size={18} />
          {updateMutation.isPending ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </main>
  );
}
