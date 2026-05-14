## Why

La paleta actual (fucsia `#d90062` + púrpura `#501464`) no transmite la identidad profesional/técnica que se espera de una consultora de desarrollo web. El usuario solicita un look más sobrio y moderno usando verde esmeralda con grafito.

## What Changes

- Reemplazar los valores hex de las custom properties de color en `:root` (`src/index.css`):
  - `--first-color` (acento): fucsia → esmeralda `#10b981`
  - `--first-alpha-color`: derivar de esmeralda
  - `--second-color` (base oscura): azul muy oscuro → grafito `#111827`
  - `--second-alpha-color`: derivar de grafito
  - `--third-color` (acento secundario): púrpura → esmeralda oscuro `#047857`
  - `--third-alpha-color`: derivar
- Revisar las variables del Hero inline (`--hero-opacity-color`) en `Hero.jsx` para que use el nuevo grafito
- **No** se cambia tipografía, layout, ni markup — solo valores cromáticos

## Capabilities

### New Capabilities

- `color-palette`: Define la paleta visual oficial del sitio (variables CSS y derivados alfa)

### Modified Capabilities

<!-- Ninguna spec previa describe la paleta -->

## Impact

- **Modificado**: `src/index.css` (bloque `:root`)
- **Modificado**: `src/components/Hero.jsx` (variables CSS inline del hero)
- **Sin impacto**: el resto de componentes consume las variables, así que se actualizan automáticamente
- **Riesgo bajo**: no hay cambio de markup ni de API
