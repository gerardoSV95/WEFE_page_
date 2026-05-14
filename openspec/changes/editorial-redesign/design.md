## Context

`src/index.css` (~730 líneas) define la mayoría de los estilos como reglas globales en CSS plano. Tailwind v4 está instalado pero apenas se usa. Los componentes consumen las clases globales y custom properties. Esta arquitectura se mantiene; sólo se introducen tokens nuevos y se reescriben los selectores existentes para una sensibilidad editorial.

El sitio no tiene framework de animaciones, ni librería de componentes. Se evita añadir dependencias para mantener bundle pequeño (actual: 197 KB JS).

## Goals / Non-Goals

**Goals:**
- Sensación "agencia premium" en primer vistazo: tipografía display, jerarquía clara, micro-interacciones
- Header arriba sticky con blur (patrón moderno)
- 3 secciones nuevas de social proof (Stats, Process, TechStack)
- Reveal-on-scroll sutil sin dependencias
- Mantener bundle gzipped ≤ 70 KB JS / 8 KB CSS
- Accesibilidad: respetar `prefers-reduced-motion`

**Non-Goals:**
- Migrar a Tailwind utility-first (la convención sigue siendo CSS plano con tokens)
- Añadir framer-motion, GSAP, AOS, o cualquier librería de animaciones
- Dark/light mode toggle
- Cambiar paleta (esmeralda + grafito se mantiene)
- Internacionalización
- Backend / CMS

## Decisions

### 1. Tokens de diseño en `:root`, no Tailwind config

**Decisión**: Extender el bloque `:root` de `src/index.css` con:

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 24px;
--radius-pill: 999px;
--shadow-sm: 0 1px 2px rgba(17, 24, 39, 0.06);
--shadow-md: 0 8px 24px rgba(17, 24, 39, 0.08);
--shadow-lg: 0 20px 60px rgba(17, 24, 39, 0.12);
--space-section: clamp(4rem, 8vw, 8rem);
--font-display: "Raleway", sans-serif;     /* misma familia, peso 900 */
--type-display-xl: clamp(3rem, 8vw, 7rem); /* hero */
--type-display-lg: clamp(2rem, 5vw, 4rem); /* section heads */
--type-display-md: clamp(1.5rem, 3vw, 2.5rem);
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
```

**Alternativa descartada**: configurar Tailwind v4 con `@theme` directive. Funcionaría pero rompe la convención actual y dispersa la fuente de verdad.

### 2. Hook `useReveal` minimal con IntersectionObserver

**Decisión**: Crear `src/hooks/useReveal.js` que devuelve un `ref` y un boolean `isVisible`. Las clases CSS `.reveal` (estado inicial: opacidad 0, translateY 24px) y `.reveal.is-visible` (transition al estado final) hacen el trabajo visual.

```js
export function useReveal({ rootMargin = '0px 0px -10% 0px', threshold = 0.1 } = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) { setIsVisible(true); return; }
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); }
        }, { rootMargin, threshold });
        obs.observe(node);
        return () => obs.disconnect();
    }, [rootMargin, threshold]);
    return { ref, isVisible };
}
```

**Alternativa descartada**: AOS o framer-motion. Suman 30-50 KB gzipped sin ventaja real para este caso de uso.

### 3. Header: sticky top con backdrop-blur

**Decisión**: Cambiar `.header` de `position: fixed; bottom: 0` a `position: sticky; top: 0` con `backdrop-filter: blur(12px)` y `background-color: rgba(255, 255, 255, 0.7)`. El logo y los enlaces pasan a color grafito (`var(--second-color)`); el acento esmeralda queda para hover y botón CTA dentro del header.

El menú móvil sigue siendo overlay, pero ahora desplegado **desde arriba** (`top: var(--header-height)`) en vez de desde abajo.

**Alternativa descartada**: Header transparente sobre Hero que se rellena al hacer scroll. Más complejo (requiere observar scroll), menos legible cuando el Hero tiene imagen oscura.

### 4. Hero: layout asimétrico con keyline

**Decisión**: Grid de 12 columnas:
- col 1-7: eyebrow tag ("Consultora de desarrollo web") + título display XL en dos líneas + subtítulo + dos CTAs (`Iniciar proyecto` primario, `Ver portafolio` secundario) + badge "Disponible para proyectos Q3 2026"
- col 8-12: bloque visual con número grande "01 — Inicio" como keyline editorial, número "+50" de proyectos como pull-quote, líneas finas como elementos gráficos

Fondo: blanco. El acento esmeralda aparece en chips, números y CTA primario; el grafito en el título.

**Alternativa descartada**: Imagen de fondo full-bleed con overlay. Se ve más corporativo que editorial, y depende de una foto stock que rara vez transmite "premium".

### 5. Stats, Process, TechStack como componentes nuevos

- `Stats.jsx`: banda horizontal con 4 KPIs (`+50 proyectos`, `12 años`, `98% retención`, `15 industrias`). En desktop: 4 columnas; en mobile: 2×2 grid. Cada stat es un objeto `{ value, label }` en un array `const stats`.
- `Process.jsx`: 4 pasos numerados (01–04) con título y descripción corta. Layout vertical en mobile, horizontal con línea conectora en desktop. Array `const steps`.
- `TechStack.jsx`: lista de logos de tecnologías (React, Next.js, Node.js, TypeScript, PostgreSQL, AWS, …) renderizados como nombres de texto en `font-weight: 600` con `opacity: 0.4` por defecto y `opacity: 1` en hover. Sin imágenes para no añadir assets. Array `const techs`.

**Alternativa descartada para TechStack**: importar SVGs de cada logo. Suma peso y problemas de licencia. Texto monoespaciado con animación de fade da el mismo efecto "trust band".

### 6. Portfolio asimétrico

**Decisión**: 6 cards en grid de 12 columnas con aspect-ratio variado:
- card 1: col 1-7, aspect-ratio 16/10
- card 2: col 8-12, aspect-ratio 4/5
- card 3: col 1-5, aspect-ratio 1/1
- card 4: col 6-12, aspect-ratio 4/3
- card 5: col 1-7, aspect-ratio 3/4
- card 6: col 8-12, aspect-ratio 16/9

En mobile: stack vertical normal. Hover: scale 1.02 + overlay con chips de tags.

### 7. Animaciones: solo opacity + translateY

**Decisión**: Una sola clase `.reveal` con transition de 600ms en `opacity` y `transform`, ease `--ease-out`. Cada sección/card que lo amerite envuelve su contenido con `useReveal`. No hay parallax, ni stagger pesado, ni scrub. Stagger se logra con `transition-delay` inline `style={{ transitionDelay: \`${index * 80}ms\` }}` cuando hay listas.

`@media (prefers-reduced-motion: reduce)` desactiva todas las transiciones y el hook deshabilita el observer.

## Risks / Trade-offs

- **Backdrop-filter en Safari ≤ 15.3** → degradación elegante con `background-color` opaco como fallback (`@supports`).
- **Layout asimétrico en pantallas medianas (768-1023px)** → muchos breakpoints; mitigación: en ese rango, las cards de portfolio caen a 2 columnas uniformes, sin asimetría.
- **Reveal en SSR / scroll inicial muy rápido** → con `IntersectionObserver` la primera vista puede quedar invisible si la opacidad inicial es 0 y el observer aún no se conectó. Mitigación: en el primer paint, `useReveal` corre el efecto en `useEffect` y dispara `setIsVisible(true)` inmediatamente si el elemento ya está dentro del viewport.
- **Tamaño de bundle** → el hook + clases CSS añaden ~1 KB JS y ~0.5 KB CSS. Sin riesgo.
- **Tokens en CSS vars vs Tailwind theme** → si en el futuro queremos utility classes consistentes (`text-display-xl`), habrá que sincronizar; documentado en `docs/frontend-standards.md`.

## Migration plan

Esta es una refactorización visual completa. Se hace en un único PR (ningún flag de feature):

1. Añadir tokens y clases utilitarias nuevas en `index.css` sin tocar las existentes
2. Crear `useReveal`
3. Crear los 3 componentes nuevos (Stats, Process, TechStack)
4. Reescribir cada sección existente sustituyendo markup, manteniendo IDs y nombres de campo del form
5. Reescribir Header con la nueva posición
6. Limpiar las clases CSS antiguas que queden huérfanas en `index.css` al final
7. Smoke test manual: navegación, menu móvil, form submit, reduced motion

## Open Questions

- Logos de TechStack: ¿qué tecnologías específicas listar? Para esta propuesta uso `React, Next.js, Node.js, TypeScript, PostgreSQL, AWS, Tailwind, Vercel`. El usuario puede ajustar después.
- Stats: los valores son placeholders (`+50 proyectos`, etc.). El usuario debe reemplazarlos con números reales antes del deploy.
