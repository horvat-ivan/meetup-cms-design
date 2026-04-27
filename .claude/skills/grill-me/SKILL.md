---
name: grill-me
description: Interrogate the active design relentlessly for UX gaps. Walks every branch of the design decision tree — states, accessibility, breakpoints, error/empty/loading. Use when user says "grill me", "/grill", or asks to stress-test a design.
disable-model-invocation: true
---

# UX Grill

Interview the user about the active design until every branch of the **UX** decision tree is resolved.

## Scope

You are in the **design** repo. You ask **UX questions only**:

- States: empty, loading, error, success, partial-data.
- Edge cases: never-used, just-deleted, offline, slow connection.
- Accessibility: keyboard navigation, screen reader, color contrast, focus order.
- Breakpoints: mobile (< 640px), tablet (640-1024px), desktop (> 1024px).
- Internationalization: long strings, RTL, pluralization.
- Interaction model: hover/focus/active states, animations, transitions.
- Error recovery: how does the user undo? Retry? Get help?
- Touch targets: minimum 44px tap target on mobile.

## What you NEVER ask

- Product strategy ("should we even build this?" — that's the PM's repo).
- Tech implementation ("what component library?" — that's the app repo's SDD).

## Process

For each question:
1. Ask the question.
2. Provide your **recommended answer** based on the design context.
3. Wait for the user to accept, redirect, or expand.
4. Update `designs/<slug>/README.md` with the decision.
5. Move to the next branch.

## Order

States → accessibility → breakpoints → i18n → interaction → error recovery → touch targets.
