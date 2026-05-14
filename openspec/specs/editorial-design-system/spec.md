# Editorial Design System

Design tokens, layout primitives, and motion utilities that power the
editorial visual language of the W.E.F.E landing page.

### Requirement: Tokens editoriales en :root

`src/index.css` SHALL declarar las siguientes custom properties dentro de `:root`, además de las existentes:

- Radios: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-pill`
- Sombras: `--shadow-sm`, `--shadow-md`, `--shadow-lg` (basadas en `rgba(17, 24, 39, …)`)
- Espaciado vertical de sección: `--space-section` con `clamp(4rem, 8vw, 8rem)`
- Tipografía: `--font-display`, `--type-display-xl`, `--type-display-lg`, `--type-display-md`, todos usando `clamp()` para fluid scaling
- Curva de easing: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`

#### Scenario: Tokens disponibles vía getComputedStyle

- **WHEN** se inspecciona `getComputedStyle(document.documentElement)` en cualquier navegador moderno
- **THEN** los tokens `--radius-md`, `--shadow-md`, `--type-display-xl`, `--space-section` y `--ease-out` devuelven valores no vacíos

#### Scenario: Tipografía display escala con el viewport

- **WHEN** el viewport pasa de 360px a 1440px
- **THEN** el font-size resuelto de `--type-display-xl` crece monotónicamente entre el min y el max definidos por `clamp()`

---

### Requirement: Sistema de grid editorial de 12 columnas

`src/index.css` SHALL exponer una clase `.grid-12` que aplica `display: grid; grid-template-columns: repeat(12, 1fr); gap: clamp(1rem, 2vw, 2rem);` y permite colocación de hijos mediante clases utilitarias `.col-span-{n}` (n de 1 a 12) y `.col-start-{n}` (n de 1 a 12).

En viewport `< 768px` la grilla colapsa a una sola columna y los `col-span-*` se ignoran (`grid-column: 1 / -1`).

#### Scenario: Grid se aplica en desktop

- **WHEN** un elemento con clase `.grid-12` se renderiza en viewport ≥ 1024px
- **THEN** sus hijos respetan los `grid-column: span N` declarados por `.col-span-N`

#### Scenario: Grid colapsa en mobile

- **WHEN** el viewport es < 768px
- **THEN** todos los hijos ocupan el ancho completo independientemente de sus clases `.col-span-*`

---

### Requirement: Hook useReveal para reveal-on-scroll

El proyecto SHALL exportar un hook `useReveal` desde `src/hooks/useReveal.js` que:

- Acepta un options object opcional `{ rootMargin, threshold }`
- Devuelve `{ ref, isVisible }`
- Usa `IntersectionObserver` para activar `isVisible` una sola vez (luego se desconecta)
- Respeta `prefers-reduced-motion: reduce` activando `isVisible = true` inmediatamente sin observer
- Es seguro en StrictMode (cleanup correcto)

#### Scenario: Elemento entra al viewport

- **WHEN** un elemento al que se asignó el `ref` de `useReveal` cruza el threshold de visibilidad
- **THEN** `isVisible` pasa a `true` y permanece `true` aunque el elemento vuelva a salir del viewport

#### Scenario: Usuario prefiere movimiento reducido

- **WHEN** `window.matchMedia('(prefers-reduced-motion: reduce)').matches` es `true`
- **THEN** `useReveal` retorna `isVisible: true` desde el primer render y no crea un IntersectionObserver

---

### Requirement: Clase .reveal aplica la transición visual

`src/index.css` SHALL declarar una clase `.reveal` que:

- En su estado base: `opacity: 0; transform: translateY(24px);`
- Cuando además tiene la clase `is-visible`: `opacity: 1; transform: translateY(0);`
- Usa transition `opacity 600ms var(--ease-out), transform 600ms var(--ease-out)`
- Bajo `@media (prefers-reduced-motion: reduce)`: ambos estados muestran `opacity: 1` sin transition

#### Scenario: Reveal hace fade-in al activarse

- **WHEN** un elemento con `.reveal` recibe la clase `is-visible`
- **THEN** transiciona de opacidad 0 a 1 y translateY 24px a 0 en 600ms

#### Scenario: Reduced motion deshabilita el efecto

- **WHEN** el usuario tiene `prefers-reduced-motion: reduce`
- **THEN** los elementos `.reveal` aparecen instantáneamente sin animación
