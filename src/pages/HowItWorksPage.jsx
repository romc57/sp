import { useEffect } from 'react'
import { applyPageHead, breadcrumbJsonLd } from '../seo/pageHead.js'
import { SITE_NAME } from '../data/site.js'

const STEPS = [
  {
    title: 'Manage and create projects',
    body: 'Bring every software project into one place — start new work and keep existing portfolios organized.',
  },
  {
    title: 'Keep quality precise',
    body: 'Build with reviewable changes and proven checks so what you ship matches what you meant.',
  },
  {
    title: 'Iterate fast',
    body: 'Run parallel workstreams and short feedback loops so teams move without waiting on chaos.',
  },
  {
    title: 'Scale without sprawl',
    body: 'Add projects and contributors while standards and visibility stay consistent.',
  },
  {
    title: 'Work with grounded assistance',
    body: 'Get help that knows your project context — answers and drafts tied to your real materials, not generic noise.',
  },
  {
    title: 'Ready to publish',
    body: 'Move from local confidence to published releases with a clear path to environments your customers see.',
  },
]

export default function HowItWorksPage() {
  useEffect(() => {
    applyPageHead({
      title: 'How it works',
      description:
        'How Software Principle helps businesses manage projects, stay precise, move fast, and scale delivery.',
      path: '/how-it-works',
      jsonLd: breadcrumbJsonLd([
        { name: SITE_NAME, path: '/' },
        { name: 'How it works', path: '/how-it-works' },
      ]),
    })
  }, [])

  return (
    <div className="page">
      <div className="wrap">
        <h1>How it works</h1>
        <p className="lede">
          Outcomes for your business — not a tour of tooling. Software Principle turns project creation
          and delivery into a system you can trust.
        </p>
        <div className="stack">
          {STEPS.map((step) => (
            <article key={step.title} className="step capability">
              <h2>{step.title}</h2>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
