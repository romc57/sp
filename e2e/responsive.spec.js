import { test, expect } from '@playwright/test'

test.describe('responsive', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('home hero and contact path on mobile', async ({ page }) => {
    await page.goto('./')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    const menuBtn = page.getByRole('button', { name: 'Toggle menu' })
    await expect(menuBtn).toBeVisible()

    const contact = page.getByRole('navigation', { name: 'Primary' }).getByRole('link', {
      name: 'Contact',
      exact: true,
    })
    await expect(contact).not.toBeVisible()

    // Open mobile menu
    await menuBtn.click()
    await expect(contact).toBeVisible()

    // Click exact link to navigate to contact page
    await contact.click()
    await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible()
  })
})
