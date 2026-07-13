import { describe, expect, it } from 'vitest'
import {
  HOW_IT_WORKS_STEPS,
  OFFER_RANGE,
  PRODUCT_LADDER,
  PRODUCT_RANGE_FULL,
  PRODUCT_RANGE_SHORT,
  TECHNOLOGIES,
} from './offerContent.js'

describe('offerContent', () => {
  it('keeps product-company pillars without hiring framing', () => {
    const blob = [...HOW_IT_WORKS_STEPS, ...OFFER_RANGE.items]
      .map((item) => `${item.title} ${item.body}`)
      .join(' ')
      .toLowerCase()
    expect(blob).toContain('create')
    expect(blob).toContain('subscribe')
    expect(blob).toContain('source')
    expect(blob).not.toMatch(/hire our|development team|dev for hire/)
  })

  it('derives the business range from a deterministic local-business-site ladder', () => {
    expect(PRODUCT_LADDER[0].title.toLowerCase()).toBe('local business sites')
    expect(OFFER_RANGE.items).toBe(PRODUCT_LADDER)
    expect(OFFER_RANGE.title).toBe('From local business sites to cross-platform SaaS')
    expect(PRODUCT_RANGE_SHORT).toBe('from local business sites to cross-platform SaaS')
    expect(PRODUCT_RANGE_FULL).toContain('in-company collaboration')
    expect(PRODUCT_RANGE_FULL).toContain('and AI')

    const titles = PRODUCT_LADDER.map((item) => item.title.toLowerCase())
    expect(titles).toEqual([
      'local business sites',
      'business applications',
      'growth-stage products',
      'cross-platform saas',
      'in-company collaboration',
    ])

    const blob = `${OFFER_RANGE.lede} ${PRODUCT_LADDER.map((i) => i.body).join(' ')}`
    expect(blob.toLowerCase()).toContain('multi-tenant')
    expect(blob.toLowerCase()).toContain('cross-platform')
    expect(blob.toLowerCase()).toContain('company resources')
    expect(blob).not.toMatch(/multi-instance|BeshvilchaApp|brochure|talk to us|sharp prices/i)
  })

  it('lists cloud third-party platforms with official links from integrations SSOT', () => {
    expect(TECHNOLOGIES.groups.length).toBeGreaterThanOrEqual(3)
    const items = TECHNOLOGIES.groups.flatMap((g) => g.items)
    expect(items.every((item) => item.name && item.href?.startsWith('https://'))).toBe(true)
    expect(items.map((i) => i.name)).toEqual(
      expect.arrayContaining(['OpenAI', 'Google Cloud', 'Netlify', 'Spotify']),
    )
    expect(items.map((i) => i.name).join(' ')).not.toMatch(/Docker|React|Vite|Playwright|PostgreSQL/)
    expect(items.map((i) => i.name).join(' ')).not.toMatch(/WorkStation|Valerie|LiteLLM/)
  })
})
