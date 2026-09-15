export type GalleryGroup = 'kerja' | 'intl'

export interface GalleryShot {
  label: string
  caption: string
}

export interface GalleryItem {
  group: GalleryGroup
  title: string
  meta: string
  caption: string
  /** Items with shots open as an album first; items without open straight into the photo viewer. */
  shots?: GalleryShot[]
}

export const GALLERY: GalleryItem[] = [
  {
    group: 'kerja',
    title: 'Analisa HPLC',
    meta: 'Lab QC · Kalbe Consumer Health',
    caption:
      'Pengujian kadar bahan baku dan produk jadi menggunakan sistem HPLC Waters Alliance dengan data system Empower, sesuai standar GMP dan ISO 17025.',
  },
  {
    group: 'kerja',
    title: 'Konvensi QCC 2025',
    meta: 'Top 10 · Kalbe Consumer Health',
    caption:
      'Presentasi proyek “Menurunkan Waktu Pra Pengujian Sampel Ruah Produk Obat Sebesar 60%” sebagai ketua tim pada konvensi Quality Control Circle.',
  },
  {
    group: 'kerja',
    title: 'Tim Finish Good QCC',
    meta: 'Oktober 2024 – Agustus 2025',
    caption:
      'Memimpin 10 anggota tim lintas fungsi dengan pendekatan 8 Steps Problem Solving dan 7 QC Tools hingga lead time analisa pra-pengujian turun 67%.',
  },
  {
    group: 'kerja',
    title: 'Kalibrasi dissolution tester',
    meta: 'Performance verification test',
    caption:
      'Kalibrasi rutin alat disolusi dengan tablet standar USP mengikuti persyaratan farmakope, GMP, dan GLP.',
  },
  {
    group: 'kerja',
    title: 'Preparasi reagen & standar',
    meta: 'Working Standard vs Reference Standard',
    caption:
      'Standarisasi Working Standard terhadap Reference Standard serta penyiapan larutan pembanding dan fase gerak untuk pengujian rutin.',
  },
  {
    group: 'kerja',
    title: 'Instrumen spektroskopi',
    meta: 'FTIR · UV-Vis · ICP-OES · AAS',
    caption:
      'Identifikasi dan penetapan kadar bahan baku maupun cemaran logam, termasuk troubleshooting instrumen bersama vendor.',
  },
  {
    group: 'intl',
    title: 'Sechenov University, Rusia',
    meta: 'Summer School Program · Innovative Drugs',
    caption:
      'Program musim panas bertema Innovative Drugs di Sechenov University, Moskow — pengenalan riset dan pengembangan obat inovatif.',
    shots: [
      { label: 'Kelas Innovative Drugs', caption: 'Sesi materi pengembangan obat inovatif bersama dosen Sechenov University.' },
      { label: 'Kunjungan laboratorium', caption: 'Melihat fasilitas riset farmasi dan instrumentasi analitik kampus.' },
      { label: 'Peserta internasional', caption: 'Diskusi kelompok dengan peserta dari berbagai negara.' },
      { label: 'Sertifikat program', caption: 'Penyerahan sertifikat kelulusan Summer School Program.' },
    ],
  },
  {
    group: 'intl',
    title: 'China Pharmaceutical University',
    meta: 'Summer International School Program · 2023',
    caption:
      'Riset obat herbal/simplisia dan Traditional Chinese Medicine (TCM) bersama peserta internasional di China Pharmaceutical University.',
    shots: [
      { label: 'Riset simplisia', caption: 'Identifikasi dan penanganan simplisia bahan obat herbal.' },
      { label: 'Praktik TCM', caption: 'Pengenalan prinsip dan praktik Traditional Chinese Medicine.' },
      { label: 'Kampus CPU', caption: 'Suasana kampus China Pharmaceutical University.' },
      { label: 'Presentasi kelompok', caption: 'Presentasi hasil riset kelompok di akhir program.' },
    ],
  },
]
