/**
 * Published articles for the SP site Articles module.
 * Empty after site create — filled when seo-autopilot approves/publishes content.
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

/** @type {SiteArticle[]} */
export const ARTICLES = []

/** @param {string} slug */
export function articleBySlug(slug) {
  return ARTICLES.find((a) => a.slug === slug) ?? null
}
