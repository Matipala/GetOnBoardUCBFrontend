"use client";

import {
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  User as UserIcon,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useMyOffers } from "@/hooks/useMyOffers";
import { useOfferApplications } from "@/hooks/useOfferApplications";

export default function CandidatesPage() {
  const { data: myOffers } = useMyOffers();
  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);

  const { data: applications, isLoading } = useOfferApplications(
    selectedOfferId || 0,
  );

  const acceptedApplications =
    applications?.filter((app) => app.status === "ACCEPTED") || [];

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-ucb-yellow text-white rounded-2xl shadow-lg shadow-ucb-yellow font-bold">
          <CheckCircle2 size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900 leading-tight">
            Mis Candidatos
          </h1>
          <p className="text-gray-500 font-medium tracking-tight">
            Gestiona y contacta a los candidatos que han sido aceptados en tus
            ofertas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Selector de Oferta */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-bold text-ucb-blue flex items-center gap-2">
              <FileText size={18} className="text-ucb-yellow" /> Mis Ofertas
            </h2>
            <span className="bg-gray-100 text-gray-500 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
              {myOffers?.length ?? 0}
            </span>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
            {(myOffers?.length ?? 0) > 0 ? (
              myOffers?.map((offer) => (
                <button
                  key={offer.id}
                  type="button"
                  onClick={() => setSelectedOfferId(Number(offer.id))}
                  className={`w-full text-left p-5 border-b border-gray-50 last:border-0 transition-all flex items-center justify-between group ${
                    selectedOfferId === Number(offer.id)
                      ? "bg-ucb-blue-50/50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="pr-4 overflow-hidden">
                    <p
                      className={`font-bold truncate text-sm transition-colors ${
                        selectedOfferId === Number(offer.id)
                          ? "text-ucb-blue"
                          : "text-gray-700"
                      }`}
                    >
                      {offer.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none translate-y-px">
                        {offer.location}
                      </p>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <p className="text-[10px] font-black text-ucb-blue uppercase tracking-tight">
                        Ver{" "}
                        {selectedOfferId === Number(offer.id)
                          ? "ahora"
                          : "detalles"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`p-1.5 rounded-lg transition-all transform duration-300 ${
                      selectedOfferId === Number(offer.id)
                        ? "bg-ucb-blue text-white translate-x-1"
                        : "bg-gray-50 text-gray-300 group-hover:bg-gray-100"
                    }`}
                  >
                    <ChevronRight size={14} />
                  </div>
                </button>
              ))
            ) : (
              <div className="p-12 text-center text-gray-400 text-sm font-medium italic">
                No tienes ofertas creadas aún.
              </div>
            )}
          </div>
        </div>

        {/* Lista de Candidatos Aceptados */}
        <div className="lg:col-span-8">
          {!selectedOfferId ? (
            <div className="bg-white border-2 border-dashed border-gray-100 rounded-[2.5rem] p-24 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform hover:scale-110 duration-500">
                <CheckCircle2 size={32} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Selecciona una oferta
              </h3>
              <p className="text-gray-400 font-medium max-w-xs mx-auto">
                Haz clic en una de tus ofertas de la izquierda para ver a los
                candidatos aceptados.
              </p>
            </div>
          ) : isLoading ? (
            <div className="p-24 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-ucb-blue border-t-transparent mb-4"></div>
              <p className="text-gray-400 font-medium italic animate-pulse">
                Cargando candidatos aceptados...
              </p>
            </div>
          ) : acceptedApplications.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-xl font-black text-gray-900 px-1 uppercase tracking-tight">
                Candidatos Aceptados{" "}
                <span className="text-ucb-blue ml-1">
                  ({acceptedApplications.length})
                </span>
              </h2>

              <div className="grid gap-4">
                {acceptedApplications.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white p-6 rounded-3xl border border-ucb-blue shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl transition-all group relative border-l-4 border-l-color-ucb-blue hover:z-20"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-linear-to-br from-ucb-blue to-ucb-blue rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-ucb-blue group-hover:rotate-3 transition-all">
                        {app.student?.name ? (
                          app.student.name.charAt(0).toUpperCase()
                        ) : (
                          <UserIcon size={24} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-0.5">
                          <h4 className="font-bold text-gray-900 text-lg group-hover:text-ucb-blue transition-colors">
                            {app.student?.name || "Candidato Anónimo"}
                          </h4>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-gray-400">
                          <a
                            href={`mailto:${app.student?.email}`}
                            className="underline decoration-ucb-blue hover:text-ucb-blue transition-colors"
                          >
                            {app.student?.email}
                          </a>
                          <div className="flex items-center gap-1.5 tracking-tighter">
                            <Clock size={12} className="text-gray-300" />{" "}
                            {new Date(app.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <a
                        href={app.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3.5 bg-ucb-blue text-white rounded-2xl text-xs font-black hover:bg-ucb-blue flex items-center gap-2 transition-all shadow-xl shadow-ucb-blue active:scale-95"
                      >
                        <ExternalLink size={16} /> VER CV
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-24 text-center shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} className="text-gray-200" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Sin candidatos aceptados
              </h3>
              <p className="text-gray-400 font-medium max-w-xs mx-auto italic">
                Aún no has marcado a ningún candidato como aceptado para esta
                oferta.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
