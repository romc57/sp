import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { NAV_LINKS, SITE_NAME, SITE_SHORT } from '../data/site.js'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [isOpen])

  return (
    <header className={`site-nav ${isOpen ? 'is-open' : ''}`}>
      <div className="wrap site-nav-inner">
        <Link to="/" className="brand" aria-label={SITE_NAME} onClick={() => setIsOpen(false)}>
          <span className="brand-mark">{SITE_SHORT}</span>
          <span className="brand-name">Software Principle</span>
        </Link>
        
        <button
          className={`bun-menu-btn ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="primary-nav"
          aria-label="Toggle menu"
        >
          <span className="bun-lines-container">
            <span className="bun-line top"></span>
            <span className="bun-line middle"></span>
            <span className="bun-line bottom"></span>
          </span>
        </button>

        <nav id="primary-nav" aria-label="Primary" className={`site-nav-links ${isOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            {NAV_LINKS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} onClick={() => setIsOpen(false)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="nav-cta">
              <Link className="btn btn-primary" to="/contact" onClick={() => setIsOpen(false)}>
                Contact us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
