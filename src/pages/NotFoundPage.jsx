import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { applyPageHead } from '../seo/pageHead.js'

export default function NotFoundPage() {
  useEffect(() => {
    applyPageHead({
      title: 'Not found',
      description: 'Page not found.',
      path: '/404',
    })
  }, [])

  return (
    <div className="page">
      <div className="wrap">
        <h1>Not found</h1>
        <p className="lede">That page is not part of the Software Principle site.</p>
        <Link className="btn btn-primary" to="/">
          Back home
        </Link>
      </div>
    </div>
  )
}
