import { useEffect, useRef } from 'react'

/**
 * Wraps children in an element that gains the `.revealed` class when it enters
 * the viewport. Pair with `.reveal` / `.revealed` CSS classes.
 *
 * @param {{ children: React.ReactNode, delay?: number, className?: string, as?: string }} props
 */
export default function RevealSection({ children, delay = 0, className = '', as, ...rest }) {
  const ref = useRef(null)
  const Component = as || 'div'

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) {
            setTimeout(() => el.classList.add('revealed'), delay)
          } else {
            el.classList.add('revealed')
          }
          observer.unobserve(el)
        }
      },
      { threshold: 0.12 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <Component ref={ref} className={`reveal ${className}`.trim()} {...rest}>
      {children}
    </Component>
  )
}
