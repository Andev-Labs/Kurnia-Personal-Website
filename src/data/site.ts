/** Single place for links, files, and contact switches used across the page and the <head>. */

export const SITE_URL = 'https://kurniadewi.netlify.app'

export const PERSON_NAME = 'Kurnia Dewi Budi Cantika'

export const EMAIL = 'kurniadewi2003@gmail.com'

/*
 * TODO(Kurnia): verify which LinkedIn URL is correct.
 * - Website (used for now): https://linkedin.com/in/kurnia-dewi-budicantika-27b1a9216
 * - CV:                     https://linkedin.com/in/kurnia-dewi-budi-cantika
 */
export const LINKEDIN_URL = 'https://linkedin.com/in/kurnia-dewi-budicantika-27b1a9216'

/** TODO(Kurnia): put the CV PDF at `public/cv/Kurnia-Dewi-Budi-Cantika-CV.pdf`; until then this link 404s. */
export const CV_PDF_PATH = '/cv/Kurnia-Dewi-Budi-Cantika-CV.pdf'

/**
 * WhatsApp button, off by default so no phone number is ever published.
 * To enable: set `enabled: true` and `number` in international format without `+` (e.g. `628xxxxxxxxxx`).
 */
export const WHATSAPP = { enabled: false, number: '' } as const

/**
 * Hero photo. Exported at 480/800/1200 px wide as `<base>-<width>.{avif,webp,jpg}`, 4:5 crop.
 * Current file: photo in front of the Sechenov University sign (Sept 2026), cropped so the body is centred.
 */
export const HERO_PORTRAIT = { base: '/images/kurnia-portrait', widths: [480, 800, 1200], width: 800, height: 1000 }

export const EFSET_URL = 'https://cert.efset.org/dS81Ro'

export const PAPER_URL = 'https://journal.unpak.ac.id/index.php/he_jsac/article/view/4541/2703'
export const PAPER_DOI = '10.33751/helium.v1i2.4541'
