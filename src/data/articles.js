/**
 * Published articles for the SP site Articles module.
 * Curated portfolio narrative + seo-autopilot write-back (`articles.generated.js`).
 *
 * @typedef {{
 *   slug: string,
 *   title: string,
 *   h1: string,
 *   metaDescription: string,
 *   htmlBody: string,
 *   contentId?: string,
 * }} SiteArticle
 */

import { CURATED_ARTICLES } from './articles.curated.js'
import { ARTICLES as GENERATED_ARTICLES } from './articles.generated.js'

const curatedSlugs = new Set(CURATED_ARTICLES.map((a) => a.slug))

/** @type {SiteArticle[]} */
export const ARTICLES = [
  ...CURATED_ARTICLES,
  ...GENERATED_ARTICLES.filter((a) => !curatedSlugs.has(a.slug)),
]

/** @param {string} slug */
export function articleBySlug(slug) {
  return ARTICLES.find((a) => a.slug === slug) ?? null
}
