import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import IntegrationIconLink from '../components/IntegrationIconLink.jsx'
import RelatedLinks from '../components/RelatedLinks.jsx'
import {
  RELATED_LINKS,
  TECHNOLOGIES,
  TECHNOLOGIES_PAGE_LEDE,
} from '../data/offerContent.js'
import { applyPageHead, technologiesPageJsonLd } from '../seo/pageHead.js'
import { routeByPath } from '../data/site.js'

const route = routeByPath('/technologies')

export default function TechnologiesPage() {
  useEffect(() => {
    applyPageHead({
      title: route.title,
      description: route.description,
      path: '/technologies',
      jsonLd: technologiesPageJsonLd(route.description),
    })
  }, [])

  return (
    <div className="page">
      <div className="wrap">
        <h1>Technologies</h1>
        <p className="lede">{TECHNOLOGIES_PAGE_LEDE}</p>
        <p className="lede">
          Those platforms support products across the company range — including{' '}
          <Link to="/products">delivered SaaS for customers such as Bishvilnu</Link> — under the{' '}
          <Link to="/how-it-works">same create, support, and scale process</Link>.
        </p>
        <div className="tech-groups">
          {TECHNOLOGIES.groups.map((group) => (
            <div key={group.title} className="tech-group">
              <h2>{group.title}</h2>
              <ul className="tech-list tech-list--icons">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <IntegrationIconLink
                      name={item.name}
                      href={item.href}
                      iconSlug={item.iconSlug}
                    />
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <RelatedLinks links={RELATED_LINKS.technologies} />
      </div>
    </div>
  )
}
