import { useState } from 'react'
import { copyText } from '../lib/copy-text.js'

/**
 * @param {{
 *   label: string
 *   value: string
 *   openHref: string
 *   openLabel?: string
 * }} props
 */
export default function ContactChannel({ label, value, openHref, openLabel = 'Open' }) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    await copyText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="contact-channel">
      <p className="contact-channel-label">{label}</p>
      <p className="contact-channel-value">
        <a className="contact-channel-link" href={openHref}>
          {value}
        </a>
      </p>
      <div className="contact-channel-actions">
        <a className="btn btn-primary" href={openHref}>
          {openLabel}
        </a>
        <button className="btn btn-ghost" type="button" onClick={onCopy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
