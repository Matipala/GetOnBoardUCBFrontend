"use client";

import { useOffers } from "@/hooks/useOffers";
import { useDeleteOffer } from "@/hooks/useDeleteOffer";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { Trash2, Briefcase, MapPin } from "lucide-react";

export default function EmployerOffersPage() {
    const { data: offers, isLoading, error } = useOffers();
    const deleteMutation = useDeleteOffer();

    if (isLoading) {
        return (
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Mis Ofertas</h1>
                <div className="grid gap-4">
                    {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-16">
                <p className="text-red-500 font-semibold">Error al cargar las ofertas</p>
                <p className="text-gray-400 text-sm">{error.message}</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Mis Ofertas</h1>
            <p className="text-gray-500 text-sm mb-6">{offers?.length} oferta(s) publicada(s)</p>

            <div className="grid gap-4">
                {offers?.map((offer) => (
                    <div key={offer.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
                        <div>
                            <h2 className="font-semibold text-gray-900 mb-1">{offer.title}</h2>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                <Briefcase size={14} /> {offer.company}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                <MapPin size={14} /> {offer.location}
                            </p>
                        </div>

                        {/* Botón eliminar — deshabilitado mientras ejecuta el DELETE */}
                        <button
                            type="button"
                            onClick={() => deleteMutation.mutate(offer.id)}
                            disabled={deleteMutation.isPending}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors text-sm font-medium disabled:opacity-50"
                        >
                            <Trash2 size={16} />
                            {deleteMutation.isPending ? "Eliminando..." : "Eliminar"}
                        </button>
                    </div>
                ))}
            </div>

            {/* Mensaje de error de la mutación */}
            {deleteMutation.isError && (
                <p className="text-red-500 text-sm mt-4">
                    Error al eliminar: {deleteMutation.error.message}
                </p>
            )}
        </div>
    );
}
