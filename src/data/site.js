/** Production origin — GitHub Pages project site */
export const SITE_ORIGIN = 'https://romc57.github.io/sp'

export const SITE_NAME = 'Software Principle'
export const SITE_SHORT = 'SP'

/** Dedicated social share image (not the favicon) */
export const DEFAULT_OG_PATH = '/og-image.svg'

/** Public indexable routes — SSOT for sitemap + e2e */
export const SITE_ROUTES = [
  { path: '/', title: 'Software Principle' },
  { path: '/capabilities', title: 'Capabilities' },
  { path: '/how-it-works', title: 'How it works' },
  { path: '/contact', title: 'Contact' },
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

export const NAV_LINKS = [
  { to: '/capabilities', label: 'Capabilities' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/contact', label: 'Contact' },
]
