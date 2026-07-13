import { describe, expect, it } from 'vitest'
import { ARTICLES, articleBySlug } from './articles.js'

describe('ARTICLES', () => {
  it('starts empty after site create (no published content yet)', () => {
    expect(ARTICLES).toEqual([])
  })

  it('returns null for unknown slug', () => {
    expect(articleBySlug('missing')).toBeNull()
  })
})
