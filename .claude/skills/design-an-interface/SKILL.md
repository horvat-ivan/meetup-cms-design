---
name: design-an-interface
description: Generate multiple radically different UI variants for the active feature. Uses Pencil MCP if a .pen file is the source-of-truth; falls back to written exploration for Figma users. Dispatches parallel sub-agents per variant. Use when user says "/explore-design".
---

# Explore Design Variants

You are in the **design** repo. The user has just picked up a design seed issue and wants to explore UI variants for the feature.

## Detect the tool

Check `designs/<slug>/`:
- If `source.pen` exists → **Pencil mode** (use `mcp__pencil__*` tools).
- If `figma.url` exists → **Figma mode** (written exploration only — designer translates to Figma manually).
- If neither → ask the user: "Pencil or Figma for this feature?"

## Pencil mode

1. Read the seed issue body (PRD context + acceptance criteria).
2. Open the `.pen` file via `mcp__pencil__open_document`.
3. Dispatch **3 parallel sub-agents** via the Agent tool, each generating a radically different variant:
   - Variant 1: minimal / utilitarian
   - Variant 2: visual / expressive
   - Variant 3: dense / power-user
4. Each sub-agent uses `mcp__pencil__batch_design` to lay out a frame in the .pen file.
5. After all 3 finish, write `designs/<slug>/README.md` with rationale for each variant + tradeoffs.
6. Show the user the three frame names and ask which to refine.

## Figma mode

1. Read the seed issue body.
2. Generate **3 written variants** in `designs/<slug>/README.md`:
   - Each variant: layout description, primary interactions, tradeoffs.
3. Tell the user: "Translate variant <N> into Figma. Update `figma.url` when done."

## Output structure

```
designs/<slug>/
├── README.md          (this file — rationale, decisions, a11y notes)
├── source.pen         (Pencil mode — modified by you)
└── figma.url          (Figma mode — written by designer)
```

## What you NEVER do

- Generate variants without reading the PRD context first.
- Skip the README.md write — rationale is as important as the visuals.
- Make product strategy decisions ("should we even include this feature?").
