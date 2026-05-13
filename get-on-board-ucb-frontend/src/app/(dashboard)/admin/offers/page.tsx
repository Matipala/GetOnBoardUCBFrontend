"use client";

import { useQuery } from "@tanstack/react-query";
import { BookOpen, Briefcase, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { getOffers } from "@/lib/api";
import type { JobOffer } from "@/lib/types";

export default function AdminOffersPage() {
  const [search, setSearch] = useState("");

  const {
    data: offers,
    isLoading,
    error,
  } = useQuery<JobOffer[]>({
    queryKey: ["admin-all-offers"],
    queryFn: getOffers,
  });

  const filtered =
    offers?.filter(
      (o) =>
        o.title.toLowerCase().includes(search.toLowerCase()) ||
        o.company.toLowerCase().includes(search.toLowerCase()) ||
        (o.career ?? "").toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-ucb-yellow text-white rounded-2xl shadow-lg shadow-ucb-yellow">
          <Briefcase size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900">
            Todas las Ofertas
          </h1>
          <p className="text-gray-500 font-medium">
            Visualiza todas las vacantes publicadas en la plataforma
          </p>
        </div>
      </div>

      {/* Buscador */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Buscar por título, empresa o carrera..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ucb-yellow"
          />
        </div>
        <span className="text-sm text-gray-400">
          {filtered.length} oferta{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-44 bg-gray-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl">
          {(error as Error).message}
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center">
          <Briefcase size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">
            No hay ofertas publicadas aún.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-ucb-yellow transition-all flex flex-col gap-3"
          >
            <div className="flex items-start justify-between">
              <span
                className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                  offer.type === "Practica"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {offer.type}
              </span>
              {offer.career && (
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
                  {offer.career}
                </span>
              )}
            </div>

            <h2 className="font-bold text-gray-900 text-base leading-snug line-clamp-2">
              {offer.title}
            </h2>

            <p className="text-sm font-semibold text-gray-600 flex items-center gap-1.5">
              <Briefcase size={13} className="text-gray-400" />
              {offer.company}
            </p>

            <p className="text-sm text-gray-500 flex items-center gap-1.5">
              <MapPin size={13} className="text-gray-400" />
              {offer.location}
            </p>

            {offer.career && (
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <BookOpen size={12} />
                {offer.career}
              </p>
            )}

            <p className="text-[10px] text-gray-300 mt-auto">
              {new Date(offer.createdAt).toLocaleDateString("es-BO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
