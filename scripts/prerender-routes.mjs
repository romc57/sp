import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_NAME, SITE_ROUTES } from '../src/data/site.js'
import {
  breadcrumbJsonLd,
  technologiesPageJsonLd,
  contactPageJsonLd,
  articlesIndexJsonLd,
  homeGraphJsonLd,
} from '../src/seo/pageHead.js'
import { buildPrerenderRootHtml, buildStaticHeadHtml } from '../src/seo/staticHead.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const template = readFileSync(join(distDir, 'index.html'), 'utf8')

const HEAD_SEO_RE =
  /    <meta\s*\n?\s*name="description"[\s\S]*?(?=    <link rel="preconnect"|    <script type="module")/

function jsonLdForRoute(route) {
  if (route.path === '/') return homeGraphJsonLd()
  if (route.path === '/technologies') return technologiesPageJsonLd(route.description)
  if (route.path === '/contact') return contactPageJsonLd()
  if (route.path === '/articles') return articlesIndexJsonLd(route.description)
  return breadcrumbJsonLd([
    { name: SITE_NAME, path: '/' },
    { name: route.title, path: route.path },
  ])
}

function renderRouteHtml(route) {
  const headHtml = buildStaticHeadHtml({
    title: route.title,
    description: route.description,
    path: route.path,
    jsonLd: jsonLdForRoute(route),
  })
  const rootHtml = buildPrerenderRootHtml(route.h1, route.description)

  let html = template.replace(HEAD_SEO_RE, `${headHtml}\n    `)
  html = html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${rootHtml}</div>`,
  )
  return html
}

function outputPathForRoute(routePath) {
  if (routePath === '/') return join(distDir, 'index.html')
  return join(distDir, routePath.replace(/^\//, ''), 'index.html')
}

for (const route of SITE_ROUTES) {
  const outPath = outputPathForRoute(route.path)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, renderRouteHtml(route))
  console.log('prerendered', route.path, '→', outPath)
}

copyFileSync(join(distDir, 'index.html'), join(distDir, '404.html'))
console.log('wrote dist/404.html (SPA fallback)')
