/**
 * Download Simple Icons SVGs for INTEGRATIONS into public/integrations/.
 * Run: bash scripts/dev.sh node scripts/fetch-integration-icons.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'integrations')

const { INTEGRATIONS } = await import(pathToFileURL(join(root, 'src/data/integrations.js')).href)

const slugs = [...new Set(INTEGRATIONS.map((item) => item.iconSlug).filter(Boolean))]

mkdirSync(outDir, { recursive: true })

let ok = 0
let fail = 0
for (const slug of slugs) {
  const url = `https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${slug}.svg`
  try {
    const res = await fetch(url)
    if (!res.ok) {
      console.warn(`skip ${slug}: HTTP ${res.status}`)
      fail += 1
      continue
    }
    const svg = await res.text()
    if (!svg.includes('<svg')) {
      console.warn(`skip ${slug}: not svg`)
      fail += 1
      continue
    }
    writeFileSync(join(outDir, `${slug}.svg`), svg)
    console.log('wrote', slug)
    ok += 1
  } catch (err) {
    console.warn(`skip ${slug}:`, err.message)
    fail += 1
  }
}

console.log(`done: ${ok} icons, ${fail} skipped → ${outDir}`)
