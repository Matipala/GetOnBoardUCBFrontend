"use client";

import { useQuery } from "@tanstack/react-query";
import { BookOpen, Briefcase, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/UseAuth";
import { getOffersByCareer } from "@/lib/api";
import type { JobOffer } from "@/lib/types";

export default function CoordinatorOffersPage() {
  const { user } = useAuth();
  const career = user?.career ?? "";

  const {
    data: offers,
    isLoading,
    error,
  } = useQuery<JobOffer[]>({
    queryKey: ["offers-career", career],
    queryFn: () => getOffersByCareer(career),
    enabled: !!career,
  });

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
    <main className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-ucb-yellow text-white rounded-2xl shadow-lg shadow-ucb-yellow-100">
          <BookOpen size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900 leading-tight">
            Ofertas de {career}
          </h1>
          <p className="text-gray-500 font-medium">
            Vacantes publicadas para tu carrera
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 bg-gray-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-2xl">
          Error al cargar las ofertas: {(error as Error).message}
        </div>
      )}

      {!isLoading && !error && offers?.length === 0 && (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center">
          <Briefcase size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            No hay ofertas aún para {career}
          </h3>
          <p className="text-gray-400">
            Los empleadores podrán publicar ofertas dirigidas a esta carrera.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers?.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-ucb-blue transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <span
                className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                  offer.type === "Practica"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {offer.type}
              </span>
            </div>
            <h2 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2">
              {offer.title}
            </h2>
            <p className="text-sm text-gray-600 font-medium mb-3">
              {offer.company}
            </p>
            {offer.description && (
              <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                {offer.description}
              </p>
            )}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <MapPin size={12} />
              <span>{offer.location}</span>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-white bg-ucb-blue px-2.5 py-1 rounded-lg">
                <Users size={14} />
                <span className="font-bold">
                  {offer.applications?.length || 0}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-tight">
                  Postulados
                </span>
              </div>

              <Link
                href={`/coordinator/offers/${offer.id}`}
                className="text-xs font-bold text-ucb-blue hover:underline"
              >
                Ver detalles
              </Link>
            </div>

            <p className="text-[10px] text-gray-300 mt-3">
              {new Date(offer.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
