import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 * Automatically resolves conflicting classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
