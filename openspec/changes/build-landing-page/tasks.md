## 1. Corregir Header.jsx (header-react)

- [x] 1.1 Reemplazar todos los atributos `class` por `className` en `Header.jsx`
- [x] 1.2 Conectar `onClick={toggleMenu}` al `<button className="menu-btn">`
- [x] 1.3 Cambiar `className` del `<nav>` a dinámico: `` `menu${isMenuOpen ? ' is-active' : ''}` ``
- [x] 1.4 Agregar `onClick={() => setIsMenuOpen(false)}` a cada `<a>` del menú
- [x] 1.5 Eliminar las props no usadas (`logo`, `menuItems`, `primaryColor`, `logoUrl`) del componente
- [x] 1.6 Cambiar `href="index.html"` del logo por `href="#inicio"`

## 2. Eliminar script.js

- [x] 2.1 Quitar `<script src="/src/script.js"></script>` de `index.html`
- [x] 2.2 Eliminar el archivo `src/script.js`

## 3. Crear componente Hero.jsx

- [x] 3.1 Crear `src/components/Hero.jsx` con sección `id="inicio"`, clases `.hero-image` y `.hero-image-opacity`
- [x] 3.2 Agregar título con clase `.hero-image-title`, subtítulo y botón `.btn` enlazado a `#contacto`
- [x] 3.3 Definir variables CSS `--hero-image`, `--hero-opacity-color`, `--hero-text-color` y `--hero-attachment` en un `<style>` inline o en `index.css`

## 4. Crear componente About.jsx

- [x] 4.1 Crear `src/components/About.jsx` con sección `id="acerca"` y clase `.about`
- [x] 4.2 Agregar título de sección (`.section-title`) y al menos 3 artículos de presentación (misión, visión, equipo)

## 5. Crear componente Services.jsx

- [x] 5.1 Crear `src/components/Services.jsx` con sección `id="servicios"` y clase `.services`
- [x] 5.2 Definir array `const services` con al menos 3 objetos `{ icon, title, description }`
- [x] 5.3 Renderizar una `.service-card` por cada servicio con ícono SVG, título y descripción

## 6. Crear componente Portfolio.jsx

- [x] 6.1 Crear `src/components/Portfolio.jsx` con sección `id="portafolio"` y clase `.portfolio`
- [x] 6.2 Definir array `const projects` con al menos 3 objetos `{ image, title, description, tags }`
- [x] 6.3 Renderizar una `.portfolio-card` por proyecto con overlay `.portfolio-card-info` en hover

## 7. Crear componente Contact.jsx

- [x] 7.1 Crear `src/components/Contact.jsx` con sección `id="contacto"`
- [x] 7.2 Implementar estado React: `formData`, `isLoading`, `responseMessage` con `useState`
- [x] 7.3 Crear formulario controlado con campos: nombre, email, asunto, mensaje (clase `.contact-form`)
- [x] 7.4 Implementar `handleSubmit` que hace POST a `formsubmit.co/ajax/tu@email.com` con `FormData`
- [x] 7.5 Mostrar estado de carga (`.contact-form-loader`) y mensaje de resultado inline

## 8. Crear componente Footer.jsx

- [x] 8.1 Crear `src/components/Footer.jsx` con clase `.footer`
- [x] 8.2 Agregar nombre de la empresa, año dinámico (`new Date().getFullYear()`) y links placeholder a redes sociales con clase `.social-media`

## 9. Componer secciones en App.jsx

- [x] 9.1 Importar todos los nuevos componentes en `App.jsx`
- [x] 9.2 Renderizar en orden: `<Header />`, `<Hero />`, `<About />`, `<Services />`, `<Portfolio />`, `<Contact />`, `<Footer />`

## 10. Verificación

- [x] 10.1 Ejecutar `npm run dev` y navegar por todas las secciones <!-- dev server arranca limpio; navegación visual queda pendiente al usuario -->
- [ ] 10.2 Verificar que el menú móvil abre/cierra correctamente en viewport < 1024px
- [ ] 10.3 Verificar que hacer clic en un enlace del menú cierra el menú
- [ ] 10.4 Verificar que el formulario muestra loader al enviar y mensaje de respuesta
- [x] 10.5 Ejecutar `npm run lint` sin errores
