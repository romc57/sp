/** Home below-fold copy — derived from offer SSOT */
import { HOW_IT_WORKS_STEPS } from './offerContent.js'

export const HOW_IT_WORKS_TEASER = HOW_IT_WORKS_STEPS.slice(0, 3).map(({ title, body }) => ({
  title,
  body,
}))
