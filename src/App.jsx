import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import HowItWorksPage from './pages/HowItWorksPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import ArticlesPage from './pages/ArticlesPage.jsx'
import ArticleDetailPage from './pages/ArticleDetailPage.jsx'
import ProductsAndCustomersPage from './pages/ProductsAndCustomersPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { Ga4RouteTracker } from './analytics/Ga4RouteTracker.jsx'

export default function App() {
  return (
    <>
      <Ga4RouteTracker />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="products" element={<ProductsAndCustomersPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:slug" element={<ArticleDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}
