## Why

El sitio actual usa un look 2018 (header fijo abajo, tipografía pequeña, cards planas, sin animaciones, section-titles con border doble). Una consultora de desarrollo web necesita transmitir credibilidad técnica a primera vista — la presentación visual de su propia página es su mejor portfolio.

El usuario pidió un estilo **editorial / agencia premium**: tipografía display, layouts asimétricos, micro-interacciones notables, header arriba con backdrop blur, animaciones sutiles al hacer scroll, y bandas adicionales de social proof (stats, proceso, stack tecnológico).

## What Changes

- **Diseño de sistema editorial**: nuevos tokens (escala tipográfica display, radios, sombras, escala de espaciado), grid de 12 columnas, hook `useReveal` para fade-in al scroll
- **Header**: moverlo de `fixed bottom` a `sticky top` con `backdrop-filter: blur()` y fondo semitransparente
- **Hero**: rediseño asimétrico con título display tipo keyline, eyebrow tag, doble CTA (primario+secundario), badge de disponibilidad
- **About**: layout asimétrico (2 columnas: heading + bullets de valores), tipografía display
- **Servicios**: grid asimétrico, cards con bordes finos, hover scale + cambio de acento; mantiene los 4 servicios
- **Portafolio**: grid masonry-like con `aspect-ratio` variado por card; overlay con tag chips
- **Contacto**: form lado a lado con bloque de info (email, ubicación, redes); inputs con estilo flotante
- **Footer**: rediseño compacto con CTA repetido
- **Nuevas secciones**: `Stats` (3-4 KPIs grandes), `Process` (4 pasos numerados: Discovery → Design → Build → Launch), `TechStack` (logos en grayscale)
- **Animaciones**: reveal-on-scroll con `IntersectionObserver` (sin librerías externas)

**Sin cambios**: paleta (esmeralda + grafito), idioma (ES en UI), endpoint del formulario, stack (Vite 6 / React 19 / Tailwind 4).

## Capabilities

### New Capabilities

- `editorial-design-system`: tokens de diseño (escala tipográfica display, radios, sombras, espaciado), grid de 12 columnas, primitiva `useReveal` para animaciones al scroll
- `editorial-sections`: rediseño visual de todas las secciones existentes, 3 secciones nuevas (Stats, Process, TechStack), reposicionamiento del Header a top sticky

### Modified Capabilities

<!-- Ninguna: openspec/specs/ está vacío (build-landing-page y recolor-emerald-graphite todavía no se archivaron) -->

## Impact

- **Modificados**: `src/index.css` (tokens, animaciones, clases de sección), `src/App.jsx` (orden de secciones), `src/components/Header.jsx`, `src/components/Hero.jsx`, `src/components/About.jsx`, `src/components/Services.jsx`, `src/components/Portfolio.jsx`, `src/components/Contact.jsx`, `src/components/Footer.jsx`
- **Creados**: `src/components/Stats.jsx`, `src/components/Process.jsx`, `src/components/TechStack.jsx`, `src/hooks/useReveal.js`
- **Sin cambios**: paleta, endpoint del formulario, contrato de `docs/api-spec.yml`, entidades de `docs/data-model.md` (excepto adición de `Stat`, `ProcessStep`, `Tech` como tipos estáticos nuevos)
- **Doc updates** que viajan con esta propuesta: actualizar `docs/frontend-standards.md` (sección "Components" con `useReveal`, tokens nuevos) y `docs/data-model.md` (3 nuevas entidades estáticas)
