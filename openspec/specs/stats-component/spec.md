# Stats Component Specification

## Requirements

### Requirement: Accept metrics data as props
The Stats component SHALL accept an array of metric objects as a prop. Each metric object SHALL contain a `label` (string) and `value` (string), and MAY contain an optional `description` (string).

#### Scenario: Render metrics with label and value
- **WHEN** Stats component receives metrics array with label and value
- **THEN** component renders each metric with label and value displayed

#### Scenario: Render metrics with optional description
- **WHEN** Stats component receives metrics array with description property
- **THEN** component displays description below the value for that metric

### Requirement: Display metrics in responsive grid layout
The Stats component SHALL render metrics in a responsive grid that adapts to screen size: single column on mobile (< 640px), two columns on tablet (640px - 1024px), and four columns on desktop (> 1024px).

#### Scenario: Mobile layout
- **WHEN** component is rendered on a device with screen width < 640px
- **THEN** metrics are displayed in a single column layout

#### Scenario: Tablet layout
- **WHEN** component is rendered on a device with screen width 640px - 1024px
- **THEN** metrics are displayed in two columns

#### Scenario: Desktop layout
- **WHEN** component is rendered on a device with screen width > 1024px
- **THEN** metrics are displayed in four columns

### Requirement: Apply consistent styling using CSS custom properties
The Stats component SHALL use CSS custom properties defined in the project (--first-color, --second-color, --header-height) for colors, borders, and spacing to maintain visual consistency with the design system.

#### Scenario: Apply color styling
- **WHEN** Stats component renders metric cards
- **THEN** cards use the project's CSS custom properties for border and text colors

### Requirement: Render metric cards with visual structure
Each metric card SHALL display the metric value prominently, with the label below or beside it. Cards MAY include an optional visual indicator (emoji or icon).

#### Scenario: Metric card structure
- **WHEN** component renders a single metric
- **THEN** the value is displayed in large text and the label in smaller text below

#### Scenario: Metric card with visual indicator
- **WHEN** metric object includes an optional icon or emoji property
- **THEN** the visual indicator is displayed within the metric card

### Requirement: Support custom metric data
The Stats component SHALL accept metric objects with any additional properties, allowing for flexible data structures (e.g., icon URL, custom class names) without breaking the component.

#### Scenario: Render with custom properties
- **WHEN** metric object includes custom properties beyond label and value
- **THEN** component renders without errors and uses the standard properties correctly

### Requirement: Be accessible to assistive technologies
The Stats component SHALL include proper semantic HTML and accessibility attributes (e.g., aria-labels for numeric values).

#### Scenario: Screen reader announces metrics
- **WHEN** user navigates component with screen reader
- **THEN** metric labels and values are announced clearly
