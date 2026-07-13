import { describe, expect, it } from 'vitest'
import { absoluteUrl, SITE_ORIGIN } from './site.js'

describe('absoluteUrl', () => {
  it('joins origin and path', () => {
    expect(absoluteUrl('/capabilities')).toBe(`${SITE_ORIGIN}/capabilities`)
  })

  it('handles root', () => {
    expect(absoluteUrl('/')).toBe(`${SITE_ORIGIN}/`)
  })
})
