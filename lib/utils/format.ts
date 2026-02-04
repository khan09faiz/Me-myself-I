/**
 * Format a date to a readable string
 * @param date - Date object or ISO string
 * @returns Formatted date string (e.g., "Jan 15, 2024")
 */
export function formatDate(date: Date | string | null): string {
  if (!date) return 'Invalid date'

  const dateObj = typeof date === 'string' ? new Date(date) : date

  if (isNaN(dateObj.getTime())) return 'Invalid date'

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(dateObj)
}

/**
 * Format a number with K/M suffix
 * @param num - Number to format
 * @returns Formatted string (e.g., "1.5K", "2.3M")
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

/**
 * Format a percentage
 * @param value - Percentage value (0-100)
 * @param decimals - Number of decimal places
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return value.toFixed(decimals) + '%'
}

/**
 * Format relative time (e.g., "2h ago", "3d ago")
 * @param date - Date to compare
 * @returns Relative time string
 */
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
