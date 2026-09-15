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

/**
 * Built per call so captions follow the active locale — on the server, each request can have a
 * different one, so this must not be hoisted to a module-level constant.
 */
export function getGallery(): GalleryItem[] {
  return [
    {
      group: 'kerja',
      title: m.gallery_hplc_title(),
      meta: m.gallery_hplc_meta(),
      caption: m.gallery_hplc_caption(),
    },
    {
      group: 'kerja',
      title: m.gallery_qcc_convention_title(),
      meta: 'Top 10 · Kalbe Consumer Health',
      caption: m.gallery_qcc_convention_caption(),
    },
    {
      group: 'kerja',
      title: m.gallery_qcc_team_title(),
      meta: m.gallery_qcc_team_meta(),
      caption: m.gallery_qcc_team_caption(),
    },
    {
      group: 'kerja',
      title: m.gallery_dissolution_title(),
      meta: 'Performance verification test',
      caption: m.gallery_dissolution_caption(),
    },
    {
      group: 'kerja',
      title: m.gallery_reagents_title(),
      meta: 'Working Standard vs Reference Standard',
      caption: m.gallery_reagents_caption(),
    },
    {
      group: 'kerja',
      title: m.gallery_spectroscopy_title(),
      meta: 'FTIR · UV-Vis · ICP-OES · AAS',
      caption: m.gallery_spectroscopy_caption(),
    },
    {
      group: 'intl',
      title: m.gallery_sechenov_title(),
      meta: 'Summer School Program · Innovative Drugs',
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
      title: m.gallery_cpu_title(),
      meta: 'Summer International School Program · 2023',
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
