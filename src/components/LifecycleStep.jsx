/**
 * A single numbered lifecycle step.
 * Rendered inside a `.lifecycle-flow` container for the connecting-line effect.
 *
 * @param {{ step: { title: string, body: string }, index: number }} props
 */
export default function LifecycleStep({ step, index }) {
  return (
    <article className="lifecycle-step" aria-label={`Step ${index + 1}: ${step.title}`}>
      <div className="lifecycle-step-number" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="lifecycle-step-content">
        <h3 className="lifecycle-step-title">{step.title}</h3>
        <p className="lifecycle-step-body">{step.body}</p>
      </div>
    </article>
  )
}
