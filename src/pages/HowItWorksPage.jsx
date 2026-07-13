import { useEffect } from 'react'
import RelatedLinks from '../components/RelatedLinks.jsx'
import { HOW_IT_WORKS_LEDE, HOW_IT_WORKS_STEPS, RELATED_LINKS } from '../data/offerContent.js'
import { applyPageHead, breadcrumbJsonLd } from '../seo/pageHead.js'
import { routeByPath, SITE_NAME } from '../data/site.js'

const route = routeByPath('/how-it-works')

export default function HowItWorksPage() {
  useEffect(() => {
    applyPageHead({
      title: route.title,
      description: route.description,
      path: '/how-it-works',
      jsonLd: breadcrumbJsonLd([
        { name: SITE_NAME, path: '/' },
        { name: route.title, path: '/how-it-works' },
      ]),
    })
  }, [])

  return (
    <div className="page">
      <div className="wrap">
        <h1>How it works</h1>
        <p className="lede">{HOW_IT_WORKS_LEDE}</p>
        <div className="stack">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <article key={step.title} className="step capability">
              <h2>{step.title}</h2>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
        <RelatedLinks links={RELATED_LINKS.howItWorks} />
      </div>
    </div>
  )
}
