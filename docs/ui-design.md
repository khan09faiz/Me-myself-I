# 🎨 UI Design System Documentation

## Design Philosophy

### Core Principles
1. **Glassmorphism** - Modern, semi-transparent card designs
2. **Cyber Aesthetic** - Neon accents with dark backgrounds
3. **Performance First** - 60fps animations, lightweight effects
4. **Accessibility** - WCAG 2.1 Level AA compliance
5. **Responsive** - Mobile-first, adaptive layouts

---

## Color System

### Primary Palette
```typescript
const colors = {
  primary: {
    DEFAULT: '#00D9FF',    // Cyan neon
    dark: '#00A8CC',       // Darker cyan
    light: '#33E4FF',      // Lighter cyan
    50: '#E6FBFF',
    100: '#CCF7FF',
    200: '#99EFFF',
    300: '#66E7FF',
    400: '#33DFFF',
    500: '#00D9FF',
    600: '#00A8CC',
    700: '#007999',
    800: '#004D66',
    900: '#002633',
  }
}
```

### Background Colors
```typescript
const backgrounds = {
  background: {
    DEFAULT: '#0A0E27',    // Deep navy base
    card: '#0F1629',       // Card background
    elevated: '#1A1F3A',   // Modals/overlays
  }
}
```

### Text Colors
```typescript
const text = {
  primary: '#E4E4E7',      // Almost white
  secondary: '#A1A1AA',    // Gray
  muted: '#71717A',        // Darker gray
  inverse: '#0A0E27',      // For light backgrounds
}
```

### Accent Colors
```typescript
const accents = {
  success: '#22C55E',      // Green
  warning: '#F59E0B',      // Orange
  error: '#EF4444',        // Red
  info: '#3B82F6',         // Blue
}
```

### Glassmorphism Colors
```typescript
const glass = {
  light: 'rgba(255, 255, 255, 0.1)',
  medium: 'rgba(255, 255, 255, 0.05)',
  dark: 'rgba(0, 0, 0, 0.2)',
}
```

---

## Typography

### Font Families
```typescript
const fonts = {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
}
```

### Type Scale
```typescript
const fontSize = {
  xs: '0.75rem',      // 12px
  sm: '0.875rem',     // 14px
  base: '1rem',       // 16px
  lg: '1.125rem',     // 18px
  xl: '1.25rem',      // 20px
  '2xl': '1.5rem',    // 24px
  '3xl': '1.875rem',  // 30px
  '4xl': '2.25rem',   // 36px
  '5xl': '3rem',      // 48px
  '6xl': '3.75rem',   // 60px
  '7xl': '4.5rem',    // 72px
  '8xl': '6rem',      // 96px
  '9xl': '8rem',      // 128px
}
```

### Font Weights
- **Regular:** 400 (body text)
- **Medium:** 500 (subtle emphasis)
- **Semibold:** 600 (headings)
- **Bold:** 700 (strong emphasis)

---

## Spacing System

### Consistent Spacing Scale
```typescript
const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
}
```

---

## Component Library

### 1. GlassCard Component

**Visual Properties:**
```css
.glass-card {
  backdrop-filter: blur(16px);
  background: rgba(15, 22, 41, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 217, 255, 0.1);
  border-radius: 1rem;
  transition: all 0.3s ease;
}

.glass-card:hover {
  border-color: rgba(0, 217, 255, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 12px 48px 0 rgba(0, 217, 255, 0.2);
}
```

**Variants:**
- `default` - Standard card
- `elevated` - Higher elevation with glow
- `flat` - No shadow, minimal style
- `outlined` - Border emphasis

---

### 2. Button Component

**Variants:**
```typescript
const buttonVariants = {
  primary: {
    bg: 'bg-primary',
    hover: 'hover:bg-primary-dark',
    text: 'text-black',
    shadow: 'shadow-glow-md',
  },
  secondary: {
    bg: 'bg-transparent',
    border: 'border-2 border-primary',
    hover: 'hover:bg-primary/10',
    text: 'text-primary',
  },
  ghost: {
    bg: 'bg-transparent',
    hover: 'hover:bg-white/5',
    text: 'text-text-primary',
  },
}
```

**Sizes:**
- `sm` - 32px height, 12px padding
- `md` - 40px height, 16px padding (default)
- `lg` - 48px height, 24px padding
- `xl` - 56px height, 32px padding

**States:**
- Normal
- Hover
- Active
- Disabled
- Loading

---

### 3. AnimatedBackground Component

**Technical Details:**
- Canvas-based particle system
- 100 particles (configurable)
- Mouse interaction (attraction/repulsion)
- Parallax scrolling effect
- 60fps performance target

**Visual Properties:**
```typescript
const particleConfig = {
  count: 100,
  color: '#00D9FF',
  opacity: 0.3,
  size: 2,
  speed: 0.5,
  connectionDistance: 150,
  lineOpacity: 0.2,
}
```

---

### 4. Loader & Skeleton Components

**Spinner Loader:**
```css
.spinner {
  border: 3px solid rgba(0, 217, 255, 0.1);
  border-top-color: #00D9FF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
```

**Skeleton Variants:**
- `text` - Single line
- `paragraph` - Multiple lines
- `card` - Full card skeleton
- `avatar` - Circular skeleton

---

## Layout Patterns

### 1. Responsive Grid System

**Breakpoints:**
```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet portrait
  lg: '1024px',  // Tablet landscape
  xl: '1280px',  // Desktop
  '2xl': '1536px', // Large desktop
}
```

**Grid Patterns:**
```css
/* Mobile: 1 column */
.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
```

---

### 2. Container System

**Container Widths:**
```typescript
const containers = {
  sm: '640px',   // Narrow content
  md: '768px',   // Standard content
  lg: '1024px',  // Wide content
  xl: '1280px',  // Full width content
  full: '100%',  // Edge-to-edge
}
```

**Padding:**
- Mobile: 16px (1rem)
- Tablet: 24px (1.5rem)
- Desktop: 32px (2rem)

---

## Animation System

### 1. Entrance Animations

**Fade In:**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}
```

**Fade In Up:**
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Scale In:**
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

---

### 2. Interaction Animations

**Hover Lift:**
```css
.hover-lift {
  transition: transform 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
}
```

**Glow Pulse:**
```css
@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(0, 217, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 217, 255, 0.8);
  }
}

.glow-pulse {
  animation: glow 2s ease-in-out infinite;
}
```

---

### 3. Loading Animations

**Shimmer Effect:**
```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.shimmer {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s linear infinite;
}
```

---

## Visual Effects

### 1. Glassmorphism

**Standard Glass Effect:**
```css
.glass {
  background: rgba(15, 22, 41, 0.3);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

**Frosted Glass:**
```css
.frosted-glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
```

---

### 2. Glow Effects

**Soft Glow:**
```css
.glow-soft {
  box-shadow: 0 0 10px rgba(0, 217, 255, 0.3);
}
```

**Medium Glow:**
```css
.glow-medium {
  box-shadow: 0 0 20px rgba(0, 217, 255, 0.4);
}
```

**Strong Glow:**
```css
.glow-strong {
  box-shadow: 0 0 30px rgba(0, 217, 255, 0.5);
}
```

**Inner Glow:**
```css
.inner-glow {
  box-shadow: inset 0 0 20px rgba(0, 217, 255, 0.2);
}
```

---

### 3. Scan Lines Effect

**Subtle Scan Lines:**
```css
.scan-lines {
  background-image: repeating-linear-gradient(
    0deg,
    rgba(0, 217, 255, 0.03) 0px,
    transparent 1px,
    transparent 2px,
    rgba(0, 217, 255, 0.03) 3px
  );
  pointer-events: none;
}
```

---

## Accessibility Features

### 1. Focus States

**Keyboard Navigation:**
```css
.focusable {
  outline: none;
}

.focusable:focus-visible {
  outline: 2px solid #00D9FF;
  outline-offset: 2px;
}
```

### 2. Color Contrast

**Minimum Contrast Ratios:**
- Body text: 4.5:1
- Large text (18px+): 3:1
- UI components: 3:1

**Testing Tools:**
- Chrome DevTools Lighthouse
- WebAIM Contrast Checker
- axe DevTools

### 3. Screen Reader Support

**ARIA Labels:**
```jsx
<button aria-label="Close modal">
  <X aria-hidden="true" />
</button>
```

**Semantic HTML:**
- Use `<nav>`, `<main>`, `<section>`
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text for all images

---

## Responsive Design

### Mobile-First Approach

**Base Styles (Mobile):**
```css
.hero-title {
  font-size: 2.25rem;  /* 36px */
  line-height: 2.5rem;
}
```

**Tablet:**
```css
@media (min-width: 768px) {
  .hero-title {
    font-size: 3rem;  /* 48px */
    line-height: 1;
  }
}
```

**Desktop:**
```css
@media (min-width: 1024px) {
  .hero-title {
    font-size: 4.5rem;  /* 72px */
    line-height: 1;
  }
}
```

---

## Performance Guidelines

### 1. Animation Performance
- Use `transform` and `opacity` for animations
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly
- Limit simultaneous animations

### 2. Image Optimization
- WebP format with PNG/JPG fallback
- Responsive images with srcset
- Lazy loading below fold
- Max 500KB per image

### 3. CSS Optimization
- Minimize custom CSS
- Use Tailwind utilities
- Purge unused styles
- Critical CSS inlining

---

## Design Tokens

### Shadows
```typescript
const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  glass: '0 8px 32px 0 rgba(0, 217, 255, 0.1)',
  'glow-sm': '0 0 10px rgba(0, 217, 255, 0.3)',
  'glow-md': '0 0 20px rgba(0, 217, 255, 0.4)',
  'glow-lg': '0 0 30px rgba(0, 217, 255, 0.5)',
}
```

### Border Radius
```typescript
const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  '4xl': '2rem',    // 32px
  full: '9999px',   // Circular
}
```

### Z-Index Scale
```typescript
const zIndex = {
  background: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
}
```

---

**Design System Version:** 1.0  
**Last Updated:** 2026-02-04  
**Figma File:** [Link to design file]
