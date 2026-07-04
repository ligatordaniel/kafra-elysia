# Kafra React/Vite Migration Plan

> **For Hermes:** Mantener este archivo actualizado. Marcar cada casilla al completar. Si la sesión se corta, continuar desde la primera casilla sin marcar.

**Goal:** Renombrar DaniDrive a Kafra, mantener backend Bun/Elysia, reemplazar UI HTML inline por frontend React/Vite en `kafra-vite`, y verificar con Docker real.

**Architecture:** Monorepo simple en `/root/kafra-elysia`: backend Elysia sirve API y archivos estáticos del build Vite. Frontend React/Vite vive en `/root/kafra-elysia/kafra-vite` y consume `/api/*`. PostgreSQL y storage existentes se conservan para no perder datos.

**Tech Stack:** Bun, Elysia, TypeScript, React, Vite, PostgreSQL 16, Docker Compose, Nginx reverse proxy, my-skill-and-agents.

---

## Checklist de avance

- [x] 1. Inspeccionar repo actual `/root/danidrive-elysia` y contenedores Docker.
- [x] 2. Crear este plan persistente con checklist.
- [x] 3. Aplicar baseline `my-skill-and-agents` relevante al proyecto.
- [x] 4. Renombrar carpeta/proyecto/backend de `danidrive-elysia` a `kafra-elysia`.
- [x] 5. Actualizar nombres Docker: app, imagen, compose project, Adminer, DB/network si corresponde.
- [x] 6. Actualizar reverse proxy y docker-sleeper para usar Kafra.
- [x] 7. Separar backend: quitar HTML inline como UI principal y servir estáticos Vite.
- [x] 8. Crear frontend `kafra-vite` con React + Vite + TypeScript.
- [x] 9. Implementar login React consumiendo `/api/auth/login` y `/api/auth/me`.
- [x] 10. Implementar vista de archivos: uso, listado, navegación, descargar, eliminar.
- [x] 11. Implementar subida de archivos y carpetas sin perder UX actual.
- [x] 12. Integrar build Vite en Docker backend.
- [x] 13. Actualizar README y referencias DaniDrive -> Kafra.
- [x] 14. Validar `bun install`, `bun run typecheck`, `bun run build` frontend.
- [x] 15. Validar `docker compose config`, build y levantar contenedores.
- [x] 16. Smoke test HTTP: `/health`, `/`, `/api/auth/me`, proxy Nginx.
- [x] 17. Actualizar docs Obsidian en `Projects/` si aplica.

## Decisiones

- Mantener datos existentes: volumen `danidrive_storage_data` y `dani_postgres_data` pueden conservarse inicialmente aunque el proyecto se llame Kafra. Si se renombra volumen después, hacerlo con backup explícito.
- Mantener Adminer por ahora: el cambio pedido es frontend principal React/Vite, no panel DB.
- No exponer PostgreSQL directo.
- Reutilizar auth actual por cookie HTTP-only.

## Archivos principales a tocar

- `/root/kafra-elysia/package.json`
- `/root/kafra-elysia/Dockerfile`
- `/root/kafra-elysia/docker-compose.yml`
- `/root/kafra-elysia/src/index.ts`
- `/root/kafra-elysia/src/shared/http.ts`
- `/root/kafra-elysia/src/features/auth/auth.routes.ts`
- `/root/kafra-elysia/src/features/storage/storage.routes.ts`
- `/root/kafra-elysia/kafra-vite/*`
- `/root/reverse-proxy/nginx/conf.d/00-danidrive.conf` o nuevo `00-kafra.conf`
- `/root/reverse-proxy/sleeper/sleeper.py`

## Verificación esperada

```bash
cd /root/kafra-elysia
bun install
bun run typecheck
cd kafra-vite && bun install && bun run build
cd /root/kafra-elysia && docker compose config
docker compose up -d --build
curl -fsS http://127.0.0.1:8089/health
curl -i http://127.0.0.1:8089/api/auth/me
```

Resultado esperado:
- `/health` responde `{ ok: true, name: "kafra-elysia" }` o similar.
- `/` sirve React build.
- `/api/auth/me` responde 401 si no hay sesión, sin romper.
- `edge-nginx` apunta al contenedor Kafra.

## Riesgos

- Renombrar contenedores rompe `docker-sleeper` si no se actualiza al mismo tiempo.
- Cambiar volúmenes puede ocultar datos existentes. Por eso se conservan nombres de volúmenes al inicio.
- Vite necesita fallback SPA para rutas React.
- El build Docker debe copiar `kafra-vite/dist` antes de correr Elysia.
