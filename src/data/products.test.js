import { describe, expect, it } from 'vitest'
import { PRODUCTS_AND_CUSTOMERS, productByCustomerId, BISHVILNU_CUSTOMER } from './products.js'
import { CURATED_ARTICLES } from './articles.curated.js'
import { ARTICLES } from './articles.js'
import { RELATED_LINKS } from './offerContent.js'

describe('PRODUCTS_AND_CUSTOMERS', () => {
  it('names the real customer, not an internal app/repo name', () => {
    expect(PRODUCTS_AND_CUSTOMERS[0].customerName).toBe('Bishvilnu')
    expect(PRODUCTS_AND_CUSTOMERS[0].customerUrl).toBe(BISHVILNU_CUSTOMER.url)
    expect(productByCustomerId('bishvilnu')?.ladderTier).toBe('Cross-platform SaaS')
    expect(PRODUCTS_AND_CUSTOMERS.every((p) => !/beshvilchaapp/i.test(p.summary))).toBe(true)
  })

  it('links each product to its case-study article', () => {
    for (const product of PRODUCTS_AND_CUSTOMERS) {
      expect(ARTICLES.some((a) => a.slug === product.articleSlug)).toBe(true)
    }
  })
})

describe('curated article', () => {
  it("tells Bishvilnu's challenge/solution story without naming the app as the subject", () => {
    const article = CURATED_ARTICLES[0]
    expect(article.slug).toBe('bishvilnu-software-principle-challenge-solved')
    expect(article.title).not.toMatch(/beshvilchaapp/i)
    expect(article.htmlBody).not.toMatch(/beshvilchaapp/i)
    expect(article.htmlBody).toMatch(/\/products/)
    expect(article.htmlBody).toMatch(/how-it-works/)
    expect(article.htmlBody).toMatch(/Bishvilnu/)
    expect(article.htmlBody).toMatch(/linkedin\.com\/company\/bishvilenu/)
    expect(article.htmlBody).toMatch(/The challenge/)
    expect(article.htmlBody).toMatch(/How Software Principle solved it/)
    expect(article.htmlBody).toMatch(/cloud infrastructure/i)
    expect(article.htmlBody).toMatch(/AI guide/i)
    expect(ARTICLES.some((a) => a.slug === article.slug)).toBe(true)
  })
})

describe('RELATED_LINKS', () => {
  it('uses topical anchors and includes the products path', () => {
    expect(RELATED_LINKS.home.some((l) => l.to === '/products')).toBe(true)
    expect(RELATED_LINKS.home[0].label.toLowerCase()).not.toBe('how it works')
  })
})
