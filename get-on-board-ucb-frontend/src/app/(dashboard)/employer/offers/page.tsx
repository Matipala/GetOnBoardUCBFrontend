"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateOfferForm } from "@/components/offers/CreateOfferForm";
import { OfferCard } from "@/components/offers/OfferCard";
import { OfferDetails } from "@/components/offers/OfferDetails";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { useDeleteOffer } from "@/hooks/useDeleteOffer";
import { useOffers } from "@/hooks/useOffers";
import type { JobOffer } from "@/lib/types";

export default function EmployerOffersPage() {
  const { data: offers, isLoading, error, refetch } = useOffers();
  const deleteMutation = useDeleteOffer();

  const [showForm, setShowForm] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);
  const [offerToDelete, setOfferToDelete] = useState<string | null>(null);

  if (showForm) {
    return (
      <div className="max-w-2xl mx-auto py-2">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Crear Nueva Oferta
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Llena los detalles para publicar una nueva oportunidad
          </p>
        </div>
        <CreateOfferForm
          onCancel={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            refetch();
          }}
        />
      </div>
    );
  }

  if (selectedOffer) {
    return (
      <div className="max-w-3xl mx-auto py-2">
        <OfferDetails
          offer={selectedOffer}
          onBack={() => setSelectedOffer(null)}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Mis Ofertas</h1>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 font-semibold">
          Error al cargar las ofertas
        </p>
        <p className="text-gray-400 text-sm">{error?.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-gray-900">Mis Ofertas</h1>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="bg-blue-950 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-900 transition flex items-center gap-2"
        >
          <Plus size={16} /> Nueva Oferta
        </button>
      </div>
      <p className="text-gray-500 text-sm mb-6">
        {offers?.length || 0} oferta(s) publicada(s)
      </p>

      {/* Lista renderizando el componente OfferCard */}
      <div className="grid gap-4">
        {offers?.map((offer: JobOffer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            isDeleting={deleteMutation.isPending}
            onDelete={(id) => setOfferToDelete(id)}
            onViewDetails={(off) => setSelectedOffer(off)}
          />
        ))}
      </div>

      {deleteMutation.isError && (
        <p className="text-red-500 text-sm mt-4">
          Error al eliminar: {deleteMutation.error?.message}
        </p>
      )}
      <ConfirmModal
        isOpen={offerToDelete !== null}
        title="Eliminar oferta"
        message="¿Estás seguro de que deseas eliminar esta oferta de trabajo? Esta acción es permanente y no podrás recuperar la información."
        onCancel={() => setOfferToDelete(null)}
        isLoading={deleteMutation.isPending}
        onConfirm={() => {
          if (offerToDelete) {
            deleteMutation.mutate(offerToDelete, {
              onSuccess: () => setOfferToDelete(null),
            });
          }
        }}
      />
    </div>
  );
}
