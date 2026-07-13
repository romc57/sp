import { test, expect } from '@playwright/test'
import { SITE_NAME, SITE_ORIGIN, SITE_ROUTES } from '../src/data/site.js'

function appPath(path) {
  if (path === '/') return './'
  return path.startsWith('/') ? path.slice(1) : path
}

test.describe('seo', () => {
  for (const route of SITE_ROUTES) {
    test(`meta for ${route.path}`, async ({ page }) => {
      await page.goto(appPath(route.path))
      await expect.poll(async () => page.title()).toContain(route.title)

      const canonical = page.locator('link[rel="canonical"]')
      await expect(canonical).toHaveAttribute(
        'href',
        route.path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route.path}`,
      )

      const ogTitle = page.locator('meta[property="og:title"]')
      await expect(ogTitle).toHaveAttribute('content', new RegExp(route.title))

      const description = page.locator('meta[name="description"]')
      const content = await description.getAttribute('content')
      expect(content?.length).toBeGreaterThan(10)

      const ogSite = page.locator('meta[property="og:site_name"]')
      await expect(ogSite).toHaveAttribute('content', SITE_NAME)
    })
  }

  test('home injects JSON-LD', async ({ page }) => {
    await page.goto('./')
    await expect.poll(async () => page.title()).toContain(SITE_NAME)
    const jsonLd = page.locator('script[type="application/ld+json"]')
    await expect(jsonLd.first()).toBeAttached()
    const raw = await jsonLd.first().textContent()
    expect(raw).toContain('Organization')
  })

  test('sitemap.xml is valid', async ({ request }) => {
    const res = await request.get('sitemap.xml')
    expect(res.ok()).toBeTruthy()
    const body = await res.text()
    expect(body).toContain('<urlset')
    expect(body).toContain(SITE_ORIGIN)
    for (const route of SITE_ROUTES) {
      const loc = route.path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route.path}`
      expect(body).toContain(`<loc>${loc}</loc>`)
    }
  })

  test('robots.txt references sitemap', async ({ request }) => {
    const res = await request.get('robots.txt')
    expect(res.ok()).toBeTruthy()
    const body = await res.text()
    expect(body).toContain('Sitemap:')
    expect(body).toContain(`${SITE_ORIGIN}/sitemap.xml`)
  })
})
