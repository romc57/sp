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

  return (
    <div className="page" data-module="articles" data-content-id={article.contentId ?? undefined}>
      <div className="wrap">
        <article className="article-body">
          <h1>{article.h1}</h1>
          <div dangerouslySetInnerHTML={{ __html: article.htmlBody }} />
        </article>
        <p className="articles-back">
          <Link to="/articles">All articles</Link>
        </p>
      </div>
    </div>
  )
}
