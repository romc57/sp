/** Production origin — GitHub Pages project site */
export const SITE_ORIGIN = 'https://romc57.github.io/sp'

export const SITE_NAME = 'Software Principle'
export const SITE_SHORT = 'SP'

/** Dedicated social share image (not the favicon) */
export const DEFAULT_OG_PATH = '/og-image.png'
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630
export const OG_IMAGE_ALT =
  'Software Principle — precise, fast, and scalable software delivery for businesses'

/** Raster logo for structured data (generated at build time) */
export const LOGO_PATH = '/logo.png'

export const CONTACT_EMAIL = 'rom.cohen10@gmail.com'

/** Digits only — wa.me / schema telephone (no +) */
export const CONTACT_WHATSAPP_E164 = '972507148309'

/** Shown and copied */
export const CONTACT_WHATSAPP_DISPLAY = '+972507148309'

export function whatsappUrl() {
  return `https://wa.me/${CONTACT_WHATSAPP_E164}`
}

export function contactTelephone() {
  return `+${CONTACT_WHATSAPP_E164}`
}

/** Public indexable routes — SSOT for sitemap, prerender, and e2e */
export const SITE_ROUTES = [
  {
    path: '/',
    title: 'Software Principle',
    description:
      'Software Principle helps businesses manage and create software projects with development that is precise, fast, and scalable.',
    h1: 'Software Principle',
  },
  {
    path: '/capabilities',
    title: 'Capabilities',
    description:
      'Precise quality loops, fast iteration, and scalable project management for software businesses.',
    h1: 'Capabilities',
  },
  {
    path: '/how-it-works',
    title: 'How it works',
    description:
      'How Software Principle helps businesses manage projects, stay precise, move fast, and scale delivery.',
    h1: 'How it works',
  },
  {
    path: '/contact',
    title: 'Contact',
    description: 'Contact Software Principle about managing and scaling your software projects.',
    h1: 'Contact',
  },
  {
    path: '/articles',
    title: 'Articles',
    description: 'Published articles from Software Principle on precise, fast, and scalable delivery.',
    h1: 'Articles',
  },
]

/** @param {string} pathname site path starting with / (router path, not including /sp base) */
export function absoluteUrl(pathname = '/') {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  if (path === '/') return `${SITE_ORIGIN}/`
  return `${SITE_ORIGIN}${path}`
}

export function defaultOgImageUrl() {
  return absoluteUrl(DEFAULT_OG_PATH)
}

/** @param {string} path */
export function routeByPath(path) {
  return SITE_ROUTES.find((route) => route.path === path)
}

export const NAV_LINKS = [
  { to: '/capabilities', label: 'Capabilities' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/articles', label: 'Articles' },
  { to: '/contact', label: 'Contact' },
]
