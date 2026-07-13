import { NavLink, Link } from 'react-router-dom'
import { NAV_LINKS, SITE_NAME, SITE_SHORT } from '../data/site.js'

export default function Navbar() {
  return (
    <header className="site-nav">
      <div className="wrap site-nav-inner">
        <Link to="/" className="brand" aria-label={SITE_NAME}>
          <span className="brand-mark">{SITE_SHORT}</span>
          <span className="brand-name">Software Principle</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="nav-links">
            {NAV_LINKS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to}>{item.label}</NavLink>
              </li>
            ))}
            <li className="nav-cta">
              <Link className="btn btn-primary" to="/contact">
                Contact us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
