## Context

The WEFE landing page currently consists of a React app built with Vite, React 19, and Tailwind CSS v4. The page is structured as a single-page site with sections referenced via anchor links (#inicio, #servicios, etc.). The Header component manages navigation and mobile menu toggle via a combination of React state and legacy script.js DOM manipulation. The landing page lacks quantifiable business metrics that build trust with potential first-time clients.

## Goals / Non-Goals

**Goals:**
- Create a reusable `Stats` component that displays business metrics (years of experience, projects completed, etc.) in a visually appealing grid layout
- Integrate the component into the landing page (placed after hero or in a dedicated section)
- Ensure responsive design for mobile (single column), tablet (2 columns), and desktop (4 columns)
- Use existing CSS custom properties (--first-color, --second-color, typography variables) for visual consistency
- Make the component accept metric data as props so it can be reused across the site if needed

**Non-Goals:**
- Dynamic data fetching from an API (metrics are static/hardcoded for now)
- Charts, graphs, or visualizations beyond simple number displays
- Animation or scroll-triggered effects
- Modifying Header.jsx or other existing components (focus only on Stats)

## Decisions

1. **Component Structure**: `Stats.jsx` will be a functional component that accepts an array of metric objects as a prop. Each metric object contains: `label` (e.g., "Años de Experiencia"), `value` (e.g., "10+"), and optionally an `icon` or `description`.
   - *Rationale*: Props-based design makes the component reusable and testable without hardcoding data.
   - *Alternative considered*: Hardcode metrics directly in the component. Rejected because less flexible for future reuse.

2. **Layout**: Use Tailwind CSS grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`) to achieve responsive layout in a single CSS class, avoiding inline media queries.
   - *Rationale*: Aligns with project's Tailwind v4 approach and avoids custom CSS.
   - *Alternative considered*: Custom CSS grid in index.css. Rejected in favor of Tailwind utility-first approach.

3. **Styling Approach**: Define card/metric styles using CSS custom properties (border color, background) and Tailwind utilities. Keep minimal CSS in component—rely on Tailwind.
   - *Rationale*: Consistent with existing design system (--first-color, --second-color defined in index.css).
   - *Alternative considered*: BEM-style classes in component. Rejected to avoid CSS creep.

4. **Metric Data Placement**: Hardcode the metric objects in App.jsx or a separate `src/data/stats.js` file, then pass to `Stats` component.
   - *Rationale*: Separates data from presentation; easier to edit metrics without touching component logic.
   - *Alternative considered*: Hardcode in Stats.jsx. Rejected because less maintainable.

5. **Icon/Visual Indicator**: Use simple Unicode emoji or Tailwind icon approach (no external icon library) to keep bundle size minimal.
   - *Rationale*: Keeps dependencies lightweight; emoji are universally supported.
   - *Alternative considered*: Add Heroicons dependency. Rejected due to added bundle size for an MVP feature.

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Mobile layout becomes cramped if metric values are long | Use abbreviated values (e.g., "10+" instead of "over 10 years") and test on actual mobile devices |
| CSS custom properties not widely used yet on this page—inconsistency risk | Document the variable names in a comment in index.css; audity index.css on next refactor |
| Stats section placement in page affects visual flow | Decide placement (after hero, before services, before contact) in implementation; gather design feedback during first visual review |

## Open Questions

- **Data Source**: Should metric values be truly hardcoded, or should they pull from a config file? (Defer to implementation phase)
- **Placement**: Exact position in the landing page layout (before services? after portfolio?)—design preference needed
- **Accessibility**: Should metric numbers have aria-labels or data attributes for screen readers?
