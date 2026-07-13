import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_ORIGIN, SITE_ROUTES } from '../src/data/site.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const lastmod = new Date().toISOString().slice(0, 10)

const urls = SITE_ROUTES.map(({ path }) => {
  const loc = path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n  </url>`
}).join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

const out = join(root, 'public', 'sitemap.xml')
mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, xml)
console.log('wrote', out, `(lastmod=${lastmod})`)
