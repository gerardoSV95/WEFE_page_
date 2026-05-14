# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

- `npm run dev` — servidor de desarrollo Vite con HMR.
- `npm run build` — build de producción a `dist/`.
- `npm run preview` — sirve el build de producción para verificación local.
- `npm run lint` — ESLint sobre `**/*.{js,jsx}` (ignora `dist`).

No hay framework de tests configurado.

## Stack

- **Vite 6** + `@vitejs/plugin-react-swc` (SWC para Fast Refresh, no Babel).
- **React 19** en modo `<StrictMode>` (ver `src/main.jsx`).
- **Tailwind CSS 4** vía el plugin oficial de Vite (`@tailwindcss/vite`). Se importa con `@import "tailwindcss";` desde `src/index.css`; no hay `tailwind.config.js` — toda configuración va en CSS al estilo Tailwind v4.
- ESLint plano (`eslint.config.js`) con `react-hooks` y `react-refresh`. Regla `no-unused-vars` permite identificadores `^[A-Z_]`.

## Arquitectura

Sitio de una sola página (landing W.E.F.E). El árbol React es trivial: `main.jsx` → `App.jsx` → `components/Header.jsx`. Las secciones (Inicio, Servicios, Portafolio, Contacto, etc.) aún no están componetizadas; se referencian sólo como anclas `#inicio`, `#servicios`, ... en el menú del header.

### Convenciones / estructura nueva a respetar

- Los componentes van en `src/components/` como `PascalCase.jsx` con `export default`.
- Los estilos globales y variables CSS (paleta de colores `--first-color`, `--second-color`, etc., tipografía y `--header-height`) viven en `src/index.css`. Reutiliza estas custom properties en lugar de hardcodear valores.
- `src/App.css` existe vacío como placeholder para estilos específicos del shell.

### Punto delicado: `script.js` legacy + Header duplicado

`index.html` carga dos cosas en paralelo:

1. El bundle de React (`/src/main.jsx` como módulo).
2. `/src/script.js` como `<script>` no-módulo — manipula el DOM directamente (`document.querySelector(".menu-btn")`, `.contact-form`) para abrir/cerrar el menú móvil y enviar el formulario a `formsubmit.co`.

`Header.jsx` actualmente reproduce el markup esperado por ese script pero:

- Usa el atributo HTML `class` en vez de `className` de React en varios nodos (mezclado con `className` en otros). React ignora silenciosamente `class`, así que esas clases **no se aplican** y `script.js` no encontrará los selectores en tiempo de render. Al componetizar, migra todo a `className`.
- Recibe props (`logo`, `menuItems`, `primaryColor`, `logoUrl`) que no se usan; los textos del menú están hardcodeados en el JSX. Al introducir nuevas secciones decide si las props se honran o se eliminan, pero no las dejes a medias.
- El estado `isMenuOpen` / `toggleMenu` están definidos pero no enlazados — el toggle del menú depende hoy de `script.js`. Si migras el comportamiento a React, elimina la dependencia de `script.js` en `index.html` para no terminar con dos fuentes de verdad.

Al crear nuevos componentes/secciones, prefiere portar la lógica de `script.js` a React (event handlers, estado) en lugar de seguir extendiendo el script imperativo.

## Notas del proyecto

- Endpoint del formulario en `script.js`: `https://formsubmit.co/ajax/your@email.com` — placeholder, reemplazar antes de cualquier despliegue.
- Idioma del producto y de los textos: español.
