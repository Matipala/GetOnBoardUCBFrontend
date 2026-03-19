"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/UseAuth";
import type { UserRole } from "@/lib/types";

const ROLE_REDIRECT: Record<UserRole, string> = {
  admin: "/admin",
  student: "/student",
  employer: "/employer",
  coordinator: "/coordinator",
};

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login(email, password);

    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      router.push(ROLE_REDIRECT[user.role as UserRole]);
    }
  };

  return (
    <div className="min-h-screen bg-ucb-blue flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo image */}
        <div className="flex justify-center mb-6">
          <Image
            src="/1.png"
            alt="Get On Board UCB"
            className="h-70 rounded-lg"
          />
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Iniciar sesión
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Ingresa con tu cuenta UCB
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="usuario@ucb.edu.bo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent disabled:opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent disabled:opacity-50"
              />
            </div>

            {/* Mensaje de error */}
            {error && (
              <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-950 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-900 transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    aria-label="Cargando"
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <title>Cargando</title>
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Entrando...
                </span>
              ) : (
                "Entrar"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-50 mt-6">
          <Link href="/" className="hover:underline">
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
