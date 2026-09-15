import type { ReactNode } from 'react'

import { WorkGallery } from '#/components/gallery/WorkGallery'
import { Bullet } from '#/components/ui/Bullet'
import type { MarkerColor } from '#/components/ui/Bullet'
import { Section, SectionHeading } from '#/components/ui/Section'
import { cn } from '#/lib/cn'

type JobEntry = { marker: MarkerColor; content: ReactNode } | { chart: 'lead-time' }

interface Job {
  role: string
  company: string
  period: string
  headerClassName: string
  entries: JobEntry[]
  /** Secondary responsibilities, hidden when the section is rendered in compact mode. */
  moreEntries?: JobEntry[]
}

const JOBS: Job[] = [
  {
    role: 'Analis Kimia-Fisika QC',
    company: 'Kalbe Consumer Health (KCH), Kalbe Group',
    period: 'Juli 2022 – November 2025',
    headerClassName: 'bg-pink',
    entries: [
      {
        marker: 'sun',
        content: (
          <>
            Melakukan <strong>analisis kimia-fisika bahan baku, produk antara, dan produk jadi</strong> menggunakan{' '}
            <strong>HPLC, Spektrofotometer UV-Vis, FTIR, TLC, dan ICP-OES</strong> sesuai standar GMP dan ISO 17025.
          </>
        ),
      },
      {
        marker: 'teal',
        content: (
          <>
            Melakukan investigasi <strong>Out of Trend (OOT) dan Out of Specification (OOS)</strong> atas hasil
            pengujian yang menyimpang dari tren normal atau spesifikasi, serta mendokumentasikan hasil investigasi dalam
            laporan OOT/OOS sesuai prosedur GMP.
          </>
        ),
      },
      {
        marker: 'lavender',
        content: (
          <>
            Memimpin Tim Finish Good sebagai <strong>Ketua Quality Control Circle (QCC)</strong> beranggotakan 10 orang
            (Oktober 2024 – Agustus 2025); merancang dan menstandarisasi studi masa simpan larutan pembanding dan fase
            gerak yang menurunkan lead time analisa pra-pengujian sampel ruah <strong>sebesar 67%</strong> (melampaui
            target 60%) dan menaikkan <strong>kapasitas output rilis ruah 50% per hari</strong>.
          </>
        ),
      },
      { chart: 'lead-time' },
      {
        marker: 'pink',
        content: (
          <>
            Menghasilkan <strong>efisiensi biaya analisa Rp59,6 juta per tahun</strong> dan{' '}
            <strong>mencegah line stop produksi</strong> kemas primer pada tiga produk prioritas (Mixagrip Flu Kaplet,
            Mixagrip Flu &amp; Batuk, Mextril Tablet), dampak dikonfirmasi lewat wawancara lintas fungsi dengan{' '}
            <strong>tim Produksi, PPIC, dan QA</strong>.
          </>
        ),
      },
    ],
    moreEntries: [
      {
        marker: 'sun',
        content: (
          <>
            Melakukan <strong>transfer validasi metode analisis</strong> bersama <strong>tim R&amp;D</strong> untuk
            memastikan kesiapan metode sebelum digunakan dalam pengujian rutin.
          </>
        ),
      },
      {
        marker: 'teal',
        content: (
          <>
            Melakukan <strong>troubleshooting instrumen laboratorium</strong>, termasuk pelatihan internal dari vendor{' '}
            <strong>HPLC Waters Alliance</strong> dan ICP-OES.
          </>
        ),
      },
      {
        marker: 'lavender',
        content: (
          <>
            Melakukan <strong>kalibrasi alat disolusi</strong> (performance verification test dengan tablet standar
            USP) secara rutin sesuai standar farmakope, GMP, dan GLP.
          </>
        ),
      },
      {
        marker: 'pink',
        content: (
          <>
            Melakukan <strong>standarisasi Working Standard (WS)</strong> terhadap{' '}
            <strong>Reference Standard (RS)</strong>.
          </>
        ),
      },
      {
        marker: 'sun',
        content: (
          <>
            Melakukan <strong>stock opname reagen kimia</strong> serta memastikan kepatuhan terhadap{' '}
            <strong>prosedur keselamatan</strong>, penyimpanan, dan pengambilan bahan kimia.
          </>
        ),
      },
      {
        marker: 'teal',
        content: (
          <>
            Mengusulkan berbagai perbaikan proses melalui <strong>Suggestion System (SS)</strong> untuk meningkatkan
            efisiensi dan kualitas kerja tim QC.
          </>
        ),
      },
    ],
  },
  {
    role: 'Analis Kimia-Fisika QC (Magang)',
    company: 'Kalbe Consumer Health (KCH), Kalbe Group',
    period: 'Januari 2022 – April 2022',
    headerClassName: 'bg-teal',
    entries: [
      {
        marker: 'lavender',
        content: (
          <>
            Membantu <strong>analisis parameter fisika-kimia</strong> (pH, kadar air, susut pengeringan, waktu hancur,
            disolusi, kadar) dengan metode <strong>konvensional (volumetri)</strong> maupun{' '}
            <strong>instrumen (HPLC, TLC, Spektrofotometer)</strong>.
          </>
        ),
      },
      {
        marker: 'sun',
        content: (
          <>
            Menyiapkan <strong>reagen dan larutan standar</strong> untuk kebutuhan pengujian laboratorium.
          </>
        ),
      },
      {
        marker: 'pink',
        content: (
          <>
            Melakukan <strong>stock opname reagen kimia</strong> di laboratorium QC.
          </>
        ),
      },
    ],
  },
]

export function Experience({ showAllEntries = true }: { showAllEntries?: boolean }) {
  return (
    <Section id="pengalaman" className="border-t-3 border-ink">
      <SectionHeading number="03" badgeClassName="bg-sun">
        Pengalaman kerja
      </SectionHeading>

      <div className="flex flex-col gap-[26px]">
        {JOBS.map((job) => (
          <JobCard key={job.role} job={job} showAllEntries={showAllEntries} />
        ))}
      </div>

      <WorkGallery />
    </Section>
  )
}

function JobCard({ job, showAllEntries }: { job: Job; showAllEntries: boolean }) {
  const entries = showAllEntries && job.moreEntries ? [...job.entries, ...job.moreEntries] : job.entries

  return (
    <article className="overflow-hidden rounded-[20px] border-3 border-ink bg-white shadow-hard-8">
      <div
        className={cn(
          'flex flex-wrap items-center justify-between gap-3 border-b-3 border-ink px-6 py-5',
          job.headerClassName,
        )}
      >
        <div>
          <h3 className="mb-1 font-display text-[clamp(17px,2vw,22px)] leading-[1.2]">{job.role}</h3>
          <p className="text-[14.5px] font-semibold">{job.company}</p>
        </div>
        <span className="rounded-full border-3 border-ink bg-cream px-3.5 py-2 text-[13px] font-bold whitespace-nowrap text-ink">
          {job.period}
        </span>
      </div>
      <div className="flex flex-col gap-3.5 p-6 text-[15.5px] leading-[1.6]">
        {entries.map((entry, index) =>
          'chart' in entry ? (
            <LeadTimeChart key={`chart-${index}`} />
          ) : (
            <Bullet key={index} marker={entry.marker}>
              {entry.content}
            </Bullet>
          ),
        )}
      </div>
    </article>
  )
}

function LeadTimeChart() {
  return (
    <div className="ml-[34px] rounded-[14px] border-[2.5px] border-ink bg-cream px-5 py-[18px]">
      <p className="mb-3.5 font-display text-[12.5px] tracking-[0.04em]">LEAD TIME ANALISA PRA-PENGUJIAN</p>
      <div className="flex flex-col gap-2.5 text-[13px] font-bold">
        <div className="flex items-center gap-3">
          <span className="w-[74px] flex-none">Sebelum</span>
          <span className="h-6 min-w-0 flex-1 rounded-md border-[2.5px] border-ink bg-lavender" />
        </div>
        <div className="flex items-center gap-3">
          <span className="w-[74px] flex-none">Sesudah</span>
          <span className="relative h-6 min-w-0 flex-1">
            <span className="absolute inset-0 rounded-md border-[2.5px] border-dashed border-ink opacity-30" />
            <span className="absolute inset-y-0 left-0 w-1/3 animate-shrink rounded-md border-[2.5px] border-ink bg-sun" />
          </span>
          <span className="flex-none font-display text-[15px]">−67%</span>
        </div>
      </div>
    </div>
  )
}
