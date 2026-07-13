import {
  absoluteUrl,
  CONTACT_EMAIL,
  contactTelephone,
  defaultOgImageUrl,
  LOGO_PATH,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_ORIGIN,
} from '../data/site.js'

const JSON_LD_ATTR = 'data-sp-jsonld'

function getOrCreateMeta(selector, create) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  return el
}

function setMetaName(name, content) {
  const el = getOrCreateMeta(`meta[name="${name}"]`, () => {
    const m = document.createElement('meta')
    m.setAttribute('name', name)
    return m
  })
  el.setAttribute('content', content)
}

function setMetaProperty(property, content) {
  const el = getOrCreateMeta(`meta[property="${property}"]`, () => {
    const m = document.createElement('meta')
    m.setAttribute('property', property)
    return m
  })
  el.setAttribute('content', content)
}

function setCanonical(href) {
  document.querySelectorAll('link[rel="canonical"]').forEach((link) => link.remove())
  const link = document.createElement('link')
  link.setAttribute('rel', 'canonical')
  document.head.appendChild(link)
  link.setAttribute('href', href)
}

function setJsonLd(data) {
  let script = document.head.querySelector(`script[${JSON_LD_ATTR}]`)
  if (!data) {
    script?.remove()
    return
  }
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute(JSON_LD_ATTR, '')
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

export function fullPageTitle(title) {
  return title.includes(SITE_NAME) ? title : `${title} · ${SITE_NAME}`
}

export function organizationJsonLd() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    logo: absoluteUrl(LOGO_PATH),
  }
}

export function websiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_ORIGIN}/#website`,
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
  }
}

export function homeGraphJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationJsonLd(), websiteJsonLd()],
  }
}

/** @param {{ name: string, path: string }[]} items */
export function breadcrumbListNode(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

/** @param {{ name: string, path: string }[]} items */
export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    ...breadcrumbListNode(items),
  }
}

/** @param {string} description */
export function professionalServiceJsonLd(description) {
  return {
    '@type': 'ProfessionalService',
    '@id': `${SITE_ORIGIN}/capabilities#service`,
    name: SITE_NAME,
    url: absoluteUrl('/capabilities'),
    description,
    provider: { '@id': `${SITE_ORIGIN}/#organization` },
  }
}

/** @param {string} description */
export function capabilitiesPageJsonLd(description) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbListNode([
        { name: SITE_NAME, path: '/' },
        { name: 'Capabilities', path: '/capabilities' },
      ]),
      professionalServiceJsonLd(description),
    ],
  }
}

export function contactPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbListNode([
        { name: SITE_NAME, path: '/' },
        { name: 'Contact', path: '/contact' },
      ]),
      {
        '@type': 'ContactPage',
        '@id': `${SITE_ORIGIN}/contact#webpage`,
        url: absoluteUrl('/contact'),
        mainEntity: {
          '@type': 'ContactPoint',
          email: CONTACT_EMAIL,
          telephone: contactTelephone(),
          contactType: 'customer support',
        },
      },
    ],
  }
}

/** @param {string} description */
export function articlesIndexJsonLd(description) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbListNode([
        { name: SITE_NAME, path: '/' },
        { name: 'Articles', path: '/articles' },
      ]),
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_ORIGIN}/articles#webpage`,
        url: absoluteUrl('/articles'),
        name: 'Articles',
        description,
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
      },
    ],
  }
}

/**
 * @param {{
 *   slug: string,
 *   title: string,
 *   h1: string,
 *   metaDescription: string,
 * }} article
 */
export function articlePageJsonLd(article) {
  const path = `/articles/${article.slug}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbListNode([
        { name: SITE_NAME, path: '/' },
        { name: 'Articles', path: '/articles' },
        { name: article.title, path },
      ]),
      {
        '@type': 'Article',
        '@id': `${SITE_ORIGIN}${path}#article`,
        headline: article.h1,
        description: article.metaDescription,
        mainEntityOfPage: absoluteUrl(path),
        publisher: { '@id': `${SITE_ORIGIN}/#organization` },
      },
    ],
  }
}

/**
 * @param {{
 *   title: string,
 *   description: string,
 *   path: string,
 *   ogImage?: string,
 *   robots?: string,
 *   jsonLd?: object | object[],
 * }} opts
 */
export function applyPageHead({ title, description, path, ogImage, robots, jsonLd }) {
  const canonicalUrl = absoluteUrl(path)
  const imageUrl = ogImage || defaultOgImageUrl()
  const fullTitle = fullPageTitle(title)

  document.title = fullTitle
  setMetaName('description', description)
  setCanonical(canonicalUrl)
  setMetaProperty('og:title', fullTitle)
  setMetaProperty('og:description', description)
  setMetaProperty('og:url', canonicalUrl)
  setMetaProperty('og:image', imageUrl)
  setMetaProperty('og:image:width', String(OG_IMAGE_WIDTH))
  setMetaProperty('og:image:height', String(OG_IMAGE_HEIGHT))
  setMetaProperty('og:image:alt', OG_IMAGE_ALT)
  setMetaProperty('og:type', 'website')
  setMetaProperty('og:locale', 'en_US')
  setMetaProperty('og:site_name', SITE_NAME)
  setMetaName('twitter:card', 'summary_large_image')
  setMetaName('twitter:title', fullTitle)
  setMetaName('twitter:description', description)
  setMetaName('twitter:image', imageUrl)
  setMetaName('twitter:image:alt', OG_IMAGE_ALT)

  if (robots) {
    setMetaName('robots', robots)
  } else {
    document.head.querySelector('meta[name="robots"]')?.remove()
  }

  setJsonLd(jsonLd ?? null)
}
