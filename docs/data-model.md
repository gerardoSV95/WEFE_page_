# Data Model

Canonical entities used by this project. Read `docs/base-standards.md` first.

## Scope

This repository ships a static single-page site with **no persistent
storage**. The "data" is of two kinds:

1. **Static content** — bundled at build time as `const` arrays inside
   components (services, projects, social links).
2. **Ephemeral input** — the contact-form submission, which is sent to the
   third-party relay defined in `docs/api-spec.yml` and not stored locally.

Entities below describe both kinds so the contract is explicit for code
review and future migrations.

---

## ContactSubmission *(ephemeral)*

Captured by `src/components/Contact.jsx` and posted to formsubmit.co as
`multipart/form-data`. Not persisted in this repository.

| Field | Type | Required | Constraints | UI label (Spanish) |
|---|---|---|---|---|
| `name` | string | yes | 2–120 chars | "Nombre" |
| `email` | string (email) | yes | valid RFC 5322 mailbox | "Correo electrónico" |
| `subject` | string | yes | 2–200 chars | "Asunto" |
| `message` | string | yes | 10–5000 chars | "Cuéntanos sobre tu proyecto" |

Lifecycle:

1. User types into controlled inputs → `formData` state object.
2. `handleSubmit` builds a `FormData` from the form element and POSTs to
   `https://formsubmit.co/ajax/{VITE_CONTACT_RECIPIENT}`.
3. On a 2xx response, `formData` is reset and a success message is shown.
4. On any non-2xx, an error message containing the HTTP status is shown.

See `docs/api-spec.yml` → `ContactSubmission` schema for the wire format.

---

## Service *(static content)*

Marketing card describing one offering of the consultancy. Declared in
`src/components/Services.jsx` as `const services: Service[]`.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | Spanish copy, ≤ 40 chars, also used as React key |
| `description` | string | yes | Spanish copy, 60–220 chars |
| `icon` | ReactNode (SVG element) | yes | 48 × 48, `viewBox="0 0 24 24"`, no inline color (inherits from CSS) |

Current dataset: **Desarrollo Web**, **E-commerce**, **Consultoría Técnica**,
**UI/UX Design**.

---

## Project *(static content)*

Portfolio card. Declared in `src/components/Portfolio.jsx` as
`const projects: Project[]`.

| Field | Type | Required | Notes |
|---|---|---|---|
| `image` | string (URL) | yes | Absolute HTTPS URL; placeholders point to Unsplash. To be replaced with self-hosted assets in `public/portfolio/` before launch. |
| `title` | string | yes | Spanish copy, ≤ 40 chars, used as React key |
| `description` | string | yes | Spanish copy, 60–180 chars |
| `tags` | string[] | yes | 1–4 short technology tags (e.g. `"React"`, `"PostgreSQL"`); rendered joined by `" · "` |

---

## Stat *(static content)*

KPI shown in the Stats band below the Hero. Declared in
`src/components/Stats.jsx` as `const stats: Stat[]`.

| Field | Type | Required | Notes |
|---|---|---|---|
| `value` | string | yes | Numeric or symbolic label, e.g. `"+50"`, `"98"`, `"12"` |
| `unit` | string | no | Optional unit/suffix rendered in accent color (e.g. `"%"`, `"años"`) |
| `label` | string | yes | Spanish description, ≤ 40 chars; also used as React key |

Current dataset: **+50 Proyectos entregados**, **12 años En el mercado**,
**98 % Retención de clientes**, **15 Industrias atendidas**. Replace with
real numbers before deploy.

---

## ProcessStep *(static content)*

Step in the Process band. Declared in `src/components/Process.jsx` as
`const steps: ProcessStep[]`.

| Field | Type | Required | Notes |
|---|---|---|---|
| `number` | string | yes | Two-digit label, `"01"` … `"04"`; also used as React key |
| `title` | string | yes | English phase name (`Discovery`, `Design`, `Build`, `Launch`) |
| `description` | string | yes | Spanish copy, 60–160 chars |

Current dataset: **01 Discovery**, **02 Design**, **03 Build**, **04 Launch**.

---

## Tech *(static content)*

Item in the TechStack band. Declared in `src/components/TechStack.jsx` as
`const techs: string[]` — currently a flat array of names, no object shape.

If extended into an object form (e.g. to add `category` or `iconUrl`), update
this section in the same OpenSpec change that introduces the new fields.

Current dataset: **React, Next.js, Node.js, TypeScript, PostgreSQL, AWS,
Tailwind, Vercel, GraphQL, Docker**.

---

## SocialLink *(static content)*

Footer link to an external social profile. Declared in
`src/components/Footer.jsx` as `const socials: SocialLink[]`.

| Field | Type | Required | Notes |
|---|---|---|---|
| `label` | string | yes | Used for `aria-label` and React key — keep English platform names |
| `href` | string (URL) | yes | Currently `"#"` placeholders; replace with real profile URLs before deploy |
| `icon` | string (SVG path `d`) | yes | Single `<path d>` rendered inside a 24 × 24 `viewBox`, `fill="currentColor"` |

Current dataset: **GitHub**, **LinkedIn**, **X / Twitter**.

---

## NavItem *(implicit)*

The five header links to in-page sections. Currently hard-coded inside
`Header.jsx` rather than declared as data. The implicit shape is:

| Field | Type | Notes |
|---|---|---|
| `href` | string | One of `#inicio`, `#acerca`, `#servicios`, `#portafolio`, `#contacto` |
| `label` | string | Spanish copy, matches the section title visually |

If/when navigation grows, this should be extracted to an exported array so
the order is data-driven.

---

## Future first-party persistence

When a backend is introduced (see `docs/backend-standards.md` § "Rules for
any future first-party backend"), persistent versions of these entities must:

- Assign a UUID v4 `id` (string).
- Add audit fields: `created_at`, `updated_at` (ISO-8601 UTC timestamps).
- Add the new schema definitions to `docs/api-spec.yml` in the same OpenSpec
  change that introduces them.
