import { RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { Section, SectionHeader } from '#/components/ui/Section'
import { cn } from '#/lib/cn'
import { m } from '#/paraglide/messages.js'

interface Activity {
  role: string
  /** Organisation names stay untranslated. */
  organization?: string
  period: string
  description?: string
}

function getActivities(): Activity[] {
  return [
    {
      role: m.activities_volunteer_role(),
      organization: 'Yayasan Pecinta Anak Yatim',
      period: '2024–2026',
      description: m.activities_volunteer_desc(),
    },
    {
      role: m.activities_scholarship_role(),
      organization: 'Yayasan Bakti Asih Sesama',
      period: '2021–2022',
      description: m.activities_scholarship_desc(),
    },
    { role: m.activities_olympiad_role(), organization: 'UGM', period: '2021' },
    { role: m.activities_tutor_role(), organization: 'RY Course', period: '2018–2020' },
    { role: m.activities_mentor_role(), period: '2018' },
  ]
}

/*
 * The two activities with a description share the first row; the three short ones share the second on desktop,
 * so no card is left on its own. Tablet: two columns, the last card spans both. Phone: one column.
 */
const SPAN_CLASS = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'md:col-span-2 lg:col-span-2']

export function Activities() {
  return (
    <Section id="aktivitas">
      <SectionHeader number="06" title={m.activities_heading()} />

      <RevealGroup stagger={0.08} className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
        {getActivities().map((activity, index) => (
          <RevealItem
            key={activity.role}
            className={cn('flex flex-col rounded-card bg-white p-5 shadow-soft md:p-6', SPAN_CLASS[index])}
          >
            <span className="mb-3 self-start rounded-full bg-lavender-50 px-3 py-1 text-[12.5px] font-bold whitespace-nowrap text-violet">
              {activity.period}
            </span>
            <h3 className="font-heading font-semibold text-[16.5px] leading-[1.3] text-balance">{activity.role}</h3>
            {activity.organization ? (
              <p className="mt-1 text-[14px] font-bold text-violet">{activity.organization}</p>
            ) : null}
            {activity.description ? (
              <p className="mt-2.5 text-[14.5px] leading-[1.6] text-ink-soft text-pretty">{activity.description}</p>
            ) : null}
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
