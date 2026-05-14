## 1. Tokens y utilities en index.css

- [x] 1.1 Añadir tokens en `:root`: `--radius-{sm,md,lg,pill}`, `--shadow-{sm,md,lg}`, `--space-section`, `--font-display`, `--type-display-{xl,lg,md}`, `--ease-out`
- [x] 1.2 Añadir `.grid-12` y utilidades `.col-span-1`…`.col-span-12`, `.col-start-1`…`.col-start-12`
- [x] 1.3 Añadir media query `< 768px` que colapsa la grid a una columna
- [x] 1.4 Añadir clases `.reveal` y `.reveal.is-visible` con transición y respeto a `prefers-reduced-motion`
- [x] 1.5 Añadir clases de botón modernas: `.btn-primary` (fondo esmeralda, radius-pill, sombra-md) y `.btn-ghost` (transparente, borde grafito)
- [x] 1.6 Añadir clase `.eyebrow` (chip pequeño con borde redondeado para tags)

## 2. Hook useReveal

- [x] 2.1 Crear `src/hooks/useReveal.js` con la implementación del design.md
- [x] 2.2 Manejar correctamente cleanup en StrictMode y `prefers-reduced-motion`

## 3. Componentes nuevos

- [x] 3.1 Crear `src/components/Stats.jsx` con array `const stats` de 4 KPIs y layout `.grid-12` (col-span-3 cada uno en desktop, 2×2 en mobile)
- [x] 3.2 Crear `src/components/Process.jsx` con array `const steps` de 4 pasos numerados (01–04: Discovery, Design, Build, Launch) con línea conectora visual en desktop
- [x] 3.3 Crear `src/components/TechStack.jsx` con array `const techs` de ≥ 8 nombres (React, Next.js, Node.js, TypeScript, PostgreSQL, AWS, Tailwind, Vercel) y hover de opacidad

## 4. Rediseño Header

- [x] 4.1 Cambiar `.header` a `position: sticky; top: 0` con `backdrop-filter: blur(12px)` y fondo `rgba(255, 255, 255, 0.7)`
- [x] 4.2 Añadir `@supports not (backdrop-filter: blur())` con `background-color: var(--white-color)` opaco
- [x] 4.3 Reposicionar `.menu` mobile a `top: var(--header-height)` (overlay desde arriba)
- [x] 4.4 Cambiar el color del logo y enlaces del menú a `var(--second-color)` con hover a `var(--first-color)`
- [x] 4.5 Quitar `margin-bottom: var(--header-height)` del `.footer` que existía para compensar el header fixed-bottom

## 5. Rediseño Hero

- [x] 5.1 Reescribir `Hero.jsx` con grid de 12 columnas y fondo blanco (sin imagen full-bleed)
- [x] 5.2 Añadir eyebrow tag, título display en dos líneas (`--type-display-xl`), subtítulo, dos CTAs (`.btn-primary` + `.btn-ghost`) y badge de disponibilidad
- [x] 5.3 Añadir bloque editorial col-span-5 en desktop con número grande "01" y pull-quote
- [x] 5.4 Envolver con `useReveal` y aplicar `.reveal` al contenido principal
- [x] 5.5 Eliminar los estilos viejos `.hero-image*` que ya no aplican

## 6. Rediseño About

- [x] 6.1 Reescribir `About.jsx` con grid de 12 columnas: col-span-5 con título display + intro, col-span-7 con 3 cards de Misión / Visión / Equipo en disposición vertical
- [x] 6.2 Tipografía mayor, sin la clase `.section-title` con border doble (usar título display)
- [x] 6.3 Aplicar `useReveal` a la sección

## 7. Rediseño Services

- [x] 7.1 Actualizar `.service-card` en index.css: borde 1px, radius-lg, shadow-sm, hover shadow-md + border-top esmeralda 3px
- [x] 7.2 Reescribir grid del `Services.jsx`: usar `.grid-12` con cada card en col-span-3 (desktop) y col-span-6 (tablet)
- [x] 7.3 Aumentar tamaño de íconos a 56×56 y añadir contenedor circular con `background-color: var(--first-alpha-color)` opaco al 10%
- [x] 7.4 Aplicar `useReveal` con stagger por índice (transition-delay)

## 8. Rediseño Portfolio

- [x] 8.1 Reescribir grid del `Portfolio.jsx` con `.grid-12` y aspect-ratios variados por card según design.md sección "Portfolio asimétrico"
- [x] 8.2 Actualizar `.portfolio-card` para usar `border-radius: var(--radius-lg)`, overflow hidden, hover scale 1.02
- [x] 8.3 Actualizar `.portfolio-card-info`: overlay con chips de tags (clase `.chip` con border-radius pill)
- [x] 8.4 Aplicar `useReveal` con stagger por índice

## 9. Rediseño Contact

- [x] 9.1 Reescribir `Contact.jsx` con `.grid-12`: col-span-5 con bloque de info (título display, párrafo, email, ubicación, redes), col-span-7 con el formulario
- [x] 9.2 Modernizar `.contact-form input` / `textarea`: border 1px gris claro, radius-md, padding generoso, focus con outline esmeralda
- [x] 9.3 Cambiar el submit a `.btn-primary` con loader inline
- [x] 9.4 Mantener nombres de campos (`name`, `email`, `subject`, `message`) intactos para no romper `docs/api-spec.yml`
- [x] 9.5 Aplicar `useReveal`

## 10. Rediseño Footer

- [x] 10.1 Simplificar `Footer.jsx`: 3 columnas en desktop (info empresa, links rápidos, redes sociales) y stack en mobile
- [x] 10.2 Actualizar `.footer` en index.css: fondo `var(--second-color)` (grafito), padding generoso, sin margin-bottom

## 11. Componer en App.jsx

- [x] 11.1 Importar `Stats`, `Process`, `TechStack`
- [x] 11.2 Reordenar dentro de `<main>`: `Hero → Stats → About → Services → Process → Portfolio → TechStack → Contact`
- [x] 11.3 Añadir enlace a `#proceso` y `#tecnologias` en el menú del Header

## 12. Limpiar CSS huérfano

- [x] 12.1 Eliminar de `index.css` las reglas que ya no aplican: `.hero-image`, `.hero-image-opacity`, `.hero-image-title`, `.hero-image-subtitle`, `.hero-image-content`, `.carousel` (no se usa), `.modal` (no se usa), `.contact-card` (reemplazado por Contact rediseñado), `.about > article` (reemplazado), `.section-title` con border doble (reemplazado por título display)
- [x] 12.2 Revisar que no quede ninguna regla referenciando selectores eliminados

## 13. Actualizar docs

- [x] 13.1 En `docs/frontend-standards.md`: añadir sección sobre `useReveal`, tokens nuevos (`--radius-*`, `--shadow-*`, `--space-section`, `--type-display-*`, `--ease-out`), grid `.grid-12`, y clases `.btn-primary`/`.btn-ghost`/`.eyebrow`/`.chip`
- [x] 13.2 En `docs/data-model.md`: añadir entidades estáticas `Stat`, `ProcessStep`, `Tech`

## 14. Verificación

- [x] 14.1 `npm run lint` sin errores
- [x] 14.2 `npm run build` exitoso; bundle JS gzipped ≤ 70 KB y CSS gzipped ≤ 8 KB <!-- 64.82 KB JS / 5.96 KB CSS -->
- [x] 14.3 `grep` por `class=` (sin `Name`) en `src/components/` no devuelve resultados (todos `className`)
- [x] 14.4 Verificación visual en `npm run dev`: navegación por todas las secciones, mobile menu, hover de service-cards y portfolio, animaciones de reveal, formulario funciona
- [x] 14.5 Toggle `prefers-reduced-motion` en DevTools: las secciones aparecen instantáneamente sin animación
