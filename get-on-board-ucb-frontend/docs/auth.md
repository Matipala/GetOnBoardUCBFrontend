# Autenticacion (Frontend)

## Resumen
El frontend autentica contra el backend, guarda tokens en cookies y el usuario en localStorage. Usa middleware para proteger rutas por rol.

## Login
- UI: [GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/app/login/page.tsx](GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/app/login/page.tsx)
- Hook: [GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/hooks/UseAuth.ts](GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/hooks/UseAuth.ts)
- Contexto: [GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/context/AuthContext.tsx](GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/context/AuthContext.tsx)

Flujo:
1. El usuario envia credenciales.
2. Se llama a POST /auth/login.
3. Si es valido, se guarda:
   - localStorage: `auth_user`
   - cookies: `auth-token` (rol), `access_token`, `refresh_token`
4. Se redirige segun rol.

## Proteccion de rutas
- Middleware: [GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/middleware.ts](GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/middleware.ts)
- Reglas:
  - Si la ruta es protegida y no hay `auth-token`, redirige a /.
  - Si el rol no coincide, redirige al dashboard del rol actual.
  - Si ya esta autenticado, /login redirige a su dashboard.

## Consumo de API con tokens
- Cliente: [GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/lib/api.ts](GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/lib/api.ts)
- Se envia `Authorization: Bearer <access_token>` cuando existe.
- Si responde 401, intenta refresh con /auth/refresh usando `refresh_token` y `auth_user.id`.
- Si el refresh falla, limpia cookies, localStorage y redirige a /.

## Logout
- Funcion en AuthContext:
  - POST /auth/logout con email.
  - Limpia localStorage y cookies.

## Configuracion
Variable usada:
- NEXT_PUBLIC_API_URL

Referencia: [GetOnBoardUCBFrontend/get-on-board-ucb-frontend/.env.example](GetOnBoardUCBFrontend/get-on-board-ucb-frontend/.env.example)
