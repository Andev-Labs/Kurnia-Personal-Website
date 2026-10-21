import { useLayoutEffect, useRef, useState } from 'react'

import { RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { cn } from '#/lib/cn'
import { m } from '#/paraglide/messages.js'

const COUNT_MS = 700

/** First number in a figure like "−67%", "Rp59,6 jt", or "5960万印尼盾", with its decimal separator. */
const NUMBER = /\d+(?:[.,]\d+)?/

/**
 * Counts the number inside `figure` up from 0 once, the first time it scrolls into view; the text around it
 * stays put. Server HTML and reduced-motion users get the final figure straight away.
 */
function CountUp({ figure }: { figure: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(figure)

  useLayoutEffect(() => {
    const element = ref.current
    const match = figure.match(NUMBER)
    if (!element || !match || match.index === undefined) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (typeof IntersectionObserver === 'undefined') return

    const [digits] = match
    const before = figure.slice(0, match.index)
    const after = figure.slice(match.index + digits.length)
    const separator = digits.match(/[.,]/)?.[0]
    const decimals = separator ? digits.split(separator)[1].length : 0
    const target = Number.parseFloat(digits.replace(',', '.'))
    const render = (n: number) => {
      const text = n.toFixed(decimals)
      setShown(before + (separator ? text.replace('.', separator) : text) + after)
    }

    render(0)
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / COUNT_MS)
          // easeOutCubic, close to the site's cubic-bezier(0.22, 1, 0.36, 1)
          render(target * (1 - (1 - t) ** 3))
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    observer.observe(element)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [figure])

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
    </span>
  )
}

interface Stat {
  figure: string
  label: string
  note?: string
  className: string
  dotClassName: string
}

/** Four headline results from the QCC project, right under the hero. */
export function ImpactStrip() {
  const stats: Stat[] = [
    {
      figure: '−67%',
      label: m.impact_lead_time(),
      note: m.impact_lead_time_note(),
      className: 'bg-lavender-100',
      dotClassName: 'bg-violet',
    },
    { figure: '+50%', label: m.impact_capacity(), className: 'bg-mint-100', dotClassName: 'bg-mint' },
    {
      figure: m.impact_savings_value(),
      label: m.impact_savings(),
      className: 'bg-butter-100',
      dotClassName: 'bg-butter',
    },
    { figure: 'Top 10', label: m.impact_qcc(), className: 'bg-bubblegum-100', dotClassName: 'bg-bubblegum' },
  ]

  return (
    <section aria-labelledby="impact-heading" className="page-x pt-2 pb-6">
      <h2 id="impact-heading" className="sr-only">
        {m.impact_heading()}
      </h2>
      <RevealGroup stagger={0.1} className="grid grid-cols-2 gap-[18px] lg:grid-cols-4">
        {stats.map((stat) => (
          <RevealItem
            key={stat.label}
            direction="pop"
            className={cn('relative rounded-card p-5 shadow-soft-sm md:p-6', stat.className)}
          >
            <span aria-hidden="true" className={cn('absolute top-4 right-4 size-2.5 rounded-full', stat.dotClassName)} />
            {/* Screen readers get the final figure; the animated digits are decorative. */}
            <p className="sr-only">{`${stat.figure} ${stat.label}${stat.note ? ` (${stat.note})` : ''}`}</p>
            <p
              aria-hidden="true"
              className="mb-1.5 font-heading font-semibold text-[clamp(26px,3.4vw,40px)] leading-none text-ink"
            >
              <CountUp figure={stat.figure} />
            </p>
            <p aria-hidden="true" className="text-[13.5px] leading-[1.4] font-bold text-ink-soft">
              {stat.label}
              {stat.note ? <span className="mt-0.5 block text-[12.5px] font-semibold text-violet">{stat.note}</span> : null}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
