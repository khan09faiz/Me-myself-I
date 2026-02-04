# Implementation Plan: Portfolio Development

## Overview
Based on the analysis of the reference repository (Dhruv-413/Dhruv), we'll build a JAMstack portfolio using:
- **JSON files** for static data storage
- **GitHub API** for real-time statistics
- **EmailJS** for contact form submissions
- **Next.js 15** with static site generation
- **No backend, database, or CMS required**

---

## Phase 1: Data Structure Setup ✅ PRIORITY

### 1.1 Create Data Files
**Location**: `src/data/`

#### projects.json
```json
{
  "id": "project-slug",
  "title": "Project Name",
  "description": "Short description for cards (2-3 sentences)",
  "longDescription": "Detailed description for modal (multiple paragraphs)",
  "category": "AI/ML | Frontend | Backend | Full-Stack",
  "featured": true,
  "technologies": ["Python", "TensorFlow", "FastAPI", "React", "Next.js"],
  "links": {
    "github": "https://github.com/...",
    "live": "https://..."
  },
  "date": "2025-01-15",
  "keyFeatures": [
    "Feature 1 description",
    "Feature 2 description"
  ],
  "impact": [
    { "label": "Accuracy", "value": "95%" },
    { "label": "Users", "value": "10K+" }
  ]
}
```

#### skills.json
```json
{
  "category": "AI/ML Development",
  "proficiency": 90,
  "color": "#3b82f6",
  "skills": [
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Computer Vision",
    "NLP"
  ]
}
```

#### timeline.json
```json
{
  "id": "timeline-item-1",
  "type": "work | education | achievement",
  "title": "Job Title / Degree / Achievement",
  "organization": "Company / University",
  "location": "City, Country",
  "startDate": "2024-01",
  "endDate": "2024-12",
  "description": [
    "Bullet point 1",
    "Bullet point 2"
  ],
  "technologies": ["Python", "TensorFlow", "Docker"]
}
```

### 1.2 Update TypeScript Types
**File**: `lib/types.ts`

Add types matching the JSON structure:
- `Project` interface
- `SkillCategory` interface  
- `TimelineItem` interface

### 1.3 Update Constants
**File**: `lib/constants.ts`

Replace with your personal information:
```typescript
export const SITE_CONFIG = {
  name: "Mohammad Faiz Khan",
  title: "AI/ML Engineer & Full Stack Developer",
  description: "AI/ML Engineer specializing in computer vision, NLP, and scalable solutions.",
  siteUrl: "https://your-domain.com",
  ogImage: "/og-home.jpg",
  contact: {
    email: "khan09faiz@gmail.com",
  },
  links: {
    github: "https://github.com/khan09faiz",
    linkedin: "https://linkedin.com/in/khan09faiz",
  },
  // ... more config
};
```

---

## Phase 2: UI Components Library

### 2.1 Core UI Components
**Location**: `components/ui/`

#### Button Component
- Variants: primary, secondary, ghost, outline
- Sizes: sm, md, lg
- Loading state
- Disabled state
- Icon support

#### Card Component
- Base card with padding
- Variants: default, elevated, flat
- Glassmorphism effect

#### TechIcon Component ⭐ CRITICAL
**Purpose**: Map technology names to icons
```typescript
// Maps "React" → React icon, "Python" → Python icon
<TechIcon name="React" className="h-5 w-5" />
```

Install: `react-icons` package for comprehensive icon library
- `react-icons/si` - Simple Icons (500+ tech brands)
- `react-icons/tb` - Tabler Icons (general icons)
- `react-icons/di` - Devicons (dev tools)

### 2.2 Layout Components
**Location**: `components/ui/`

- **LoadingSkeleton**: Loading states for all page variants
- **SectionHeader**: Terminal-style section headers
- **StatCard**: Animated statistic cards
- **StatCardGrid**: Grid layout for stats
- **FilterButton**: Category filter buttons
- **FilterButtonGroup**: Group of filters
- **ScrollIndicator**: Scroll progress bar

### 2.3 Shared Components
**Location**: `components/shared/`

- **Header**: Navigation with mobile menu
- **Footer**: Social links and copyright
- **Providers**: Wrap app with TanStack Query, Zustand

---

## Phase 3: Feature Components

### 3.1 Hero Section (Homepage)
**Component**: `components/features/hero/Hero.tsx`

Features:
- Animated code snippet with typing effect
- Rotating role titles ("AI/ML Engineer", "Full Stack Developer")
- Stats dashboard (projects, contributions, etc.)
- Highlights section
- Core values cards
- CTA buttons (View Projects, Contact)

### 3.2 Projects Section
**Components**:
- `components/features/projects/ProjectsSection.tsx`
- `components/features/projects/ProjectCard.tsx`
- `components/features/projects/ProjectModal.tsx`

Features:
- Load projects from `data/projects.json`
- Filter by category (All, AI/ML, Frontend, Backend, Full-Stack)
- Featured projects highlighted
- Project cards with:
  - Category badge
  - Title & short description
  - Tech stack icons (using TechIcon)
  - GitHub/Live links
  - Featured star indicator
- Click to open modal with:
  - Full description
  - Key features list
  - Impact metrics
  - Complete tech stack
  - Navigation (previous/next project)

### 3.3 Skills Section
**Component**: `components/features/skills/SkillsSection.tsx`

Features:
- Load skills from `data/skills.json`
- Group skills by category
- Display proficiency percentage
- Skill cards with:
  - Category name
  - Color-coded
  - List of technologies with icons
  - Hover effects
- Calculate and display total technologies count

### 3.4 Timeline Section (Career)
**Component**: `components/features/timeline/TimelineSection.tsx`

Features:
- Load timeline from `data/timeline.json`
- Vertical timeline with alternating sides
- Timeline items with:
  - Icon based on type (work/education/achievement)
  - Title & organization
  - Location & dates
  - Description bullets
  - Technologies used (with icons)
- Connecting lines between items

### 3.5 GitHub Section
**Component**: `components/features/github/GitHubSection.tsx`

Features:
- Real-time stats from GitHub API:
  - Total repositories
  - Total stars
  - Total commits
  - Total contributions
- Contribution calendar heatmap (365 days)
- Language breakdown chart (pie/bar chart)
- Top repositories showcase
- Use TanStack Query for data fetching

### 3.6 Contact Section
**Component**: `components/features/contact/ContactSection.tsx`

Features:
- Contact form with fields:
  - Name (validation: 2-50 chars, letters only)
  - Email (validation: valid email format)
  - Message (validation: 10-500 chars)
- React Hook Form + Zod validation
- EmailJS integration (no backend needed)
- Toast notifications for success/error
- Social links display

---

## Phase 4: GitHub API Integration

### 4.1 GitHub API Client
**File**: `lib/api/github.ts`

```typescript
export async function fetchGitHubStats(username: string) {
  const query = `
    query GitHubStats($username: String!) {
      user(login: $username) {
        repositories(first: 100) {
          totalCount
          nodes {
            name
            description
            stargazerCount
            primaryLanguage { name color }
          }
        }
        contributionsCollection {
          totalCommitContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;
  
  // Fetch with retry logic
  // Return typed data
}
```

### 4.2 React Hook
**File**: `hooks/useGitHub.ts`

```typescript
export function useGitHubStats(username: string) {
  return useQuery({
    queryKey: ['github-stats', username],
    queryFn: () => fetchGitHubStats(username),
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 3,
  });
}
```

### 4.3 Contribution Heatmap
**Component**: `components/features/github/ContributionHeatmap.tsx`

- Display 365 days of contributions
- Color intensity based on contribution count
- Tooltip on hover (date, count)
- Weekly grouping

### 4.4 Language Chart
**Component**: `components/features/github/LanguageChart.tsx`

- Calculate language percentages from repositories
- Display as pie chart or bar chart (using Recharts)
- Show language colors (from GitHub)

---

## Phase 5: Contact Form with EmailJS

### 5.1 Setup EmailJS Account
1. Sign up at https://www.emailjs.com/
2. Create email service (Gmail, Outlook, etc.)
3. Create email template with placeholders:
   - `{{from_name}}` - Sender name
   - `{{from_email}}` - Sender email
   - `{{message}}` - Message content
4. Get credentials:
   - Service ID
   - Template ID
   - Public Key

### 5.2 Environment Variables
**File**: `.env.local`

```env
# GitHub API
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token
NEXT_PUBLIC_GITHUB_USERNAME=khan09faiz

# EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 5.3 Contact Form Component
**Features**:
- Form validation with Zod schema (already created in `lib/utils/validation.ts`)
- React Hook Form for form state
- EmailJS send on submit
- Loading state during submission
- Success/error toast notifications
- Form reset after success

### 5.4 Install Additional Dependencies
```bash
npm install @emailjs/browser react-hot-toast recharts
```

---

## Phase 6: SEO & Metadata

### 6.1 JSON-LD Structured Data
**File**: `lib/schema.ts` (already exists, needs expansion)

Add schema generators for:
- Person Schema (homepage)
- Website Schema
- Portfolio/ItemList Schema (projects)
- SoftwareApplication Schema (individual projects)
- Skills Schema
- Organization Schema (work experience)
- EducationalOrganization Schema (education)
- ContactPage Schema
- Breadcrumb Schema

### 6.2 Page Metadata
Update metadata for all pages:
- **app/page.tsx**: Homepage metadata with full SEO
- **app/projects/page.tsx**: Projects page metadata
- **app/skills/page.tsx**: Skills page metadata
- **app/career/page.tsx**: Career page metadata
- **app/github/page.tsx**: GitHub page metadata
- **app/contact/page.tsx**: Contact page metadata

Include:
- Title (with site name)
- Description (unique for each page)
- Keywords (relevant to page content)
- Open Graph tags
- Twitter Card tags
- Canonical URL

### 6.3 Sitemap Generation
**File**: `app/sitemap.ts` (create)

Generate sitemap including:
- Static pages (/, /projects, /skills, /career, /github, /contact)
- Dynamic project pages (optional: /projects/[id])
- Priority and change frequency for each

### 6.4 Robots.txt
**File**: `app/robots.ts` (create)

Configure crawling rules:
- Allow all bots
- Sitemap location
- Disallow admin routes (if any)

---

## Phase 7: Performance Optimization

### 7.1 Dynamic Imports
Use `next/dynamic` for heavy components:
```typescript
const ProjectsSection = dynamic(
  () => import('@/components/features/projects/ProjectsSection'),
  {
    loading: () => <LoadingSkeleton variant="projects" />,
    ssr: true,
  }
);
```

Apply to:
- Hero component
- ProjectsSection
- SkillsSection
- TimelineSection
- GitHubSection (with ssr: false for client-side data)
- ContactSection

### 7.2 Suspense Boundaries
Wrap dynamic components with Suspense:
```tsx
<Suspense fallback={<LoadingSkeleton variant="page" />}>
  <Hero />
</Suspense>
```

### 7.3 Image Optimization
- Use Next.js Image component for all images
- Add images to `public/` folder
- Configure remote patterns in `next.config.ts` (already done for GitHub avatars)
- Use AVIF/WebP formats

### 7.4 Code Splitting
- Automatic by Next.js App Router
- Each route is a separate chunk
- Shared components bundled efficiently

---

## Phase 8: Deployment

### 8.1 Vercel Deployment (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_GITHUB_TOKEN`
   - `NEXT_PUBLIC_GITHUB_USERNAME`
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
4. Deploy automatically on push

### 8.2 Alternative Hosting
- **Netlify**: Similar to Vercel, drag-and-drop or Git integration
- **GitHub Pages**: Static hosting (requires `next export`)
- **Cloudflare Pages**: Fast global CDN

---

## Implementation Order (Recommended)

### Week 1: Foundation
1. ✅ Create data files (projects.json, skills.json, timeline.json)
2. ✅ Update constants with personal info
3. ✅ Install additional dependencies (react-icons, @emailjs/browser, react-hot-toast, recharts)
4. ✅ Create TechIcon component
5. ✅ Create core UI components (Button, Card, LoadingSkeleton)

### Week 2: Features Part 1
6. Build Hero section
7. Build Projects section (ProjectCard, ProjectModal, filtering)
8. Build Skills section
9. Build Timeline section

### Week 3: Features Part 2  
10. Setup GitHub API integration
11. Build GitHub section (stats, heatmap, language chart)
12. Setup EmailJS account and create template
13. Build Contact form with EmailJS integration

### Week 4: Polish & Deploy
14. Add JSON-LD structured data to all pages
15. Generate sitemap and robots.txt
16. Optimize images and lazy loading
17. Test on all devices and browsers
18. Deploy to Vercel
19. Test production build
20. Setup custom domain (optional)

---

## Testing Checklist

### Functionality
- [ ] All pages load without errors
- [ ] Projects filter correctly by category
- [ ] Project modal opens/closes properly
- [ ] Project modal navigation works (next/previous)
- [ ] Skills display with correct proficiency
- [ ] Timeline renders in correct order
- [ ] GitHub stats fetch successfully
- [ ] GitHub heatmap displays 365 days
- [ ] Contact form validates inputs
- [ ] Contact form sends email via EmailJS
- [ ] Toast notifications appear

### Responsiveness
- [ ] Mobile (<640px): Single column, readable text
- [ ] Tablet (640-1024px): 2-column grids, adjusted spacing
- [ ] Desktop (>1024px): Full layout, optimal spacing

### Performance
- [ ] Lighthouse Score > 95
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] No console errors
- [ ] No TypeScript errors

### SEO
- [ ] All pages have unique titles
- [ ] All pages have meta descriptions
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] JSON-LD structured data validates (Google Rich Results Test)
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Robots.txt accessible at /robots.txt

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader friendly (semantic HTML)
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Alt text for all images
- [ ] ARIA labels where needed

---

## Key Differences from Your Initial Plan

### ❌ NOT Implementing:
- Database (PostgreSQL, MongoDB, etc.)
- Backend API routes
- Admin panel
- CMS (Contentful, Sanity, etc.)
- User authentication
- Blog system with dynamic posts (can add later with JSON)

### ✅ IMPLEMENTING Instead:
- JSON file-based data storage
- Static site generation
- Client-side API calls (GitHub only)
- EmailJS for contact form (no backend)
- Version-controlled content (edit files, push to Git)

This approach is:
- **Simpler** to maintain (no backend)
- **Faster** (static HTML)
- **Cheaper** (free hosting)
- **Secure** (no database to hack)
- **SEO-friendly** (static pages)

Perfect for a **portfolio website**!

---

## Next Steps

1. **Review the analysis document** (`docs/reference-analysis.md`)
2. **Create data files** with your actual content
3. **Start with UI components** (TechIcon is critical!)
4. **Build features incrementally** (one section at a time)
5. **Test thoroughly** before deploying
6. **Deploy to Vercel** for free hosting

Let's get started! 🚀
