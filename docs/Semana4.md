# Semana 4 (React)


## Qué se implementó

### 1. AuthContext (`src/context/AuthContext.tsx`)

Context de React que centraliza todo el estado de autenticación de la app.

**El contexto maneja:**
- El usuario autenticado (`user: User | null`)
- Estado de carga (`isLoading: boolean`)
- Estado de error (`error: string | null`)
- Acciones: `login(email, password)` y `logout()`

**Cómo funciona internamente:**
- Se usa `useReducer` en lugar de múltiples `useState` porque el estado de auth tiene varias transiciones relacionadas (LOGIN_START → LOGIN_SUCCESS / LOGIN_ERROR → LOGOUT). Con `useReducer` todas las transiciones quedan centralizadas en un solo lugar.
- Al montar la app, se revisa `localStorage` para restaurar la sesión si el usuario ya había iniciado sesión antes.
- El `login()` simula una llamada a API con `setTimeout` de 500ms y valida contra credenciales hardcodeadas.
- Al hacer login exitoso, guarda el usuario en `localStorage` y setea una cookie `auth-token` con el rol, que el middleware de Next.js puede leer.

### 2. Hook personalizado `useAuth` (`src/hooks/useAuth.ts`)

Hook reutilizable que encapsula el acceso al AuthContext.

**Decisión:** Se creó un hook separado en lugar de usar `useContext(AuthContext)` directamente en cada componente porque:
- Valida que el contexto exista y lanza un error claro si se usa fuera del `AuthProvider`
- Queda más limpio en los componentes: `useAuth()` en lugar de `useContext(AuthContext)`
- Es el punto único de acceso al contexto, si en el futuro cambia la implementación solo se modifica el hook

### 3. Middleware de rutas protegidas (`src/middleware.ts`)

El middleware de Next.js intercepta las peticiones **antes** de renderizar la página.

**Rutas protegidas y sus roles:**

| Ruta | Rol requerido |
|------|--------------|
| `/student/*` | `student` |
| `/coordinator/*` | `coordinator` |
| `/employer/*` | `employer` |
| `/admin/*` | `admin` |

**Lógica de redirección:**
- Sin sesión intentando entrar a ruta protegida → redirige a `/` (landing pública)
- Con sesión pero rol incorrecto → redirige al dashboard del rol actual (`/${authToken}`)
- Ya autenticado intentando ir a `/login` → redirige a su dashboard

**Decisión de diseño:** Se redirige a `/` (y no a `/login`) cuando no hay sesión, porque la landing es pública y accesible para cualquier visitante. Solo se exige login al intentar acceder a rutas protegidas.

La landing `/` **no está en el matcher**, por lo que nunca es interceptada por el middleware.

### 4. Integración del `AuthProvider` en el layout raíz (`src/app/layout.tsx`)

Se envolvió el `{children}` con `<AuthProvider>` para que todo el árbol de componentes tenga acceso al contexto de autenticación.

### 5. Formulario de login funcional (`src/app/login/page.tsx`)

Se conectó el formulario existente al `AuthContext`:
- Muestra un **spinner** en el botón mientras `isLoading` es `true`
- Muestra un **mensaje de error** en rojo cuando `error` tiene valor
- Los inputs quedan **deshabilitados** durante la carga
- Al login exitoso, redirige al dashboard del rol correspondiente

### 6. Logout funcional en el Sidebar (`src/components/layout/sidebar.tsx`)

El botón "Cerrar sesión" se conectó a la función `logout()` del contexto:
- Llama a `logout()` que limpia `localStorage` y borra la cookie `auth-token`
- Luego redirige a `/login` con `router.push()`

---

## Flujo de autenticación

```
Usuario llena el formulario de login
        ↓
  handleSubmit() → login(email, password)
        ↓
  AuthContext: dispatch("LOGIN_START") → isLoading = true
        ↓
  Simula llamada API (500ms)
        ↓
  ¿Credenciales válidas?
  ├── SÍ → dispatch("LOGIN_SUCCESS") → guarda en localStorage + cookie
  │         → redirige a /{role}
  │         → Middleware permite el acceso
  └── NO → dispatch("LOGIN_ERROR") → muestra error en el formulario
```

---

## Credenciales de prueba

| Email | Contraseña | Rol |
|-------|-----------|-----|
| `admin@ucb.edu.bo` | `admin123` | Administrador |
| `coordinator@ucb.edu.bo` | `coordinator123` | Coordinador |
| `employer@ucb.edu.bo` | `employer123` | Empleador |
| `student@ucb.edu.bo` | `student123` | Estudiante |

