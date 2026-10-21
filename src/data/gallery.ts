import { m } from '#/paraglide/messages.js'

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
  /** Optional in the type only so a single work photo can reuse this shape in the viewer; gallery.test.ts requires it. */
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

const qccPhoto = (name: string, width: number, height: number, alt: string) =>
  galleryPhoto(`qcc-${name}`, width, height, alt)

/** International programs that get their own card in the Education section. */
export type ProgramId = 'sechenov' | 'cpu'

export interface GalleryItem {
  group: GalleryGroup
  /** Set on `intl` albums so the Education section can show each cover on its own program card. */
  program?: ProgramId
  title: string
  meta: string
  caption: string
  /** Single photo shown on the card and in the viewer. Every `kerja` item needs one; `intl` albums use `shots`. */
  photo?: GalleryPhoto
  /** Items with shots open as an album first; items without open straight into the photo viewer. */
  shots?: GalleryShot[]
}

/**
 * The one place to add gallery photos. To add a work photo: export it at 540 and 1080 px wide as
 * `public/images/gallery/<name>-<width>.{avif,webp,jpg}`, add the caption/alt keys to every `messages/*.json`,
 * then append a `kerja` item below. Cards without a photo are not allowed (see gallery.test.ts).
 *
 * Built per call so captions follow the active locale — on the server, each request can have a
 * different one, so this must not be hoisted to a module-level constant.
 */
export function getGallery(): GalleryItem[] {
  return [
    {
      group: 'kerja',
      title: m.gallery_qcc_convention_title(),
      meta: 'Top 10 · Kalbe Consumer Health',
      caption: m.gallery_qcc_convention_caption(),
      // TODO(Kurnia): confirm this internal QCC slide may be published (the next card too).
      photo: qccPhoto('convention-title', 1080, 602, m.gallery_qcc_convention_alt()),
    },
    {
      group: 'kerja',
      title: m.gallery_qcc_team_title(),
      meta: m.gallery_qcc_team_meta(),
      caption: m.gallery_qcc_team_caption(),
      photo: qccPhoto('team', 1080, 601, m.gallery_qcc_team_alt()),
    },
    {
      group: 'intl',
      program: 'sechenov',
      title: m.gallery_sechenov_title(),
      meta: 'Summer School · Innovative Drugs · 2025',
      caption: m.gallery_sechenov_caption(),
      shots: [
        {
          label: m.gallery_sechenov_campus_label(),
          caption: m.gallery_sechenov_campus_caption(),
          photo: sechenovPhoto('campus-group', 1080, 812, m.gallery_sechenov_campus_alt()),
        },
        {
          label: m.gallery_sechenov_lecture_label(),
          caption: m.gallery_sechenov_lecture_caption(),
          photo: sechenovPhoto('lecture', 1080, 608, m.gallery_sechenov_lecture_alt()),
        },
        {
          label: m.gallery_sechenov_lab_label(),
          caption: m.gallery_sechenov_lab_caption(),
          photo: sechenovPhoto('lab-hplc', 1080, 720, m.gallery_sechenov_lab_alt()),
        },
        {
          label: m.gallery_sechenov_instrument_label(),
          caption: m.gallery_sechenov_instrument_caption(),
          photo: sechenovPhoto('lab-instrument', 1080, 1440, m.gallery_sechenov_instrument_alt()),
        },
        {
          label: m.gallery_sechenov_discussion_label(),
          caption: m.gallery_sechenov_discussion_caption(),
          photo: sechenovPhoto('lab-discussion', 1080, 722, m.gallery_sechenov_discussion_alt()),
        },
        {
          label: m.gallery_sechenov_participants_label(),
          caption: m.gallery_sechenov_participants_caption(),
          photo: sechenovPhoto('participants', 1080, 720, m.gallery_sechenov_participants_alt()),
        },
        {
          // Formerly the hero photo; it belongs with the Sechenov program.
          label: m.gallery_sechenov_portrait_label(),
          caption: m.gallery_sechenov_portrait_caption(),
          photo: sechenovPhoto('portrait', 1080, 1350, m.gallery_sechenov_portrait_alt()),
        },
        {
          label: m.gallery_sechenov_institute_label(),
          caption: m.gallery_sechenov_institute_caption(),
          photo: sechenovPhoto('institute-pharmacy', 1080, 1440, m.gallery_sechenov_institute_alt()),
        },
        {
          label: m.gallery_sechenov_sign_label(),
          caption: m.gallery_sechenov_sign_caption(),
          photo: sechenovPhoto('university-sign', 1080, 1440, m.gallery_sechenov_sign_alt()),
        },
      ],
    },
    {
      group: 'intl',
      program: 'cpu',
      title: m.gallery_cpu_title(),
      meta: 'Summer International School · Discover Jiangsu · 2023',
      caption: m.gallery_cpu_caption(),
      shots: [
        {
          label: m.gallery_cpu_class_label(),
          caption: m.gallery_cpu_class_caption(),
          photo: cpuPhoto('class-participants', 1080, 720, m.gallery_cpu_class_alt()),
        },
        {
          label: m.gallery_cpu_opening_label(),
          caption: m.gallery_cpu_opening_caption(),
          photo: cpuPhoto('opening-ceremony', 1080, 345, m.gallery_cpu_opening_alt()),
        },
        {
          label: m.gallery_cpu_tcm_label(),
          caption: m.gallery_cpu_tcm_caption(),
          photo: cpuPhoto('tcm-lecture', 1080, 608, m.gallery_cpu_tcm_alt()),
        },
        {
          label: m.gallery_cpu_classmates_label(),
          caption: m.gallery_cpu_classmates_caption(),
          photo: cpuPhoto('classmates', 1080, 720, m.gallery_cpu_classmates_alt()),
        },
        {
          label: m.gallery_cpu_campus_label(),
          caption: m.gallery_cpu_campus_caption(),
          photo: cpuPhoto('campus-library', 1080, 1920, m.gallery_cpu_campus_alt()),
        },
        {
          label: 'The Most Outstanding Team',
          caption: m.gallery_cpu_award_caption(),
          photo: cpuPhoto('best-team-award', 1080, 1920, m.gallery_cpu_award_alt()),
        },
        {
          label: m.gallery_cpu_awarding_label(),
          caption: m.gallery_cpu_awarding_caption(),
          photo: cpuPhoto('awarding', 1080, 608, m.gallery_cpu_awarding_alt()),
        },
        {
          label: m.gallery_cpu_cultural_label(),
          caption: m.gallery_cpu_cultural_caption(),
          photo: cpuPhoto('cultural-visit', 1080, 1920, m.gallery_cpu_cultural_alt()),
        },
        {
          label: m.gallery_cpu_night_label(),
          caption: m.gallery_cpu_night_caption(),
          photo: cpuPhoto('night-walk', 1080, 1920, m.gallery_cpu_night_alt()),
        },
      ],
    },
  ]
}
