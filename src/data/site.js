import { PRODUCT_RANGE_FULL, PRODUCT_RANGE_SHORT } from './offerContent.js'

/** Production origin — GitHub Pages project site */
export const SITE_ORIGIN = 'https://romc57.github.io/sp'

export const SITE_NAME = 'Software Principle'
export const SITE_SHORT = 'SP'

/** GA4 web stream measurement ID (Admin → Data streams). */
export const GA4_MEASUREMENT_ID = 'G-HSJMFVSLGM'


/** Dedicated social share image (not the favicon) */
export const DEFAULT_OG_PATH = '/og-image.png'
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630
export const OG_IMAGE_ALT =
  'Software Principle — create, support, and scale software products with precision, delivery speed, and competitive pricing'

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
    description: `Software Principle creates, supports, and scales software products — ${PRODUCT_RANGE_FULL}.`,
    h1: 'Software Principle',
  },
  {
    path: '/how-it-works',
    title: 'How it works',
    description:
      'How Software Principle creates products, supports and scales them, enables customer subscription, and can transfer source ownership.',
    h1: 'How it works',
  },
  {
    path: '/products',
    title: 'Products and customers',
    description:
      'Products Software Principle created, supports, and scales for real customers — including Bishvilnu, a cross-platform SaaS product for guided journeys and organizational programs.',
    h1: 'Products and customers',
  },
  {
    path: '/contact',
    title: 'Contact',
    description: `Contact Software Principle about a product ${PRODUCT_RANGE_SHORT} — or about subscription and source ownership.`,
    h1: 'Contact',
  },
  {
    path: '/articles',
    title: 'Articles',
    description: 'Articles from Software Principle on precise, fast, and scalable software products.',
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
  { to: '/how-it-works', label: 'How it works' },
  { to: '/products', label: 'Products and customers' },
  { to: '/articles', label: 'Articles' },
  { to: '/contact', label: 'Contact' },
]
