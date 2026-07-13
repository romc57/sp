import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import RelatedLinks from '../components/RelatedLinks.jsx'
import { ARTICLES } from '../data/articles.js'
import { RELATED_LINKS } from '../data/offerContent.js'
import { routeByPath } from '../data/site.js'
import { applyPageHead, articlesIndexJsonLd } from '../seo/pageHead.js'

const route = routeByPath('/articles')

export default function ArticlesPage() {
  useEffect(() => {
    applyPageHead({
      title: route.title,
      description: route.description,
      path: '/articles',
      jsonLd: articlesIndexJsonLd(route.description),
    })
  }, [])

  return (
    <div className="page" data-module="articles">
      <div className="wrap">
        <h1>Articles</h1>
        <p className="lede">
          Writing from Software Principle on products that stay precise, fast, and scalable.
        </p>
        {ARTICLES.length === 0 ? (
          <p className="articles-empty">No articles published yet.</p>
        ) : (
          <ul className="articles-list">
            {ARTICLES.map((article) => (
              <li key={article.slug}>
                <Link to={`/articles/${article.slug}`}>{article.title}</Link>
                {article.metaDescription ? (
                  <p className="articles-list-desc">{article.metaDescription}</p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
        <RelatedLinks links={RELATED_LINKS.articles} />
      </div>
    </div>
  )
}
