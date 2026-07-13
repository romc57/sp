import { SITE_NAME, SITE_SHORT } from '../data/site.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="wrap site-footer-inner">
        <p>
          © {year} {SITE_NAME} ({SITE_SHORT})
        </p>
        <p>Precise. Fast. Scalable.</p>
      </div>
    </footer>
  )
}
