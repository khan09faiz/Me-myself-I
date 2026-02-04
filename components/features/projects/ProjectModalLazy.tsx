'use client'

/**
 * Lazy-loaded ProjectModal
 * Only loads when a project is clicked to reduce initial bundle size
 */

import dynamic from 'next/dynamic'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'

export const ProjectModalLazy = dynamic(
  () => import('./ProjectModal').then((mod) => ({ default: mod.ProjectModal })),
  {
    loading: () => <LoadingSkeleton variant="projects" />,
    ssr: false,
  }
)
