# 🏗️ Portfolio Architecture Documentation

## System Architecture Overview

### Technology Stack

#### Frontend Framework
- **Next.js 15** (App Router)
- **React 19** (Server & Client Components)
- **TypeScript** (Strict mode)

#### Styling & Animation
- **Tailwind CSS** (Utility-first styling)
- **Framer Motion** (Animations & transitions)
- **Custom CSS** (Glassmorphism effects)

#### State Management
- **Zustand** (Theme & UI state)
- **TanStack Query** (Server state & caching)

#### Data Fetching
- **GitHub GraphQL API** (Stats & repos)
- **Server Components** (Default SSR)
- **Client Components** (Interactive UI only)

#### Build & Deployment
- **Vercel** (Hosting & CI/CD)
- **pnpm/npm** (Package management)

---

## Project Structure

```
portfolio/
├── public/              # Static assets
│   ├── images/         # Optimized images (WebP)
│   └── icons/          # Favicons & PWA icons
│
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── (marketing)/
│   │   │   ├── page.tsx           # Main landing page
│   │   │   └── layout.tsx         # Marketing layout
│   │   ├── api/                   # API routes
│   │   │   ├── github/route.ts    # GitHub proxy
│   │   │   └── contact/route.ts   # Contact handler
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   ├── globals.css            # Global styles
│   │   ├── error.tsx              # Error boundary
│   │   └── not-found.tsx          # 404 page
│   │
│   ├── components/     # React components
│   │   ├── ui/                    # Reusable primitives
│   │   │   ├── glass-card.tsx
│   │   │   ├── button.tsx
│   │   │   ├── animated-background.tsx
│   │   │   ├── loader.tsx
│   │   │   └── skeleton.tsx
│   │   │
│   │   ├── features/              # Feature components
│   │   │   ├── github/           # GitHub integration
│   │   │   ├── projects/         # Projects showcase
│   │   │   ├── timeline/         # Career timeline
│   │   │   ├── hero/            # Hero section
│   │   │   ├── about/           # About section
│   │   │   └── contact/         # Contact form
│   │   │
│   │   ├── layout/               # Layout components
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   └── page-transition.tsx
│   │   │
│   │   └── seo/                 # SEO components
│   │       ├── structured-data.tsx
│   │       └── meta-tags.tsx
│   │
│   ├── hooks/          # Custom React hooks
│   │   ├── use-github-stats.ts
│   │   ├── use-intersection.ts
│   │   ├── use-mounted.ts
│   │   └── use-theme.ts
│   │
│   ├── lib/            # Utility functions
│   │   ├── api/
│   │   │   ├── github.ts          # GitHub API client
│   │   │   ├── email.ts           # EmailJS integration
│   │   │   └── retry.ts           # Retry logic
│   │   ├── utils/
│   │   │   ├── cn.ts              # className merger
│   │   │   ├── format.ts          # Formatters
│   │   │   └── validation.ts      # Zod schemas
│   │   ├── constants.ts           # App constants
│   │   ├── types.ts               # TypeScript types
│   │   └── query-client.ts        # TanStack config
│   │
│   ├── store/          # State management
│   │   ├── theme-store.ts         # Zustand theme
│   │   └── ui-store.ts            # Zustand UI state
│   │
│   └── styles/         # Custom styles
│       ├── animations.css
│       └── utilities.css
│
├── .env.local          # Environment variables
├── next.config.mjs     # Next.js config
├── tailwind.config.ts  # Tailwind config
├── tsconfig.json       # TypeScript config
└── package.json        # Dependencies
```

---

## Architecture Patterns

### 1. Server-First Architecture
- **Default to Server Components** for better performance
- **Client Components** only when needed (interactivity, hooks)
- **API Routes** for GitHub data proxying and form handling

### 2. Component Architecture
```
Page (Server Component)
├── Layout Components (Navbar, Footer)
├── Feature Sections (Server Components)
│   ├── UI Primitives (Client when interactive)
│   └── Content (Static or Dynamic)
└── SEO Components (Structured Data, Meta)
```

### 3. Data Flow

```
GitHub API
    ↓
API Route (/api/github/route.ts)
    ↓
TanStack Query Hook (use-github-stats.ts)
    ↓
Client Component (stats-dashboard.tsx)
    ↓
UI Primitives (glass-card.tsx, charts)
```

### 4. State Management Strategy

**Server State (TanStack Query):**
- GitHub statistics
- Repository data
- Contribution data
- Caching & automatic refetching

**Client State (Zustand):**
- Theme preference (light/dark)
- Modal open/close states
- UI interactions
- Filter states

**URL State:**
- Route parameters
- Query strings
- Hash navigation

---

## Performance Optimization

### 1. Code Splitting
- Automatic route-based splitting (Next.js)
- Dynamic imports for heavy components
- Lazy loading for below-fold content

### 2. Image Optimization
- Next.js `<Image>` component
- WebP format with fallbacks
- Responsive images with srcset
- Lazy loading by default

### 3. Caching Strategy
- **Static Generation:** Non-personalized pages
- **ISR (Incremental Static Regeneration):** GitHub data (revalidate: 3600s)
- **Client-side caching:** TanStack Query (1 hour stale time)
- **CDN caching:** Vercel Edge Network

### 4. Bundle Optimization
- Tree shaking (unused code removal)
- Minification (production builds)
- Compression (gzip/brotli)
- Font optimization (variable fonts)

---

## Security Architecture

### 1. Environment Variables
- **Server-side only:** `GITHUB_TOKEN`
- **Public (NEXT_PUBLIC_*):** EmailJS keys
- **Never expose:** Sensitive tokens in client code

### 2. API Rate Limiting
- Retry logic with exponential backoff
- Rate limit error handling
- Graceful degradation

### 3. Input Validation
- Zod schemas for form data
- Sanitization before API calls
- CORS configuration

### 4. Content Security
- No inline scripts (CSP)
- Secure headers (Next.js config)
- XSS prevention

---

## Scalability Considerations

### 1. Component Modularity
- Max 150 lines per component
- Single Responsibility Principle
- Reusable primitives in `/ui/`

### 2. Data Fetching
- Parallel data fetching where possible
- Error boundaries for resilience
- Loading states for UX

### 3. Type Safety
- Strict TypeScript mode
- No `any` types
- Runtime validation with Zod

### 4. Testing Strategy
- Unit tests for utilities
- Integration tests for critical flows
- E2E tests for user journeys

---

## Deployment Architecture

### Vercel Platform
```
GitHub Repository
    ↓ (Push to main)
Automatic Build Trigger
    ↓
Next.js Build Process
    ↓
Static Generation + Serverless Functions
    ↓
Vercel Edge Network (CDN)
    ↓
Global Distribution (300+ cities)
```

### Environment Configuration
- **Development:** `.env.local` (local only)
- **Production:** Vercel Environment Variables
- **Preview:** Branch-specific builds

---

## Monitoring & Analytics

### Performance Monitoring
- Vercel Analytics (Web Vitals)
- Core Web Vitals tracking
- Bundle size monitoring

### Error Tracking
- Error boundaries
- Console error logging
- Sentry integration (optional)

### User Analytics
- Google Analytics (optional)
- Conversion tracking
- User flow analysis

---

## API Integration Architecture

### GitHub GraphQL API
```typescript
// Flow:
1. Server-side API route (/api/github)
2. Fetch with authentication token
3. GraphQL query execution
4. Response caching (1 hour)
5. Error handling & retry logic
6. Return formatted data to client
```

### EmailJS Integration
```typescript
// Flow:
1. Client-side form submission
2. Validation (Zod schema)
3. EmailJS API call (public keys)
4. Success/error feedback
5. Rate limiting (client-side)
```

---

## Browser Compatibility

### Supported Browsers
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS 12+, Android 8+)

### Progressive Enhancement
- Core functionality without JS
- CSS fallbacks for modern features
- Polyfills for older browsers

---

## Development Workflow

### Local Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript validation
```

### Git Workflow
1. Feature branch from `main`
2. Development + testing
3. Commit with conventional format
4. Pull request + review
5. Merge to `main` (triggers deployment)

---

## Future Architecture Improvements

### Potential Enhancements
- [ ] Redis caching for GitHub data
- [ ] WebSocket for real-time updates
- [ ] Service Worker for offline support
- [ ] GraphQL client for better type safety
- [ ] Micro-frontend architecture for scalability
- [ ] A/B testing infrastructure
- [ ] Advanced analytics dashboard

---

**Architecture Version:** 1.0  
**Last Updated:** 2026-02-04  
**Maintained By:** Development Team
