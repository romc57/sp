import { Link } from 'react-router-dom'
import { NAV_LINKS, SITE_NAME, SITE_SHORT } from '../data/site.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="wrap site-footer-inner">
        <div className="site-footer-brand">
          <p>
            © {year} {SITE_NAME} ({SITE_SHORT})
          </p>
          <p className="site-footer-tagline">Precise. Fast. Scalable.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="footer-links">
            {NAV_LINKS.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
