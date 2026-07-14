import { useState } from 'react'
import { copyText } from '../lib/copy-text.js'

const ICONS = {
  whatsapp: (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  ),
  email: (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  copy: (
    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  ),
  check: (
    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  external: (
    <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
}

/**
 * @param {{
 *   label: string
 *   value: string
 *   openHref: string
 *   openLabel?: string
 *   iconType?: 'whatsapp' | 'email'
 *   compact?: boolean
 * }} props
 */
export default function ContactChannel({ label, value, openHref, openLabel = 'Open', iconType, compact = false }) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    await copyText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  if (compact) {
    return (
      <a
        className="contact-channel-pill"
        href={openHref}
        aria-label={`${label}: ${value}`}
        title={`${label}: ${value}`}
      >
        <span className="contact-channel-pill-icon">
          {iconType && ICONS[iconType]}
        </span>
        <span className="contact-channel-pill-value">{value}</span>
      </a>
    )
  }

  return (
    <div className="contact-channel-card">
      <div className="contact-channel-card-header">
        {iconType && (
          <span className="contact-channel-card-icon">
            {ICONS[iconType]}
          </span>
        )}
        <span className="contact-channel-card-label">{label}</span>
      </div>
      <a className="contact-channel-card-value" href={openHref}>
        {value}
      </a>
      <div className="contact-channel-card-actions">
        <a className="btn btn-primary btn-sm" href={openHref}>
          {ICONS.external}
          {openLabel}
        </a>
        <button className="btn btn-ghost btn-sm" type="button" onClick={onCopy} aria-label={copied ? 'Copied' : 'Copy to clipboard'}>
          {copied ? ICONS.check : ICONS.copy}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
