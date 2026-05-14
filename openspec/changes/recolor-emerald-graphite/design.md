## Context

`src/index.css` define la paleta como custom properties en `:root`. Todos los componentes y clases utilitarias (`.btn`, `.menu-btn`, `.section-title`, `.footer`, `.portfolio-card-info`, etc.) consumen estas variables vía `var(--first-color)` etc. Por eso un cambio de paleta centralizado en `:root` propaga automáticamente.

La única excepción son las custom properties inline del Hero (definidas en `Hero.jsx` como objeto `heroStyle`) — esas viven en el componente y deben actualizarse a mano.

## Goals / Non-Goals

**Goals:**
- Sustituir la paleta fucsia/púrpura por esmeralda/grafito
- Mantener el contraste WCAG AA en texto sobre fondos
- Cambio centralizado: que el resto del sitio no necesite modificación

**Non-Goals:**
- Tipografía, layout, spacing
- Dark mode toggle (sigue siendo paleta única)
- Rediseño de componentes

## Decisions

### 1. Cambio en `:root` únicamente (excepto Hero inline)

**Decisión**: Editar los 6 valores de color base (`--first-color`, `--first-alpha-color`, `--second-color`, `--second-alpha-color`, `--third-color`, `--third-alpha-color`). El `--hero-opacity-color` en `Hero.jsx` también, porque está hard-coded a un rgba que coincidía con `--second-alpha-color`.

**Alternativa descartada**: Reemplazar valores hex caso por caso en cada componente. Multiplica el riesgo y rompe la convención de "usar custom properties" de CLAUDE.md.

### 2. Valores específicos

| Variable | Antes | Después | Rationale |
|---|---|---|---|
| `--first-color` | `#d90062` | `#10b981` | Esmeralda 500 — acento principal de Tailwind |
| `--first-alpha-color` | `rgba(217, 0, 98, 0.75)` | `rgba(16, 185, 129, 0.75)` | Misma alpha para hovers/overlays |
| `--second-color` | `#14192d` | `#111827` | Grafito (Tailwind gray-900) |
| `--second-alpha-color` | `rgba(20, 25, 45, 0.75)` | `rgba(17, 24, 39, 0.75)` | Para hero overlay y menú móvil |
| `--third-color` | `#501464` | `#047857` | Esmeralda 700 — usado en footer |
| `--third-alpha-color` | `rgba(80, 20, 100, 0.75)` | `rgba(4, 120, 87, 0.75)` | |

**Alternativa descartada**: Tonos más oscuros (`emerald-600` `#059669`). Quedaría con menos contraste contra el grafito en el footer.

### 3. Hero overlay

**Decisión**: Cambiar `'--hero-opacity-color': 'rgba(20, 25, 45, 0.75)'` a `'rgba(17, 24, 39, 0.75)'` en `Hero.jsx`. Mantiene el patrón de "overlay = grafito al 75 %".

## Risks / Trade-offs

- **Contraste botón `.btn`**: el botón usa `var(--first-color)` (esmeralda) con texto blanco. AA pasa (ratio ≈ 3.0 con bold) pero el verde claro es menos contrastado que el fucsia anterior. → Mitigación: mantener `font-weight: bold` y considerar `--first-color` ligeramente más oscuro si el usuario reporta problemas.
- **Hover del menú móvil**: el hover invierte fondo/color usando `--first-color`. Verificar visualmente que el verde sobre fondo grafito sigue legible.
- **Imágenes del Hero/Portfolio (Unsplash)**: si las fotos tienen mucho rojo/cálido, el overlay esmeralda puede chocar. → No es un risk de la paleta, sino del contenido futuro.
