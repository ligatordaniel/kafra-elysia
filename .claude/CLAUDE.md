# AI MANIFEST — Read This First

> Copy the `.claude/` folder to any project. Edit only **CONFIG** + skill `enabled` flags.
> Escribe `/setup` para configurar el proyecto de forma guiada.

---

## ⚙️ CONFIG

```yaml
project_type: fullstack   # frontend | backend | fullstack | mobile | PENDING
language:     typescript  # typescript | python | go | java | javascript
framework:    react-vite-elysia # react | angular | nestjs | express | fastapi | ...
```

---

## 🧩 SKILLS

| skill                    | enabled | context  |
|--------------------------|---------|----------|
| caveman                  | true    | all      |
| clean-code               | true    | all      |
| feature-folder-structure | true    | all      |
| guard-clauses            | true    | backend  |
| graphify                 | true    | all      |
| frontend-design          | true    | frontend |

> `fullstack` activates both `frontend` and `backend` skills.
> `mobile` only activates `mobile` or `all` skills.

---

## 📋 LOAD PROTOCOL

Before **every code task**, silently:

1. If `project_type = PENDING` → run **ONBOARDING** first, then continue.
2. Read `.claude/context/project.md` and use it as operational context for the task.
   - If all fields say `PENDIENTE` → skip silently, do not ask the user to fill it.
3. For each skill in the table:
   - `enabled = false` → skip
   - `context = backend`  and `project_type` not in {backend, fullstack}  → skip
   - `context = frontend` and `project_type` not in {frontend, fullstack} → skip
   - `context = mobile`   and `project_type` ≠ mobile → skip
   - Otherwise → read `.claude/skills/{skill-name}.md` and apply its rules
4. Never mention which skills or context files were loaded unless asked.

---

## 🤖 AGENTS

| comando  | archivo                      | descripción                                      |
|----------|------------------------------|--------------------------------------------------|
| /setup   | `.claude/agents/setup.md`    | Configura el proyecto de forma guiada (contexto, skills, agentes) |

When the user types a command from this table → read the corresponding agent file and follow its protocol exactly.

---

## 🚀 ONBOARDING *(only when project_type = PENDING)*

### Step 1 — Ask

> **¿Qué tipo de proyecto es este?**
> A) Frontend — solo UI (React, Angular, Vue…)
> B) Backend — solo servidor / API (Express, NestJS, FastAPI…)
> C) Fullstack — front y back en el mismo repo
> D) Detéctalo tú — no estoy seguro

### Step 2 — Auto-detect (if D)

| Signals found | Detected type |
|---|---|
| express / nestjs / fastapi / django / gin / spring in deps; `/routes`, `/controllers`, `/services`; `server.ts`, `main.py` | `backend` |
| react / angular / vue / svelte / next / nuxt in deps; `/components`, `/pages`, `/views`; `angular.json`, `vite.config.*` | `frontend` |
| Both sets present | `fullstack` |
| react-native / flutter / expo / capacitor | `mobile` |

Tell the user what was detected and why before applying.

### Step 3 — Resolve & update

- `language` → infer from lockfile or majority extension (`.ts` → typescript, `.py` → python, `.go` → go)
- `framework` → infer from detected dependencies

Rewrite the **CONFIG** block above. Confirm with:

```
✅ Configurado: {project_type} ({framework}) · {language}
   Skills activos: {comma-separated enabled + matching skills}
```
