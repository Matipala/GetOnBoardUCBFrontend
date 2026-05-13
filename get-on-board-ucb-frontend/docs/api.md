# Integracion API

El cliente HTTP esta centralizado en:
- [GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/lib/api.ts](GetOnBoardUCBFrontend/get-on-board-ucb-frontend/src/lib/api.ts)

## Configuracion
- Base URL desde `NEXT_PUBLIC_API_URL`.
- Usa cookies `access_token` y `refresh_token`.

## Endpoints usados
Auth:
- POST /auth/login
- POST /auth/register
- POST /auth/refresh

Offers:
- GET /offers
- GET /offers/:id
- GET /offers/employer/mine
- GET /offers/career/:career
- POST /offers
- PATCH /offers/:id
- DELETE /offers/:id
- GET /offers/stats

Applications:
- POST /applications
- GET /applications/student/mine
- GET /applications/offer/:offerId
- GET /applications/student/:studentId
- PATCH /applications/:id/status

Users:
- GET /users
- GET /users/:id
- PATCH /users/:id
- PATCH /users/:id/role
- PATCH /users/:id/deactivate
- GET /users/stats

Nota: La API real esta en el backend (ver [GetOnBoardUCBBackend/docs/api.md](GetOnBoardUCBBackend/docs/api.md)).
