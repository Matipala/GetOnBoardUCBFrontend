"use client";

import { Building2 } from "lucide-react";
import { CompanyProfileCard } from "@/components/company/CompanyProfileCard";
import { useCompany } from "@/hooks/useCompany";

export default function CompanyPage() {
  const { company, loading, error, updateCompany, uploadLogo } = useCompany();

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-400">Cargando empresa...</div>
    );
  }

  if (error && error !== "Company profile not found for this user") {
    return (
      <div className="p-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-ucb-yellow text-white rounded-2xl shadow-lg shadow-ucb-yellow">
          <Building2 size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900">
            Perfil de la Empresa
          </h1>
          <p className="text-gray-500 font-medium">
            Administra la información pública de tu empresa
          </p>
        </div>
      </div>

      <div>
        <CompanyProfileCard
          company={company}
          isReadOnly={false}
          onUpdate={updateCompany}
          onUploadLogo={uploadLogo}
        />
      </div>
    </main>
  );
}
