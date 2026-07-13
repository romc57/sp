/**
 * Published articles for the SP site Articles module.
 * Empty after site create — filled when seo-autopilot approves/publishes content
 * into `articles.generated.js` (linked site env write-back).
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

export { ARTICLES } from './articles.generated.js'
import { ARTICLES } from './articles.generated.js'

/** @param {string} slug */
export function articleBySlug(slug) {
  return ARTICLES.find((a) => a.slug === slug) ?? null
}
