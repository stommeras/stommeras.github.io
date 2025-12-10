# Copilot Instructions for stommeras.github.io

## Project Overview

Personal portfolio website built as a static Next.js site (configured with `output: 'export'`) deployed to GitHub Pages. Uses Next.js 16 App Router with React 19, Tailwind CSS v4, and animation libraries (Motion, GSAP, react-spring).

## Key Architecture Decisions

### Static Export Configuration

- Next.js is configured for static HTML export (`output: 'export'` in `next.config.ts`)
- No server-side features (API routes, ISR, middleware) - everything must be client-side or build-time
- Dev server runs on port 4000 (`pnpm dev`)

### Component Organization

```
src/
  components/
    features/        # Page sections (landing, about)
    layout/          # Site-wide layout (header, navigation)
    ui/              # Reusable primitives (Containers, Typography, text-effects)
  app/               # Next.js App Router pages
  hooks/             # Shared React hooks
```

**Pattern**: Features are self-contained in `features/` subdirectories with barrel exports (`index.ts`). Each feature exports a main component (e.g., `Landing`, `About`).

### Styling & Theme System

- **Tailwind v4** with custom CSS variables in `@theme` directive (`globals.css`)
- Dark mode via `next-themes` using `data-mode` attribute selector: `dark:` (configured in `tailwind.config.ts`)
- Typography: Cascadia Mono (Google Fonts) loaded in root layout with extensive fallback stack

### Animation Libraries

Three animation libraries are used for different purposes:

- **Motion** (`motion/react`): Primary animation library for text effects (see `DecryptedText`)
- **react-spring**: Physics-based animations (see `useBoop` hook)
- **GSAP**: Advanced timeline animations (dependency present)

## Component Patterns

### Client Components

Components using hooks, browser APIs, or animations must have `'use client'` directive:

```tsx
'use client';
import { useTheme } from 'next-themes';
```

### Barrel Exports

Each feature/component group uses `index.ts` for clean imports:

```tsx
// src/components/ui/index.ts
export { PageContainer } from './Containers';
export { Title, Subtitle } from './Typography';
export * from './text-effects';
```

### Custom Hooks Pattern

- `useIsClient`: Detects client-side rendering
- `useBoop`: Trigger-based spring animation with reduced-motion support
- `usePrefersReducedMotion`: Accessibility hook respecting user motion preferences

## TypeScript Configuration

Strict mode enabled with additional safety:

- `noUncheckedIndexedAccess: true` - array access returns `T | undefined`
- `exactOptionalPropertyTypes: true` - distinguish `undefined` from omitted properties
- Path alias: `@/*` maps to `src/*`

## Development Workflow

### Commands

```bash
pnpm dev           # Start dev server on port 4000
pnpm build         # Build static export
pnpm lint          # ESLint check
pnpm lint:fix      # Auto-fix ESLint issues
pnpm format        # Prettier formatting
```

### Linting & Formatting

- **ESLint 9** flat config (`eslint.config.mjs`) with Next.js + TypeScript + Prettier integration
- Prettier with `prettier-plugin-tailwindcss` for automatic class sorting
- React Compiler enabled (`babel-plugin-react-compiler`)

## Experimental Features Enabled

```ts
reactCompiler: true           // React 19 compiler
viewTransition: true          // View Transitions API
turbopack.root: __dirname     // Turbopack bundler
```

## Accessibility Patterns

- Skip-to-content link in `layout.tsx` with SR-only/focus-visible classes
- `#main-content` ID anchor on main page container
- Screen reader labels on interactive elements (see `DarkToggle`)

## Adding New Features

1. Create feature directory under `src/components/features/{feature-name}/`
2. Implement main component + subcomponents
3. Export via `index.ts` barrel export
4. Import and compose in `src/app/page.tsx`
5. Use `PageContainer` for consistent section layout

## Common Gotchas

- **Motion**: Text effects like `DecryptedText` have complex state management - review existing implementation before modifying
- **Static export**: No dynamic routes with `[param]` syntax without `generateStaticParams`
- **Tailwind v4**: Uses `@import 'tailwindcss'` and `@theme` instead of v3's `@tailwind` directives
