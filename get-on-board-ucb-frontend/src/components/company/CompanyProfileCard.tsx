"use client";

import Image from "next/image";
import type React from "react";
import { useState } from "react";
import type { Company } from "@/hooks/useCompany";

interface CompanyProfileCardProps {
  company: Company | null;
  isReadOnly?: boolean;
  onUpdate?: (
    data: Partial<Company>,
  ) => Promise<{ success: boolean; error?: string }>;
  onUploadLogo?: (file: File) => Promise<{ success: boolean; error?: string }>;
}

export const CompanyProfileCard: React.FC<CompanyProfileCardProps> = ({
  company,
  isReadOnly = true,
  onUpdate,
  onUploadLogo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Company>>({
    name: company?.name || "",
    description: company?.description || "",
    industry: company?.industry || "",
    website: company?.website || "",
    location: company?.location || "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!onUpdate) return;
    setSaving(true);
    setError(null);
    const result = await onUpdate(formData);

    let logoResult: { success: boolean; error?: string } = {
      success: true,
      error: undefined,
    };
    if (logoFile && onUploadLogo) {
      logoResult = await onUploadLogo(logoFile);
    }

    if (result.success && logoResult.success) {
      setIsEditing(false);
      setLogoFile(null);
    } else {
      setError(result.error || logoResult.error || "Error al guardar");
    }
    setSaving(false);
  };

  if (!company && !isEditing && isReadOnly) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <p className="text-gray-500 text-center">
          Información de la empresa no disponible.
        </p>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
          Editar Perfil de Empresa
        </h3>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 md:col-span-2">
            <label htmlFor="logo" className="text-sm font-medium text-gray-700">
              Logo de la Empresa
            </label>
            <div className="flex items-center space-x-4">
              {(logoFile || company?.logo) && (
                <div className="w-16 h-16 relative">
                  <Image
                    src={
                      logoFile
                        ? URL.createObjectURL(logoFile)
                        : company?.logo || ""
                    }
                    alt="Logo preview"
                    fill
                    className="rounded-lg object-cover border"
                  />
                </div>
              )}
              <input
                id="logo"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setLogoFile(e.target.files[0]);
                  }
                }}
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label
              htmlFor="companyName"
              className="text-sm font-medium text-gray-700"
            >
              Nombre de la Empresa
            </label>
            <input
              id="companyName"
              type="text"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="industry"
              className="text-sm font-medium text-gray-700"
            >
              Rubro / Industria
            </label>
            <input
              id="industry"
              type="text"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.industry || ""}
              onChange={(e) =>
                setFormData({ ...formData, industry: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="website"
              className="text-sm font-medium text-gray-700"
            >
              Sitio Web
            </label>
            <input
              id="website"
              type="url"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.website || ""}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="location"
              className="text-sm font-medium text-gray-700"
            >
              Ubicación
            </label>
            <input
              id="location"
              type="text"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.location || ""}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Descripción
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setLogoFile(null);
              setFormData({
                name: company?.name || "",
                description: company?.description || "",
                industry: company?.industry || "",
                website: company?.website || "",
                location: company?.location || "",
              });
            }}
            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-hidden relative">
      {!isReadOnly && (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="absolute top-6 right-6 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors text-sm font-medium"
        >
          {company ? "Editar Perfil" : "Crear Perfil"}
        </button>
      )}

      {company ? (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            {company.logo && (
              <div className="w-20 h-20 relative">
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  fill
                  className="rounded-xl object-cover border bg-gray-50"
                />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {company.name}
              </h2>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                {company.industry && (
                  <span className="flex items-center bg-gray-100 px-2 py-1 rounded">
                    {company.industry}
                  </span>
                )}
                {company.location && (
                  <span className="flex items-center">{company.location}</span>
                )}
              </div>
            </div>
          </div>

          {company.description && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Sobre la empresa
              </h3>
              <p className="text-gray-600 whitespace-pre-wrap">
                {company.description}
              </p>
            </div>
          )}

          {company.website && (
            <div>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm font-medium flex items-center"
              >
                Visitar sitio web
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">
            Aún no has configurado el perfil de tu empresa.
          </p>
        </div>
      )}
    </div>
  );
};
