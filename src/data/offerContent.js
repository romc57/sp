/** Product-company copy SSOT — outcomes only; no platform internals */

import { technologyGroupsFromIntegrations } from './integrations.js'

export const HERO = {
  body: 'Software Principle creates, supports, and scales software products — including full AI implementations — so they stay precise, move fast, and grow at sharp prices.',
}

export const HOW_IT_WORKS_LEDE =
  'Software Principle creates products, keeps them healthy, and lets users subscribe — with a clear path to own the source when you are ready.'

export const HOW_IT_WORKS_STEPS = [
  {
    title: 'Create the product',
    body: 'From a small SEO-ready business site to a large SaaS platform or an AI-backed system — SP builds the product itself.',
  },
  {
    title: 'Support it in production',
    body: 'Ongoing care so the product stays reliable, useful, and aligned with the business as it runs.',
  },
  {
    title: 'Scale as usage grows',
    body: 'Grow capacity, features, and reach without losing quality or control.',
  },
  {
    title: 'Users subscribe',
    body: 'People subscribe to plans inside the product SP created — not to consulting hours.',
  },
  {
    title: 'Release and take the source',
    body: 'When you want ownership, leave subscription and receive the source code for the product.',
  },
]

export const OFFER_RANGE = {
  label: 'What we build',
  title: 'From local business sites to large SaaS',
  lede: 'Sharp, affordable pricing — speed of delivery is the edge. Same product standard whether the scope is small or platform-scale.',
  items: [
    {
      title: 'Small business pages',
      body: 'Polished sites with a full SEO solution so local and small businesses get found and convert.',
    },
    {
      title: 'Growing products',
      body: 'Apps and portals that need support, new features, and room to scale with real users.',
    },
    {
      title: 'SaaS and AI systems',
      body: 'Large platforms and full AI implementations across systems — subscribe inside the product, or release and own the source.',
    },
  ],
}

/** Derived from integrations SSOT */
export const TECHNOLOGIES = {
  label: 'Technologies',
  title: 'Cloud and third-party platforms',
  lede: 'Products Software Principle creates integrate with established cloud and third-party platforms — linked to official sources.',
  groups: technologyGroupsFromIntegrations(),
}

/** Internal links for crawl paths and topic relevance */
export const RELATED_LINKS = {
  home: [
    { to: '/how-it-works', label: 'How it works' },
    { to: '/technologies', label: 'Cloud technologies' },
    { to: '/articles', label: 'Articles' },
    { to: '/contact', label: 'Contact' },
  ],
  howItWorks: [
    { to: '/technologies', label: 'Cloud technologies' },
    { to: '/articles', label: 'Articles' },
    { to: '/contact', label: 'Talk about a product' },
  ],
  technologies: [
    { to: '/how-it-works', label: 'How it works' },
    { to: '/articles', label: 'Articles' },
    { to: '/contact', label: 'Contact' },
  ],
  contact: [
    { to: '/how-it-works', label: 'How it works' },
    { to: '/technologies', label: 'Cloud technologies' },
    { to: '/articles', label: 'Articles' },
  ],
  articles: [
    { to: '/how-it-works', label: 'How it works' },
    { to: '/technologies', label: 'Cloud technologies' },
    { to: '/contact', label: 'Contact' },
  ],
}

export const HOME_HOW = {
  label: 'How it works',
  title: 'Product lifecycle you can trust',
  lede: 'Create the product, support and scale it, let users subscribe — or release and take the source.',
}

export const HOME_CTA = {
  title: 'Ready to create or scale a product?',
  body: 'Tell us about a product to build, support, or grow — including AI — or about subscription and source ownership.',
  button: 'Talk to us',
}

export const CONTACT_LEDE =
  'Talk about a product to create, support, or scale — subscribe inside an SP product, or release and take the source. Reach us on WhatsApp or email.'

export const TECHNOLOGIES_PAGE_LEDE =
  'Cloud and third-party platforms Software Principle uses when creating and scaling products — each linked to its official site.'
