# 📐 Coding Principles & Best Practices

## Core Development Principles

### 1. Code Quality Standards

#### TypeScript Strict Mode
```typescript
// tsconfig.json - Always enforce strict type checking
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

**Rules:**
- ❌ Never use `any` type
- ✅ Always define explicit types
- ✅ Use type inference where obvious
- ✅ Create interfaces for complex objects

#### Example: Good vs Bad
```typescript
// ❌ BAD
function processData(data: any) {
  return data.map((item: any) => item.value)
}

// ✅ GOOD
interface DataItem {
  id: string
  value: number
  label: string
}

function processData(data: DataItem[]): number[] {
  return data.map((item) => item.value)
}
```

---

### 2. Component Design Principles

#### Single Responsibility Principle
```typescript
// ❌ BAD - Component doing too much
function UserDashboard() {
  const [user, setUser] = useState()
  const [posts, setPosts] = useState()
  const [comments, setComments] = useState()
  
  // 200+ lines of logic
  
  return (/* massive JSX */)
}

// ✅ GOOD - Separated concerns
function UserDashboard() {
  return (
    <div>
      <UserProfile />
      <UserPosts />
      <UserComments />
    </div>
  )
}
```

#### Component Size Limits
- **Maximum 150 lines per file**
- **Extract sub-components when needed**
- **One component per file**

---

### 3. File Organization

#### File Naming Convention
```
PascalCase for components:     UserProfile.tsx
camelCase for utilities:       formatDate.ts
kebab-case for styles:         user-profile.css
UPPERCASE for constants:       API_CONSTANTS.ts
```

#### Import Order
```typescript
// 1. React imports
import { useState, useEffect } from 'react'

// 2. Third-party libraries
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'

// 3. Internal utilities
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/format'

// 4. Internal components
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// 5. Types
import type { User, Post } from '@/lib/types'

// 6. Styles (if any)
import './component.css'
```

---

### 4. Server vs Client Components

#### Default to Server Components
```typescript
// ✅ Server Component (default)
// app/projects/page.tsx
import { ProjectGrid } from '@/components/features/projects/project-grid'

export default async function ProjectsPage() {
  // Can fetch data directly
  const projects = await getProjects()
  
  return <ProjectGrid projects={projects} />
}
```

#### Use Client Components Only When Needed
```typescript
// ✅ Client Component (when necessary)
// components/ui/button.tsx
'use client'

import { useState } from 'react'

export function Button({ onClick, children }) {
  const [isLoading, setIsLoading] = useState(false)
  
  // Interactive behavior requires client component
  return (
    <button onClick={onClick} disabled={isLoading}>
      {children}
    </button>
  )
}
```

**When to use 'use client':**
- Interactive event handlers (onClick, onChange)
- React hooks (useState, useEffect, useContext)
- Browser APIs (localStorage, window)
- Third-party libraries requiring client-side

---

### 5. Error Handling

#### Component-Level Error Boundaries
```typescript
// components/ErrorBoundary.tsx
'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong</div>
    }

    return this.props.children
  }
}
```

#### Async Error Handling
```typescript
// ✅ GOOD - Comprehensive error handling
async function fetchUserData(userId: string) {
  try {
    const response = await fetch(`/api/users/${userId}`)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error
      console.error('Network error:', error)
      throw new Error('Unable to connect to server')
    }
    
    // Re-throw other errors
    throw error
  }
}
```

---

### 6. Performance Best Practices

#### Memoization
```typescript
// ✅ Memoize expensive calculations
import { useMemo } from 'react'

function DataVisualization({ data }: { data: DataPoint[] }) {
  const processedData = useMemo(() => {
    // Expensive calculation
    return data
      .filter(item => item.value > 0)
      .map(item => ({ ...item, normalized: item.value / 100 }))
      .sort((a, b) => b.value - a.value)
  }, [data])
  
  return <Chart data={processedData} />
}
```

#### Callback Memoization
```typescript
// ✅ Memoize callbacks to prevent re-renders
import { useCallback } from 'react'

function ParentComponent() {
  const handleClick = useCallback((id: string) => {
    console.log('Clicked:', id)
  }, [])
  
  return <ChildComponent onClick={handleClick} />
}
```

#### Lazy Loading
```typescript
// ✅ Lazy load heavy components
import { lazy, Suspense } from 'react'

const HeavyChart = lazy(() => import('./HeavyChart'))

function Dashboard() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <HeavyChart />
    </Suspense>
  )
}
```

---

### 7. Styling Best Practices

#### Tailwind CSS Conventions
```typescript
// ✅ GOOD - Organized, readable classes
<div className={cn(
  // Layout
  'flex flex-col gap-4',
  // Sizing
  'w-full max-w-md',
  // Spacing
  'p-6 mx-auto',
  // Visual
  'bg-background-card rounded-2xl',
  'border border-white/10',
  // Effects
  'shadow-glass backdrop-blur-md',
  // Interactions
  'hover:border-primary/30 transition-colors',
  // Responsive
  'md:flex-row md:gap-6'
)}>
  {/* Content */}
</div>
```

#### cn() Utility Usage
```typescript
// lib/utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Usage with conditional classes
<button
  className={cn(
    'px-4 py-2 rounded-lg',
    isActive && 'bg-primary text-black',
    isDisabled && 'opacity-50 cursor-not-allowed'
  )}
>
  Click me
</button>
```

---

### 8. State Management

#### Zustand Store Pattern
```typescript
// store/theme-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),
    }),
    {
      name: 'theme-storage',
    }
  )
)
```

#### TanStack Query Pattern
```typescript
// hooks/use-github-stats.ts
import { useQuery } from '@tanstack/react-query'
import { fetchGitHubData } from '@/lib/api/github'

export function useGitHubStats(username: string) {
  return useQuery({
    queryKey: ['github-stats', username],
    queryFn: () => fetchGitHubData(username),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 3,
    refetchOnWindowFocus: false,
  })
}
```

---

### 9. API Route Best Practices

#### Error Handling in API Routes
```typescript
// app/api/github/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const username = searchParams.get('username')
    
    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      )
    }
    
    const data = await fetchGitHubData(username)
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    })
  } catch (error) {
    console.error('GitHub API error:', error)
    
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    )
  }
}
```

---

### 10. Form Validation

#### Zod Schema Pattern
```typescript
// lib/utils/validation.ts
import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string()
    .email('Invalid email address'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be less than 500 characters'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
```

#### Form Component with Validation
```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  })
  
  const onSubmit = async (data: ContactFormData) => {
    try {
      await sendEmail(data)
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      
      {/* Other fields */}
    </form>
  )
}
```

---

### 11. Testing Standards

#### Unit Test Example
```typescript
// __tests__/utils/format.test.ts
import { describe, it, expect } from 'vitest'
import { formatDate, formatNumber } from '@/lib/utils/format'

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-15')
    expect(formatDate(date)).toBe('Jan 15, 2024')
  })
  
  it('should handle invalid dates', () => {
    expect(formatDate(null)).toBe('Invalid date')
  })
})

describe('formatNumber', () => {
  it('should format large numbers with K suffix', () => {
    expect(formatNumber(1500)).toBe('1.5K')
  })
  
  it('should format millions with M suffix', () => {
    expect(formatNumber(2500000)).toBe('2.5M')
  })
})
```

---

### 12. Documentation Standards

#### Component Documentation
```typescript
/**
 * @file GlassCard.tsx
 * @description Reusable glassmorphism card component with multiple variants
 * @section UI Components
 */

/**
 * GlassCard component props
 * @interface GlassCardProps
 */
interface GlassCardProps {
  /** Card content */
  children: React.ReactNode
  /** Visual variant */
  variant?: 'default' | 'elevated' | 'flat'
  /** Additional CSS classes */
  className?: string
  /** Hover effect enabled */
  hoverable?: boolean
}

/**
 * GlassCard - Glassmorphism card component
 * 
 * Features:
 * - Backdrop blur effect
 * - Multiple visual variants
 * - Hover animations
 * - Responsive padding
 * 
 * @example
 * ```tsx
 * <GlassCard variant="elevated" hoverable>
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </GlassCard>
 * ```
 */
export function GlassCard({
  children,
  variant = 'default',
  className,
  hoverable = true
}: GlassCardProps) {
  // Implementation
}
```

---

### 13. Git Commit Standards

#### Conventional Commits
```bash
# Format: <type>(<scope>): <subject>

# Types:
feat     # New feature
fix      # Bug fix
docs     # Documentation
style    # Formatting, no code change
refactor # Code restructuring
perf     # Performance improvement
test     # Adding tests
chore    # Maintenance

# Examples:
git commit -m "feat(github): add contribution heatmap"
git commit -m "fix(contact): resolve EmailJS timeout issue"
git commit -m "perf(images): implement lazy loading"
git commit -m "refactor(hooks): extract common logic to useAsync"
```

---

### 14. Environment Variables

#### Secure Configuration
```typescript
// ✅ GOOD - Type-safe env variables
// lib/config.ts
const config = {
  github: {
    token: process.env.GITHUB_TOKEN,
    username: process.env.GITHUB_USERNAME || 'khan09faiz',
  },
  email: {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  },
} as const

// Validate at startup
if (!config.github.token) {
  throw new Error('GITHUB_TOKEN is not set')
}

export default config
```

---

### 15. Accessibility Standards

#### Keyboard Navigation
```typescript
function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])
  
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {children}
    </div>
  )
}
```

#### ARIA Labels
```typescript
<button
  aria-label="Close navigation menu"
  aria-expanded={isOpen}
  onClick={toggleMenu}
>
  <X aria-hidden="true" />
</button>
```

---

## Code Review Checklist

### Before Submitting PR
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] All tests passing
- [ ] Components < 150 lines
- [ ] Proper error handling
- [ ] Loading states implemented
- [ ] Responsive design verified
- [ ] Accessibility tested
- [ ] No console.log in production code
- [ ] Environment variables documented

### Review Criteria
- [ ] Code follows style guide
- [ ] Type safety maintained
- [ ] Performance optimized
- [ ] Security considerations
- [ ] Documentation updated
- [ ] No code duplication
- [ ] Edge cases handled
- [ ] Clean commit history

---

**Version:** 1.0  
**Last Updated:** 2026-02-04  
**Maintained By:** Development Team
