import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { GA4_MEASUREMENT_ID } from '../data/site.js'

describe('GA4_MEASUREMENT_ID', () => {
  it('is a web stream G- id for Software Principle', () => {
    expect(GA4_MEASUREMENT_ID).toBe('G-HSJMFVSLGM')
  })
})

describe('trackPageView', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('calls gtag when present', async () => {
    const gtag = vi.fn()
    vi.stubGlobal('window', {
      gtag,
      location: { href: 'https://romc57.github.io/sp/contact' },
    })
    vi.stubGlobal('document', { title: 'Contact' })
    const { trackPageView } = await import('./ga4.js')
    trackPageView('/sp/contact')
    expect(gtag).toHaveBeenCalledWith(
      'event',
      'page_view',
      expect.objectContaining({ page_path: '/sp/contact' }),
    )
  })
})
