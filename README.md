# meetup-cms-design

The **design** repo in the Meetup CMS multirepo workflow.

This is where designs live — `.pen` files (Pencil) or `.url` link files (Figma), plus per-feature design rationale.

## Quickstart for designers

1. Clone this repo.
2. Open in Claude Code.
3. When a design seed issue arrives, run `/explore-design` for the active feature.
4. Push committed designs back to `main`.

## Folder convention

```
designs/
  <feature-slug>/
    README.md          <- rationale, decisions, a11y notes
    source.pen         <- Pencil source (if used)
    figma.url          <- Figma URL (if used)
```

## Spec

Full multirepo workflow: `meetup-cms-product/docs/architecture/`.
