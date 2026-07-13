import { useEffect, useState } from 'react'
import { applyPageHead } from '../seo/pageHead.js'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    applyPageHead({
      title: 'Contact',
      description: 'Contact Software Principle about managing and scaling your software projects.',
      path: '/contact',
    })
  }, [])

  function onSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`Software Principle inquiry from ${name || 'someone'}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)
    window.location.href = `mailto:hello@softwareprinciple.dev?subject=${subject}&body=${body}`
  }

  return (
    <div className="page">
      <div className="wrap">
        <h1>Contact</h1>
        <p className="lede">
          Tell us about your projects. We help businesses make development precise, fast, and scalable.
        </p>
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
