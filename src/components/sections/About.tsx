import type { CSSProperties } from 'react'

import { Reveal, RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { Section, SectionHeading } from '#/components/ui/Section'
import { cn } from '#/lib/cn'

const STATS = [
  { value: '3+', label: 'tahun pengalaman', className: 'bg-sun' },
  { value: '10', label: 'anggota tim QCC yang dipimpin', className: 'bg-pink' },
  { value: 'Top 10', label: 'Konvensi QCC Kalbe Consumer Health 2025', className: 'bg-lavender' },
]

export function About() {
  return (
    <Section id="tentang">
      <SectionHeading number="01" badgeClassName="bg-pink">
        Ringkasan profesional
      </SectionHeading>

      <RevealGroup stagger={0.12} className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        <RevealItem className="rounded-[18px] border-3 border-ink bg-white p-[26px] shadow-hard-6">
          <p className="text-[16px] leading-[1.65] text-pretty">
            Analis QC Kimia-Fisika dengan <strong>3+ tahun pengalaman</strong> di industri farmasi (Kalbe Consumer
            Health, Kalbe Group), mahir menguji bahan baku, produk antara, dan produk jadi menggunakan HPLC, GC, AAS,
            FTIR, ICP-OES, Spektrofotometer UV-Vis, dan TLC UV Scanner sesuai standar{' '}
            <strong>GMP, GLP, dan ISO 17025</strong>. Berpengalaman memimpin tim continuous improvement (Quality Control
            Circle) yang menurunkan <strong>lead time analisa 67%</strong> dan menghasilkan efisiensi biaya{' '}
            <strong>Rp59,6 juta per tahun</strong>. Saat ini menyelesaikan studi{' '}
            <strong>Sarjana Farmasi di Binawan University</strong> (wisuda Desember 2026).
          </p>
        </RevealItem>

        <RevealGroup stagger={0.1} className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] content-start gap-[18px]">
          {STATS.map((stat) => (
            <RevealItem
              key={stat.value}
              direction="pop"
              className={cn('rounded-[18px] border-3 border-ink p-5 shadow-hard-6', stat.className)}
            >
              <p className="mb-1.5 font-display text-[clamp(28px,3.6vw,40px)] leading-none">{stat.value}</p>
              <p className="text-[13.5px] leading-[1.4] font-semibold">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </RevealGroup>

      <Reveal className="mt-6 overflow-hidden rounded-[18px] border-3 border-ink bg-white px-6 py-[22px] shadow-hard-6">
        <Chromatogram />
      </Reveal>
    </Section>
  )
}

/** Decorative chromatogram: a peak trace that draws itself while a scan line sweeps across. */
function Chromatogram() {
  return (
    <svg viewBox="0 0 800 170" className="block h-auto w-full" aria-hidden="true">
      <g stroke="#121212" strokeWidth="2" opacity=".18">
        <line x1="40" y1="30" x2="770" y2="30" />
        <line x1="40" y1="70" x2="770" y2="70" />
        <line x1="40" y1="110" x2="770" y2="110" />
      </g>
      <g className="animate-scan">
        <line x1="44" y1="14" x2="44" y2="140" stroke="#FF5C9E" strokeWidth="4" />
      </g>
      <path
        d="M40 140 L150 140 Q168 140 176 92 Q184 140 205 140 L300 140 Q322 140 332 34 Q344 140 372 140 L470 140 Q492 140 500 106 Q510 140 536 140 L620 140 Q640 140 650 62 Q662 140 690 140 L770 140"
        fill="none"
        stroke="#121212"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="1400"
        className="animate-draw"
        style={{ '--len': 1400 } as CSSProperties}
      />
      <line x1="40" y1="140" x2="770" y2="140" stroke="#121212" strokeWidth="4" />
      <line x1="40" y1="14" x2="40" y2="140" stroke="#121212" strokeWidth="4" />
      <g stroke="#121212" strokeWidth="3" fill="#FFD23F">
        <circle cx="332" cy="40" r="7" />
        <circle cx="650" cy="68" r="7" />
      </g>
    </svg>
  )
}
