import { describe, expect, it } from 'vitest'
import {
  absoluteUrl,
  CONTACT_EMAIL,
  CONTACT_WHATSAPP_DISPLAY,
  CONTACT_WHATSAPP_E164,
  contactTelephone,
  DEFAULT_OG_PATH,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_ORIGIN,
  SITE_ROUTES,
  whatsappUrl,
} from './site.js'

describe('absoluteUrl', () => {
  it('joins origin and path', () => {
    expect(absoluteUrl('/technologies')).toBe(`${SITE_ORIGIN}/technologies`)
  })

  it('handles root', () => {
    expect(absoluteUrl('/')).toBe(`${SITE_ORIGIN}/`)
  })
})

describe('SITE_ROUTES', () => {
  it('lists public paths including home, products and customers, and articles', () => {
    expect(SITE_ROUTES).toHaveLength(5)
    expect(SITE_ROUTES.map((r) => r.path)).toEqual([
      '/',
      '/how-it-works',
      '/products',
      '/contact',
      '/articles',
    ])
  })

  it('includes description and h1 for prerender', () => {
    for (const route of SITE_ROUTES) {
      expect(route.description.length).toBeGreaterThan(10)
      expect(route.h1.length).toBeGreaterThan(0)
    }
  })
})

describe('DEFAULT_OG_PATH', () => {
  it('points at raster share image', () => {
    expect(DEFAULT_OG_PATH).toBe('/og-image.png')
  })
})

describe('OG image dimensions', () => {
  it('uses standard social card size', () => {
    expect(OG_IMAGE_WIDTH).toBe(1200)
    expect(OG_IMAGE_HEIGHT).toBe(630)
  })
})

describe('contact constants', () => {
  it('uses the public email and WhatsApp number', () => {
    expect(CONTACT_EMAIL).toBe('rom.cohen10@gmail.com')
    expect(CONTACT_WHATSAPP_E164).toBe('972507148309')
    expect(CONTACT_WHATSAPP_DISPLAY).toBe('+972507148309')
    expect(contactTelephone()).toBe('+972507148309')
    expect(whatsappUrl()).toBe('https://wa.me/972507148309')
  })
})
