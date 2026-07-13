import { useState } from 'react'
import { copyText } from '../lib/copy-text.js'

/**
 * @param {{
 *   label: string
 *   value: string
 *   openHref: string
 *   openLabel?: string
 *   openExternal?: boolean
 * }} props
 */
export default function ContactChannel({
  label,
  value,
  openHref,
  openLabel = 'Open',
  openExternal = false,
}) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    await copyText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="contact-channel">
      <p className="contact-channel-label">{label}</p>
      <p className="contact-channel-value">{value}</p>
      <div className="contact-channel-actions">
        <a
          className="btn btn-ghost"
          href={openHref}
          {...(openExternal
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {openLabel}
        </a>
        <button className="btn btn-ghost" type="button" onClick={onCopy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
