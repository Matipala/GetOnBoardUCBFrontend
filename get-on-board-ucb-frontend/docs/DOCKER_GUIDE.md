# Guía de Docker - Frontend

Este proyecto está configurado para correr de forma independiente usando Docker, ideal para arquitecturas Polyrepo.

## Comandos Rápidos

- **Encender**: `docker compose up -d`
- **Apagar**: `docker compose down`
- **Ver logs**: `docker compose logs -f frontend`

## Puertos

| Servicio | Puerto Host (Tu PC) | Puerto Contenedor | Variable de Entorno |
| :--- | :--- | :--- | :--- |
| **Frontend (Next.js)** | `3000` | `3000` | `PORT` en `.env.local` |

## Desarrollo con Docker

- **Sincronización Directa**: Gracias a los **Volumes**, los cambios que hagas en tus componentes de Next.js se verán reflejados en tiempo real sin necesidad de reiniciar los contenedores.
- **Comunicación con la API**: El frontend está configurado para conectarse al backend en `http://localhost:3001` por defecto (configurable en `NEXT_PUBLIC_API_URL`).
