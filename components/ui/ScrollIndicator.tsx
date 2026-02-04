/**
 * ScrollIndicator Component
 * Shows scroll progress at the top of the page
 */

'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Smooth animation for the progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-primary/20 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary shadow-glow-md"
        style={{ scaleX, transformOrigin: '0%' }}
      />
    </motion.div>
  )
}
