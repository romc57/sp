import { TRUST_SIGNALS } from '../data/trustSignals.js'

/**
 * Horizontal trust-signal band that sits between the hero and the first
 * capability section — four at-a-glance scope claims.
 */
export default function TrustBand() {
  return (
    <section className="trust-band" aria-label="Product scope at a glance">
      <div className="wrap trust-band-inner">
        {TRUST_SIGNALS.map((signal) => (
          <div key={signal.id} className="trust-signal">
            <span className="trust-signal-glyph" aria-hidden="true">
              {signal.glyph}
            </span>
            <div>
              <p className="trust-signal-label">{signal.label}</p>
              <p className="trust-signal-sub">{signal.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
