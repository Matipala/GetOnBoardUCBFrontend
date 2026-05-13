"use client";

import { useState } from "react";
import { useCreateOffer } from "@/hooks/useCreateOffer";

interface CreateOfferFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateOfferForm({ onSuccess, onCancel }: CreateOfferFormProps) {
  const createOfferMutation = useCreateOffer();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Practica" as "Practica" | "Empleo",
    salary: "",
    career: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createOfferMutation.mutate(formData, {
      onSuccess: () => onSuccess(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5"
    >
      {/* Título y Empresa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Título del Puesto
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ej. Desarrollador Frontend"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-950"
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Nombre de la Empresa
          </label>
          <input
            id="company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Ej. TechCorp"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-950"
          />
        </div>
      </div>

      {/* Ubicación y Tipo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Ubicación
          </label>
          <input
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ej. La Paz, Bolivia"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-950"
          />
        </div>
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Tipo de Oferta
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 bg-white"
          >
            <option value="Practica">Práctica</option>
            <option value="Empleo">Empleo Regular</option>
          </select>
        </div>
      </div>

      {/* Carrera y Salario */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="career"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Carrera Dirigida <span className="text-gray-400">(opcional)</span>
          </label>
          <input
            id="career"
            type="text"
            name="career"
            value={formData.career}
            onChange={handleChange}
            placeholder="Ej. Ingeniería de Sistemas"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-950"
          />
        </div>
        <div>
          <label
            htmlFor="salary"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Salario <span className="text-gray-400">(opcional)</span>
          </label>
          <input
            id="salary"
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Ej. $800 - $1200 / mes"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-950"
          />
        </div>
      </div>

      {/* Descripción */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          Descripción <span className="text-gray-400">(opcional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Describe las responsabilidades y requisitos del puesto..."
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 resize-none"
        />
      </div>

      {createOfferMutation.isError && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
          {createOfferMutation.error?.message}
        </div>
      )}

      <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          disabled={createOfferMutation.isPending}
          className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={createOfferMutation.isPending}
          className="px-5 py-2.5 text-sm font-medium text-white bg-blue-950 hover:bg-blue-900 rounded-lg transition-colors disabled:opacity-70"
        >
          {createOfferMutation.isPending ? "Creando..." : "Crear Oferta"}
        </button>
      </div>
    </form>
  );
}
