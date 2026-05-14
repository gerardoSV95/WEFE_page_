## Why

La landing page de W.E.F.E solo tiene el Header; no hay contenido visible para los visitantes. Se necesita construir el index completo para que la consultora de desarrollo web pueda presentarse, mostrar sus servicios y recibir solicitudes de contacto.

## What Changes

- Crear 6 componentes de sección: `Hero`, `About`, `Services`, `Portfolio`, `Contact`, `Footer`
- Corregir `Header.jsx`: reemplazar atributos `class` por `className` y conectar el estado `isMenuOpen` al toggle
- Migrar la lógica imperativa de `script.js` (menú móvil + envío del formulario) a React
- Eliminar la referencia a `src/script.js` en `index.html` y borrar el archivo
- Componer todas las secciones en `App.jsx`

## Capabilities

### New Capabilities

- `landing-sections`: Las seis secciones de contenido (Hero, Acerca, Servicios, Portafolio, Contacto, Footer) que conforman el index de la landing page
- `header-react`: Header 100 % React — atributos `className` correctos, estado de menú móvil conectado, sin dependencia de `script.js`

### Modified Capabilities

<!-- Ninguna: openspec/specs/ está vacío, no hay specs existentes -->

## Impact

- **Creados**: `src/components/{Hero,About,Services,Portfolio,Contact,Footer}.jsx`
- **Modificados**: `src/components/Header.jsx`, `src/App.jsx`, `index.html`
- **Eliminado**: `src/script.js`
- **Dependencias externas**: `formsubmit.co` (placeholder, reemplazar antes de producción)
