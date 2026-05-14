# Base Standards

Single source of truth for this repository. Any rule defined here overrides
backend, frontend, or documentation standards if they conflict.

## Project identity

- **Product**: W.E.F.E — a single-page marketing site for a web-development
  consultancy.
- **Type**: static frontend (no backend service in this repository).
- **Languages**:
  - Source code, identifiers, comments, and technical documentation → **English**.
  - User-facing copy (UI, headings, form labels, error messages) → **Spanish**.

## File and encoding conventions

- UTF-8, LF line endings, final newline at end of file.
- Indentation:
  - `.jsx`, `.js` → 4 spaces.
  - `.css`, `.html`, `.yml`, `.yaml`, `.json` → 2 spaces.
- Naming:
  - React components: `PascalCase.jsx` with `export default`.
  - Plain JS modules: `camelCase.js`.
  - Markdown / spec files: `kebab-case.md`.
  - CSS custom properties: `--kebab-case`.
  - Section IDs in HTML/JSX anchors: lowercase Spanish nouns (`#inicio`,
    `#acerca`, `#servicios`, `#portafolio`, `#contacto`).

## Color, typography, and theming

- Colors **MUST** be referenced via the CSS custom properties declared in
  `src/index.css` (`--first-color`, `--second-color`, `--third-color`, their
  alpha variants, and neutrals). The current palette is **emerald + graphite**
  (see `docs/frontend-standards.md` § Palette).
- Hard-coded hex/`rgb()`/`rgba()` values in components are forbidden, with one
  documented exception: `--hero-opacity-color` in `src/components/Hero.jsx`,
  which must mirror `--second-alpha-color`.
- Typography uses the `Raleway` family declared by `--font` in `:root`.

## Source control

- Default branch: `main`.
- Commit subjects: imperative mood, lower-case start, ≤ 72 chars, English.
- **Never** include AI watermarks (e.g. "Generated with Claude Code",
  "Co-Authored-By: Claude…"). Commit messages must read as authored by a human
  professional.
- Do not commit `node_modules/`, `dist/`, `.env*`, IDE folders, or credentials.

## Security and privacy

- Never hard-code secrets, tokens, or personal email addresses in source.
  Placeholder values such as `your@email.com` in `Contact.jsx` must be
  replaced before any deploy via environment configuration, not by committing
  the real value into the bundle.
- Form submissions are sent to a third-party (`formsubmit.co`); treat all user
  input as untrusted and never echo it back to the page without sanitization.
- No analytics, tracking pixels, or third-party scripts may be added without
  an OpenSpec change proposal that explicitly documents the data flow.

## Quality gates

Before opening a pull request, the following must all pass:

1. `npm run lint` — ESLint clean (warnings count as failures).
2. `npm run build` — production build succeeds.
3. Visual smoke test in `npm run dev`: navigate every section, exercise the
   mobile menu (< 1024 px viewport) and the contact form happy/error paths.

## Change workflow

Every non-trivial change is proposed through the **OpenSpec** workflow under
`openspec/changes/<kebab-name>/`. See `docs/documentation-standards.md` for
the artifact set and required structure.
