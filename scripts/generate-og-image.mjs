import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')

const OG_SVG_FALLBACK = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" fill="none">
  <rect width="1200" height="630" fill="#0B1F2A"/>
  <text x="600" y="330" text-anchor="middle" font-family="Georgia, serif" font-size="64" fill="#E8EEF1">Software Principle</text>
</svg>`

const BRAND_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px;
      height: 630px;
      background: #0b1f2a;
      color: #e8eef1;
      font-family: Georgia, "Times New Roman", serif;
      overflow: hidden;
      position: relative;
    }
    .orb-a {
      position: absolute;
      width: 640px;
      height: 640px;
      border-radius: 50%;
      background: rgba(61, 184, 160, 0.18);
      top: -120px;
      right: -80px;
    }
    .orb-b {
      position: absolute;
      width: 560px;
      height: 560px;
      border-radius: 50%;
      background: rgba(61, 184, 160, 0.1);
      bottom: -220px;
      left: -60px;
    }
    .content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 28px;
      padding: 200px 96px 0;
    }
    .mark {
      width: 96px;
      height: 96px;
      border-radius: 20px;
      background: #163342;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #3db8a0;
      font-size: 48px;
      font-weight: 700;
    }
    h1 {
      font-size: 64px;
      line-height: 1.05;
      font-weight: 700;
      margin-bottom: 12px;
    }
    p {
      font-family: system-ui, sans-serif;
      font-size: 28px;
      color: #5a7a88;
    }
  </style>
</head>
<body>
  <div class="orb-a"></div>
  <div class="orb-b"></div>
  <div class="content">
    <div class="mark">SP</div>
    <div>
      <h1>Software Principle</h1>
      <p>Precise. Fast. Scalable.</p>
    </div>
  </div>
</body>
</html>`

const LOGO_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      margin: 0;
      width: 512px;
      height: 512px;
      background: #0b1f2a;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Georgia, serif;
    }
    .mark {
      width: 320px;
      height: 320px;
      border-radius: 64px;
      background: #163342;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #3db8a0;
      font-size: 128px;
      font-weight: 700;
    }
  </style>
</head>
<body><div class="mark">SP</div></body>
</html>`

async function screenshotHtml(html, { width, height, path }) {
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage({ viewport: { width, height } })
    await page.setContent(html, { waitUntil: 'load' })
    await page.screenshot({ path, type: 'png' })
  } finally {
    await browser.close()
  }
}

mkdirSync(publicDir, { recursive: true })

await screenshotHtml(BRAND_HTML, {
  width: 1200,
  height: 630,
  path: join(publicDir, 'og-image.png'),
})

await screenshotHtml(LOGO_HTML, {
  width: 512,
  height: 512,
  path: join(publicDir, 'logo.png'),
})

writeFileSync(join(publicDir, 'og-image.svg'), OG_SVG_FALLBACK)
console.log('wrote public/og-image.png, public/logo.png, public/og-image.svg')
