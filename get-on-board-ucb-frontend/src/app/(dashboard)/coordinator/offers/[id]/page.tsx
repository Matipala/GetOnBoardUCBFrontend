"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  ExternalLink,
  FileText,
  Mail,
  User,
  Users,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useOfferApplications } from "@/hooks/useOfferApplications";
import { getOffer } from "@/lib/api";
import { STATUS_LABELS } from "@/lib/types";

export default function OfferApplicationsPage() {
  const { id } = useParams();
  const router = useRouter();
  const offerId = id as string;

  const { data: offer, isLoading: isLoadingOffer } = useQuery({
    queryKey: ["offer", offerId],
    queryFn: () => getOffer(Number(offerId)),
    enabled: !!offerId,
  });

  const { data: applications, isLoading: isLoadingApps } =
    useOfferApplications(offerId);

  const isLoading = isLoadingOffer || isLoadingApps;

  if (isLoading) {
    return (
      <div className="p-8 max-w-5xl mx-auto animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-6" />
        <div className="h-32 bg-gray-100 rounded-2xl mb-8" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-50 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6 group"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="font-semibold text-sm">Volver a ofertas</span>
      </button>

      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="p-4 bg-ucb-yellow text-white rounded-2xl">
              <Briefcase size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-1 leading-tight">
                {offer?.title}
              </h1>
              <p className="text-gray-500 font-medium flex items-center gap-2">
                {offer?.company} • {offer?.location}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
              <Users size={18} className="text-gray-400" />
              <span className="text-xl font-black text-gray-900">
                {applications?.length || 0}
              </span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Postulados
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-ucb-blue text-white rounded-lg">
          <FileText size={20} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          Candidatos de tu carrera
        </h2>
      </div>

      {!applications || applications.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center">
          <Users size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            Aún no hay postulaciones
          </h3>
          <p className="text-gray-400">
            Cuando tus estudiantes se postulen a esta oferta, aparecerán aquí.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <User size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    {app.student.name}
                  </h4>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Mail size={12} />
                      {app.student.email}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar size={12} />
                      {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Estado
                  </span>
                  <span
                    className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-tighter ${
                      app.status === "ACCEPTED"
                        ? "bg-green-100 text-green-700"
                        : app.status === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : app.status === "PENDING"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {STATUS_LABELS[app.status as keyof typeof STATUS_LABELS] ||
                      app.status}
                  </span>
                </div>

                <a
                  href={app.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-ucb-blue text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-ucb-blue-100 hover:bg-ucb-blue transition-colors"
                >
                  Ver CV
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
