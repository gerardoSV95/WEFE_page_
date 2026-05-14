# Editorial Sections

The page sections (header, hero, content bands, footer) that compose the
W.E.F.E landing page in its editorial agency-premium style.

### Requirement: Header se ancla arriba con backdrop blur

`Header.jsx` SHALL renderizar un `<header>` con `position: sticky; top: 0;` y un fondo semi-transparente (`rgba(255, 255, 255, 0.7)`) con `backdrop-filter: blur(12px)`. El menú móvil SHALL desplegarse desde arriba (justo debajo del header) y no desde abajo.

#### Scenario: Header se queda visible al hacer scroll

- **WHEN** el usuario hace scroll hacia abajo
- **THEN** el header permanece pegado al tope del viewport con efecto blur

#### Scenario: Menú móvil aparece debajo del header

- **WHEN** el usuario abre el menú móvil en viewport < 1024px
- **THEN** el `<nav>` se posiciona justo debajo del header (no en la parte inferior de la pantalla)

#### Scenario: Fallback sin backdrop-filter

- **WHEN** el navegador no soporta `backdrop-filter`
- **THEN** el header muestra un `background-color` opaco (`var(--white-color)`) preservando la legibilidad

---

### Requirement: Hero asimétrico con tipografía display

`Hero.jsx` SHALL renderizar:

- Un grid de 12 columnas (`.grid-12`)
- En columnas 1–7: un eyebrow tag estilo chip, un título usando `--type-display-xl` en peso 900 con al menos un salto de línea, un subtítulo en peso normal, dos CTAs (un primario `.btn-primary` y un secundario `.btn-ghost`), y un badge de disponibilidad
- En columnas 8–12 (oculto en mobile): un bloque editorial con un número grande tipo "01" como elemento gráfico y al menos un dato destacado (ej. "+50 proyectos") presentado como pull-quote

#### Scenario: Hero respeta jerarquía editorial

- **WHEN** el Hero se renderiza en desktop
- **THEN** existen exactamente 2 columnas visibles: contenido textual a la izquierda y bloque gráfico a la derecha

#### Scenario: Hero responsive en mobile

- **WHEN** el viewport es < 768px
- **THEN** solo se muestra la columna de contenido textual y los CTAs se apilan verticalmente

---

### Requirement: Sección Stats muestra KPIs de social proof

El proyecto SHALL incluir `src/components/Stats.jsx` que renderiza una sección (`id="stats"`) con al menos 4 estadísticas. Cada stat tiene un `value` (string grande, ej. "+50", "98%") y un `label` (descripción corta).

#### Scenario: Stats visibles después del Hero

- **WHEN** el usuario hace scroll hacia abajo desde el Hero
- **THEN** la sección Stats aparece y muestra exactamente 4 KPIs

#### Scenario: Stats se acomodan en mobile

- **WHEN** el viewport es < 768px
- **THEN** los 4 KPIs se muestran en grid 2×2

---

### Requirement: Sección Process muestra el flujo de trabajo

El proyecto SHALL incluir `src/components/Process.jsx` con una sección (`id="proceso"`) que liste 4 pasos numerados: Discovery, Design, Build, Launch. Cada paso tiene un número visible (01–04), un título, y una descripción corta.

#### Scenario: 4 pasos numerados visibles

- **WHEN** el usuario navega a `#proceso`
- **THEN** la sección muestra los 4 pasos en orden con sus números (01, 02, 03, 04)

#### Scenario: Pasos verticales en mobile, horizontales en desktop

- **WHEN** el viewport es ≥ 1024px
- **THEN** los pasos se distribuyen horizontalmente con una línea conectora visual entre ellos

- **WHEN** el viewport es < 1024px
- **THEN** los pasos se apilan verticalmente

---

### Requirement: Sección TechStack muestra logos de tecnologías

El proyecto SHALL incluir `src/components/TechStack.jsx` con una sección (`id="tecnologias"`) que liste al menos 8 nombres de tecnologías como texto (sin imágenes), con `font-weight ≥ 600`, opacidad inicial 0.4, y opacidad 1 al hacer hover.

#### Scenario: TechStack lista al menos 8 tecnologías

- **WHEN** la sección se renderiza
- **THEN** muestra al menos 8 nombres de tecnologías

#### Scenario: Hover resalta una tecnología

- **WHEN** el usuario hace hover sobre el nombre de una tecnología
- **THEN** su opacidad pasa de 0.4 a 1 con transition suave

---

### Requirement: Portfolio usa grid asimétrico

`Portfolio.jsx` SHALL renderizar 6 cards usando `.grid-12` con aspect-ratios variados y `col-span` distintos en desktop (≥ 1024px). En mobile se apilan a una columna.

#### Scenario: Cards con aspect-ratio variado

- **WHEN** el portfolio se renderiza en desktop
- **THEN** las 6 cards usan al menos 3 aspect-ratios distintos entre `16/10`, `4/5`, `1/1`, `4/3`, `3/4`, `16/9`

#### Scenario: Hover hace scale + muestra overlay con chips

- **WHEN** el usuario hace hover sobre una card
- **THEN** la card escala a 1.02 y aparece un overlay con los tags como chips

---

### Requirement: Servicios con cards modernas

`Services.jsx` SHALL renderizar las 4 service-cards con:

- Border `1px solid rgba(17, 24, 39, 0.08)`
- `border-radius: var(--radius-lg)`
- `box-shadow: var(--shadow-sm)` por defecto
- Hover: `box-shadow: var(--shadow-md)` y borde superior con `var(--first-color)` (3px de grosor)

#### Scenario: Card por defecto tiene sombra sutil

- **WHEN** una service-card se renderiza
- **THEN** muestra `border-radius`, borde fino y sombra sutil

#### Scenario: Hover destaca con sombra y acento esmeralda

- **WHEN** el usuario hace hover sobre una card
- **THEN** la sombra se intensifica y aparece un acento esmeralda visible

---

### Requirement: Contacto con layout dos columnas

`Contact.jsx` SHALL usar `.grid-12` con:

- Columnas 1–5 (en desktop): bloque de información con título grande, párrafo, email de contacto, ubicación, y links a redes sociales
- Columnas 6–12: el formulario controlado (mismos campos que antes: name, email, subject, message)

En mobile el bloque de info aparece encima del formulario.

#### Scenario: Layout dos columnas en desktop

- **WHEN** el viewport es ≥ 1024px
- **THEN** el bloque de info y el formulario están lado a lado

#### Scenario: Formulario conserva contrato anterior

- **WHEN** el usuario envía el formulario
- **THEN** se hace POST a `formsubmit.co/ajax/{recipient}` con `multipart/form-data` y los campos `name`, `email`, `subject`, `message`

---

### Requirement: Reveal-on-scroll aplicado a secciones

Cada sección de la landing (Hero, Stats, About, Services, Process, Portfolio, TechStack, Contact) SHALL usar el hook `useReveal` para añadir la clase `is-visible` al elemento raíz de la sección cuando entra al viewport, activando la transición de la clase `.reveal`.

#### Scenario: Sección aparece con fade-in

- **WHEN** el usuario hace scroll y una sección cruza el viewport
- **THEN** su contenido transiciona de invisible a visible una sola vez

#### Scenario: Secciones ya visibles al cargar se muestran instantáneamente

- **WHEN** la página termina de cargar y la sección Hero ya está dentro del viewport
- **THEN** Hero es inmediatamente visible sin esperar scroll

---

### Requirement: Orden de secciones en App.jsx

`App.jsx` SHALL renderizar las secciones en este orden exacto dentro de `<main>`:

1. `Hero`
2. `Stats`
3. `About`
4. `Services`
5. `Process`
6. `Portfolio`
7. `TechStack`
8. `Contact`

El `Header` queda fuera de `<main>` por encima, y el `Footer` queda fuera de `<main>` por debajo.

#### Scenario: Orden de DOM correcto

- **WHEN** se inspecciona el DOM renderizado
- **THEN** las secciones aparecen en el orden listado y el `Header` precede a todas mientras el `Footer` sigue a todas
