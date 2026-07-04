---
applyTo: '**'
---

# AI Project Baseline — Project Instructions

This repository uses `.claude/CLAUDE.md` as the canonical AI manifest.

Before starting any code task:

1. Read `.claude/CLAUDE.md`.
2. Follow its LOAD PROTOCOL.
3. Read `.claude/context/project.md` if it exists and is configured.
4. Apply only skills whose `enabled` flag and `context` match the manifest CONFIG.
5. If `project_type = PENDING` or the user requests setup, follow `.claude/agents/setup.md` before making structural changes.

Rules:

- Do not duplicate or rewrite the manifest in this file.
- Do not apply frontend/design guidance to backend-only work.
- Do not apply backend guard-clause guidance to frontend-only UI work unless backend logic is involved.
- For existing projects, preserve current architecture, design system, Figma, `DESIGN.md`, README, and local conventions unless the user explicitly asks to migrate.
- When project docs conflict with generic baseline rules, project docs win.
