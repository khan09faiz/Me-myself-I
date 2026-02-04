/**
 * JSON-LD Structured Data
 * SEO-optimized structured data for search engines
 */

import { SITE_CONFIG } from '@/lib/constants'

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.siteUrl,
    image: `${SITE_CONFIG.siteUrl}/og-image.png`,
    jobTitle: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.contact.email,
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
      'TypeScript',
      'Python',
      'TensorFlow',
      'PyTorch',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Educational Institution',
    },
  }
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${SITE_CONFIG.name} Portfolio`,
    url: SITE_CONFIG.siteUrl,
    description: SITE_CONFIG.description,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
    },
    inLanguage: 'en-US',
  }
}

export function generateProfilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.siteUrl,
      image: `${SITE_CONFIG.siteUrl}/og-image.png`,
      jobTitle: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      email: SITE_CONFIG.contact.email,
      sameAs: [
        SITE_CONFIG.links.github,
        SITE_CONFIG.links.linkedin,
        SITE_CONFIG.links.twitter,
      ].filter(Boolean),
    },
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.siteUrl}${item.url}`,
    })),
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.siteUrl,
    logo: `${SITE_CONFIG.siteUrl}/logo.png`,
    description: SITE_CONFIG.description,
    founder: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
    },
    sameAs: [
      SITE_CONFIG.links.github,
      SITE_CONFIG.links.linkedin,
      SITE_CONFIG.links.twitter,
    ].filter(Boolean),
  }
}

/**
 * Generates Article schema for blog posts or project details
 */
export function generateArticleSchema(article: {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  url: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.siteUrl}/logo.png`,
      },
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    url: `${SITE_CONFIG.siteUrl}${article.url}`,
    image: article.image ? `${SITE_CONFIG.siteUrl}${article.image}` : undefined,
  }
}

/**
 * Generates ItemList schema for project portfolios
 */
export function generateItemListSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: `${SITE_CONFIG.siteUrl}${item.url}`,
    })),
  }
}
