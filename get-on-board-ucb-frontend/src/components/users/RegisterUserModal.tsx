"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  Briefcase,
  Building2,
  Lock,
  Mail,
  Shield,
  User,
  UserCheck,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import { registerUser } from "@/lib/api";
import type { UserRole } from "@/lib/types";

const ROLES: UserRole[] = ["student", "employer", "coordinator", "admin"];
const ROLE_LABELS: Record<UserRole, string> = {
  student: "Estudiante",
  employer: "Empleador",
  coordinator: "Coordinador",
  admin: "Admin",
};
const CAREER_ROLES: UserRole[] = ["student", "coordinator"];

const defaultForm = {
  fullName: "",
  email: "",
  password: "",
  role: "student" as UserRole,
  career: "",
  companyName: "",
  companyIndustry: "",
};

interface RegisterUserModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function RegisterUserModal({
  onClose,
  onSuccess,
}: RegisterUserModalProps) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(defaultForm);
  const [formError, setFormError] = useState("");

  const mutation = useMutation({
    mutationFn: () =>
      registerUser({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
        career: CAREER_ROLES.includes(form.role)
          ? form.career.trim()
          : undefined,
        companyName:
          form.role === "employer" ? form.companyName.trim() : undefined,
        companyIndustry:
          form.role === "employer" ? form.companyIndustry.trim() : undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccess();
    },
    onError: (err: Error) => setFormError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!form.fullName.trim() || !form.email.trim() || !form.password) {
      setFormError("Completa todos los campos obligatorios.");
      return;
    }
    if (CAREER_ROLES.includes(form.role) && !form.career.trim()) {
      setFormError("La carrera es obligatoria para este rol.");
      return;
    }
    if (form.role === "employer" && !form.companyName.trim()) {
      setFormError("El nombre de la empresa es obligatorio para un empleador.");
      return;
    }
    mutation.mutate();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-50 rounded-xl">
              <UserPlus size={20} className="text-rose-700" />
            </div>
            <h2 className="text-xl font-black text-gray-900">
              Registrar Usuario
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Nombre completo *
            </label>
            <div className="relative">
              <User
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="fullName"
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                placeholder="Ej: Juan Pérez"
              />
            </div>
          </div>

          {/* Correo */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Correo electrónico *
            </label>
            <div className="relative">
              <Mail
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                placeholder="correo@ucb.edu.bo"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Contraseña *
            </label>
            <div className="relative">
              <Lock
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
          </div>

          {/* Rol */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Rol *
            </label>
            <div className="relative">
              <Shield
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <select
                id="role"
                value={form.role}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role: e.target.value as UserRole,
                    career: "",
                  })
                }
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 appearance-none bg-white"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {ROLE_LABELS[r]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Carrera — condicional */}
          {CAREER_ROLES.includes(form.role) && (
            <div>
              <label
                htmlFor="career"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Carrera *
              </label>
              <div className="relative">
                <BookOpen
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  id="career"
                  type="text"
                  value={form.career}
                  onChange={(e) => setForm({ ...form, career: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                  placeholder="Ej: Ingeniería de Sistemas"
                />
              </div>
            </div>
          )}

          {/* Empresa — condicional */}
          {form.role === "employer" && (
            <>
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Nombre de la Empresa *
                </label>
                <div className="relative">
                  <Building2
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="companyName"
                    type="text"
                    value={form.companyName}
                    onChange={(e) =>
                      setForm({ ...form, companyName: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="Ej: TechCorp S.A."
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="companyIndustry"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Industria (Opcional)
                </label>
                <div className="relative">
                  <Briefcase
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="companyIndustry"
                    type="text"
                    value={form.companyIndustry}
                    onChange={(e) =>
                      setForm({ ...form, companyIndustry: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="Ej: Tecnología, Salud, Finanzas..."
                  />
                </div>
              </div>
            </>
          )}

          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-xl">
              {formError}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex-1 flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-bold py-2.5 rounded-xl transition disabled:opacity-50"
            >
              <UserCheck size={15} />
              {mutation.isPending ? "Registrando..." : "Registrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
