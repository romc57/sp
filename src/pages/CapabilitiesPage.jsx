import { useEffect } from 'react'
import { applyPageHead, breadcrumbJsonLd } from '../seo/pageHead.js'
import { SITE_NAME } from '../data/site.js'

const ITEMS = [
  {
    title: 'Precise',
    body: 'Quality loops, clear outcomes, and trusted changes — so shipping stays deliberate instead of fragile.',
  },
  {
    title: 'Fast',
    body: 'Iterate quickly with live project environments and focused assistance, without losing the thread.',
  },
  {
    title: 'Scalable',
    body: 'Grow across many projects and teams with one place to manage work — order instead of sprawl.',
  },
]

export default function CapabilitiesPage() {
  useEffect(() => {
    applyPageHead({
      title: 'Capabilities',
      description:
        'Precise quality loops, fast iteration, and scalable project management for software businesses.',
      path: '/capabilities',
      jsonLd: breadcrumbJsonLd([
        { name: SITE_NAME, path: '/' },
        { name: 'Capabilities', path: '/capabilities' },
      ]),
    })
  }, [])

  return (
    <div className="page">
      <div className="wrap">
        <h1>Capabilities</h1>
        <p className="lede">
          What Software Principle gives your business — the abilities that keep software delivery under
          control as you grow.
        </p>
        <div className="stack">
          {ITEMS.map((item) => (
            <article key={item.title} className="capability">
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
