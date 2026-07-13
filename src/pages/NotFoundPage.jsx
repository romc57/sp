import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { applyPageHead } from '../seo/pageHead.js'

function routerPathFromLocation(pathname) {
  return pathname.startsWith('/') ? pathname : `/${pathname}`
}

export default function NotFoundPage() {
  const location = useLocation()

  useEffect(() => {
    applyPageHead({
      title: 'Not found',
      description: 'Page not found.',
      path: routerPathFromLocation(location.pathname),
      robots: 'noindex, nofollow',
    })
  }, [location.pathname])

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
