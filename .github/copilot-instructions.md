# AI Project Baseline — GitHub Copilot

Repository-wide instructions for GitHub Copilot.

- Treat `.claude/CLAUDE.md` as the canonical AI manifest for this project.
- Before code changes, read `.claude/CLAUDE.md` and follow its LOAD PROTOCOL.
- Load/apply only the skills whose `enabled` flag and `context` match the CONFIG.
- If `project_type = PENDING` or the user requests setup, follow `.claude/agents/setup.md`.
- Do not duplicate or override the manifest here; keep `.claude/CLAUDE.md` as the source of truth.

For Copilot clients that support instruction files, also use `.github/instructions/ai-project-baseline.instructions.md`.
