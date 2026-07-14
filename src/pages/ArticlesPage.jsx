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
          <div className="articles-grid">
            {ARTICLES.map((article) => {
              const wordCount = article.htmlBody ? article.htmlBody.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length : 0
              const readTime = Math.max(1, Math.ceil(wordCount / 200))
              return (
                <article key={article.slug} className="article-card">
                  <Link to={`/articles/${article.slug}`} className="article-card-link">
                    <div className="article-card-meta">
                      <span className="article-card-tag">Insight</span>
                      <span className="article-card-divider">•</span>
                      <span className="article-card-read-time">{readTime} min read</span>
                    </div>
                    <h2 className="article-card-title">{article.title}</h2>
                    {article.metaDescription && (
                      <p className="article-card-desc">{article.metaDescription}</p>
                    )}
                    <div className="article-card-more">
                      Read article
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>
        )}
        <RelatedLinks links={RELATED_LINKS.articles} />
      </div>
    </div>
  )
}
