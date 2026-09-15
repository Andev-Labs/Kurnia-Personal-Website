export type GalleryGroup = 'kerja' | 'intl'

export interface GalleryPhoto {
  /** Path without the `-<width>.<ext>` suffix, e.g. `/images/gallery/sechenov-lecture`. */
  src: string
  width: number
  height: number
  alt: string
}

export interface GalleryShot {
  label: string
  caption: string
  /** Shots without a photo render a placeholder slot. */
  photo?: GalleryPhoto
}

const galleryPhoto = (name: string, width: number, height: number, alt: string): GalleryPhoto => ({
  src: `/images/gallery/${name}`,
  width,
  height,
  alt,
})

const sechenovPhoto = (name: string, width: number, height: number, alt: string) =>
  galleryPhoto(`sechenov-${name}`, width, height, alt)

const cpuPhoto = (name: string, width: number, height: number, alt: string) =>
  galleryPhoto(`cpu-${name}`, width, height, alt)

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
      {
        label: 'Peserta di depan kampus',
        caption: 'Foto bersama peserta Summer School Program di depan gedung Sechenov University.',
        photo: sechenovPhoto(
          'campus-group',
          1080,
          812,
          'Peserta Summer School Program berfoto bersama di depan gedung Sechenov University',
        ),
      },
      {
        label: 'Kelas Innovative Drugs',
        caption: 'Sesi materi pengembangan obat inovatif bersama dosen Sechenov University.',
        photo: sechenovPhoto('lecture', 1080, 608, 'Dosen mempresentasikan materi Innovative Drugs di depan layar proyektor'),
      },
      {
        label: 'Kunjungan laboratorium',
        caption: 'Melihat fasilitas riset farmasi dan instrumentasi analitik kampus.',
        photo: sechenovPhoto('lab-hplc', 1080, 720, 'Peserta mengamati sistem kromatografi di laboratorium Sechenov University'),
      },
      {
        label: 'Instrumen analitik',
        caption: 'Sistem kromatografi cair Agilent yang digunakan untuk riset farmasi di laboratorium kampus.',
        photo: sechenovPhoto('lab-instrument', 1080, 1440, 'Instrumen kromatografi cair Agilent dengan panel terbuka'),
      },
      {
        label: 'Diskusi di laboratorium',
        caption: 'Diskusi bersama peneliti dan peserta internasional di depan instrumen analitik.',
        photo: sechenovPhoto('lab-discussion', 1080, 722, 'Peserta berdiskusi dengan peneliti berjas lab di laboratorium'),
      },
      {
        label: 'Peserta internasional',
        caption: 'Foto bersama peserta dari berbagai negara di gedung Sechenov University.',
        photo: sechenovPhoto('participants', 1080, 720, 'Peserta internasional berfoto bersama di dalam gedung kampus'),
      },
      {
        label: 'Institut Farmasi',
        caption: 'Di depan gedung Institut Farmasi Sechenov University, Moskow.',
        photo: sechenovPhoto(
          'institute-pharmacy',
          1080,
          1440,
          'Kurnia berpose di depan gedung Institut Farmasi Sechenov University',
        ),
      },
      {
        label: 'Sechenov University',
        caption: 'Berfoto di depan logo Sechenov University.',
        photo: sechenovPhoto('university-sign', 1080, 1440, 'Kurnia berdiri di depan logo Sechenov University'),
      },
    ],
  },
  {
    group: 'intl',
    title: 'China Pharmaceutical University',
    meta: 'Summer International School Program · 2023',
    caption:
      'Riset obat herbal/simplisia dan Traditional Chinese Medicine (TCM) bersama peserta internasional di China Pharmaceutical University.',
    shots: [
      {
        label: 'Kelas internasional',
        caption: 'Suasana kelas bersama peserta internasional Summer School di China Pharmaceutical University.',
        photo: cpuPhoto('class-participants', 1080, 720, 'Peserta internasional berseragam hijau berpose di ruang kelas'),
      },
      {
        label: 'Upacara pembukaan',
        caption: 'Foto bersama seluruh peserta pada pembukaan “Discover Jiangsu” International Summer School, Nanjing, 16 Agustus 2023.',
        photo: cpuPhoto('opening-ceremony', 1080, 345, 'Foto bersama ratusan peserta pada upacara pembukaan program musim panas internasional'),
      },
      {
        label: 'Kelas TCM',
        caption: 'Materi diagnosis Traditional Chinese Medicine, termasuk teknik palpasi denyut nadi.',
        photo: cpuPhoto('tcm-lecture', 1080, 608, 'Dosen menjelaskan materi diagnosis TCM dan jenis denyut nadi di depan layar'),
      },
      {
        label: 'Teman sekelas',
        caption: 'Kebersamaan dengan peserta dari berbagai negara selama sesi kelas.',
        photo: cpuPhoto('classmates', 1080, 720, 'Kurnia dan teman peserta internasional membentuk tanda hati dengan tangan'),
      },
      {
        label: 'Kampus CPU',
        caption: 'Gedung perpustakaan China Pharmaceutical University.',
        photo: cpuPhoto('campus-library', 1080, 1920, 'Gedung perpustakaan China Pharmaceutical University di bawah langit cerah'),
      },
      {
        label: 'The Most Outstanding Team',
        caption: 'Penghargaan tim terbaik pada program “Discover Jiangsu” International Summer Program 2023.',
        photo: cpuPhoto('best-team-award', 1080, 1920, 'Sertifikat penghargaan The Most Outstanding Team dari China Pharmaceutical University'),
      },
      {
        label: 'Penganugerahan',
        caption: 'Foto bersama peserta penerima penghargaan di akhir program.',
        photo: cpuPhoto('awarding', 1080, 608, 'Peserta penerima penghargaan berfoto bersama di panggung China Pharmaceutical University'),
      },
      {
        label: 'Kunjungan budaya',
        caption: 'Mengenal sejarah dan budaya Tiongkok melalui kunjungan museum.',
        photo: cpuPhoto('cultural-visit', 1080, 1920, 'Kurnia berdiri di depan mural besar bersejarah di dalam museum'),
      },
      {
        label: 'Menjelajah Nanjing',
        caption: 'Jalan-jalan malam menikmati suasana kota Nanjing.',
        photo: cpuPhoto('night-walk', 1080, 1920, 'Kurnia berpose di jalan pertokoan Nanjing pada malam hari'),
      },
    ],
  },
]
