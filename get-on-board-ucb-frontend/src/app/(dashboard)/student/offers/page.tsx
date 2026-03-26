"use client";

import { Briefcase, DollarSign, Eye, MapPin } from "lucide-react";
import { useState } from "react";
import { ApplyToOfferForm } from "@/components/offers/ApplyToOfferForm";
import { OfferDetails } from "@/components/offers/OfferDetails";
import { Modal } from "@/components/ui/Modal";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { useAuth } from "@/hooks/UseAuth";
import { useOffers } from "@/hooks/useOffers";
import type { JobOffer } from "@/lib/types";

export default function StudentOffersPage() {
  const { data: offers, isLoading, error } = useOffers();
  const { user } = useAuth();
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);

  if (isLoading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Explorar Ofertas
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-50 text-red-600 p-4 rounded-xl inline-block border border-red-100 mb-4">
          <p className="font-bold text-lg mb-1">¡Ups! Algo salió mal</p>
          <p className="text-sm opacity-80">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Explorar Ofertas
        </h1>
        <p className="text-gray-500 font-medium">
          Encuentra tu próxima oportunidad entre {offers?.length} vacantes
          disponibles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers?.map((offer) => {
          const title =
            offer.title ||
            (offer as unknown as { tittle: string }).tittle ||
            "Sin Título";

          return (
            <button
              key={offer.id}
              type="button"
              onClick={() => setSelectedOffer(offer)}
              className="w-full text-left bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer group flex flex-col justify-between shadow-sm relative overflow-hidden"
            >
              {/* Badge de tipo */}
              <div className="absolute top-0 right-0 p-1">
                <span
                  className={`text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl uppercase tracking-wider ${
                    offer.type === "Practica"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {offer.type || "Práctica"}
                </span>
              </div>

              <div>
                <div className="mb-4">
                  <h2 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-blue-900 transition-colors line-clamp-2 pr-10">
                    {title}
                  </h2>
                </div>

                <div className="space-y-2.5 mb-6">
                  <p className="text-sm text-gray-600 flex items-center gap-2 font-medium">
                    <div className="p-1.5 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                      <Briefcase
                        size={14}
                        className="text-gray-400 group-hover:text-blue-600"
                      />
                    </div>
                    {offer.company}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <div className="p-1.5 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                      <MapPin
                        size={14}
                        className="text-gray-400 group-hover:text-blue-600"
                      />
                    </div>
                    {offer.location}
                  </p>
                  <p className="text-sm flex items-center gap-2 font-semibold text-gray-700">
                    <div className="p-1.5 bg-gray-50 rounded-lg group-hover:bg-green-50 transition-colors">
                      <DollarSign
                        size={14}
                        className="text-gray-400 group-hover:text-green-600"
                      />
                    </div>
                    {offer.salary ? `$ ${offer.salary}` : "No especificado"}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                <span className="text-xs font-bold text-blue-900 opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver propuesta
                </span>
                <div className="p-2 bg-gray-50 rounded-full group-hover:bg-blue-950 group-hover:text-white transition-all transform group-hover:rotate-12">
                  <Eye size={16} />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* MODAL DE DETALLE */}
      <Modal
        isOpen={!!selectedOffer}
        onClose={() => setSelectedOffer(null)}
        title="Detalles de la Vacante"
      >
        {selectedOffer && (
          <div className="p-2 space-y-4">
            <OfferDetails
              offer={selectedOffer}
              onBack={() => setSelectedOffer(null)}
            />

            {user?.role === "student" && (
              <div className="px-6 pb-6 pt-2">
                <ApplyToOfferForm offerId={selectedOffer.id} />
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
