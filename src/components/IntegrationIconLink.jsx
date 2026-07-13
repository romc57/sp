import { useState } from 'react'
import { integrationIconPath } from '../data/integrations.js'

/**
 * @param {{ name: string, href: string, iconSlug: string, className?: string }} props
 */
export default function IntegrationIconLink({ name, href, iconSlug, className = '' }) {
  const [failed, setFailed] = useState(false)
  const monogram = name.trim().charAt(0).toUpperCase()

  return (
    <a
      className={`integration-icon-link ${className}`.trim()}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={name}
      aria-label={name}
    >
      {failed ? (
        <span className="integration-monogram" aria-hidden>
          {monogram}
        </span>
      ) : (
        <img
          src={integrationIconPath(iconSlug)}
          alt=""
          width={28}
          height={28}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </a>
  )
}
