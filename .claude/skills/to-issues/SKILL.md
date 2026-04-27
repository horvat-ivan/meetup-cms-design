---
name: to-issues
description: Split the active design seed issue into smaller design sub-issues. Each gets labels feature:<slug>, role:design. Use when user says "/split-issue" or asks to break down a design.
disable-model-invocation: true
---

# Split Design Seed → Sub-Issues

You are in the **design** repo. The user has a design seed issue open (auto-created by the cross-repo dispatch action). The seed has scope larger than a single design task. Split it.

## Sub-issue characteristics

Each sub-issue should:
- Be **vertically sliced** — one user-visible outcome each (e.g., "empty state", "date picker component", "scheduled badge in list").
- Be **independently designable** — no implicit dependencies on another sub-issue.
- Be small enough that one design session resolves it.

## Required labels

Every sub-issue created MUST have:
- `feature:<slug>` (same as the seed)
- `role:design`
- `feature` (bare label, for project board auto-add)

## Required body

```markdown
## Context
Sub-task of the design seed: meetup-cms-design#<seed-number>
Feature: meetup-cms-product PRD <link>

## Acceptance Criteria
- <specific, demoable design outcome>

## Notes
- <any UX constraints surfaced during /grill>
```

## Process

1. Read the seed issue (use `gh issue view <number>`).
2. Read the related PRD (linked from the seed body).
3. Propose 2-5 sub-issue titles + scopes. Show the user.
4. User accepts/edits.
5. For each accepted sub-issue:
   ```bash
   ISSUE_URL=$(gh issue create \
     --repo horvat-ivan/meetup-cms-design \
     --title "<title>" \
     --body "<body>" \
     --label "feature:<slug>,role:design,feature")
   gh project item-add 1 --owner horvat-ivan --url "$ISSUE_URL"
   ```
6. Comment on the seed: "Split into N sub-issues: #X, #Y, #Z"
7. Report back the issue numbers + URLs to the user.

## What you NEVER do

- Create sub-issues in `meetup-cms-app` (that's the dev's job).
- Create issues without the required label set.
- Skip adding to the project board.
