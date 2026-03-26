"use client";

import { Briefcase, Calendar, DollarSign, MapPin } from "lucide-react";
import type { JobOffer } from "@/lib/types";

interface OfferDetailsProps {
  offer: JobOffer;
  onBack: () => void;
}

export function OfferDetails({ offer, onBack: _onBack }: OfferDetailsProps) {
  const offerTitle =
    offer.title ||
    (offer as unknown as { tittle: string }).tittle ||
    "Sin Título";

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{offerTitle}</h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-6 font-medium">
          <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
            <Briefcase size={16} className="text-gray-400" /> {offer.company}
          </span>
          <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
            <MapPin size={16} className="text-gray-400" /> {offer.location}
          </span>
          <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-bold">
            {offer.type || "Práctica"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
          <h3 className="text-sm font-bold text-gray-400 flex items-center gap-2 uppercase tracking-wider mb-2">
            <DollarSign size={16} className="text-green-600" /> Salario Mensual
          </h3>
          <p className="text-gray-900 text-xl font-black">
            {offer.salary ? `$ ${offer.salary}` : "No especificado"}
          </p>
        </div>

        <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
          <h3 className="text-sm font-bold text-gray-400 flex items-center gap-2 uppercase tracking-wider mb-2">
            <Calendar size={16} className="text-blue-600" /> Publicado el
          </h3>
          <p className="text-gray-900 text-xl font-black">
            {offer.createdAt
              ? new Date(offer.createdAt).toLocaleDateString()
              : "Reciente"}
          </p>
        </div>
      </div>
    </div>
  );
}
