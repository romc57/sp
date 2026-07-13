import { describe, expect, it } from 'vitest'
import { ARTICLES, articleBySlug } from './articles.js'
import { ARTICLES as GENERATED } from './articles.generated.js'

describe('ARTICLES', () => {
  it('re-exports the generated module', () => {
    expect(ARTICLES).toBe(GENERATED)
    expect(Array.isArray(ARTICLES)).toBe(true)
  })

  it('returns null for unknown slug', () => {
    expect(articleBySlug('missing')).toBeNull()
  })

  it('articleBySlug finds each generated SiteArticle by slug', () => {
    for (const article of ARTICLES) {
      expect(article.slug).toBeTruthy()
      expect(article.title).toBeTruthy()
      expect(article.htmlBody).toBeTruthy()
      expect(articleBySlug(article.slug)).toEqual(article)
    }
  })
})
