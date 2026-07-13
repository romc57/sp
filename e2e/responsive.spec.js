import { test, expect } from '@playwright/test'

test.describe('responsive', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('home hero and contact path on mobile', async ({ page }) => {
    await page.goto('./')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    const talkToUs = page.getByRole('navigation', { name: 'Primary' }).getByRole('link', {
      name: 'Talk to us',
    })
    const contact = page.getByRole('navigation', { name: 'Primary' }).getByRole('link', {
      name: 'Contact',
    })

    const talkVisible = await talkToUs.isVisible()
    const contactVisible = await contact.isVisible()
    expect(talkVisible || contactVisible).toBeTruthy()
  })
})
