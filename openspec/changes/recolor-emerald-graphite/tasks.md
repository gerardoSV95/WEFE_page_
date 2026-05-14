## 1. Actualizar paleta en :root

- [x] 1.1 En `src/index.css` cambiar `--first-color: #d90062` → `#10b981`
- [x] 1.2 Cambiar `--first-alpha-color: rgba(217, 0, 98, 0.75)` → `rgba(16, 185, 129, 0.75)`
- [x] 1.3 Cambiar `--second-color: #14192d` → `#111827`
- [x] 1.4 Cambiar `--second-alpha-color: rgba(20, 25, 45, 0.75)` → `rgba(17, 24, 39, 0.75)`
- [x] 1.5 Cambiar `--third-color: #501464` → `#047857`
- [x] 1.6 Cambiar `--third-alpha-color: rgba(80, 20, 100, 0.75)` → `rgba(4, 120, 87, 0.75)`

## 2. Sincronizar Hero overlay

- [x] 2.1 En `src/components/Hero.jsx` actualizar `'--hero-opacity-color': 'rgba(20, 25, 45, 0.75)'` → `'rgba(17, 24, 39, 0.75)'`

## 3. Verificación

- [x] 3.1 `grep -E "(#d90062|#14192d|#501464)" src/` no devuelve resultados
- [x] 3.2 `npm run lint` sin errores
- [x] 3.3 `npm run build` exitoso
- [ ] 3.4 Verificación visual en `npm run dev`: botón CTA, menú móvil, footer y section-titles muestran el verde esmeralda; hero overlay y header usan grafito
