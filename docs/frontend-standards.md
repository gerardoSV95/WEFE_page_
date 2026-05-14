# Frontend Standards

Authoritative guide for the React/Vite frontend in this repository. Read
`docs/base-standards.md` first — anything here is subordinate to it.

## Stack

| Concern | Choice | Notes |
|---|---|---|
| Build tool | **Vite 6** | configured in `vite.config.js` |
| React plugin | `@vitejs/plugin-react-swc` | SWC for HMR; **no Babel** |
| UI runtime | **React 19** | `StrictMode` is mandatory in `src/main.jsx` |
| Styling | **Tailwind CSS 4** via `@tailwindcss/vite` + **plain CSS** in `src/index.css` | Tailwind v4 is CSS-first — there is **no** `tailwind.config.js` |
| Linter | ESLint flat config in `eslint.config.js` with `react-hooks` + `react-refresh` |
| Test runner | _none configured_ — do not add one without an OpenSpec proposal |

## Directory layout

```
src/
  main.jsx           ← entry; renders <App/> inside <StrictMode>
  App.jsx            ← composes the page sections
  App.css            ← placeholder for shell-specific overrides
  index.css          ← global styles, custom properties, component classes
  assets/            ← static SVGs, images bundled by Vite
  components/        ← one PascalCase.jsx per component, export default
  hooks/             ← reusable hooks (useReveal, …)
```

The current section order inside `<main>` in `App.jsx` is:
`Hero → Stats → About → Services → Process → Portfolio → TechStack → Contact`.
The `Header` is sticky at the top; the `Footer` follows `<main>`.

## Palette (emerald + graphite)

Declared in `src/index.css :root`. Components consume these via `var(--…)`:

| Variable | Value | Role |
|---|---|---|
| `--first-color` | `#10b981` | accent (buttons, highlights, hover ink) |
| `--first-alpha-color` | `rgba(16, 185, 129, 0.75)` | portfolio hover overlay |
| `--second-color` | `#111827` | base dark (header, menu bg, button bg) |
| `--second-alpha-color` | `rgba(17, 24, 39, 0.75)` | hero overlay |
| `--third-color` | `#047857` | footer background |
| `--third-alpha-color` | `rgba(4, 120, 87, 0.75)` | reserved overlay |

Neutrals (`--white-color`, `--gray-light-color`, `--gray-color`,
`--gray-dark-color`, `--black-color`) and semantic tokens (`--title-color`,
`--text-color`, `--link-color`) are also defined in `:root` and must be
reused.

## Design tokens

Beyond color, `:root` declares the editorial design tokens. All of these are
consumed via `var(--…)`; do not hard-code their values inside components.

| Group | Tokens | Notes |
|---|---|---|
| Radii | `--radius-sm` (8px), `--radius-md` (12px), `--radius-lg` (24px), `--radius-pill` (999px) | Cards use `--radius-lg`; pills/CTAs use `--radius-pill` |
| Shadows | `--shadow-sm`, `--shadow-md`, `--shadow-lg` | `rgba(17, 24, 39, …)` series — never invent new shadow values |
| Spacing | `--space-section` = `clamp(4rem, 8vw, 8rem)` | Default vertical padding for `.section` |
| Display type | `--type-display-xl` (hero), `--type-display-lg` (section heads), `--type-display-md` | All use `clamp()` for fluid scaling |
| Display font | `--font-display` — currently same family as `--font` (Raleway), weight 900 |
| Motion easing | `--ease-out` = `cubic-bezier(0.16, 1, 0.3, 1)` | Default for transitions/animations |

## Layout system

The editorial layout uses a 12-column grid via the global class `.grid-12`:

- Apply `.grid-12` to a container; place children with `.col-span-{1-12}`
  and optionally `.col-start-{1-12}`.
- Below 768px the grid collapses to a single column automatically (all
  children get `grid-column: 1 / -1`).
- Page section spacing: wrap top-level sections with `<section className="section">`
  to inherit the fluid `--space-section` padding.

## Reusable primitives in `index.css`

| Class | Purpose |
|---|---|
| `.container` | Centered max-width content wrapper |
| `.section` | Section vertical rhythm |
| `.section-heading` | Header block used by every section (eyebrow + H2 + optional lead `<p>`) |
| `.eyebrow` | Small pill tag with leading dot; for section taglines |
| `.chip` | Inline tag (e.g. portfolio tech badges) |
| `.btn-primary` | Solid emerald CTA, pill shape, lift on hover |
| `.btn-ghost` | Outlined neutral CTA, used as secondary action |
| `.reveal` / `.reveal.is-visible` | Fade-in + slide-up; paired with `useReveal` |
| `.aspect-{16-10\|4-5\|1-1\|4-3\|3-4\|16-9}` | Aspect-ratio utilities for portfolio cards |

## Reveal-on-scroll: `useReveal`

`src/hooks/useReveal.js` exports `useReveal(options?)` which returns
`{ ref, isVisible }`. Usage pattern (canonical):

```jsx
const { ref, isVisible } = useReveal();

return (
    <section
        className={`section reveal${isVisible ? ' is-visible' : ''}`}
        ref={ref}
    >
        …
    </section>
);
```

Rules:

- One `useReveal` call per section component. Apply the `.reveal` class to
  the element receiving the `ref` (or any descendant if the section root
  needs to stay opaque).
- For staggered children (cards, list items) add `style={{ transitionDelay:
  \`${index * 80}ms\` }}` — do **not** add additional `useReveal` calls per
  item.
- The hook respects `prefers-reduced-motion: reduce` and sets `isVisible`
  immediately when reduced motion is requested.

## Component rules

1. **One component per file** in `src/components/<Name>.jsx`, `export default`.
2. **Functional components only**, hooks for state. No class components.
3. **Always use `className`** — never `class`. ESLint allows it but React will
   silently drop `class`, breaking styles.
4. **No unused props.** If a prop is not used, delete it; do not leave
   placeholders.
5. **Static content** that lives next to a component (services, projects,
   social links) is declared as a `const` array at module scope above the
   component, not inside the render.
6. **Keys** for `.map()` must be stable, content-derived strings (e.g.
   `service.title`), never the array index.
7. **Section components** that act as page sections must:
   - Render a `<section>` (or `<footer>`) with the canonical `id` from
     `docs/base-standards.md`.
   - Apply the global section spacing class `section` where appropriate.

## Styling rules

- Reuse the classes already defined in `src/index.css`
  (`.hero-image`, `.hero-image-opacity`, `.section-title`, `.btn`,
  `.service-card`, `.portfolio-card`, `.portfolio-card-info`, `.contact-form`,
  `.contact-form-loader`, `.contact-form-response`, `.footer`,
  `.social-media`, `.container`, utilities `.text-center`, `.bg-gray-light`,
  `.box-shadow-1`, `.none`, …).
- New styles go in `src/index.css` under the existing `Components` /
  `Site Styles` sections. Do **not** introduce CSS modules or styled-components.
- Tailwind utility classes are allowed for one-off layout tweaks but must not
  duplicate or override the design tokens; for anything color-related, use the
  CSS custom properties.
- Responsive breakpoints in `index.css` are `768px` (tablet) and `1024px`
  (desktop). Mobile is the default.

## State and side effects

- Use `useState` for local UI state; lift to a shared parent only when two
  siblings need the same state.
- No global state library is in use. Do not add Redux, Zustand, or Context
  without an OpenSpec change.
- Network calls (currently only the contact form) live inside event handlers,
  use `async/await` wrapped in `try / catch / finally`, and update three
  pieces of state: form data, loading flag, and response payload.
- Never use `document.querySelector`, direct DOM mutation, or `location.hash`
  to drive UI state. The legacy `src/script.js` has been removed precisely
  because it did this.

## Accessibility

- All `<img>` elements require a meaningful `alt`.
- Icon-only buttons require `aria-label`.
- Toggle controls (e.g. the mobile menu button) expose `aria-expanded`.
- Form inputs have `name` attributes matching the API spec (see
  `docs/api-spec.yml`) and use the native `required` attribute.
- The contact form response message uses `role="status"` for assistive tech.

## Forms

The contact form is the canonical example (`src/components/Contact.jsx`):

1. Controlled inputs bound to a single `formData` state object.
2. `handleSubmit` calls `fetch(CONTACT_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(e.target) })`.
3. On success: reset `formData`, render an inline success message.
4. On error: render an inline error message containing the HTTP status.
5. The submit button is disabled and shows "Enviando…" while `isLoading` is
   true; a `.contact-form-loader` element is also shown.

## Linting

`eslint.config.js` enables `react-hooks` (errors on rule violations) and
`react-refresh` (warns about non-component exports). The `no-unused-vars` rule
allows identifiers matching `^[A-Z_]` (typed enum-like constants). Pull
requests must run `npm run lint` clean.
