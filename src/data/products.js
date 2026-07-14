/**
 * Products and customers portfolio SSOT — named deliveries only here (not PRODUCT_LADDER).
 * Outcomes language only; no platform internals or clinical detail.
 * Customer identity (name, website) is sourced from the customer's own LinkedIn page — SSOT below.
 */

/** Real customer name and public link, as published on their LinkedIn company page. */
export const BISHVILNU_CUSTOMER = {
  name: 'Bishvilnu',
  url: 'https://www.linkedin.com/company/bishvilenu',
}

export const PRODUCTS_AND_CUSTOMERS = [
  {
    id: 'bishvilnu',
    customerName: BISHVILNU_CUSTOMER.name,
    customerUrl: BISHVILNU_CUSTOMER.url,
    ladderTier: 'Cross-platform SaaS',
    summary:
      'A cross-platform SaaS product for guided personal-growth journeys: participants document their path, join shared programs, and complete structured activities with caretaker oversight — on web and mobile, with administration for the organization.',
    articleSlug: 'bishvilnu-software-principle-challenge-solved',
  },
]

/** @param {string} id */
export function productByCustomerId(id) {
  return PRODUCTS_AND_CUSTOMERS.find((p) => p.id === id) ?? null
}
