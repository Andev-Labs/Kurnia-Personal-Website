import type { ReactNode } from 'react'

import { ProgramGallery } from '#/components/gallery/ProgramGallery'
import { Section, SectionHeading } from '#/components/ui/Section'

export function Education() {
  return (
    <Section id="pendidikan" className="border-t-3 border-ink bg-sand">
      <SectionHeading number="04" badgeClassName="bg-lavender">
        Pendidikan
      </SectionHeading>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
        <div className="rounded-[20px] border-3 border-ink bg-white p-[26px] shadow-hard-7">
          <span className="mb-3.5 inline-block rounded-full border-3 border-ink bg-sun px-[13px] py-[7px] text-[12.5px] font-bold">
            September 2022 – Desember 2026
          </span>
          <h3 className="mb-1.5 font-display text-[20px] leading-[1.2]">Sarjana Farmasi (S.Farm)</h3>
          <p className="mb-4 text-[14.5px] font-semibold">Binawan University</p>
          <div className="flex flex-col gap-3 text-[15px] leading-[1.6]">
            <p className="text-pretty">
              Telah menyelesaikan seluruh studi (<strong>SKL telah terbit</strong>); wisuda dijadwalkan{' '}
              <strong>Desember 2026</strong>.
            </p>
            <p className="rounded-[14px] border-[2.5px] border-ink bg-cream p-4 text-pretty">
              <strong className="mb-[5px] block font-display text-[12.5px] font-normal tracking-[0.04em]">SKRIPSI</strong>
              “Perbandingan Ekstraksi Maserasi dan Ultrasonic-Assisted Extraction (UAE) terhadap Aktivitas Antioksidan
              pada Ekstrak Daun Pelawan Merah (Tristaniopsis merguensis Griff.)”.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <ExtractionCard label="Maserasi">
                <MacerationIcon />
              </ExtractionCard>
              <ExtractionCard label="UAE (ultrasonik)">
                <UltrasonicIcon />
              </ExtractionCard>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-[20px] border-3 border-ink bg-white p-[26px] shadow-hard-7">
            <span className="mb-3.5 inline-block rounded-full border-3 border-ink bg-mint px-[13px] py-[7px] text-[12.5px] font-bold">
              Juli 2018 – November 2022
            </span>
            <h3 className="mb-1.5 font-display text-[20px] leading-[1.2]">Kimia Analisis</h3>
            <p className="mb-4 text-[14.5px] font-semibold">SMK-SMAK Bogor</p>
            <div className="flex flex-col gap-2.5 text-[15px] leading-[1.6]">
              <p className="text-pretty">
                <strong>Program Pendidikan Sistem Ganda (PSG)</strong>, tahun ajaran 2019–2022.
              </p>
              <p className="text-pretty">
                <strong>Sertifikat Kompetensi LSP-P1 SMAKBO</strong>: Gravimetri, Volumetri, Proksimat, Spektrofotometer
                UV-Vis, AAS, Mikrobiologi, dan Elektrokimia (2018–2021).
              </p>
            </div>
          </div>

          <div className="rounded-[20px] border-3 border-ink bg-ink p-[26px] text-cream shadow-[7px_7px_0_var(--color-lavender)]">
            <h3 className="mb-4 font-display text-[17px]">Program internasional</h3>
            <div className="flex flex-col gap-3.5 text-[15px] leading-[1.6]">
              <p className="text-pretty">
                <strong>Summer School Program, Sechenov University, Rusia</strong> — Innovative Drugs.
              </p>
              <p className="text-pretty">
                <strong>Summer International School Program, China Pharmaceutical University</strong> (2023) — riset
                obat herbal/simplisia dan Traditional Chinese Medicine (TCM).
              </p>
            </div>
            <ProgramGallery />
          </div>
        </div>
      </div>
    </Section>
  )
}

function ExtractionCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-[120px] flex-1 rounded-[14px] border-[2.5px] border-ink bg-cream p-3.5 text-center">
      {children}
      <p className="mt-2 text-[12.5px] font-bold">{label}</p>
    </div>
  )
}

function MacerationIcon() {
  return (
    <svg viewBox="0 0 80 70" className="h-auto w-full max-w-[90px]" aria-hidden="true">
      <path
        d="M26 12h28v34a14 14 0 0 1-28 0V12z"
        fill="#A9F5B5"
        stroke="#121212"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M22 12h36" stroke="#121212" strokeWidth="3" strokeLinecap="round" />
      <g fill="#121212">
        <circle cx="36" cy="40" r="3" className="animate-bubble-slow" />
        <circle cx="46" cy="44" r="2.5" className="animate-bubble-slow [animation-delay:1.4s]" />
      </g>
    </svg>
  )
}

const RING_CLASS = '[transform-box:fill-box] origin-center animate-pulse-ring'

function UltrasonicIcon() {
  return (
    <svg viewBox="0 0 80 70" className="h-auto w-full max-w-[90px]" aria-hidden="true">
      <g fill="none" stroke="#FF5C9E" strokeWidth="3">
        <circle cx="40" cy="38" r="20" className={RING_CLASS} />
        <circle cx="40" cy="38" r="20" className={`${RING_CLASS} [animation-delay:1.1s]`} />
      </g>
      <path
        d="M26 12h28v34a14 14 0 0 1-28 0V12z"
        fill="#9AA3F5"
        stroke="#121212"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M22 12h36" stroke="#121212" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
