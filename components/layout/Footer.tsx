/**
 * Footer Component
 * Site footer with social links, quick navigation, and copyright
 */

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (href: string) => {
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const sectionId = href.replace('/', '')
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
    <footer className="relative bg-background border-t border-primary/10">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30">
                <Image
                  src="/profile.jpeg"
                  alt={SITE_CONFIG.name}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full scale-110"
                />
              </div>
              <span className="font-bold text-lg text-foreground">
                {SITE_CONFIG.name}
              </span>
            </div>

          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex flex-col space-y-3">
              {SITE_CONFIG.links.github && (
                <a
                  href={SITE_CONFIG.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>GitHub</span>
                </a>
              )}
              {SITE_CONFIG.links.linkedin && (
                <a
                  href={SITE_CONFIG.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Linkedin className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>LinkedIn</span>
                </a>
              )}
              {SITE_CONFIG.contact.email && (
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>Email</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute bottom-8 right-8 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary/50 hover:shadow-glow-sm transition-all group"
          aria-label="Back to top"
        >
          <svg
            className="w-5 h-5 text-primary group-hover:-translate-y-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </footer>
  )
}
