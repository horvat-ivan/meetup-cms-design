# Design Tooling

This repo is **tool-agnostic**. Designers can use Pencil or Figma.

## Pencil

Pencil files (`.pen`) live in `designs/<slug>/source.pen` and are accessed via the Pencil MCP.

To explore a new feature:
1. Run `/explore-design` from Claude Code.
2. Pencil opens automatically. Three variants are generated as parallel sub-agents.

## Figma

Figma source-of-truth lives in Figma cloud. In this repo, commit `designs/<slug>/figma.url` containing the URL.

To explore a new feature:
1. Open Figma directly.
2. Run `/explore-design` for written exploration; translate manually into Figma frames.
3. Commit the URL to `figma.url`.

## Per-feature folder

Every feature gets a folder under `designs/<slug>/` containing:
- `README.md` — rationale, decisions, a11y notes
- `source.pen` OR `figma.url` (whichever is the source of truth)
