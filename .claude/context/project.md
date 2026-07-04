# Kafra Project Context

## Nombre
Kafra

## Estructura objetivo
- Backend/proyecto raíz: `/root/kafra-elysia`
- Frontend: `/root/kafra-elysia/kafra-vite`

## Stack
- Backend: Bun + Elysia + TypeScript
- Frontend: React + Vite + TypeScript
- DB: PostgreSQL 16 en Docker
- Reverse proxy: Nginx Docker (`edge-nginx`)
- Storage: volumen Docker existente para archivos

## Objetivo actual
Migrar la UI HTML inline a React/Vite sin rehacer el backend ni perder datos.

## Skills aplicables
- clean-code: siempre
- feature-folder-structure: aplicar con criterio; proyecto chico, mantener simple
- frontend-design: aplicar al frontend React/Vite
- guard-clauses: backend/API y validaciones
- caveman: solo para explicaciones a Daniel
