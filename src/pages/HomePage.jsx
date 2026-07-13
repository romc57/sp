import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CAPABILITY_PREVIEW, HOW_IT_WORKS_TEASER } from '../data/homeContent.js'
import { applyPageHead, homeGraphJsonLd } from '../seo/pageHead.js'

export default function HomePage() {
  useEffect(() => {
    applyPageHead({
      title: 'Software Principle',
      description:
        'Software Principle helps businesses manage and create software projects with development that is precise, fast, and scalable.',
      path: '/',
      jsonLd: homeGraphJsonLd(),
    })
  }, [])

  return (
    <>
      <section className="hero">
        <div className="wrap hero-inner">
          <h1 className="hero-brand">
            Software <span>Principle</span>
          </h1>
          <p>
            The business platform for creating and managing software projects — so development stays
            precise, moves fast, and scales with you.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/capabilities">
              See capabilities
            </Link>
            <Link className="btn btn-ghost" to="/contact">
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="capabilities-preview-heading">
        <div className="wrap">
          <p className="section-label">Capabilities</p>
          <h2 id="capabilities-preview-heading" className="section-title">
            Built for precise, fast, scalable delivery
          </h2>
          <p className="lede">
            Software Principle gives your business the abilities to keep software delivery under
            control as you grow.
          </p>
          <div className="stack">
            {CAPABILITY_PREVIEW.map((item) => (
              <article key={item.title} className="capability">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <p className="section-link">
            <Link to="/capabilities">See all capabilities</Link>
          </p>
        </div>
      </section>

      <section className="section section-muted" aria-labelledby="how-teaser-heading">
        <div className="wrap">
          <p className="section-label">How it works</p>
          <h2 id="how-teaser-heading" className="section-title">
            From project chaos to a system you trust
          </h2>
          <p className="lede">
            Outcomes for your business — create, deliver, and scale without losing quality or speed.
          </p>
          <div className="stack">
            {HOW_IT_WORKS_TEASER.map((item) => (
              <article key={item.title} className="step capability">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <p className="section-link">
            <Link to="/how-it-works">See how it works</Link>
          </p>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="cta-heading">
        <div className="wrap cta-band-inner">
          <h2 id="cta-heading">Ready to make delivery precise, fast, and scalable?</h2>
          <p>Tell us about your projects. We will help you get them under control.</p>
          <Link className="btn btn-primary" to="/contact">
            Talk to us
          </Link>
        </div>
      </section>
    </>
  )
}
