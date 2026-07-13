import { describe, expect, it } from 'vitest'
import {
  absoluteUrl,
  DEFAULT_OG_PATH,
  SITE_ORIGIN,
  SITE_ROUTES,
} from './site.js'

describe('absoluteUrl', () => {
  it('joins origin and path', () => {
    expect(absoluteUrl('/capabilities')).toBe(`${SITE_ORIGIN}/capabilities`)
  })

  it('handles root', () => {
    expect(absoluteUrl('/')).toBe(`${SITE_ORIGIN}/`)
  })
})

describe('SITE_ROUTES', () => {
  it('lists four public paths including home', () => {
    expect(SITE_ROUTES).toHaveLength(4)
    expect(SITE_ROUTES.map((r) => r.path)).toEqual([
      '/',
      '/capabilities',
      '/how-it-works',
      '/contact',
    ])
  })
})

describe('DEFAULT_OG_PATH', () => {
  it('points at dedicated share image', () => {
    expect(DEFAULT_OG_PATH).toBe('/og-image.svg')
  })
})
