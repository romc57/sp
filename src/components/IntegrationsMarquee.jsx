import IntegrationIconLink from './IntegrationIconLink.jsx'
import { INTEGRATIONS_STRIP, supportedIntegrations } from '../data/integrations.js'

/** Continuous horizontal strip of supported third-party integrations */
export default function IntegrationsMarquee() {
  const items = supportedIntegrations()
  const loop = [...items, ...items]

  return (
    <section className="integrations-strip" aria-labelledby="integrations-strip-heading">
      <div className="wrap">
        <p className="section-label">{INTEGRATIONS_STRIP.label}</p>
        <h2 id="integrations-strip-heading" className="section-title">
          {INTEGRATIONS_STRIP.title}
        </h2>
        <p className="lede">{INTEGRATIONS_STRIP.lede}</p>
      </div>
      <div className="integrations-marquee" role="presentation">
        <ul className="integrations-marquee-track">
          {loop.map((item, index) => (
            <li key={`${item.id}-${index}`}>
              <IntegrationIconLink name={item.name} href={item.href} iconSlug={item.iconSlug} />
              <span className="integrations-marquee-name">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
