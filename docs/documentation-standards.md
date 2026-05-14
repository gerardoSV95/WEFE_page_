# Documentation Standards

Rules for writing and maintaining technical documentation in this repository.
Read `docs/base-standards.md` first.

## What lives where

| Location | Purpose |
|---|---|
| `README.md` | Quick-start: clone, install, run dev. ≤ 1 page. |
| `CLAUDE.md` | Agent-facing operating notes; not a substitute for `docs/`. |
| `docs/` | Stable technical reference (this directory). |
| `openspec/changes/<name>/` | Per-change artifacts: `proposal.md`, `design.md`, `specs/**/*.md`, `tasks.md`. |
| `openspec/specs/` | Archived (accepted) capability specs; populated by `/opsx:archive`. |
| `ai-specs/agents/` | Agent role profiles (backend-developer, frontend-developer, …). |
| `ai-specs/skills/` | Reusable workflow recipes for agents. |

## Language and tone

- All files in `docs/`, `openspec/`, `ai-specs/`, `README.md` and `CLAUDE.md`
  are written in **English**.
- Tone: declarative, second person (`you`) or imperative. Avoid filler
  ("simply", "just", "obviously").
- Spanish appears only inside quoted user-facing copy or example commit
  messages, when those examples are themselves Spanish.

## Markdown style

- One `#` H1 per file, matching the filename's intent.
- Use `##` … `####` (max depth 4). Do not skip levels.
- Code fences must declare the language: ` ```bash `, ` ```jsx `, ` ```yaml `.
- Inline code for filenames, identifiers, env vars, CLI flags.
- Tables for any list of ≥ 3 columns or any rule set with discrete attributes.
- Bullets use `-`; numbered lists only when order matters.
- Links are relative inside the repo (`docs/base-standards.md`) and absolute
  for the web. No bare URLs — always `[label](url)`.

## OpenSpec change documents

Every non-trivial change goes through the OpenSpec workflow.

**Artifact set** (created by `/opsx:propose`):

```
openspec/changes/<kebab-name>/
  proposal.md          # Why + What Changes + Capabilities + Impact
  design.md            # Context, Decisions, Risks (HOW)
  specs/<cap>/spec.md  # One file per capability listed in proposal
  tasks.md             # Checkboxed implementation steps
```

**Proposal rules**:

- Each capability listed under `### New Capabilities` becomes a new spec file
  named exactly with the kebab-case identifier from the proposal.
- `### Modified Capabilities` only lists existing spec folders whose
  **requirement-level** behavior is changing.

**Spec rules**:

- Use delta headers exactly: `## ADDED Requirements`,
  `## MODIFIED Requirements`, `## REMOVED Requirements`, `## RENAMED Requirements`.
- Each requirement: `### Requirement: <Name>` followed by a paragraph using
  **SHALL** / **MUST** (avoid *should*, *may*).
- Every requirement has at least one scenario:
  `#### Scenario: <name>` with `- **WHEN** …` / `- **THEN** …` bullets.
- Scenario headers **must** use exactly four hash characters (`####`); three
  fails silently in tooling.
- `MODIFIED` requirements copy the entire original block, then edit; partial
  modifications lose detail at archive time.
- `REMOVED` requirements include `**Reason**:` and `**Migration**:` lines.

**Task rules**:

- Top-level groups are `## 1. …`, `## 2. …`.
- Each task is a checkbox: `- [ ] X.Y description`.
- Tasks are small enough to finish in a single focused work block and each
  one is independently verifiable.

## File-level conventions

- Filenames: `kebab-case.md`.
- Each `docs/*.md` opens with an H1 matching the document's title.
- A short intro paragraph (1–3 sentences) states the document's scope and
  its relationship to `docs/base-standards.md`.

## Keeping docs aligned

When a change touches code that the docs describe (palette, stack version,
endpoint contracts, entity shape), the **same OpenSpec change** must update:

1. The relevant file under `docs/`.
2. `docs/api-spec.yml` if endpoints change.
3. `docs/data-model.md` if entities change.

A change PR that updates code without the matching doc update is rejected at
review.
