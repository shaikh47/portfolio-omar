---
description: Code Conventions and Styling Guidelines for Portfolio
globs: *.tsx, *.ts, *.jsx, *.js
---

# Code Conventions & Styling Guidelines

> **Before generating any code**, read this file in full and run through the self-check checklist at the bottom.

## Project Overview

A modern portfolio site built with:
- **React 19** + **TypeScript** for component structure
- **Tailwind CSS 4** for styling
- **Framer Motion** for animations
- **Three.js + React Three Fiber** for immersive 3D experiences
- **Vite** for bundling and dev server

---

## Key Files & Directories

| Purpose | Location |
|---|---|
| Main application entry | `src/App.tsx` |
| Reusable components | `src/components/` |
| Page sections (Hero, About, Skills, etc.) | `src/sections/` |
| 3D experience components | `src/experience/` |
| Custom React hooks | `src/hooks/` |
| Type definitions | `src/types/` |
| Static data (resume, projects) | `src/data/` |
| Tailwind config | `tailwind.config.js` |
| TypeScript config | `tsconfig.json` |

---

## Rule 1 — Component Organization

### Naming & File Structure
- **Component files**: PascalCase (`Navbar.tsx`, `SectionHeading.tsx`)
- **Utility files**: camelCase (`useActiveSection.ts`)
- **One component per file** unless it's a tiny sub-component (<30 lines)
- **Co-locate related code**: Hook that's only used by one component goes in the same folder or nearby

### Component Types

#### Page Sections (`src/sections/`)
Large sections that span the full viewport. Examples: `Hero`, `About`, `Experience`, `Skills`, `Projects`.
```tsx
export function Hero({ data }: { data: ResumeData }) {
  return (
    <section id="hero" className="min-h-screen flex items-center">
      {/* ... */}
    </section>
  )
}
```

#### Reusable Components (`src/components/`)
Smaller, composable UI pieces used across sections. Examples: `Navbar`, `SectionHeading`, `ThemeToggle`, `EnterExperienceButton`.
```tsx
interface SectionHeadingProps {
  title: string
  subtitle?: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}
```

#### 3D Experience Components (`src/experience/`)
Three.js / React Three Fiber components for immersive experiences.
```tsx
export function Experience({ onExit }: { onExit: () => void }) {
  return (
    <Canvas>
      {/* 3D scene setup */}
    </Canvas>
  )
}
```

---

## Rule 2 — Styling with Tailwind CSS

### No Hardcoded Colors

**Forbidden:**
```tsx
// ❌ Hardcoded hex or named colors
className="bg-#1a1a1a text-red-500"
className="border-2 border-gray-400"

// ❌ Inline style objects with raw values
style={{ color: 'red', padding: '12px' }}
```

**Correct:**
```tsx
// ✅ Use Tailwind color tokens
className="bg-neutral-900 text-blue-500"
className="border-2 border-neutral-300 dark:border-neutral-700"

// ✅ Use Tailwind spacing and sizing
className="px-6 py-4 gap-2"
```

### Tailwind Class Conventions

- **Responsive-first**: Use `sm:`, `md:`, `lg:` prefixes for responsive design
- **Dark mode**: Use `dark:` prefix for dark theme variants
- **Ordering**: Group related utility classes (layout, spacing, colors, effects)

```tsx
// Example: well-organized Tailwind classes
<div className="
  flex flex-col items-center justify-center
  gap-4 px-6 py-8
  bg-white dark:bg-neutral-950
  text-neutral-900 dark:text-white
  rounded-lg shadow-sm
  transition-colors duration-200
  hover:shadow-md
">
  {/* content */}
</div>
```

### Extracting Repeated Classes

If the same class string appears 3+ times, extract it:

```tsx
// ❌ Repeated class string
const Item1 = () => <div className="flex gap-3 px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
const Item2 = () => <div className="flex gap-3 px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800" />

// ✅ Extract to a constant or utility function
const CARD_CLASS = "flex gap-3 px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800"
const Item1 = () => <div className={CARD_CLASS} />

// Or even better, create a component wrapper
<Card>
  {/* content */}
</Card>
```

### No Inline Styles Except for Dynamic Values

**Forbidden:**
```tsx
// ❌ Inline styles for static values
<div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px' }} />
```

**Correct:**
```tsx
// ✅ Use Tailwind for static values
<div className="bg-white p-4 rounded-lg" />

// ✅ Only use inline styles for truly dynamic values
<div style={{ transform: `translateX(${offset}px)` }} />
```

---

## Rule 3 — Animation & Motion

### Framer Motion Patterns

Use Framer Motion for page transitions, scroll effects, and interactive animations.

```tsx
import { motion } from 'framer-motion'

// ✅ Entrance animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  Content
</motion.div>

// ✅ Conditional rendering with AnimatePresence
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Modal
    </motion.div>
  )}
</AnimatePresence>
```

### Tailwind Transitions

For simple state changes, prefer Tailwind's `transition-*` utilities over Framer Motion:

```tsx
// ✅ Simple hover/focus states with Tailwind
<button className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200" />

// ✅ Complex orchestrated animations → Framer Motion
<motion.div animate={controls} transition={{ staggerChildren: 0.1 }} />
```

---

## Rule 4 — TypeScript Conventions

### Component Props

Define explicit interfaces for component props:

```tsx
// ❌ Avoid
export function Card(props: any) { }

// ✅ Define typed props
interface CardProps {
  title: string
  description?: string
  isHighlighted?: boolean
  onClick?: () => void
}

export function Card({ title, description, isHighlighted, onClick }: CardProps) {
  // ...
}
```

### Data Types

Keep types in `src/types/` and share across components:

```tsx
// src/types/resume.ts
export interface ResumeData {
  name: string
  title: string
  about: string
  experience: Experience[]
  skills: Skill[]
}

// src/components/ExperienceCard.tsx
import { Experience } from '../types/resume'

export function ExperienceCard({ item }: { item: Experience }) {
  // ...
}
```

### Avoid `any`

```tsx
// ❌
const handleClick = (event: any) => { }

// ✅
import { MouseEvent } from 'react'
const handleClick = (event: MouseEvent<HTMLButtonElement>) => { }
```

---

## Rule 5 — Three.js & React Three Fiber

### 3D Component Patterns

- Keep 3D logic separate in `src/experience/`
- Use `Suspense` for lazy-loading the 3D bundle (already done in `App.tsx`)
- Clean up resources in `useEffect` cleanup functions

```tsx
// src/experience/Experience.tsx
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

export function Experience({ onExit }: { onExit: () => void }) {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
```

### Code Splitting for 3D

The 3D bundle is already lazy-loaded via dynamic import in `App.tsx`. Keep this pattern:

```tsx
// ✅ Already in place — do not change this pattern
const Experience3D = lazy(() =>
  import('./experience/Experience').then((m) => ({ default: m.Experience }))
)
```

---

## Rule 6 — Hook Usage

### Custom Hooks

Keep hooks simple and focused. Store in `src/hooks/`:

```tsx
// src/hooks/useActiveSection.ts
export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    // Observe intersection and update state
  }, [sectionIds])

  return active
}
```

### Avoid Prop Drilling

Use context for theme state or other global UI state:

```tsx
// ✅ If dark mode state is needed everywhere
const { isDark, toggleTheme } = useTheme()
```

---

## Rule 7 — Dark Mode Support

The project uses Tailwind's `dark` mode with class strategy.

- **Light mode default**: Base colors are light
- **Dark mode variants**: Use `dark:` prefix for dark theme overrides

```tsx
// ✅ Always provide dark variants
<div className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white" />

// ✅ For semantic colors, provide both modes
<button className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700" />
```

---

## Rule 8 — File Naming & Organization

- **Components**: `PascalCase.tsx` (e.g., `Navbar.tsx`, `SectionHeading.tsx`)
- **Hooks**: `camelCase.ts` prefixed with `use` (e.g., `useActiveSection.ts`)
- **Utilities**: `camelCase.ts` (e.g., `formatDate.ts`, `cn.ts`)
- **Types**: `camelCase.ts` or in `src/types/` (e.g., `resume.ts`)
- **Data**: `camelCase.ts` in `src/data/` (e.g., `resume.ts`)

---

## Rule 9 — Import Organization

Order imports consistently:

```tsx
// 1. React & external libraries
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// 2. Internal components (relative imports)
import { Navbar } from './components/Navbar'
import { Hero } from './sections/Hero'

// 3. Hooks
import { useActiveSection } from './hooks/useActiveSection'

// 4. Types
import { ResumeData } from './types/resume'

// 5. Data
import { resumeData } from './data/resume'

// 6. Styles (if any)
import './App.css'
```

---

## Rule 10 — Comments & Documentation

- **Minimal comments**: Well-named variables and functions are self-documenting
- **Comment when WHY is non-obvious**: Edge cases, performance decisions, workarounds

```tsx
// ✅ Good comment: explains why, not what
// Lazy-load 3D bundle to reduce initial bundle size
const Experience3D = lazy(() =>
  import('./experience/Experience').then((m) => ({ default: m.Experience }))
)

// ❌ Bad comment: just restates the code
// Set scrolled to true if scroll position > 20
setScrolled(window.scrollY > 20)
```

---

## Self-Check Before Submitting

Before finalizing any PR or change, verify **every item** below:

- [ ] No hardcoded colors — all styling uses Tailwind utilities
- [ ] All interactive elements have dark mode variants (`dark:` classes)
- [ ] Component props are fully typed (no `any` types)
- [ ] Repeated Tailwind class strings (3+ occurrences) are extracted to constants
- [ ] Animations use Framer Motion for complex effects, Tailwind `transition-*` for simple states
- [ ] 3D code is isolated in `src/experience/` and doesn't leak into non-3D components
- [ ] Custom hooks are in `src/hooks/` and follow the `useXxx` naming convention
- [ ] Types are defined in `src/types/` or inline in component files
- [ ] Imports are organized (React → external libs → internal → hooks → types → data → styles)
- [ ] Comments explain WHY, not WHAT
- [ ] No unused imports or variables (run `npm run lint`)
- [ ] Responsive design works on mobile (`sm:`, `md:`, `lg:` prefixes tested)
- [ ] TypeScript builds cleanly (`npm run build`)

---

## Quick Reference: Tailwind Spacing & Sizing

| Utility | Value |
|---|---|
| `p-{1-12}` | padding (1 = 0.25rem, 2 = 0.5rem, 4 = 1rem, etc.) |
| `gap-{1-12}` | gap between flex/grid children |
| `text-sm`, `text-base`, `text-lg`, `text-xl` | font sizes |
| `font-semibold`, `font-bold` | font weights |
| `rounded-lg`, `rounded-xl` | border radius |
| `shadow-sm`, `shadow-md`, `shadow-lg` | box shadows |
| `duration-200`, `duration-300` | transition duration |

---

## References

- [Tailwind CSS Docs](https://tailwindcss.com)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
