/**
 * FilterButton Component
 * Category filter button with active state
 */

'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FilterButtonProps {
  label: string
  count?: number
  isActive: boolean
  onClick: () => void
}

export function FilterButton({
  label,
  count,
  isActive,
  onClick,
}: FilterButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300',
        isActive
          ? 'bg-primary text-background shadow-glow-sm'
          : 'bg-card/30 text-muted-foreground hover:bg-card/50 hover:text-foreground border border-primary/10'
      )}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={cn(
            'ml-2 text-xs px-1.5 py-0.5 rounded-full',
            isActive
              ? 'bg-background/20 text-background'
              : 'bg-primary/10 text-primary'
          )}
        >
          {count}
        </span>
      )}
    </motion.button>
  )
}

// FilterButtonGroup for layout
interface FilterButtonGroupProps {
  children: React.ReactNode
  className?: string
}

export function FilterButtonGroup({
  children,
  className,
}: FilterButtonGroupProps) {
  return (
    <div className={cn('flex flex-wrap gap-3 justify-center', className)}>
      {children}
    </div>
  )
}
