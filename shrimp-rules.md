# Aurio Widget Frontend Development Standards

## Project Overview

- **Purpose**: Embeddable audio consultation widget frontend built with Svelte 5 + TypeScript + Vite
- **Technology Stack**: Svelte 5, TypeScript, Vite, CSS (no theme support currently)
- **Target**: Modern browsers with ES2022+ support
- **Architecture**: Fixed-size widget (432x693px) for embedding in external applications
- **Widget Dimensions**: 432px width × 693px height (fixed, do not modify)

## File Organization Rules

### Directory Structure
- **MUST** place components in `src/components/` with subdirectories:
  - `atoms/` - Small reusable components (consultation.svelte, blank-state-consultation.svelte)
  - `drawers/` - Overlay components (menu.svelte)
  - `layouts/` - Layout components (main.svelte, header.svelte, recording-widget.svelte)
- **MUST** place pages in `src/pages/` (home.svelte, consultation-detail.svelte, not-found.svelte)
- **MUST** place stores in `src/store/` (route.ts)
- **MUST** place utilities in `src/utils/`
- **MUST** place static assets in `src/assets/` with subdirectories:
  - `icons/` - SVG icons
  - `logo/` - Logo assets
- **MUST** place global styles in `src/app.css`
- **MUST** keep main application entry in `src/main.ts`
- **MUST** keep root component as `src/App.svelte`

### File Naming Conventions
- **MUST** use kebab-case for Svelte component files (e.g., `consultation.svelte`, `blank-state-consultation.svelte`)
- **MUST** use camelCase for TypeScript files (e.g., `route.ts`)
- **MUST** use kebab-case for CSS files (e.g., `app.css`)
- **MUST** use kebab-case for asset files (e.g., `serenic-logo.svg`, `menu.svg`)

## Svelte 5 Syntax Requirements

### Migration Strategy
- **MUST** use Svelte 5 runes syntax for ALL NEW components
- **MUST** gradually migrate existing components to runes when modifying them
- **MUST** prioritize consistency within each component (don't mix old and new syntax)

### State Management
- **MUST** use `$state()` for reactive variables in new components
- **MUST** use `$derived()` for computed values in new components
- **MUST** use `$effect()` for side effects in new components
- **MUST** use `$props()` for component props in new components
- **MUST** use traditional Svelte stores for global state (route.ts pattern)

### Examples
```svelte
<!-- CORRECT: Svelte 5 runes syntax for NEW components -->
<script lang="ts">
  const { consultation, handleSelectConsultation } = $props();
  let isOpen = $state(false);
  let computedValue = $derived(consultation.status === 'success');
</script>

<!-- ACCEPTABLE: Old syntax for EXISTING components (until migration) -->
<script>
  import menuIcon from "../../assets/icons/menu.svg";
  let isOpenMenuDrawer = $state(false); // Mixed syntax during transition
</script>
```

### Event Handling
- **MUST** use `onclick` instead of `on:click` for new components
- **MUST** use `onsubmit` instead of `on:submit` for new components
- **ACCEPTABLE** to keep `on:` syntax in existing components until migration

## TypeScript Compliance Rules

### TypeScript Usage
- **MUST** add `lang="ts"` to `<script>` tags for ALL NEW components
- **SHOULD** gradually add TypeScript to existing components when modifying them
- **MUST** provide explicit type annotations for complex data structures
- **MUST** use strict TypeScript settings (already configured)

### Import/Export Patterns
- **MUST** use ES modules syntax (`import`/`export`)
- **MUST** use relative imports for components (e.g., `'./components/atoms/consultation.svelte'`)
- **MUST** use relative imports for assets (e.g., `'../../assets/icons/menu.svg'`)
- **MUST** import types with `import type` when importing only types

### Examples
```typescript
// CORRECT: TypeScript with proper imports
import type { RouteInfo } from '../store/route';
import consultation from '../components/atoms/consultation.svelte';
import menuIcon from "../../assets/icons/menu.svg";

// ACCEPTABLE: JavaScript for existing components
import menuIcon from "../../assets/icons/menu.svg";
const { consultation, handleSelectConsultation } = $props();
```

## Component Development Standards

### Component Structure
- **MUST** follow this order in `.svelte` files:
  1. `<script>` or `<script lang="ts">` block
  2. HTML template
  3. `<style>` block (often empty, styles in app.css)

### Component Organization
- **MUST** place small reusable components in `src/components/atoms/`
- **MUST** place overlay/modal components in `src/components/drawers/`
- **MUST** place layout components in `src/components/layouts/`
- **MUST** place page components in `src/pages/`

### Component Props
- **MUST** use `$props()` for component props in new components
- **MUST** destructure props at the top of script block
- **ACCEPTABLE** to use old prop syntax in existing components

### Component Examples
```svelte
<!-- CORRECT: New component with runes -->
<script lang="ts">
  const { consultation, handleSelectConsultation } = $props();
  let isHovered = $state(false);
</script>

<!-- ACCEPTABLE: Existing component pattern -->
<script>
  import menuIcon from "../../assets/icons/menu.svg";
  let isOpenMenuDrawer = $state(false);
</script>
```

## CSS and Styling Rules

### Widget-Specific Constraints
- **MUST NOT** modify widget container dimensions (432px × 693px)
- **MUST NOT** change core widget layout classes (.widget-container, .widget-header, .widget-content)
- **MUST** maintain fixed widget structure for embedding compatibility

### CSS Organization
- **MUST** place ALL styles in `src/app.css` (no scoped component styles currently)
- **MUST** use existing CSS class patterns from app.css
- **MUST** follow existing button classes (.button, .button-primary, .button-danger, .clean-button)
- **MUST** use existing layout classes (.widget-container, .widget-header, .widget-content)

### Existing CSS Patterns to Follow
```css
/* MUST use existing button patterns */
.button-primary {
  background: #4B14AE;
  color: white;
  transition: all 0.3s ease;
}

/* MUST use existing consultation patterns */
.consultation {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #EAEAEA;
  align-items: center;
}

/* MUST use existing menu patterns */
.menu-container {
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.701);
}
```

### CSS Obfuscation
- **DISABLED** in vite.config.ts (enable: false)
- **MUST NOT** enable CSS obfuscation without updating all components
- **MUST** use original class names, not obfuscated ones

## Build and Development Workflow

### Development Commands
- **MUST** use `npm run dev` for development server
- **MUST** use `npm run build` for production builds
- **MUST** use `npm run check` for TypeScript and Svelte checking
- **MUST** run type checking before committing changes

### Configuration Files
- **MUST NOT** modify widget dimensions in any configuration
- **MUST NOT** enable CSS obfuscation in `vite.config.ts` without coordinated component updates
- **MUST NOT** modify `tsconfig.json`, `tsconfig.app.json`, or `tsconfig.node.json` without understanding implications
- **MUST NOT** modify `svelte.config.js` unless changing preprocessing needs

### PostCSS Obfuscator
- **CURRENTLY DISABLED** in vite.config.ts (enable: false)
- **MUST** coordinate with all components if re-enabling
- **MUST** update obfuscation map in `css-obfuscator/main.json` if enabled

## Asset Management Rules

### Static Assets
- **MUST** place SVG icons in `src/assets/icons/` (menu.svg, close.svg, success.svg, failed.svg, processing.svg)
- **MUST** place logos in `src/assets/logo/` (serenic-logo.svg)
- **MUST** place public assets in `public/` (vite.svg)
- **MUST** use relative imports for all src/assets (e.g., `'../../assets/icons/menu.svg'`)
- **MUST** use absolute imports for public assets (e.g., `'/vite.svg'`)

### Asset Examples
```typescript
// CORRECT: Asset imports following project patterns
import menuIcon from "../../assets/icons/menu.svg";
import logo from "../../assets/logo/serenic-logo.svg";
import viteLogo from '/vite.svg';  // public folder
```

## Multi-File Coordination Requirements

### When Adding New Components
- **MUST** create component in appropriate `src/components/` subdirectory (atoms/, drawers/, layouts/)
- **MUST** import and use in parent components or pages
- **MUST** add styles to `src/app.css` (not component-scoped styles)
- **MUST** follow existing CSS class naming patterns
- **MUST** use Svelte 5 runes syntax for new components

### When Adding New Pages
- **MUST** create page in `src/pages/`
- **MUST** add route to `src/store/route.ts` ROUTES constant
- **MUST** add navigation function to `navigate` object in route.ts
- **MUST** add route handling in `src/App.svelte`
- **MUST** wrap page content with `<MainLayout>` component

### When Modifying Global Styles
- **MUST** update `src/app.css` for all styling changes
- **MUST** maintain widget dimensions (432px × 693px)
- **MUST** test all existing components for visual regressions
- **MUST** ensure button hover effects work correctly

### When Modifying Routing
- **MUST** update `src/store/route.ts` for new routes
- **MUST** update `src/App.svelte` route handling
- **MUST** ensure navigation functions work correctly
- **MUST** test back navigation functionality

## AI Decision-Making Standards

### Priority Order for Ambiguous Situations
1. **Widget constraints** - Never modify widget dimensions or core layout
2. **Svelte 5 migration** - Use runes for new components, migrate existing when modifying
3. **CSS centralization** - All styles in app.css, no component-scoped styles
4. **TypeScript adoption** - Add TypeScript to new components, gradually to existing
5. **Routing consistency** - Follow established route.ts patterns

### Component Development Decisions
- **NEW component**: Use Svelte 5 runes + TypeScript + styles in app.css
- **EXISTING component modification**: Gradually migrate to runes if making significant changes
- **STYLING changes**: Always modify app.css, never add scoped styles
- **ROUTING changes**: Update both route.ts and App.svelte

### File Location Decisions
- **Small reusable UI**: `src/components/atoms/`
- **Overlay/modal**: `src/components/drawers/`
- **Layout structure**: `src/components/layouts/`
- **Full pages**: `src/pages/`
- **State management**: `src/store/`
- **Utilities**: `src/utils/`

## Prohibited Actions

### Absolutely Forbidden
- **NEVER** modify widget container dimensions (432px × 693px)
- **NEVER** enable CSS obfuscation without coordinating all components
- **NEVER** add scoped component styles (use app.css only)
- **NEVER** mix old and new Svelte syntax within the same component
- **NEVER** create components outside the established directory structure
- **NEVER** modify core layout classes (.widget-container, .widget-header, .widget-content)

### Strongly Discouraged
- Modifying existing working components without clear requirements
- Adding new dependencies without justification
- Changing established CSS class naming patterns
- Creating duplicate functionality that already exists
2. **Svelte 5 syntax** - Use modern runes syntax
3. **Theme compatibility** - Ensure light/dark theme support
4. **Component reusability** - Favor reusable components in `src/lib/`
5. **Performance** - Minimize bundle size and runtime overhead

### Decision Tree for Component Creation
- **If** component is reusable → Place in `src/lib/`
- **If** component is app-specific → Keep in `src/`
- **If** component needs props → Use `$props()` with TypeScript interface
- **If** component needs state → Use `$state()` with explicit types
- **If** component needs styling → Use scoped `<style>` block

## Prohibited Actions

### Code Patterns
- **NEVER** use old Svelte syntax (`let`, `$:`, `on:click`)
- **NEVER** use `any` type in TypeScript
- **NEVER** ignore TypeScript errors
- **NEVER** use `console.log` in production code
- **NEVER** hardcode colors (use CSS custom properties)

### File Operations
- **NEVER** modify configuration files without understanding impact
- **NEVER** place components outside `src/lib/` if they're reusable
- **NEVER** place assets outside `src/assets/` or `public/`
- **NEVER** import from `node_modules` directly in components

### Build and Deployment
- **NEVER** commit `node_modules/` or `dist/` directories
- **NEVER** modify `.gitignore` without justification
- **NEVER** skip type checking before builds
- **NEVER** use deprecated Vite or Svelte features

## Widget-Specific Considerations

### Embedding Requirements
- **MUST** ensure components work in iframe contexts
- **MUST** avoid global CSS conflicts
- **MUST** handle different container sizes gracefully
- **MUST** provide clear API for widget configuration

### Performance Requirements
- **MUST** keep bundle size minimal
- **MUST** use code splitting for large features
- **MUST** optimize for fast initial load
- **MUST** avoid unnecessary re-renders

### Examples of Widget-Safe Patterns
```svelte
<!-- CORRECT: Widget-safe component -->
<script lang="ts">
  interface WidgetProps {
    apiKey: string
    theme?: 'light' | 'dark'
    width?: string
    height?: string
  }
  
  let { apiKey, theme = 'dark', width = '100%', height = 'auto' }: WidgetProps = $props()
</script>

<div class="widget-container" style="width: {width}; height: {height}" data-theme={theme}>
  <!-- Widget content -->
</div>

<style>
  .widget-container {
    /* Scoped styles that won't conflict with parent page */
    all: initial;
    font-family: system-ui, sans-serif;
  }
</style>
```