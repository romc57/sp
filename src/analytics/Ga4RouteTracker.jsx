import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { installGa4, trackPageView } from '../analytics/ga4.js'

/** Mount once under Router: installs GA4 and tracks SPA navigations. */
export function Ga4RouteTracker() {
  const location = useLocation()

  useEffect(() => {
    installGa4()
  }, [])

  useEffect(() => {
    const suffix =
      location.pathname === '/' ? '/' : `${location.pathname}${location.search}${location.hash}`
    const publicPath = `/sp${suffix === '/' ? '/' : suffix}`
    trackPageView(publicPath)
  }, [location.pathname, location.search, location.hash])

  return null
}
