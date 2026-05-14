## ADDED Requirements

### Requirement: Paleta esmeralda + grafito en :root

`src/index.css` SHALL definir en su bloque `:root` las siguientes custom properties con los valores exactos:

- `--first-color: #10b981`
- `--first-alpha-color: rgba(16, 185, 129, 0.75)`
- `--second-color: #111827`
- `--second-alpha-color: rgba(17, 24, 39, 0.75)`
- `--third-color: #047857`
- `--third-alpha-color: rgba(4, 120, 87, 0.75)`

#### Scenario: Variables presentes en CSS

- **WHEN** se inspecciona `getComputedStyle(document.documentElement)` en el navegador
- **THEN** las 6 variables retornan los valores especificados arriba

#### Scenario: Sin trazas de la paleta antigua en `:root`

- **WHEN** se busca `#d90062`, `#14192d` o `#501464` en `src/index.css`
- **THEN** ninguna ocurrencia existe dentro del bloque `:root`

---

### Requirement: Hero overlay alineado con --second-alpha-color

El componente `Hero.jsx` SHALL definir su variable inline `--hero-opacity-color` con el valor `rgba(17, 24, 39, 0.75)` para que el overlay use el mismo grafito traslúcido que el resto del sitio.

#### Scenario: Hero usa grafito traslúcido

- **WHEN** se renderiza `Hero.jsx`
- **THEN** el `style` inline declara `'--hero-opacity-color': 'rgba(17, 24, 39, 0.75)'`

---

### Requirement: Todos los componentes consumen la paleta mediante variables CSS

Los componentes existentes (`.btn`, `.menu-btn`, `.menu`, `.section-title`, `.footer`, `.portfolio-card-info`, `.service-card`, `.contact-card`, etc.) SHALL seguir consumiendo color únicamente vía `var(--first-color)`, `var(--second-color)`, `var(--third-color)` y sus variantes alfa — no se permiten hex/rgb hard-coded de la paleta en archivos de componente.

#### Scenario: No hay hex de paleta hard-coded en componentes

- **WHEN** se busca cualquiera de los 6 valores nuevos como literales en `src/components/*.jsx`
- **THEN** la única ocurrencia permitida es `--hero-opacity-color` en `Hero.jsx`
