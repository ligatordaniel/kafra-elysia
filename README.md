# Kafra Elysia

Kafra es una app privada para administrar archivos en la VPS.

## Stack

- Backend: Bun + Elysia + TypeScript
- Frontend: React + Vite + TypeScript (`kafra-vite`)
- DB: PostgreSQL 16
- Panel DB temporal: Adminer en `/db/`
- Reverse proxy: Nginx Docker (`edge-nginx`)

## Arranque

```bash
docker compose up -d --build
```

- App: http://TU_SERVIDOR:8089
- DB/Adminer: http://TU_SERVIDOR:8089/db/

## Desarrollo frontend

```bash
cd kafra-vite
npm install
npm run dev
```

El dev server proxy pasa `/api` a `http://127.0.0.1:3000`.

## Arquitectura

```text
src/
  features/
    auth/       Login, logout, sesiones
    storage/    Listar, subir, descargar y eliminar archivos/carpetas
  shared/       Config, DB, crypto, HTTP helpers
kafra-vite/
  src/
    features/
      auth/     Login React
      storage/  UI de archivos
    shared/     Formato/utilidades
```

## Datos

Los volúmenes Docker existentes se conservan para evitar pérdida de datos:

- `danidrive_storage_data` → archivos
- `Yggdrasill-postgress` → PostgreSQL compartido/existente

El volumen PostgreSQL fue copiado desde `dani_postgres_data` y el volumen viejo queda intacto como respaldo.
