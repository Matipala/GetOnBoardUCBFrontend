"use client";

import {
  Briefcase,
  CheckCircle,
  ClipboardList,
  Clock,
  ExternalLink,
  Eye,
  Hash,
  Search,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { OfferDetails } from "@/components/offers/OfferDetails";
import { Modal } from "@/components/ui/Modal";
import { useAuth } from "@/hooks/UseAuth";
import { useStudentApplications } from "@/hooks/useStudentApplications";
import type { JobOffer } from "@/lib/types";

export default function StudentApplicationsPage() {
  const { user } = useAuth();
  const { data: applications, isLoading } = useStudentApplications(user?.id);
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "PENDING":
        return {
          label: "Pendiente",
          color: "bg-yellow-50 text-yellow-700 border-yellow-200",
          icon: <Clock size={16} />,
        };
      case "IN_REVIEW":
        return {
          label: "En Revisión",
          color: "bg-blue-50 text-blue-700 border-blue-200",
          icon: <Search size={16} />,
        };
      case "ACCEPTED":
        return {
          label: "Aceptado",
          color: "bg-green-50 text-green-700 border-green-200",
          icon: <CheckCircle size={16} />,
        };
      case "REJECTED":
        return {
          label: "Rechazado",
          color: "bg-red-50 text-red-700 border-red-200",
          icon: <XCircle size={16} />,
        };
      default:
        return {
          label: status,
          color: "bg-gray-50 text-gray-700 border-gray-200",
          icon: <Clock size={16} />,
        };
    }
  };

  if (isLoading)
    return (
      <div className="p-8 text-center text-gray-500 font-medium italic animate-pulse">
        Cargando tus postulaciones...
      </div>
    );

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-blue-950 text-white rounded-2xl shadow-lg shadow-blue-100">
          <ClipboardList size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900 leading-tight">
            Mis Postulaciones
          </h1>
          <p className="text-gray-500 font-medium">
            Gestiona y haz seguimiento a tus aplicaciones laborales
          </p>
        </div>
      </div>

      {applications && applications.length > 0 ? (
        <div className="grid gap-6">
          {applications.map((app, index) => {
            const status = getStatusInfo(app.status);
            const offerTitle =
              app.offer?.title ||
              (app.offer as unknown as { tittle: string })?.tittle ||
              "Sin Título";
            const applicationNumber = applications.length - index; // Número correlativo (el más reciente es el mayor)

            return (
              <div
                key={app.id}
                className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:border-blue-50 transition-all shadow-sm group relative overflow-hidden"
              >
                {/* Indicador lateral de estado */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 ${status.color.split(" ")[1]}`}
                ></div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">
                      <Hash size={10} /> {applicationNumber}
                    </span>
                    <span
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase border tracking-wider ${status.color}`}
                    >
                      {status.icon}
                      {status.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 text-xl group-hover:text-blue-900 transition-colors line-clamp-1">
                      {offerTitle}
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-sm text-gray-600 flex items-center gap-1.5 font-medium">
                        <Briefcase size={14} className="text-gray-400" />{" "}
                        {app.offer?.company || "Empresa"}
                      </p>
                      <p className="text-sm text-gray-400 flex items-center gap-1.5">
                        <Clock size={14} />{" "}
                        {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedOffer(app.offer)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-blue-950 bg-gray-50 hover:bg-blue-950 hover:text-white rounded-xl transition-all border border-gray-100"
                  >
                    <Eye size={16} />
                    Ver Vacante
                  </button>

                  <a
                    href={app.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-blue-950 hover:bg-blue-900 rounded-xl transition-all shadow-md shadow-blue-100"
                  >
                    <ExternalLink size={16} />
                    Mi CV
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
            <ClipboardList size={40} className="text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Aún no has postulado a ninguna oferta
          </h3>
          <p className="text-gray-500 max-w-xs mx-auto mb-8 font-medium">
            Explora las vacantes disponibles y comienza tu proceso profesional
            hoy mismo.
          </p>
          <a
            href="/student/offers"
            className="inline-flex items-center justify-center px-8 py-3 bg-blue-950 text-white rounded-xl font-bold hover:bg-blue-900 transition-all shadow-lg shadow-blue-100"
          >
            Explorar Ofertas
          </a>
        </div>
      )}

      {/* MODAL PARA VER DETALLE DE LA OFERTA */}
      <Modal
        isOpen={!!selectedOffer}
        onClose={() => setSelectedOffer(null)}
        title="Detalles de la Oferta Postulada"
      >
        {selectedOffer && (
          <OfferDetails
            offer={selectedOffer}
            onBack={() => setSelectedOffer(null)}
          />
        )}
      </Modal>
    </main>
  );
}
