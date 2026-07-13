import { absoluteUrl, defaultOgImageUrl, SITE_NAME, SITE_ORIGIN } from '../data/site.js'

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
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
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

export function organizationJsonLd() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    logo: absoluteUrl('/favicon.svg'),
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
export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
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
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} · ${SITE_NAME}`

  document.title = fullTitle
  setMetaName('description', description)
  setCanonical(canonicalUrl)
  setMetaProperty('og:title', fullTitle)
  setMetaProperty('og:description', description)
  setMetaProperty('og:url', canonicalUrl)
  setMetaProperty('og:image', imageUrl)
  setMetaProperty('og:type', 'website')
  setMetaProperty('og:locale', 'en_US')
  setMetaProperty('og:site_name', SITE_NAME)
  setMetaName('twitter:card', 'summary_large_image')
  setMetaName('twitter:title', fullTitle)
  setMetaName('twitter:description', description)
  setMetaName('twitter:image', imageUrl)

  if (robots) {
    setMetaName('robots', robots)
  } else {
    document.head.querySelector('meta[name="robots"]')?.remove()
  }

  setJsonLd(jsonLd ?? null)
}
