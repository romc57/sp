import { describe, expect, it } from 'vitest'
import { HOW_IT_WORKS_STEPS, OFFER_RANGE, TECHNOLOGIES } from './offerContent.js'

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
