import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { articleBySlug } from '../data/articles.js'
import { applyPageHead, articlePageJsonLd } from '../seo/pageHead.js'

export default function ArticleDetailPage() {
  const { slug = '' } = useParams()
  const article = articleBySlug(slug)

  useEffect(() => {
    if (!article) {
      applyPageHead({
        title: 'Article not found',
        description: 'This article is not published on Software Principle.',
        path: `/articles/${slug}`,
        robots: 'noindex, nofollow',
      })
      return
    }
    applyPageHead({
      title: article.title,
      description: article.metaDescription,
      path: `/articles/${article.slug}`,
      jsonLd: articlePageJsonLd(article),
    })
  }, [article, slug])

  if (!article) {
    return (
      <div className="page" data-module="articles">
        <div className="wrap">
          <h1>Article not found</h1>
          <p className="lede">This article is not published yet.</p>
          <p>
            <Link to="/articles">All articles</Link>
          </p>
        </div>
      </div>
    )
  }

  // Calculate dynamic read time (approx. 200 words per minute)
  const wordCount = article.htmlBody ? article.htmlBody.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length : 0
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <div className="page" data-module="articles" data-content-id={article.contentId ?? undefined}>
      <div className="wrap">
        <article className="article-body">
          <div className="article-meta">
            <span className="article-tag">Insight</span>
            <span className="article-meta-divider">•</span>
            <span className="article-read-time">{readTime} min read</span>
          </div>
          <h1>{article.h1}</h1>
          <div className="article-content" dangerouslySetInnerHTML={{ __html: article.htmlBody }} />
        </article>
        <p className="articles-back">
          <Link to="/articles" className="back-link">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to articles
          </Link>
        </p>
      </div>
    </div>
  )
}
