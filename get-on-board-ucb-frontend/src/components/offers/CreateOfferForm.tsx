"use client";

import { useState } from "react";
import { useCreateOffer } from "@/hooks/useCreateOffer";

interface CreateOfferFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateOfferForm({ onSuccess, onCancel }: CreateOfferFormProps) {
  const { createOffer, isLoading, error } = useCreateOffer();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Practica" as "Practica" | "Empleo",
    salary: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOffer(formData);
      onSuccess(); // Al terminar con éxito, avisamos al padre que ya acabó
    } catch (err) {
      console.error(err);
    }
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
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
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
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
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
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
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
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent bg-white"
          >
            <option value="Practica">Práctica</option>
            <option value="Empleo">Empleo Regular</option>
          </select>
        </div>
      </div>

      {/* Salario */}
      <div>
        <label
          htmlFor="salary"
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          Salario (Opcional)
        </label>
        <input
          id="salary"
          type="text"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Ej. $800 - $1200 / mes"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
        />
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
          {error}
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel} // Aquí ejecuta la función de cancelar
          disabled={isLoading}
          className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2.5 text-sm font-medium text-white bg-blue-950 hover:bg-blue-900 rounded-lg transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creando..." : "Crear Oferta"}
        </button>
      </div>
    </form>
  );
}
