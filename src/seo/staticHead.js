import {
  absoluteUrl,
  defaultOgImageUrl,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_NAME,
} from '../data/site.js'
import { fullPageTitle } from './pageHead.js'

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

/**
 * @param {{
 *   title: string,
 *   description: string,
 *   path: string,
 *   robots?: string,
 *   jsonLd?: object | null,
 * }} opts
 */
export function buildStaticHeadHtml({ title, description, path, robots, jsonLd }) {
  const canonicalUrl = absoluteUrl(path)
  const imageUrl = defaultOgImageUrl()
  const fullTitle = fullPageTitle(title)
  const robotsTag = robots
    ? `\n    <meta name="robots" content="${escapeHtml(robots)}" />`
    : ''
  const jsonLdTag = jsonLd
    ? `\n    <script type="application/ld+json" data-sp-jsonld>${JSON.stringify(jsonLd)}</script>`
    : ''

  return `<title>${escapeHtml(fullTitle)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="theme-color" content="#0b1f2a" />${robotsTag}
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:title" content="${escapeHtml(fullTitle)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />
    <meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />
    <meta property="og:image:alt" content="${escapeHtml(OG_IMAGE_ALT)}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(fullTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(OG_IMAGE_ALT)}" />${jsonLdTag}`
}

/** @param {string} h1 @param {string} description */
export function buildPrerenderRootHtml(h1, description) {
  return `<h1>${escapeHtml(h1)}</h1><p>${escapeHtml(description)}</p>`
}
