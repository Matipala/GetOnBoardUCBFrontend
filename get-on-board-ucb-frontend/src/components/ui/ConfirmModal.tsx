"use client";

import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 text-red-600 p-2.5 rounded-full">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>
          <p className="text-gray-600 text-sm mb-8 leading-relaxed">
            {message}
          </p>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? "Eliminando..." : "Sí, eliminar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
