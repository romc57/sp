import { Link } from 'react-router-dom'
import ContactChannel from './ContactChannel.jsx'
import { NAV_LINKS, SITE_NAME, SITE_SHORT, CONTACT_EMAIL, CONTACT_WHATSAPP_DISPLAY, whatsappUrl } from '../data/site.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="wrap site-footer-inner">

        {/* Brand */}
        <div className="site-footer-brand">
          <p className="site-footer-name">
            <span className="site-footer-mark">SP</span> {SITE_NAME}
          </p>
          <p className="site-footer-tagline">Precise. Fast. Scalable.</p>
        </div>

        {/* Contact pills — always visible */}
        <div className="site-footer-contact" aria-label="Quick contact">
          <ContactChannel
            compact
            label="WhatsApp"
            value={CONTACT_WHATSAPP_DISPLAY}
            openHref={whatsappUrl()}
            iconType="whatsapp"
          />
          <ContactChannel
            compact
            label="Email"
            value={CONTACT_EMAIL}
            openHref={`mailto:${CONTACT_EMAIL}`}
            iconType="email"
          />
        </div>

        {/* Nav */}
        <nav aria-label="Footer navigation">
          <ul className="footer-links">
            {NAV_LINKS.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

      </div>
      <div className="wrap site-footer-copy">
        © {year} {SITE_NAME} ({SITE_SHORT})
      </div>
    </footer>
  )
}
