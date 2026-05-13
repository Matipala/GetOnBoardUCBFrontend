# Arquitectura

## Stack
- Next.js (App Router)
- React
- React Query para data fetching
- Biome para lint/format

## Routing
- Ruta principal: [GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/app/page.tsx](GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/app/page.tsx)
- Login: [GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/app/login/page.tsx](GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/app/login/page.tsx)
- Dashboard: [GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/app/(dashboard)](GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/app/(dashboard))

## Estado y auth
- Contexto de auth: [GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/context/AuthContext.tsx](GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/context/AuthContext.tsx)
- Middleware: [GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/middleware.ts](GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/middleware.ts)

## API client
- Cliente centralizado: [GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/lib/api.ts](GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/lib/api.ts)
- Manejo de refresh token en cookies.
