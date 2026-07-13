import { Link } from 'react-router-dom'

/** @param {{ to: string, label: string }[]} links */
export default function RelatedLinks({ links, heading = 'Related' }) {
  if (!links?.length) return null
  return (
    <nav className="related-links" aria-label={heading}>
      <p className="section-label">{heading}</p>
      <ul className="related-links-list">
        {links.map((item) => (
          <li key={item.to}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
