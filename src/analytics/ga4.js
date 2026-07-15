import { GA4_MEASUREMENT_ID } from '../data/site.js'

let installed = false

/** Install gtag once (SPA). Safe to call repeatedly. No-ops if index.html already loaded gtag. */
export function installGa4() {
  if (installed || typeof window === 'undefined') return
  if (!GA4_MEASUREMENT_ID || !GA4_MEASUREMENT_ID.startsWith('G-')) return

  if (typeof window.gtag === 'function') {
    installed = true
    return
  }

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', GA4_MEASUREMENT_ID, { send_page_view: true })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`
  document.head.appendChild(script)
  installed = true
}

/** Record a SPA route change. Path should include basename if used (e.g. /sp/…). */
export function trackPageView(path) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}
