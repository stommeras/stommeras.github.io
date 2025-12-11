# Copilot Instructions for stommeras.github.io

## Project Overview

Personal portfolio site built with **Next.js 16 (App Router)** configured for **static export** to GitHub Pages. Uses React 19, TypeScript with strict mode, and Tailwind CSS v4.

## Architecture & Key Patterns

### Static Export Configuration

- `next.config.ts` sets `output: 'export'` - this is a static site, no server-side features
- Dev server runs on port 4000: `pnpm dev`
- Build generates static files: `pnpm build`
- React Compiler enabled (`reactCompiler: true`)

### Component Organization

Components follow a feature-based structure under `src/components/`:

- **features/**: Page-specific components grouped by route (`landing/`, `contact/`, `about/`)
  - Each feature exports through `index.ts` (e.g., `export { Landing } from './Landing'`)
  - Features contain multiple sub-components (see `landing/` with `LandingTitle`, `LandingSubtitle`, `LandingBackground`)
- **layout/**: Site-wide components (`header/`)
  - Header uses responsive patterns: desktop nav hidden on mobile, mobile menu with slide-down animation
- **ui/**: Reusable primitives and shadcn/ui components
  - Barrel export in `ui/index.ts` for common components (`Containers`, `DotGrid`, `Typography`, `text-effects`)
  - Custom variants using `class-variance-authority` (see `field.tsx`)

### Client vs Server Components

- Default to Server Components in App Router
- Add `'use client'` when using:
  - React hooks (`useState`, `useEffect`, `useSyncExternalStore`)
  - Event handlers (`onClick`, `onSubmit`, `onChange`)
  - Browser APIs or animation libraries (GSAP, Motion)
  - Theme-related components (see `DarkToggle.tsx`, `Header.tsx`)
- Server components: Route pages (`app/*/page.tsx`), static feature shells

### TypeScript Configuration

Strict type checking enabled:

- `noUncheckedIndexedAccess: true` - array access returns `T | undefined`
- `exactOptionalPropertyTypes: true` - optional props must be explicitly `undefined`
- `noImplicitReturns: true`, `noFallthroughCasesInSwitch: true`
- Path alias: `@/*` maps to `src/*`

### Styling Patterns

- **Tailwind CSS v4** with `@import 'tailwindcss'` in `globals.css`
- Custom animations defined in `@theme` block (see `globals.css` for `animate-scale`, `animate-rotate`, `animate-background-pan`)
- Dark mode uses `class` strategy with `next-themes`: `<ThemeProvider attribute="class">`
- Tailwind config: `darkMode: ['selector', '[data-mode="dark"]']`
- Use `cn()` utility (`lib/utils.ts`) for conditional classes: `cn('base-class', condition && 'conditional-class')`
- Responsive patterns: `className="hidden md:flex"` for desktop, `md:hidden` for mobile

### Form Handling

Uses **TanStack Form** with Zod validation (see `ContactForm.tsx`):

```tsx
const form = useForm({
  defaultValues,
  validationLogic: revalidateLogic({ mode: 'blur', modeAfterSubmission: 'change' }),
  validators: { onDynamic: zodSchema },
});
```

- Form fields use render prop pattern: `<form.Field name="..." children={(field) => ...} />`
- Custom Field components in `ui/field.tsx` with validation state: `data-invalid={isInvalid}`
- Toast notifications via `sonner` library

### Animation Patterns

- **Motion (Framer Motion v12)** for animations - import from `motion/react`
- Custom hooks for animation control:
  - `useIsClient()` - SSR-safe client detection using `useSyncExternalStore`
  - `usePrefersReducedMotion()` - respects user motion preferences
  - `useBoop()` - spring-based hover animations with `@react-spring/web`
- Text effects in `ui/text-effects/`: `DecryptedText`, `MagicText` (client components)

### Custom Hooks Pattern

Located in `src/hooks/`:

- Always check `useIsClient()` before browser API access to prevent SSR hydration issues
- Example: `useBoop` combines `useIsClient`, `usePrefersReducedMotion`, and `useSpring`

### Layout & Navigation

- Root layout (`app/layout.tsx`) includes:
  - `ConsoleArt` component (console logging art)
  - Skip-to-content link for accessibility
  - Global `Header` and `Toaster`
  - `ViewTransition` wrapper for experimental view transitions
- Font: Cascadia Code from Google Fonts with monospace fallback stack
- Metadata configured in root layout with template support

### Development Workflow

- **Package Manager**: pnpm (see `pnpm-lock.yaml`)
- **Linting**: ESLint v9 flat config (`eslint.config.mjs`) with Next.js + Prettier
  - Run: `pnpm lint` or `pnpm lint:fix`
  - Format: `pnpm format` (Prettier with Tailwind plugin)
- **Type Checking**: Run `tsc --noEmit` to check types without building

## Common Tasks

### Adding a New Page

1. Create `src/app/[route]/page.tsx` (server component by default)
2. Create feature component in `src/components/features/[route]/`
3. Export feature through `index.ts`
4. Import and render in page: `import { Feature } from '@/components/features/[route]'`

### Creating UI Components

- Interactive components → add `'use client'` directive
- Use `cn()` for className composition
- Follow shadcn/ui patterns for consistency (see `ui/button.tsx`, `ui/input-group.tsx`)
- Export through `ui/index.ts` if widely reusable

### Working with Animations

- Check `useIsClient()` before DOM/browser API access
- Respect `usePrefersReducedMotion()` for accessibility
- Use Motion's `HTMLMotionProps<'element'>` for type-safe motion components

## Important Constraints

- **No server-side features** (API routes, middleware, ISR, SSR) - static export only
- Images must be optimized manually or use `next/image` with `unoptimized` prop
- Environment variables must be prefixed with `NEXT_PUBLIC_` to be available client-side
