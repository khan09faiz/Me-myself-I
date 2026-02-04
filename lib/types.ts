/**
 * Global TypeScript type definitions for the portfolio
 */

// ============================================================================
// Project Types
// ============================================================================

export interface Project {
  id: string
  title: string
  description: string // Short description for cards
  longDescription?: string // Detailed description for modal
  category: 'AI/ML' | 'Frontend' | 'Backend' | 'Full-Stack'
  featured: boolean
  technologies: string[]
  links?: {
    github?: string
    live?: string
  }
  date: string // ISO date format
  images?: string[]
  keyFeatures?: string[]
  impact?: Array<{
    label: string
    value: string
  }>
}

// ============================================================================
// Skills Types
// ============================================================================

export interface SkillCategory {
  category: string
  proficiency: number // 0-100
  color: string // Hex color
  skills: string[]
}

// ============================================================================
// Timeline Types
// ============================================================================

export interface TimelineItem {
  id: string
  type: 'work' | 'education' | 'achievement'
  title: string
  organization: string
  location: string
  startDate: string // YYYY-MM format
  endDate?: string // YYYY-MM format or undefined for current
  description?: string[]
  technologies?: string[]
  icon?: string
}

// ============================================================================
// GitHub API Types
// ============================================================================

export interface GitHubUser {
  name: string
  bio: string
  avatarUrl: string
  followers: { totalCount: number }
  following: { totalCount: number }
}

export interface ContributionDay {
  contributionCount: number
  date: string
  color: string
}

export interface ContributionWeek {
  contributionDays: ContributionDay[]
}

export interface ContributionCalendar {
  totalContributions: number
  weeks: ContributionWeek[]
}

export interface ContributionsCollection {
  totalCommitContributions: number
  totalPullRequestContributions: number
  totalIssueContributions: number
  totalRepositoryContributions: number
  contributionCalendar: ContributionCalendar
}

export interface Language {
  name: string
  color: string
}

export interface LanguageEdge {
  size: number
  node: Language
}

export interface Repository {
  name: string
  description: string | null
  url: string
  stargazerCount: number
  forkCount: number
  primaryLanguage: Language | null
  languages: {
    edges: LanguageEdge[]
  }
  isArchived: boolean
  isEmpty: boolean
  createdAt: string
  updatedAt: string
  homepageUrl?: string
}

export interface GitHubData {
  user: GitHubUser & {
    contributionsCollection: ContributionsCollection
    repositories: {
      totalCount: number
      nodes: Repository[]
    }
  }
  rateLimit: {
    remaining: number
    resetAt: string
    limit: number
  }
}

export interface LanguageStats {
  name: string
  color: string
  percentage: number
  bytes: number
}

// ============================================================================
// Experience Types
// ============================================================================

export interface Achievement {
  description: string
  metric?: string
}

export interface Experience {
  company: string
  role: string
  duration: string
  location: string
  type: 'Internship' | 'Full-time' | 'Contract'
  responsibilities: string[]
  achievements: Achievement[]
  techStack: string[]
  logo?: string
}

// ============================================================================
// Contact Form Types
// ============================================================================

export interface ContactFormData {
  name: string
  email: string
  message: string
}

// ============================================================================
// Error Types
// ============================================================================

export class RateLimitError extends Error {
  resetTime: string

  constructor(resetTime: string) {
    super('GitHub API rate limit exceeded')
    this.name = 'RateLimitError'
    this.resetTime = resetTime
  }
}

export class GitHubAPIError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'GitHubAPIError'
    this.statusCode = statusCode
  }
}

// ============================================================================
// UI Types
// ============================================================================

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}

export type GlassCardVariant = 'default' | 'elevated' | 'flat' | 'outlined'

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GlassCardVariant
  hoverable?: boolean
}
