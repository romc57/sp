import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import IntegrationsMarquee from '../components/IntegrationsMarquee.jsx'
import RelatedLinks from '../components/RelatedLinks.jsx'
import { HOW_IT_WORKS_TEASER } from '../data/homeContent.js'
import {
  HERO,
  HOME_CTA,
  HOME_HOW,
  OFFER_RANGE,
  RELATED_LINKS,
} from '../data/offerContent.js'
import { routeByPath } from '../data/site.js'
import { applyPageHead, homeGraphJsonLd } from '../seo/pageHead.js'

const homeRoute = routeByPath('/')

export default function HomePage() {
  useEffect(() => {
    applyPageHead({
      title: homeRoute.title,
      description: homeRoute.description,
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
          <p>{HERO.body}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/how-it-works">
              How it works
            </Link>
            <Link className="btn btn-ghost" to="/contact">
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="offer-range-heading">
        <div className="wrap">
          <p className="section-label">{OFFER_RANGE.label}</p>
          <h2 id="offer-range-heading" className="section-title">
            {OFFER_RANGE.title}
          </h2>
          <p className="lede">{OFFER_RANGE.lede}</p>
          <p className="lede">
            Across that range — from local business sites to{' '}
            <Link to="/products">cross-platform SaaS for customers such as Bishvilnu</Link> —{' '}
            <Link to="/how-it-works">one lifecycle creates, supports, and scales</Link> the product.
          </p>
          <div className="stack">
            {OFFER_RANGE.items.map((item) => (
              <article key={item.title} className="capability">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <p className="section-link">
            <Link to="/how-it-works">See how products are created and scaled</Link>
          </p>
        </div>
      </section>

      <section className="section section-muted" aria-labelledby="how-teaser-heading">
        <div className="wrap">
          <p className="section-label">{HOME_HOW.label}</p>
          <h2 id="how-teaser-heading" className="section-title">
            {HOME_HOW.title}
          </h2>
          <p className="lede">{HOME_HOW.lede}</p>
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

      <IntegrationsMarquee />
      <p className="wrap section-link integrations-strip-link">
        <Link to="/technologies">All cloud and third-party platforms</Link>
      </p>

      <section className="section section-muted" aria-labelledby="explore-heading">
        <div className="wrap">
          <h2 id="explore-heading" className="section-title">
            Explore
          </h2>
          <RelatedLinks links={RELATED_LINKS.home} heading="On this site" />
        </div>
      </section>

      <section className="cta-band" aria-labelledby="cta-heading">
        <div className="wrap cta-band-inner">
          <h2 id="cta-heading">{HOME_CTA.title}</h2>
          <p>{HOME_CTA.body}</p>
          <Link className="btn btn-primary" to="/contact">
            {HOME_CTA.button}
          </Link>
        </div>
      </section>
    </>
  )
}
