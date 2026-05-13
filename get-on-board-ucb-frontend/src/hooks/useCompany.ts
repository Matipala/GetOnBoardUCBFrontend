import { useCallback, useEffect, useState } from "react";
import { BASE_URL, fetchWithAuth, getDefaultHeaders } from "@/lib/api";

export interface Company {
  id: string;
  userId: string;
  name: string;
  logo?: string;
  description: string;
  industry: string;
  website: string;
  location: string;
}

export function useCompany(employerId?: string) {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompany = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const endpoint = employerId
        ? `/companies/employer/${employerId}`
        : "/companies/me";
      const response = await fetchWithAuth(`${BASE_URL}${endpoint}`, {
        headers: getDefaultHeaders(),
      });

      if (!response.ok) {
        if (response.status === 404) {
          setCompany(null);
          return;
        }
        throw new Error("Error al cargar la empresa");
      }

      const data = await response.json();
      setCompany(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [employerId]);

  const updateCompany = async (updateData: Partial<Company>) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/companies/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...getDefaultHeaders(),
        },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) throw new Error("Error al actualizar la empresa");
      const updated = await response.json();
      setCompany(updated);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Error al actualizar",
      };
    }
  };

  const uploadLogo = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetchWithAuth(`${BASE_URL}/companies/me/logo`, {
        method: "POST",
        headers: getDefaultHeaders(),
        body: formData,
      });

      if (!response.ok) throw new Error("Error al subir el logo");
      const updated = await response.json();
      setCompany(updated);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Error al subir logo",
      };
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  return {
    company,
    loading,
    error,
    updateCompany,
    uploadLogo,
    refreshCompany: fetchCompany,
  };
}
