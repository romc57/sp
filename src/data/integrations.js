/**
 * Cloud / SaaS / API integrations SP already supports.
 * Excludes personal GitHub/portfolio links and everyday-dev tooling.
 * iconSlug → public/integrations/{slug}.svg
 * @type {{ id: string, name: string, href: string, iconSlug: string, group: string, status: 'supported' | 'available' }[]}
 */
export const INTEGRATIONS = [
  { id: 'openai', name: 'OpenAI', href: 'https://openai.com/', iconSlug: 'openai', group: 'AI cloud', status: 'supported' },
  { id: 'anthropic', name: 'Anthropic', href: 'https://www.anthropic.com/', iconSlug: 'anthropic', group: 'AI cloud', status: 'supported' },
  { id: 'google-gemini', name: 'Google Gemini', href: 'https://gemini.google.com/', iconSlug: 'googlegemini', group: 'AI cloud', status: 'supported' },
  { id: 'huggingface', name: 'Hugging Face', href: 'https://huggingface.co/', iconSlug: 'huggingface', group: 'AI cloud', status: 'supported' },
  { id: 'google-cloud', name: 'Google Cloud', href: 'https://cloud.google.com/', iconSlug: 'googlecloud', group: 'Cloud platforms', status: 'supported' },
  { id: 'github', name: 'GitHub', href: 'https://github.com/', iconSlug: 'github', group: 'Cloud platforms', status: 'supported' },
  { id: 'netlify', name: 'Netlify', href: 'https://www.netlify.com/', iconSlug: 'netlify', group: 'Cloud platforms', status: 'supported' },
  { id: 'aws', name: 'AWS', href: 'https://aws.amazon.com/', iconSlug: 'amazonwebservices', group: 'Cloud platforms', status: 'supported' },
  { id: 'spotify', name: 'Spotify', href: 'https://developer.spotify.com/', iconSlug: 'spotify', group: 'Product APIs', status: 'supported' },
  { id: 'whatsapp', name: 'WhatsApp', href: 'https://www.whatsapp.com/', iconSlug: 'whatsapp', group: 'Product APIs', status: 'supported' },
  { id: 'google', name: 'Google', href: 'https://developers.google.com/', iconSlug: 'google', group: 'Product APIs', status: 'supported' },
]

export function supportedIntegrations() {
  return INTEGRATIONS.filter((item) => item.status === 'supported')
}

/** Path to local icon asset (respects Vite base `/sp/`) */
export function integrationIconPath(iconSlug) {
  const raw = typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL
    ? import.meta.env.BASE_URL
    : '/'
  const base = raw.endsWith('/') ? raw : `${raw}/`
  return `${base}integrations/${iconSlug}.svg`
}

/** Group integrations for Technologies page */
export function technologyGroupsFromIntegrations() {
  const order = []
  const map = new Map()
  for (const item of INTEGRATIONS) {
    if (!map.has(item.group)) {
      map.set(item.group, [])
      order.push(item.group)
    }
    map.get(item.group).push({ name: item.name, href: item.href, id: item.id, iconSlug: item.iconSlug })
  }
  return order.map((title) => ({ title, items: map.get(title) }))
}

export const INTEGRATIONS_STRIP = {
  label: 'Integrations',
  title: 'Third-party platforms we already support',
  lede: 'Cloud and product APIs Software Principle ships with — each linked to the official platform.',
}
