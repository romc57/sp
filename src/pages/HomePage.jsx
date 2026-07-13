import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { applyPageHead } from '../seo/pageHead.js'

export default function HomePage() {
  useEffect(() => {
    applyPageHead({
      title: 'Software Principle',
      description:
        'Software Principle helps businesses manage and create software projects with development that is precise, fast, and scalable.',
      path: '/',
    })
  }, [])

  return (
    <section className="hero">
      <div className="wrap hero-inner">
        <h1 className="hero-brand">
          Software <span>Principle</span>
        </h1>
        <p>
          The business platform for creating and managing software projects — so development stays
          precise, moves fast, and scales with you.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/capabilities">
            See capabilities
          </Link>
          <Link className="btn btn-ghost" to="/contact">
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  )
}
