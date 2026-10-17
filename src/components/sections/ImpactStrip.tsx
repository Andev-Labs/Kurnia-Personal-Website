import { useLayoutEffect, useRef, useState } from 'react'

import { RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { m } from '#/paraglide/messages.js'

const COUNT_MS = 600

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
}

export function ImpactStrip() {
  const stats: Stat[] = [
    { figure: '−67%', label: m.impact_lead_time(), note: m.impact_lead_time_note() },
    { figure: '+50%', label: m.impact_capacity() },
    { figure: m.impact_savings_value(), label: m.impact_savings() },
    { figure: 'Top 10', label: m.impact_qcc() },
  ]

  return (
    <section aria-labelledby="impact-heading" className="page-x bg-ink py-10 text-paper md:py-12">
      <h2 id="impact-heading" className="sr-only">
        {m.impact_heading()}
      </h2>
      <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <RevealItem key={stat.label} className="border-l border-paper/15 pl-4 md:pl-5">
            {/* Screen readers get the final figure; the animated digits are decorative. */}
            <p className="sr-only">{`${stat.figure} ${stat.label}`}</p>
            <p aria-hidden="true" className="font-mono text-[clamp(26px,3.4vw,40px)] leading-none font-medium text-amber">
              <CountUp figure={stat.figure} />
            </p>
            <p aria-hidden="true" className="mt-2.5 text-[13.5px] leading-[1.45] text-paper/80">
              {stat.label}
              {stat.note && <span className="block font-mono text-[12px] text-paper/60">{stat.note}</span>}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
