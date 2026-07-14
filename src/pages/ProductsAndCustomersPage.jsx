import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import RelatedLinks from '../components/RelatedLinks.jsx'
import { PRODUCTS_AND_CUSTOMERS } from '../data/products.js'
import { RELATED_LINKS } from '../data/offerContent.js'
import { routeByPath } from '../data/site.js'
import { applyPageHead, productsPageJsonLd } from '../seo/pageHead.js'

const route = routeByPath('/products')

export default function ProductsAndCustomersPage() {
  useEffect(() => {
    applyPageHead({
      title: route.title,
      description: route.description,
      path: '/products',
      jsonLd: productsPageJsonLd(route.description),
    })
  }, [])

  return (
    <div className="page" data-module="products">
      <div className="wrap">
        <h1>Products and customers</h1>
        <p className="lede">
          Products Software Principle created, supports, and scales for real customers.
        </p>
        <ul className="products-list">
          {PRODUCTS_AND_CUSTOMERS.map((product) => (
            <li key={product.id} className="products-list-item">
              <p className="section-label">{product.ladderTier}</p>
              <h2>
                <a href={product.customerUrl} target="_blank" rel="noopener noreferrer">
                  {product.customerName}
                </a>
              </h2>
              <p className="products-list-desc">{product.summary}</p>
              <p className="section-link">
                <Link to={`/articles/${product.articleSlug}`}>Read the case study</Link>
              </p>
            </li>
          ))}
        </ul>
        <RelatedLinks links={RELATED_LINKS.products} heading="Related on this site" />
      </div>
    </div>
  )
}
