/** Product-company copy SSOT — formal business language; outcomes only; no platform internals */

import { technologyGroupsFromIntegrations } from './integrations.js'

/**
 * Deterministic product ladder — order is the business range.
 * All public range phrasing derives from this list.
 */
export const PRODUCT_LADDER = [
  {
    title: 'Local business sites',
    body: 'Search-optimized websites for local and small businesses — discoverability, clarity of offer, and conversion.',
  },
  {
    title: 'Business applications',
    body: 'Purpose-built applications that support core operations beyond a marketing presence.',
  },
  {
    title: 'Growth-stage products',
    body: 'Products that require ongoing support, feature development, and capacity as adoption increases.',
  },
  {
    title: 'Cross-platform SaaS',
    body: 'Standard multi-tenant SaaS with cross-platform capabilities — web, mobile, and administration — including full AI implementations. Customers subscribe within the product, or obtain source ownership upon release.',
  },
  {
    title: 'In-company collaboration',
    body: 'Internal products that enable collaboration across the organization and controlled access to company resources — knowledge, tools, and workflows.',
  },
]

/** @param {string} title */
function asRangeLabel(title) {
  return title.toLowerCase().replace(/\bsaas\b/g, 'SaaS')
}

const ladderStart = asRangeLabel(PRODUCT_LADDER[0].title)
const ladderSaas = asRangeLabel(
  PRODUCT_LADDER.find((item) => /\bsaas\b/i.test(item.title))?.title ?? PRODUCT_LADDER.at(-2).title,
)
const ladderEnd = asRangeLabel(PRODUCT_LADDER.at(-1).title)

/** Short span used in hero, SEO, and lifecycle copy */
export const PRODUCT_RANGE_SHORT = `from ${ladderStart} to ${ladderSaas}`

/** Full span including collaboration */
export const PRODUCT_RANGE_FULL = `${PRODUCT_RANGE_SHORT}, ${ladderEnd}, and AI`

export const HERO = {
  body: `Software Principle creates, supports, and scales software products — ${PRODUCT_RANGE_FULL} — with precision, delivery speed, and competitive pricing.`,
}

export const HOW_IT_WORKS_LEDE =
  'Software Principle creates products, maintains them in production, and enables subscription inside each product — with a defined path to source ownership when required.'

export const HOW_IT_WORKS_STEPS = [
  {
    title: 'Create the product',
    body: `${PRODUCT_RANGE_FULL.replace(/^from /, 'From ')} — Software Principle delivers the product itself.`,
  },
  {
    title: 'Support it in production',
    body: 'Continuous operational care so the product remains reliable, effective, and aligned with business objectives.',
  },
  {
    title: 'Scale as usage grows',
    body: 'Expand capacity, features, and market reach without compromising quality or governance.',
  },
  {
    title: 'Customers subscribe',
    body: 'Customers subscribe to plans within the product Software Principle created — not to professional-services hours.',
  },
  {
    title: 'Release and obtain the source',
    body: 'When ownership is preferred, exit the subscription model and receive the product source code.',
  },
]

export const OFFER_RANGE = {
  label: 'Product range',
  title: `From ${ladderStart} to ${ladderSaas}`,
  lede: 'Competitive pricing with delivery speed as the commercial advantage. One product standard across the full product range.',
  items: PRODUCT_LADDER,
}

/** Derived from integrations SSOT */
export const TECHNOLOGIES = {
  label: 'Technologies',
  title: 'Cloud and third-party platforms',
  lede: 'Products created by Software Principle integrate with established cloud and third-party platforms — each linked to its official source.',
  groups: technologyGroupsFromIntegrations(),
}

/** Internal links for crawl paths and topic relevance — topical anchors, not nav labels */
export const RELATED_LINKS = {
  home: [
    { to: '/how-it-works', label: 'Product create, support, and scale process' },
    { to: '/technologies', label: 'Cloud and third-party platforms we integrate' },
    { to: '/products', label: 'Products and customers we deliver for' },
    { to: '/articles', label: 'Software product articles' },
    { to: '/contact', label: 'Discuss a product for your business' },
  ],
  howItWorks: [
    { to: '/technologies', label: 'Cloud and third-party platforms we integrate' },
    { to: '/products', label: 'Products and customers we deliver for' },
    { to: '/articles', label: 'Software product articles' },
    { to: '/contact', label: 'Discuss a product for your business' },
  ],
  technologies: [
    { to: '/how-it-works', label: 'Product create, support, and scale process' },
    { to: '/products', label: 'Products and customers we deliver for' },
    { to: '/articles', label: 'Software product articles' },
    { to: '/contact', label: 'Discuss a product for your business' },
  ],
  contact: [
    { to: '/how-it-works', label: 'Product create, support, and scale process' },
    { to: '/technologies', label: 'Cloud and third-party platforms we integrate' },
    { to: '/products', label: 'Products and customers we deliver for' },
    { to: '/articles', label: 'Software product articles' },
  ],
  articles: [
    { to: '/how-it-works', label: 'Product create, support, and scale process' },
    { to: '/technologies', label: 'Cloud and third-party platforms we integrate' },
    { to: '/products', label: 'Products and customers we deliver for' },
    { to: '/contact', label: 'Discuss a product for your business' },
  ],
  products: [
    { to: '/how-it-works', label: 'Product create, support, and scale process' },
    { to: '/technologies', label: 'Cloud and third-party platforms we integrate' },
    { to: '/articles', label: 'Software product articles' },
    { to: '/contact', label: 'Discuss a product for your business' },
  ],
}

export const HOME_HOW = {
  label: 'How it works',
  title: 'A product lifecycle you can rely on',
  lede: 'Create the product, support and scale it, enable customer subscription — or release and transfer source ownership.',
}

export const HOME_CTA = {
  title: 'Ready to create or scale a product?',
  body: `Contact us about a product ${PRODUCT_RANGE_SHORT} — including AI — or about subscription and source ownership.`,
  button: 'Contact us',
}

export const CONTACT_LEDE =
  `Discuss a product ${PRODUCT_RANGE_SHORT} — subscribe within a Software Principle product, or obtain source ownership upon release. Reach us by WhatsApp or email.`

export const TECHNOLOGIES_PAGE_LEDE =
  'Cloud and third-party platforms Software Principle uses when creating and scaling products — each linked to its official site.'
