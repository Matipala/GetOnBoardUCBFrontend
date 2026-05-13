"use client";

import { Briefcase, Eye, MapPin, Trash2 } from "lucide-react";
import type { JobOffer } from "@/lib/types";

interface OfferCardProps {
  offer: JobOffer;
  onDelete: (id: number) => void;
  isDeleting: boolean;
  onViewDetails: (offer: JobOffer) => void;
}

export function OfferCard({
  offer,
  onDelete,
  isDeleting,
  onViewDetails,
}: OfferCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between hover:shadow-md transition">
      <div>
        <h2 className="font-semibold text-gray-900 mb-1 text-lg">
          {offer.title ?? "Sin Título"}
        </h2>
        <div className="flex gap-4">
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Briefcase size={14} /> {offer.company}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <MapPin size={14} /> {offer.location}
          </p>
          {offer.career && (
            <p className="text-xs text-ucb-blue font-medium flex items-center gap-1">
              {offer.career}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onViewDetails(offer)}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors text-sm font-medium"
        >
          <Eye size={16} />
          Ver detalles
        </button>
        <button
          type="button"
          onClick={() => onDelete(offer.id)}
          disabled={isDeleting}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors text-sm font-medium disabled:opacity-50"
        >
          <Trash2 size={16} />
          {isDeleting ? "Eliminando..." : "Eliminar"}
        </button>
      </div>
    </div>
  );
}
