import { test, expect } from '@playwright/test'
import { SITE_ROUTES } from '../src/data/site.js'

/** Resolve SPA path under Vite base /sp/ (leading / would escape the base). */
function appPath(path) {
  if (path === '/') return './'
  return path.startsWith('/') ? path.slice(1) : path
}

test.describe('smoke', () => {
  for (const route of SITE_ROUTES) {
    test(`loads ${route.path}`, async ({ page }) => {
      await page.goto(appPath(route.path))
      await expect(page.locator('h1')).toBeVisible()
    })
  }
  test('primary nav reaches contact', async ({ page }) => {
    await page.goto('./')
    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Contact', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible()
  })

  test('unknown path shows not found and recovers home', async ({ page }) => {
    await page.goto('no-such-page')
    await expect(page.getByRole('heading', { name: 'Not found' })).toBeVisible()
    await page.getByRole('link', { name: 'Back home' }).click()
    await expect(page.getByRole('heading', { name: /Software/ })).toBeVisible()
  })
})
