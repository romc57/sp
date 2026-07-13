import { absoluteUrl, defaultOgImageUrl, SITE_NAME } from '../data/site.js'

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

/**
 * @param {{ title: string, description: string, path: string, ogImage?: string }} opts
 */
export function applyPageHead({ title, description, path, ogImage }) {
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
  setMetaName('twitter:card', 'summary_large_image')
  setMetaName('twitter:title', fullTitle)
  setMetaName('twitter:description', description)
  setMetaName('twitter:image', imageUrl)
}
