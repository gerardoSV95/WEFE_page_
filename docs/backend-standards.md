# Backend Standards

## Current state

**This repository contains no backend service.** The product is a static
single-page site built with Vite and served from a CDN-style host. The only
server interaction is an outbound POST from the contact form to the
third-party endpoint documented in `docs/api-spec.yml`.

Until a backend is proposed via an OpenSpec change, the rules below cover
(a) how to interact with the existing third-party dependency and (b) the
conventions any future first-party backend in this repository will be required
to follow.

## Outbound integration: formsubmit.co

The contact form posts a `multipart/form-data` payload to
`https://formsubmit.co/ajax/{recipient_email}`. See `docs/api-spec.yml` for
the full contract. Operational rules:

- The recipient email is a **deployment-time configuration value**, not a
  source-tree constant. Today it is the placeholder `your@email.com` in
  `src/components/Contact.jsx`; before any production deploy it must be moved
  to a build-time env var (`VITE_CONTACT_RECIPIENT`) injected at bundle time.
- Treat the third party as untrusted: never display server-returned HTML
  verbatim, only typed fields (`success`, `message`, `status`).
- Errors from the third party are surfaced to the user as Spanish-language
  inline messages — never as raw JSON or HTTP status codes alone.
- No retries on the client side. A failed submission shows the inline error
  and lets the user retry manually.

## Rules for any future first-party backend

If a backend service is introduced in this monorepo (e.g. `server/`,
`api/`), the following apply unless overridden by a later OpenSpec change:

### Runtime

- **Node.js LTS** (currently 20.x or 22.x).
- **ESM modules only** (`"type": "module"` in `package.json`). No CommonJS.
- **TypeScript** strongly preferred for any service with more than a single
  handler.

### HTTP layer

- Prefer `fastify` for new services; `express` only when ecosystem reasons
  force it. Document the choice in the OpenSpec design doc.
- All endpoints are described in `docs/api-spec.yml` **before** they are
  implemented (OpenAPI-first). The spec is the contract; the handler conforms.
- Paths are kebab-case, plural for collections: `/contact-submissions`,
  `/projects`.
- Request and response bodies are JSON (`application/json; charset=utf-8`),
  except the existing third-party contact endpoint which keeps
  `multipart/form-data` for compatibility.
- Timestamps are ISO-8601 UTC strings (`2026-05-13T20:45:00Z`).
- Identifiers are UUID v4 unless a strong reason mandates otherwise.

### Errors

- Error responses follow **RFC 7807** `application/problem+json`:
  `{ "type", "title", "status", "detail", "instance" }`.
- Validation errors include a `errors` array with `{ "field", "message" }`.
- Never leak stack traces, file paths, or framework version strings to the
  client.

### Security

- Reject requests larger than 64 KB on text endpoints; larger uploads require
  an explicit OpenSpec change.
- Rate-limit any public form endpoint (including future replacements of the
  formsubmit.co integration) by IP, default 10 req/min with burst of 3.
- Never log PII (names, emails, message bodies). Logs use structured JSON
  with `{ "level", "ts", "msg", "request_id" }`.
- All secrets come from environment variables; the repo's `.env.example`
  documents the keys without values.

### Data layer

- See `docs/data-model.md` for the canonical entity definitions.
- A first-party backend that introduces persistent storage must add the
  entities and their relationships to `docs/data-model.md` in the same
  OpenSpec change.
- Use a single migration tool (TBD when the first persistent store is added);
  every schema change ships with both `up` and `down` migrations.

### Testing

- Every new endpoint requires at least one happy-path integration test and
  one validation-failure test against an in-memory or container-backed
  database.
- Tests must be runnable via `npm test` from the repo root.
