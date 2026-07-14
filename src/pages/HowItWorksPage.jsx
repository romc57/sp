import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LifecycleStep from '../components/LifecycleStep.jsx'
import RelatedLinks from '../components/RelatedLinks.jsx'
import RevealSection from '../components/RevealSection.jsx'
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
        <p className="lede">
          See a finished example for a customer like{' '}
          <Link to="/products">Bishvilnu</Link>, or browse{' '}
          <Link to="/articles">articles on precise, scalable delivery</Link>.
        </p>
        <div className="lifecycle-flow">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <RevealSection key={step.title} delay={i * 90}>
              <LifecycleStep step={step} index={i} />
            </RevealSection>
          ))}
        </div>
        <RelatedLinks links={RELATED_LINKS.howItWorks} />
      </div>
    </div>
  )
}
