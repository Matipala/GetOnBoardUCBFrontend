# Semana 5


## Qué se implementó

### 1. `db.json` — Base de datos simulada

Archivo en la raíz del proyecto que JSON Server convierte automáticamente en una API REST completa.

```bash
npx json-server db.json --port 3001
```

Endpoints disponibles automáticamente para Employer y Student:
- `GET  /offers` — lista de ofertas para employer y student
- `DELETE /offers/:id` — eliminar oferta solo employer

**Decisión:** Se eligió JSON Server sobre MSW porque es más simple de entender visualmente y no requiere configuración especial con Next.js App Router.

---

### 2. `src/lib/api.ts` — Funciones de fetch

Funciones puras que hacen `fetch` hacia JSON Server. Lanzan `Error` si la respuesta no es OK, para que TanStack Query pueda capturarlos y ponerlos en el estado `error`.

- `getOffers()` → GET /offers
- `deleteOffer(id)` → DELETE /offers/:id

---

### 3. `src/lib/queryClient.ts` — Instancia compartida del cliente

Instancia de `QueryClient` donde vive el caché de toda la app.

**Configuración:**
- `retry: 1` → si falla, reintenta 1 vez antes de mostrar error
- `staleTime: 30000` → datos son "frescos" por 30 segundos (evita refetches innecesarios)

---

### 4. `src/providers/QueryProvider.tsx` — Proveedor

Componente `"use client"` que envuelve la app con `QueryClientProvider`. Necesario para que `useQuery` y `useMutation` funcionen en cualquier componente.

Integrado en `src/app/layout.tsx` dentro del `AuthProvider`:

```tsx
<AuthProvider>
  <QueryProvider>
    {children}
  </QueryProvider>
</AuthProvider>
```

---

### 5. `src/hooks/useOffers.ts` — Hook con `useQuery`

Hook reutilizable para obtener la lista de ofertas.

```ts
useQuery<JobOffer[]>({
    queryKey: ["offers"],   // clave del caché
    queryFn: getOffers,
})
```

**¿Qué es `queryKey`?** Es el identificador del caché. Si dos componentes distintos usan `["offers"]`, comparten los mismos datos y solo se hace 1 request.

Devuelve: `{ data, isLoading, error }`

---

### 6. `src/hooks/useDeleteOffer.ts` — Hook con `useMutation`

Hook para eliminar una oferta. `useMutation` se usa para operaciones que **modifican** datos (POST, PUT, DELETE).

```ts
useMutation({
    mutationFn: deleteOffer,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["offers"] });
    },
})
```

**¿Por qué `invalidateQueries`?** Después del DELETE, el caché tiene datos desactualizados. `invalidateQueries` marca los datos como inválidos y fuerza un refetch automático, actualizando la lista sin recargar la página.

---

### 7. `src/components/ui/SkeletonCard.tsx` — Esqueleto de carga

Componente que muestra un placeholder animado mientras cargan los datos. Usa `animate-pulse` de Tailwind.

Se usa en las páginas de ofertas mostrando 6 (estudiante) o 3 (empleador) instancias mientras `isLoading` es `true`.

---

### 8. Páginas de ofertas

**`/student/offers`** — flujo de 3 estados:
- `isLoading` → 6 SkeletonCards
- `error` → mensaje de error con hint de JSON Server
- `data` → grid de tarjetas con título, empresa, ubicación, salario y badge de tipo

**`/employer/offers`** — igual pero con botón "Eliminar":
- Llama a `deleteMutation.mutate(offer.id)`
- Deshabilita el botón mientras `isPending`
- Muestra "Eliminando..." durante la operación

---

### 9. `src/app/error.tsx` — Error boundary global

Next.js muestra este componente automáticamente cuando cualquier página lanza un error no capturado. Incluye botón "Reintentar" que llama a `reset()` para volver a renderizar el componente fallido.

---

## Flujo de datos

```
JSON Server :3001
      ↓  fetch (api.ts)
TanStack Query (caché)
      ↓  useOffers() / useDeleteOffer()
Componentes de página
  ├── isLoading → <SkeletonCard />
  ├── error     → mensaje de error
  └── data      → tarjetas de ofertas
                      ↓ clic en Eliminar
                 DELETE /offers/:id
                      ↓ onSuccess
                 invalidateQueries(["offers"])
                      ↓ refetch automático
                 Lista actualizada ✅
```
