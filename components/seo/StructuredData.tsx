/**
 * StructuredData Component
 * Renders JSON-LD structured data for SEO
 */

import Script from 'next/script'
import { SITE_CONFIG } from '@/lib/constants'

export function StructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.name,
    jobTitle: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.siteUrl,
    email: SITE_CONFIG.contact.email,
    image: `${SITE_CONFIG.siteUrl}/og-image.png`,
    sameAs: [
      SITE_CONFIG.links.github,
      SITE_CONFIG.links.linkedin,
      SITE_CONFIG.links.twitter,
    ].filter(Boolean),
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'Natural Language Processing',
      'Full Stack Development',
      'React',
      'Next.js',
      'Python',
      'TensorFlow',
      'PyTorch',
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${SITE_CONFIG.name} Portfolio`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.siteUrl,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
    },
    inLanguage: 'en-US',
  }

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: new Date().toISOString().split('T')[0],
    dateModified: new Date().toISOString().split('T')[0],
    mainEntity: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.title,
    },
  }

  return (
    <>
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="profile-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  )
}

