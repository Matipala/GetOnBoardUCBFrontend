"use client";
import { useOffers } from "@/hooks/useOffers";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { Briefcase, MapPin, DollarSign } from "lucide-react";

export default function StudentOffersPage() {
    const { data: offers, isLoading, error } = useOffers();

    //estado de carga mostrar el skeleton
    if (isLoading) {
        return (
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Explorar Ofertas</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Mostrar 6 skeletons mientras carga */}
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </div>
        );
    }

    // estado de error
    if (error) {
        return (
            <div className="text-center py-16">
                <p className="text-red-500 font-semibold mb-2">No se pudieron cargar las ofertas</p>
                <p className="text-gray-400 text-sm">{error.message}</p>
                <p className="text-gray-400 text-xs mt-2">¿Está corriendo JSON Server en el puerto 3001?</p>
            </div>
        );
    }

    //estado exitoso mostrar la lista
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Explorar Ofertas</h1>
            <p className="text-gray-500 text-sm mb-6">
                {offers?.length} ofertas disponibles
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {offers?.map((offer) => (
                    <div key={offer.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                            <h2 className="font-semibold text-gray-900 text-sm leading-tight">
                                {offer.title}
                            </h2>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ml-2 ${offer.type === "Practica"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-green-50 text-green-600"
                                }`}>
                                {offer.type}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                            <Briefcase size={14} /> {offer.company}
                        </p>
                        <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                            <MapPin size={14} /> {offer.location}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                            <DollarSign size={14} /> {offer.salary}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}