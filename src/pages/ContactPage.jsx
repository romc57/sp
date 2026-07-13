import { useEffect } from 'react'
import ContactChannel from '../components/ContactChannel.jsx'
import RelatedLinks from '../components/RelatedLinks.jsx'
import { applyPageHead, contactPageJsonLd } from '../seo/pageHead.js'
import { CONTACT_LEDE, RELATED_LINKS } from '../data/offerContent.js'
import {
  CONTACT_EMAIL,
  CONTACT_WHATSAPP_DISPLAY,
  routeByPath,
  whatsappUrl,
} from '../data/site.js'

const route = routeByPath('/contact')

export default function ContactPage() {
  useEffect(() => {
    applyPageHead({
      title: route.title,
      description: route.description,
      path: '/contact',
      jsonLd: contactPageJsonLd(),
    })
  }, [])

  return (
    <div className="page">
      <div className="wrap">
        <h1>Contact</h1>
        <p className="lede">{CONTACT_LEDE}</p>

        <div className="contact-channels" aria-label="Direct contact">
          <ContactChannel
            label="WhatsApp"
            value={CONTACT_WHATSAPP_DISPLAY}
            openHref={whatsappUrl()}
            openLabel="Open WhatsApp"
          />
          <ContactChannel
            label="Email"
            value={CONTACT_EMAIL}
            openHref={`mailto:${CONTACT_EMAIL}`}
            openLabel="Open email"
          />
        </div>

        <RelatedLinks links={RELATED_LINKS.contact} />
      </div>
    </div>
  )
}
