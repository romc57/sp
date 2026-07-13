import { useEffect, useState } from 'react'
import ContactChannel from '../components/ContactChannel.jsx'
import { applyPageHead, contactPageJsonLd } from '../seo/pageHead.js'
import {
  CONTACT_EMAIL,
  CONTACT_WHATSAPP_DISPLAY,
  routeByPath,
  whatsappUrl,
} from '../data/site.js'

const route = routeByPath('/contact')

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    applyPageHead({
      title: route.title,
      description: route.description,
      path: '/contact',
      jsonLd: contactPageJsonLd(),
    })
  }, [])

  function onSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`Software Principle inquiry from ${name || 'someone'}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <div className="page">
      <div className="wrap">
        <h1>Contact</h1>
        <p className="lede">
          Tell us about your projects. We help businesses make development precise, fast, and scalable.
        </p>

        <div className="contact-channels" aria-label="Direct contact">
          <ContactChannel
            label="WhatsApp"
            value={CONTACT_WHATSAPP_DISPLAY}
            openHref={whatsappUrl()}
            openLabel="Open WhatsApp"
            openExternal
          />
          <ContactChannel
            label="Email"
            value={CONTACT_EMAIL}
            openHref={`mailto:${CONTACT_EMAIL}`}
            openLabel="Open email"
          />
        </div>

        <form className="contact-box" onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button className="btn btn-primary" type="submit">
            Send message
          </button>
        </form>
      </div>
    </div>
  )
}
