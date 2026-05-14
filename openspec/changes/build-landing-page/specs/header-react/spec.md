## ADDED Requirements

### Requirement: Header usa className de React en todos sus nodos

`Header.jsx` SHALL usar `className` (no `class`) en todos los elementos JSX para que los estilos de `index.css` y los selectores de React se apliquen correctamente.

#### Scenario: Clase header aplicada

- **WHEN** se renderiza el Header
- **THEN** el elemento `<header>` tiene la clase CSS `header` visible en el DOM

#### Scenario: Clase logo aplicada

- **WHEN** se renderiza el Header
- **THEN** el elemento contenedor del logo tiene la clase CSS `logo`

---

### Requirement: Toggle del menú móvil manejado por React

El botón `.menu-btn` SHALL disparar `toggleMenu` al hacer clic, cambiando el estado `isMenuOpen` en React. El `<nav>` SHALL recibir `className` dinámico (`"menu"` o `"menu is-active"`) basado en ese estado.

#### Scenario: Abrir menú

- **WHEN** el usuario hace clic en el botón de menú en pantalla < 1024px
- **THEN** el nav recibe la clase `is-active` y el menú se hace visible

#### Scenario: Cerrar menú al clic en enlace

- **WHEN** el usuario hace clic en un enlace del menú
- **THEN** `isMenuOpen` se pone en `false` y el menú se oculta

---

### Requirement: Script.js eliminado de index.html

`index.html` SHALL NOT cargar `/src/script.js` como script externo. El archivo `src/script.js` SHALL ser eliminado del repositorio.

#### Scenario: Sin script externo

- **WHEN** se carga la página en el navegador
- **THEN** no existe ningún `<script src="/src/script.js">` en el HTML

#### Scenario: Menú funciona sin script.js

- **WHEN** el usuario interactúa con el menú móvil
- **THEN** el toggle funciona exclusivamente a través del estado React
