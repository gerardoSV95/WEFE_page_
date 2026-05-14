## Context

El proyecto usa Vite 6 + React 19 + Tailwind CSS 4. El CSS de las secciones ya está escrito en `src/index.css` (`.hero-image`, `.services`, `.portfolio`, `.contact-form`, `.footer`, etc.) usando custom properties CSS (`--first-color`, `--second-color`, `--header-height`, …). La única pieza viva es `Header.jsx`, que tiene bugs (`class` vs `className`) y depende de `script.js` para el menú móvil.

## Goals / Non-Goals

**Goals:**
- Construir el árbol de componentes React que produce la landing completa
- Migrar toda interactividad (menú, formulario) a React eliminando `script.js`
- Reutilizar las clases CSS existentes; no duplicar estilos

**Non-Goals:**
- Rediseño visual o reescritura del CSS existente
- Internacionalización o multilenguaje
- Backend / CMS real (el formulario sigue usando `formsubmit.co` como placeholder)
- Animaciones avanzadas o librerías externas adicionales

## Decisions

### 1. Un componente por sección en `src/components/`

**Decisión**: `Hero.jsx`, `About.jsx`, `Services.jsx`, `Portfolio.jsx`, `Contact.jsx`, `Footer.jsx`; todos compuestos en `App.jsx`.

**Alternativa descartada**: Una sola página monolítica en `App.jsx`. Dificulta el mantenimiento y la lectura.

**Rationale**: Cada sección tiene su propio markup y lógica. Componentes pequeños son más fáciles de iterar.

### 2. Migrar menú móvil a React — eliminar `script.js`

**Decisión**: El estado `isMenuOpen` ya existe en `Header.jsx` pero no está conectado. Se conecta directamente: `onClick={toggleMenu}` en el botón, `className={isMenuOpen ? "menu is-active" : "menu"}` en el `<nav>`. El `document.addEventListener("click", ...)` para cerrar al hacer clic en un enlace se reemplaza con `onClick={() => setIsMenuOpen(false)}` en cada `<a>` del menú.

**Alternativa descartada**: Mantener `script.js`. Crea dos fuentes de verdad y hace que el markup deba respetar selectores imperativos.

### 3. Formulario de contacto controlado con `useState`

**Decisión**: `Contact.jsx` maneja `formData`, `isLoading`, y `responseMessage` con hooks. El submit llama a `fetch("https://formsubmit.co/ajax/tu@email.com", ...)`. No hay modal `#gracias` — se muestra el mensaje inline.

**Alternativa descartada**: Seguir con el `script.js` que hace `location.hash = "#gracias"`. El modal CSS requiere markup extra y el hash en URL es antipatrón en SPA.

### 4. Contenido placeholder con constantes exportables

**Decisión**: Los datos de servicios, portafolio y contacto se definen como arrays `const` en cada componente. El usuario los reemplaza directamente en el JSX sin necesidad de un CMS o prop drilling complejo.

## Risks / Trade-offs

- **`formsubmit.co` placeholder** → El formulario no enviará en producción sin reemplazar el email. Documentado en CLAUDE.md.
- **Tailwind v4 + clases CSS existentes** → Se usan ambas. Si en el futuro se purga Tailwind agresivamente, las clases custom de `index.css` no se ven afectadas (son CSS plano).
- **React StrictMode con `fetch` en dev** → Los handlers de submit se ejecutan dos veces en dev. No afecta UX en producción.
