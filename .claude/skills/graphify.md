---
name: graphify
description: "Use for any question about a codebase's architecture, file relationships, or project structure — especially when graphify-out/ exists. Query the knowledge graph instead of reading raw files (up to 71x fewer tokens)."
user-invocable: true
risk: safe
source: "https://github.com/safishamsi/graphify"
---

# Graphify Skill

Graphify transforms a codebase into a queryable knowledge graph. Use the graph to answer architecture questions — avoid reading raw files when the graph exists.

## Step 0 — Ensure graphify is installed

Before anything else, verify graphify is available:

```bash
graphify --version
```

If the command fails (not found):

```bash
# Try uv first (preferred)
uv tool install graphifyy && graphify install

# If uv is not available, use pipx
pipx install graphifyy && graphify install
```

Tell the user: `✅ graphify instalado. Ejecuta \`/graphify .\` para indexar el proyecto.`

Do not proceed to query or build until the install succeeds.

---

## Step 1 — Fast Path (after install confirmed)

Does `graphify-out/graph.json` exist?

- **YES + natural-language question** → jump directly to `graphify query "<question>"`. Skip build.
- **YES + explicit rebuild flag** (`--update`, `--cluster-only`) → run the pipeline.
- **NO** → inform the user and offer to build: `graphify-out/ no encontrado. ¿Ejecuto \`/graphify .\` para indexar el proyecto?`

## Commands

```bash
# Query (most common — use this first)
graphify query "question about the codebase"
graphify path "NodeA" "NodeB"          # shortest path between concepts
graphify explain "NodeLabel"           # focused explanation of a concept

# Build / Update
/graphify .                            # full pipeline (first run)
/graphify . --update                   # incremental, re-extracts only changed files (no API cost for code)
/graphify . --cluster-only             # recluster without re-extracting
/graphify . --no-viz                   # skip HTML visualization

# Add content
/graphify add <url>                    # fetch URL and add to corpus

# Export
graphify export callflow-html          # Mermaid architecture diagram
graphify prs                           # PR dashboard with graph impact
```

## Install (if not present)

```bash
uv tool install graphifyy              # preferred
# or
pipx install graphifyy

graphify install                       # Claude Code (auto-detected)
graphify install --platform cursor     # Cursor
graphify install --platform codex      # GitHub Copilot / Codex
```

## When to use each command

| Situation | Command |
|---|---|
| "How does X relate to Y?" | `graphify query "..."` |
| Architecture overview | Read `graphify-out/GRAPH_REPORT.md` |
| "What calls function X?" | `graphify path "caller" "X"` |
| After modifying code | `graphify . --update` (AST only, free) |
| New project, first time | `/graphify .` |

## Outputs (in `graphify-out/`)

- `graph.html` — interactive visualization
- `GRAPH_REPORT.md` — god nodes, surprising connections, suggested questions
- `graph.json` — queryable knowledge graph

## Rules

- Never invent edges or relationships — only report what the graph contains.
- Always show token cost after a query.
- Prefer `graphify query` over reading raw files when `graph.json` exists.
- After code changes, run `--update` (no API cost for code-only changes).
