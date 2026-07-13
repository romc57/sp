import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  applyPageHead,
  technologiesPageJsonLd,
  contactPageJsonLd,
  homeGraphJsonLd,
} from './pageHead.js'
import {
  CONTACT_EMAIL,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_ORIGIN,
} from '../data/site.js'

function createDom() {
  const headChildren = []
  const head = {
    children: headChildren,
    querySelector(selector) {
      return (
        headChildren.find((el) => {
          if (selector.startsWith('meta[name="')) {
            const name = selector.slice('meta[name="'.length, -2)
            return el.tag === 'meta' && el.getAttribute('name') === name
          }
          if (selector.startsWith('meta[property="')) {
            const prop = selector.slice('meta[property="'.length, -2)
            return el.tag === 'meta' && el.getAttribute('property') === prop
          }
          if (selector === 'link[rel="canonical"]') {
            return el.tag === 'link' && el.getAttribute('rel') === 'canonical'
          }
          if (selector.startsWith('script[')) {
            return el.tag === 'script' && el.hasAttribute('data-sp-jsonld')
          }
          return false
        }) ?? null
      )
    },
    appendChild(el) {
      headChildren.push(el)
      return el
    },
  }

  function createElement(tag) {
    const attrs = {}
    const el = {
      tag,
      textContent: '',
      type: '',
      setAttribute(k, v) {
        attrs[k] = v
        if (k === 'type') el.type = v
      },
      getAttribute(k) {
        return attrs[k]
      },
      hasAttribute(k) {
        return k in attrs
      },
      remove() {
        const i = headChildren.indexOf(el)
        if (i >= 0) headChildren.splice(i, 1)
      },
    }
    return el
  }

  globalThis.document = {
    title: '',
    head,
    querySelector(selector) {
      if (selector === 'link[rel="canonical"]') {
        return head.querySelector(selector)
      }
      return head.querySelector(selector)
    },
    querySelectorAll(selector) {
      if (selector === 'link[rel="canonical"]') {
        return head.children.filter(
          (el) => el.tag === 'link' && el.getAttribute('rel') === 'canonical',
        )
      }
      return []
    },
    createElement,
  }
}

describe('applyPageHead', () => {
  beforeEach(() => {
    createDom()
  })

  afterEach(() => {
    delete globalThis.document
  })

  it('applies title suffix for non-brand titles', () => {
    applyPageHead({
      title: 'Technologies',
      description: 'Desc',
      path: '/technologies',
    })
    expect(document.title).toBe(`Technologies · ${SITE_NAME}`)
  })

  it('sets canonical and og:site_name', () => {
    applyPageHead({
      title: 'Contact',
      description: 'Reach us',
      path: '/contact',
    })
    const canonical = document.querySelector('link[rel="canonical"]')
    expect(canonical.getAttribute('href')).toBe(`${SITE_ORIGIN}/contact`)
    const siteName = document.head.querySelector('meta[property="og:site_name"]')
    expect(siteName.getAttribute('content')).toBe(SITE_NAME)
  })

  it('sets OG image dimensions and alt text', () => {
    applyPageHead({
      title: 'Contact',
      description: 'Reach us',
      path: '/contact',
    })
    expect(document.head.querySelector('meta[property="og:image:width"]').getAttribute('content')).toBe(
      String(OG_IMAGE_WIDTH),
    )
    expect(document.head.querySelector('meta[property="og:image:height"]').getAttribute('content')).toBe(
      String(OG_IMAGE_HEIGHT),
    )
    expect(document.head.querySelector('meta[property="og:image:alt"]').getAttribute('content')).toBe(
      OG_IMAGE_ALT,
    )
    expect(document.head.querySelector('meta[name="twitter:image:alt"]').getAttribute('content')).toBe(
      OG_IMAGE_ALT,
    )
  })

  it('sets robots when provided', () => {
    applyPageHead({
      title: 'Not found',
      description: 'Missing',
      path: '/missing',
      robots: 'noindex, nofollow',
    })
    const robots = document.head.querySelector('meta[name="robots"]')
    expect(robots.getAttribute('content')).toBe('noindex, nofollow')
  })

  it('injects json-ld when provided', () => {
    applyPageHead({
      title: SITE_NAME,
      description: 'Home',
      path: '/',
      jsonLd: homeGraphJsonLd(),
    })
    const script = document.head.querySelector('script[data-sp-jsonld]')
    expect(script).toBeTruthy()
    const data = JSON.parse(script.textContent)
    expect(data['@graph']).toHaveLength(2)
  })
})

describe('page JSON-LD helpers', () => {
  it('home graph uses raster logo', () => {
    const data = homeGraphJsonLd()
    const org = data['@graph'].find((node) => node['@type'] === 'Organization')
    expect(org.logo).toContain('/logo.png')
  })

  it('technologies graph includes breadcrumb and service', () => {
    const data = technologiesPageJsonLd('Service description')
    expect(data['@graph']).toHaveLength(2)
    expect(data['@graph'][0]['@type']).toBe('BreadcrumbList')
    expect(data['@graph'][1]['@type']).toBe('ProfessionalService')
    expect(data['@graph'][1].url).toContain('/technologies')
  })

  it('contact graph includes ContactPoint email and telephone', () => {
    const data = contactPageJsonLd()
    const page = data['@graph'].find((node) => node['@type'] === 'ContactPage')
    expect(page.mainEntity.email).toBe(CONTACT_EMAIL)
    expect(page.mainEntity.telephone).toBe('+972507148309')
  })
})
