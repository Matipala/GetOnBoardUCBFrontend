"use client";

import { AlertCircle, CheckCircle, FileText, Plus } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/UseAuth";
import { useApplyToOffer } from "@/hooks/useApplyToOffer";
import { useMyApplications } from "@/hooks/useStudentApplications";

interface ApplyToOfferFormProps {
  offerId: string | number;
  onSuccess?: () => void;
}

export function ApplyToOfferForm({
  offerId,
  onSuccess,
}: ApplyToOfferFormProps) {
  const {
    applyToOffer,
    isLoading,
    success: justApplied,
    error,
  } = useApplyToOffer();
  const { user } = useAuth();

  const { data: allApplications, isLoading: isLoadingApps } =
    useMyApplications();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const hasAlreadyApplied = allApplications?.some(
    (app) => Number(app.offerId) === Number(offerId),
  );

  const handleApply = async () => {
    if (!selectedFile || !user) return;
    try {
      await applyToOffer(Number(offerId), user.id, selectedFile);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error al postular:", err);
    }
  };

  if (isLoadingApps) {
    return (
      <div className="px-6 pb-6 text-sm text-gray-400 animate-pulse italic">
        Verificando tu estado...
      </div>
    );
  }

  if (justApplied || hasAlreadyApplied) {
    return (
      <div className="mx-6 mb-6 p-6 bg-green-50 text-green-700 border border-green-200 rounded-2xl font-medium flex flex-col items-center gap-3 text-center animate-in zoom-in duration-300">
        <CheckCircle size={40} className="text-green-600" />
        <div>
          <p className="text-lg font-black">Ya te has postulado</p>
          <p className="text-sm opacity-90 leading-relaxed">
            Tu CV ya fue enviado a esta empresa anteriormente. Puedes ver el
            seguimiento en la sección
            <strong> "Mis Postulaciones"</strong>.
          </p>
        </div>
      </div>
    );
  }

  if (!isFormVisible) {
    return (
      <div className="px-6 pb-6 pt-2">
        <button
          type="button"
          onClick={() => setIsFormVisible(true)}
          className="w-full py-4 bg-blue-950 text-white rounded-xl font-bold hover:bg-blue-900 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100 group"
        >
          <Plus
            size={20}
            className="group-hover:rotate-90 transition-transform"
          />
          Postularme a esta vacante ahora
        </button>
      </div>
    );
  }

  return (
    <div className="mx-6 mb-6 p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50 animate-in slide-in-from-top-4 duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-blue-950 flex items-center gap-2">
          <FileText size={20} /> Subir mi Curriculum Vitae
        </h3>
        <button
          type="button"
          onClick={() => setIsFormVisible(false)}
          className="text-xs font-bold text-blue-900 hover:underline"
        >
          Cancelar
        </button>
      </div>

      <p className="text-xs text-gray-500 mb-6 leading-relaxed">
        Selecciona tu mejor CV en formato PDF o imagen. El reclutador recibirá
        este archivo inmediatamente.
      </p>

      <div className="space-y-4">
        <div className="relative group">
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2.5 file:px-6
              file:rounded-full file:border-0
              file:text-sm file:font-bold
              file:bg-blue-950 file:text-white
              hover:file:bg-blue-900
              file:cursor-pointer cursor-pointer
              bg-white p-2 rounded-xl border border-gray-200 group-hover:border-blue-200 transition-all"
          />
        </div>

        {selectedFile && (
          <button
            type="button"
            onClick={handleApply}
            disabled={isLoading}
            className="w-full py-3.5 bg-green-600 text-white rounded-xl font-black hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl shadow-green-100"
          >
            {isLoading ? "Enviando archivo..." : "CONFIRMAR MI POSTULACIÓN"}
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg font-medium text-center flex items-center justify-center gap-2">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
    </div>
  );
}
