/**
 * Header Component
 * Responsive navigation header with mobile menu and scroll effects
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/constants'
import { Button } from '@/components/ui/Button'

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = NAV_ITEMS.map((item) => item.href.replace(/^\/?#?/, ''))
      let current = ''

      for (const section of sections) {
        if (section === '' || section === 'github') continue
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section
            break
          }
        }
      }

      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false)
    
    // Handle navigation to GitHub page
    if (href === '/github' || href === '#github' || href === 'github') {
      if (pathname !== '/github') {
        window.location.href = '/github'
      }
      return
    }

    // If on GitHub page and clicking home sections, go to home first
    if (pathname === '/github') {
      if (href === '/' || href === '') {
        window.location.href = '/'
      } else {
        window.location.href = `/${href}`
      }
      return
    }
    
    // Handle home page navigation
    if (href === '/' || href === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // Handle both /section and /#section formats
    const sectionId = href.replace(/^\/?#?/, '')
    
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-lg border-b border-primary/10 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('/')
              }}
              className="flex items-center space-x-2 group"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary/50 group-hover:shadow-glow-sm transition-all">
                  <Image
                    src="/profile.jpeg"
                    alt={SITE_CONFIG.name}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full scale-110"
                    priority
                  />
                </div>
              </div>
              <span className="font-bold text-lg text-foreground hidden sm:block">
                Faiz
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {NAV_ITEMS.map((item) => {
                const sectionId = item.href.replace(/^\/?#?/, '')
                const isActive = 
                  (pathname === '/github' && item.href === '/github') ||
                  (pathname === '/' && (activeSection === sectionId || (item.href === '/' && !activeSection)))

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.href)
                    }}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-lg -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-card/50 border border-primary/10 hover:border-primary/30 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-16 right-0 bottom-0 w-64 bg-card/95 backdrop-blur-lg border-l border-primary/20 z-40 md:hidden overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                {/* Navigation Links */}
                <nav className="space-y-2">
                  {NAV_ITEMS.map((item, index) => {
                    const sectionId = item.href.replace(/^\/?#?/, '')
                    const isActive = 
                      (pathname === '/github' && item.href === '/github') ||
                      (pathname === '/' && (activeSection === sectionId || (item.href === '/' && !activeSection)))

                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection(item.href)
                          }}
                          className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                            isActive
                              ? 'bg-primary/10 border border-primary/20 text-primary'
                              : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    )
                  })}
                </nav>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (NAV_ITEMS.length + 1) * 0.1 }}
                  className="pt-6 border-t border-primary/10"
                >
                  <p className="text-sm text-muted-foreground mb-3">Connect</p>
                  <div className="flex gap-3">
                    {SITE_CONFIG.links.github && (
                      <a
                        href={SITE_CONFIG.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 rounded-lg bg-card/50 border border-primary/10 hover:border-primary/30 text-center text-sm text-muted-foreground hover:text-primary transition-all"
                      >
                        GitHub
                      </a>
                    )}
                    {SITE_CONFIG.links.linkedin && (
                      <a
                        href={SITE_CONFIG.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 rounded-lg bg-card/50 border border-primary/10 hover:border-primary/30 text-center text-sm text-muted-foreground hover:text-primary transition-all"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
