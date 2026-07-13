import { describe, expect, it } from 'vitest'
import {
  INTEGRATIONS,
  supportedIntegrations,
  technologyGroupsFromIntegrations,
} from './integrations.js'

describe('integrations SSOT', () => {
  it('lists unique supported integrations with https links', () => {
    const ids = INTEGRATIONS.map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const item of INTEGRATIONS) {
      expect(item.href.startsWith('https://')).toBe(true)
      expect(item.iconSlug.length).toBeGreaterThan(0)
      expect(['supported', 'available']).toContain(item.status)
      expect(item.href).not.toMatch(/romc57|RomsPage/)
    }
    expect(supportedIntegrations().length).toBe(INTEGRATIONS.length)
  })

  it('groups technologies without platform internals or personal portfolio', () => {
    const blob = technologyGroupsFromIntegrations()
      .flatMap((g) => g.items.map((i) => i.name))
      .join(' ')
    expect(blob).toMatch(/OpenAI|Netlify|Spotify/)
    expect(blob).not.toMatch(/Docker|React|Vite|Playwright/)
    expect(blob).not.toMatch(/WorkStation|Valerie|LiteLLM/)
  })
})
