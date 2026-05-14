## ADDED Requirements

### Requirement: Hero section visible al cargar

La página SHALL mostrar una sección Hero (`id="inicio"`) al inicio con: título principal, subtítulo de propuesta de valor, y un botón CTA que enlaza a `#contacto`. El fondo SHALL usar la clase `.hero-image` y la opacidad con `.hero-image-opacity`.

#### Scenario: Visitante carga la página

- **WHEN** el usuario abre la URL raíz
- **THEN** la sección Hero ocupa la pantalla completa con título, subtítulo y botón "Contáctanos"

#### Scenario: CTA navega a Contacto

- **WHEN** el usuario hace clic en el botón CTA del Hero
- **THEN** la página hace scroll suave hasta la sección `#contacto`

---

### Requirement: Sección Acerca presenta la consultora

La página SHALL mostrar una sección (`id="acerca"`) con información sobre la consultora: misión, valores o descripción del equipo. El contenido SHALL usar la clase `.about` del CSS existente.

#### Scenario: Contenido de Acerca visible

- **WHEN** el usuario navega a `#acerca`
- **THEN** la sección muestra al menos un párrafo de descripción de la consultora

---

### Requirement: Sección Servicios enumera los servicios ofrecidos

La página SHALL mostrar una sección (`id="servicios"`) con al menos 3 tarjetas de servicio (`.service-card`), cada una con ícono SVG, título y descripción.

#### Scenario: Tarjetas de servicio visibles

- **WHEN** el usuario navega a `#servicios`
- **THEN** la sección muestra al menos 3 tarjetas con título y descripción

---

### Requirement: Sección Portafolio muestra proyectos

La página SHALL mostrar una sección (`id="portafolio"`) con al menos 3 cards de proyectos (`.portfolio-card`) que incluyan imagen placeholder, nombre del proyecto y descripción breve visible en hover.

#### Scenario: Cards de portafolio visibles

- **WHEN** el usuario navega a `#portafolio`
- **THEN** se muestran al menos 3 cards con imagen y nombre

#### Scenario: Info en hover

- **WHEN** el usuario hace hover sobre una card
- **THEN** aparece la descripción del proyecto con fondo semitransparente

---

### Requirement: Formulario de contacto funcional

La página SHALL mostrar una sección (`id="contacto"`) con un formulario controlado en React con campos nombre, email, asunto y mensaje. Al enviarlo SHALL hacer POST a `formsubmit.co` y mostrar estado de carga y mensaje de resultado inline.

#### Scenario: Envío exitoso

- **WHEN** el usuario rellena el formulario y hace submit
- **THEN** se muestra un indicador de carga, luego un mensaje de éxito sin redirigir a otra URL

#### Scenario: Error en envío

- **WHEN** la petición a formsubmit.co falla
- **THEN** se muestra el mensaje de error inline sin recargar la página

---

### Requirement: Footer con información de la empresa

La página SHALL mostrar un footer (`.footer`) con el nombre de la empresa, año actual y links a redes sociales (placeholders).

#### Scenario: Footer visible en todas las resoluciones

- **WHEN** el usuario llega al final de la página
- **THEN** el footer muestra nombre de empresa y año
