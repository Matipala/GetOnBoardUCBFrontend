export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getDefaultHeaders = (): Record<string, string> => {
  if (typeof document === "undefined") return {};
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="))
    ?.split("=")[1];
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getRefreshToken = (): string | undefined => {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("refresh_token="))
    ?.split("=")[1];
};

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  let res = await fetch(url, options);

  if (res.status === 401 && typeof window !== "undefined") {
    const refreshToken = getRefreshToken();
    const userStr = localStorage.getItem("auth_user");
    const userId = userStr ? JSON.parse(userStr).id : null;

    if (refreshToken && userId) {
      try {
        const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, refreshToken }),
        });

        if (refreshRes.ok) {
          const newTokens = await refreshRes.json();
          document.cookie = `access_token=${newTokens.access_token}; path=/`;
          document.cookie = `refresh_token=${newTokens.refresh_token}; path=/`;

          const newOptions = { ...options };
          newOptions.headers = {
            ...newOptions.headers,
            Authorization: `Bearer ${newTokens.access_token}`,
          };
          res = await fetch(url, newOptions);
        } else {
          document.cookie =
            "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          document.cookie =
            "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          document.cookie =
            "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          localStorage.removeItem("auth_user");
          window.location.href = "/";
        }
      } catch (err) {
        console.error("Error refreshing token:", err);
      }
    }
  }

  return res;
}

// ─── OFFERS ──────────────────────────────────────────────────────────────────

export async function getOffers() {
  const res = await fetchWithAuth(`${BASE_URL}/offers`);
  if (!res.ok) throw new Error("Error al obtener las ofertas");
  return res.json();
}

export async function getOffer(id: number) {
  const res = await fetchWithAuth(`${BASE_URL}/offers/${id}`);
  if (!res.ok) throw new Error("Oferta no encontrada");
  return res.json();
}

export async function getMyOffers() {
  const res = await fetchWithAuth(`${BASE_URL}/offers/employer/mine`, {
    headers: getDefaultHeaders(),
  });
  if (!res.ok) throw new Error("Error al obtener tus ofertas");
  return res.json();
}

export async function getOffersByCareer(career: string) {
  const res = await fetchWithAuth(`${BASE_URL}/offers/career/${career}`, {
    headers: getDefaultHeaders(),
  });
  if (!res.ok) throw new Error("Error al obtener ofertas por carrera");
  return res.json();
}

export async function createOffer(data: Record<string, unknown>) {
  const res = await fetchWithAuth(`${BASE_URL}/offers`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getDefaultHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear la oferta");
  return res.json();
}

export async function updateOffer(id: number, data: Record<string, unknown>) {
  const res = await fetchWithAuth(`${BASE_URL}/offers/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...getDefaultHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar la oferta");
  return res.json();
}

export async function deleteOffer(id: number) {
  const res = await fetchWithAuth(`${BASE_URL}/offers/${id}`, {
    method: "DELETE",
    headers: getDefaultHeaders(),
  });
  if (!res.ok) throw new Error("Error al eliminar la oferta");
  return true;
}

// ─── APPLICATIONS ─────────────────────────────────────────────────────────────

export async function applyToOffer(offerId: number, cvFile: File) {
  const form = new FormData();
  form.append("offerId", String(offerId));
  form.append("cv", cvFile);
  const res = await fetchWithAuth(`${BASE_URL}/applications`, {
    method: "POST",
    headers: getDefaultHeaders(),
    body: form,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Error al postular");
  }
  return res.json();
}

export async function getMyApplications() {
  const res = await fetchWithAuth(`${BASE_URL}/applications/student/mine`, {
    headers: getDefaultHeaders(),
  });
  if (!res.ok) throw new Error("Error al obtener tus postulaciones");
  return res.json();
}

export async function getApplicationsByOffer(offerId: number) {
  const res = await fetchWithAuth(`${BASE_URL}/applications/offer/${offerId}`, {
    headers: getDefaultHeaders(),
  });
  if (!res.ok) throw new Error("Error al obtener postulaciones");
  return res.json();
}

export async function getApplicationsByStudent(studentId: string) {
  const res = await fetchWithAuth(
    `${BASE_URL}/applications/student/${studentId}`,
    {
      headers: getDefaultHeaders(),
    },
  );
  if (!res.ok) throw new Error("Error al obtener postulaciones del estudiante");
  return res.json();
}

export async function updateApplicationStatus(
  id: number,
  status: "PENDING" | "IN_REVIEW" | "ACCEPTED" | "REJECTED",
) {
  const res = await fetchWithAuth(`${BASE_URL}/applications/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...getDefaultHeaders() },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Error al actualizar el estado");
  return res.json();
}

// ─── USERS ────────────────────────────────────────────────────────────────────

export async function getUsers(career?: string) {
  const url = career
    ? `${BASE_URL}/users?career=${encodeURIComponent(career)}`
    : `${BASE_URL}/users`;
  const res = await fetchWithAuth(url, { headers: getDefaultHeaders() });
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
}

export async function getUser(id: string) {
  const res = await fetchWithAuth(`${BASE_URL}/users/${id}`, {
    headers: getDefaultHeaders(),
  });
  if (!res.ok) throw new Error("Error al obtener el usuario");
  return res.json();
}

export async function updateUser(id: string, data: Record<string, unknown>) {
  const res = await fetchWithAuth(`${BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...getDefaultHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar el perfil");
  return res.json();
}

export async function assignRole(userId: string, role: string) {
  const res = await fetchWithAuth(`${BASE_URL}/users/${userId}/role`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...getDefaultHeaders() },
    body: JSON.stringify({ role }),
  });
  if (!res.ok) throw new Error("Error al asignar rol");
  return res.json();
}

export async function deactivateUser(userId: string) {
  const res = await fetchWithAuth(`${BASE_URL}/users/${userId}/deactivate`, {
    method: "PATCH",
    headers: getDefaultHeaders(),
  });
  if (!res.ok) throw new Error("Error al desactivar usuario");
  return res.json();
}

export async function reactivateUser(userId: string) {
  const res = await fetchWithAuth(`${BASE_URL}/users/${userId}/reactivate`, {
    method: "PATCH",
    headers: getDefaultHeaders(),
  });
  if (!res.ok) throw new Error("Error al reactivar usuario");
  return res.json();
}

export async function getStats() {
  const res = await fetchWithAuth(`${BASE_URL}/users/stats`, {
    headers: getDefaultHeaders(),
  });
  if (!res.ok) throw new Error("Error al obtener estadísticas");
  return res.json();
}

export async function getOffersStats() {
  const res = await fetchWithAuth(`${BASE_URL}/offers/stats`, {
    headers: getDefaultHeaders(),
  });
  if (!res.ok) throw new Error("Error al obtener estadísticas de ofertas");
  return res.json();
}

export async function getCoordinatorStats() {
  const res = await fetchWithAuth(`${BASE_URL}/users/coordinator/stats`, {
    headers: getDefaultHeaders(),
  });
  if (!res.ok) throw new Error("Error al obtener estadísticas del coordinador");
  return res.json();
}

export async function registerUser(data: {
  fullName: string;
  email: string;
  password: string;
  role: string;
  career?: string;
  companyName?: string;
  companyIndustry?: string;
}) {
  const res = await fetchWithAuth(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Error al registrar usuario");
  }

  const result = await res.json();

  if (data.role === "employer" && data.companyName && result.user?.id) {
    await fetchWithAuth(`${BASE_URL}/companies/admin/for-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getDefaultHeaders() },
      body: JSON.stringify({
        userId: result.user.id,
        name: data.companyName,
        industry: data.companyIndustry,
      }),
    });
  }

  return result;
}
