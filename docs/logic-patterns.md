# 🧠 Logic & Implementation Patterns

## Data Fetching Patterns

### 1. GitHub API Integration

#### GraphQL Query Structure
```typescript
// lib/api/github.ts

const USER_STATS_QUERY = `
  query GetUserStats($username: String!) {
    user(login: $username) {
      name
      bio
      avatarUrl
      followers { totalCount }
      following { totalCount }
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
      repositories(
        first: 100
        privacy: PUBLIC
        isFork: false
        orderBy: {field: UPDATED_AT, direction: DESC}
      ) {
        totalCount
        nodes {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
          languages(first: 10) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`
```

#### Retry Logic Implementation
```typescript
async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      
      // Don't retry on client errors (4xx)
      if (error instanceof GitHubAPIError && error.statusCode < 500) {
        throw error
      }
      
      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries) {
        const delay = delayMs * Math.pow(2, attempt)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }
  
  throw lastError!
}
```

#### Rate Limit Handling
```typescript
interface RateLimitInfo {
  remaining: number
  resetAt: string
  limit: number
}

function checkRateLimit(rateLimitInfo: RateLimitInfo): void {
  if (rateLimitInfo.remaining < 100) {
    console.warn(
      `GitHub API rate limit low: ${rateLimitInfo.remaining}/${rateLimitInfo.limit}`
    )
  }
  
  if (rateLimitInfo.remaining === 0) {
    const resetTime = new Date(rateLimitInfo.resetAt)
    throw new RateLimitError(
      `Rate limit exceeded. Resets at ${resetTime.toLocaleString()}`
    )
  }
}
```

---

### 2. Data Transformation Logic

#### Language Statistics Calculation
```typescript
function calculateLanguageStats(
  repositories: Repository[]
): LanguageStats[] {
  // Aggregate bytes per language
  const languageMap = new Map<string, { bytes: number; color: string }>()
  
  repositories.forEach(repo => {
    if (!repo.languages?.edges) return
    
    repo.languages.edges.forEach(({ size, node }) => {
      const existing = languageMap.get(node.name) || {
        bytes: 0,
        color: node.color
      }
      
      languageMap.set(node.name, {
        bytes: existing.bytes + size,
        color: node.color
      })
    })
  })
  
  // Calculate percentages
  const totalBytes = Array.from(languageMap.values())
    .reduce((sum, { bytes }) => sum + bytes, 0)
  
  // Convert to array and sort
  return Array.from(languageMap.entries())
    .map(([name, { bytes, color }]) => ({
      name,
      color,
      bytes,
      percentage: (bytes / totalBytes) * 100
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 8) // Top 8 languages only
}
```

#### Contribution Heatmap Data Processing
```typescript
interface HeatmapCell {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
  color: string
}

function processContributionData(
  weeks: ContributionWeek[]
): HeatmapCell[] {
  return weeks.flatMap(week =>
    week.contributionDays.map(day => {
      const level = calculateContributionLevel(day.contributionCount)
      
      return {
        date: day.date,
        count: day.contributionCount,
        level,
        color: getColorForLevel(level)
      }
    })
  )
}

function calculateContributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (count <= 3) return 1
  if (count <= 6) return 2
  if (count <= 9) return 3
  return 4
}

function getColorForLevel(level: number): string {
  const colors = {
    0: '#0A0E27',      // No contributions
    1: '#00D9FF20',    // Low
    2: '#00D9FF50',    // Medium
    3: '#00D9FF80',    // High
    4: '#00D9FF',      // Very high
  }
  return colors[level as keyof typeof colors]
}
```

---

### 3. Caching Strategy

#### TanStack Query Configuration
```typescript
// lib/query-client.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,        // 1 hour
      gcTime: 1000 * 60 * 60 * 24,      // 24 hours
      retry: 3,
      retryDelay: (attemptIndex) => 
        Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
})
```

#### Cache Invalidation Logic
```typescript
function invalidateGitHubCache(username: string) {
  queryClient.invalidateQueries({
    queryKey: ['github-stats', username]
  })
}

// Invalidate after manual refresh
function handleManualRefresh() {
  invalidateGitHubCache('khan09faiz')
  queryClient.refetchQueries({
    queryKey: ['github-stats']
  })
}
```

---

## Animation Logic

### 1. Scroll-Based Animations

#### Intersection Observer Hook
```typescript
import { useEffect, useRef, useState } from 'react'

interface UseIntersectionOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useIntersection<T extends HTMLElement>(
  options: UseIntersectionOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options
  
  const ref = useRef<T>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting
        setIsIntersecting(isVisible)
        
        if (isVisible && triggerOnce) {
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )
    
    observer.observe(element)
    
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])
  
  return { ref, isIntersecting }
}
```

#### Scroll Progress Tracker
```typescript
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      
      const scrollable = documentHeight - windowHeight
      const scrolled = (scrollTop / scrollable) * 100
      
      setProgress(Math.min(Math.max(scrolled, 0), 100))
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return progress
}
```

---

### 2. Particle System Logic

#### Canvas Animation Loop
```typescript
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

class ParticleSystem {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private particles: Particle[] = []
  private animationId: number | null = null
  
  constructor(canvas: HTMLCanvasElement, particleCount: number = 100) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.initParticles(particleCount)
  }
  
  private initParticles(count: number) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      })
    }
  }
  
  private updateParticles() {
    this.particles.forEach(particle => {
      particle.x += particle.vx
      particle.y += particle.vy
      
      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width
      if (particle.x > this.canvas.width) particle.x = 0
      if (particle.y < 0) particle.y = this.canvas.height
      if (particle.y > this.canvas.height) particle.y = 0
    })
  }
  
  private drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
    // Draw particles
    this.particles.forEach(particle => {
      this.ctx.beginPath()
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      this.ctx.fillStyle = 'rgba(0, 217, 255, 0.3)'
      this.ctx.fill()
    })
    
    // Draw connections
    this.drawConnections()
  }
  
  private drawConnections() {
    const maxDistance = 150
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x
        const dy = this.particles[i].y - this.particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.2
          
          this.ctx.beginPath()
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y)
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y)
          this.ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`
          this.ctx.lineWidth = 1
          this.ctx.stroke()
        }
      }
    }
  }
  
  public animate() {
    this.updateParticles()
    this.drawParticles()
    this.animationId = requestAnimationFrame(() => this.animate())
  }
  
  public stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
  }
}
```

---

## Form Handling Logic

### 1. Contact Form Submission

#### Form State Management
```typescript
interface FormState {
  status: 'idle' | 'submitting' | 'success' | 'error'
  message: string
}

function useContactForm() {
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: ''
  })
  
  const submitForm = async (data: ContactFormData) => {
    setFormState({ status: 'submitting', message: '' })
    
    try {
      await sendEmail(data)
      
      setFormState({
        status: 'success',
        message: 'Message sent successfully!'
      })
      
      // Reset after 3 seconds
      setTimeout(() => {
        setFormState({ status: 'idle', message: '' })
      }, 3000)
    } catch (error) {
      setFormState({
        status: 'error',
        message: 'Failed to send message. Please try again.'
      })
    }
  }
  
  return { formState, submitForm }
}
```

#### EmailJS Integration
```typescript
import emailjs from '@emailjs/browser'

interface EmailData {
  name: string
  email: string
  message: string
}

async function sendEmail(data: EmailData): Promise<void> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  
  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        to_name: 'Mohammad Faiz Khan'
      },
      publicKey
    )
    
    if (response.status !== 200) {
      throw new Error('Email sending failed')
    }
  } catch (error) {
    console.error('EmailJS error:', error)
    throw new Error('Failed to send email')
  }
}
```

---

## Filtering & Search Logic

### 1. Project Filtering

#### Multi-Criteria Filter
```typescript
interface FilterState {
  search: string
  technologies: string[]
  categories: string[]
}

function filterProjects(
  projects: Project[],
  filters: FilterState
): Project[] {
  return projects.filter(project => {
    // Search filter
    const matchesSearch = filters.search === '' ||
      project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      project.description.toLowerCase().includes(filters.search.toLowerCase())
    
    // Technology filter
    const matchesTech = filters.technologies.length === 0 ||
      filters.technologies.some(tech =>
        project.technologies.includes(tech)
      )
    
    // Category filter
    const matchesCategory = filters.categories.length === 0 ||
      filters.categories.includes(project.category)
    
    return matchesSearch && matchesTech && matchesCategory
  })
}
```

#### Debounced Search
```typescript
import { useEffect, useState } from 'react'

function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => clearTimeout(timer)
  }, [value, delay])
  
  return debouncedValue
}

// Usage in search component
function ProjectSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 300)
  
  const filteredProjects = filterProjects(projects, {
    search: debouncedSearch,
    technologies: [],
    categories: []
  })
  
  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search projects..."
    />
  )
}
```

---

## Utility Functions

### 1. Date Formatting
```typescript
export function formatDate(date: Date | string | null): string {
  if (!date) return 'Invalid date'
  
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (isNaN(dateObj.getTime())) return 'Invalid date'
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(dateObj)
}

export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return formatDate(dateObj)
}
```

### 2. Number Formatting
```typescript
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return value.toFixed(decimals) + '%'
}
```

---

## Error Handling Patterns

### 1. Global Error Boundary
```typescript
function handleGlobalError(error: Error, errorInfo: React.ErrorInfo) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Global error:', error)
    console.error('Error info:', errorInfo)
  }
  
  // Send to error tracking service in production
  if (process.env.NODE_ENV === 'production') {
    // Sentry.captureException(error, { extra: errorInfo })
  }
}
```

### 2. API Error Classification
```typescript
function classifyError(error: unknown): {
  type: 'network' | 'server' | 'client' | 'unknown'
  message: string
  recoverable: boolean
} {
  if (error instanceof TypeError) {
    return {
      type: 'network',
      message: 'Network connection failed',
      recoverable: true
    }
  }
  
  if (error instanceof GitHubAPIError) {
    if (error.statusCode >= 500) {
      return {
        type: 'server',
        message: 'Server error, please try again',
        recoverable: true
      }
    }
    
    return {
      type: 'client',
      message: error.message,
      recoverable: false
    }
  }
  
  return {
    type: 'unknown',
    message: 'An unexpected error occurred',
    recoverable: false
  }
}
```

---

**Version:** 1.0  
**Last Updated:** 2026-02-04  
**Maintained By:** Development Team
