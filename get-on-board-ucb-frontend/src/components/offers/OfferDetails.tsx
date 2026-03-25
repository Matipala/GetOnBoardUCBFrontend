"use client";

import {
  ArrowLeft,
  Briefcase,
  Calendar,
  DollarSign,
  MapPin,
} from "lucide-react";
import type { JobOffer } from "@/lib/types";

interface OfferDetailsProps {
  offer: JobOffer;
  onBack: () => void;
}

export function OfferDetails({ offer, onBack }: OfferDetailsProps) {
  const offerTitle =
    offer.title ||
    (offer as JobOffer & { tittle?: string }).tittle ||
    "Sin Título";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
      <button
        type="button"
        onClick={onBack}
        className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-2 mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Volver a mis ofertas
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">{offerTitle}</h1>

      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-100">
        <span className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
          <Briefcase size={15} /> {offer.company}
        </span>
        <span className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
          <MapPin size={15} /> {offer.location}
        </span>
        <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-semibold">
          {offer.type || "Práctica"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <DollarSign size={18} className="text-green-600" /> Salario Mensual
          </h3>
          <p className="text-gray-600 text-lg mt-1 font-medium pl-6">
            {offer.salary ? `$ ${offer.salary}` : "No especificado"}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Calendar size={18} className="text-blue-600" /> Fecha de Registro
          </h3>
          <p className="text-gray-600 text-lg mt-1 font-medium pl-6">
            {offer.createdAt
              ? new Date(offer.createdAt).toLocaleDateString()
              : "Reciente"}
          </p>
        </div>
      </div>
    </div>
  );
}
