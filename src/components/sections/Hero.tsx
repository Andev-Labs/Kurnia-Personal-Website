import { RichText } from '#/components/ui/RichText'
import { m } from '#/paraglide/messages.js'

const CTA_CLASS =
  'press-sm rounded-[14px] border-3 border-ink px-[26px] py-[15px] font-display text-[15px] shadow-hard-5'

const PORTRAIT_WIDTHS = [480, 800, 1200]
/** Frame caps at 400px wide; the photo sits inside ~42px of padding and border. */
const PORTRAIT_SIZES = '(max-width: 440px) calc(100vw - 82px), 358px'

function portraitSrcSet(ext: 'avif' | 'webp' | 'jpg') {
  return PORTRAIT_WIDTHS.map((w) => `/images/kurnia-portrait-${w}.${ext} ${w}w`).join(', ')
}

export function Hero() {
  return (
    <header
      id="atas"
      className="page-x grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-10 pt-14 pb-12"
    >
      <div className="min-w-0">
        <p className="mb-[18px] inline-block rounded-full border-3 border-ink bg-white px-3.5 py-[7px] text-[13.5px] font-bold shadow-hard-3">
          {m.hero_greeting()}
        </p>
        <h1 className="mb-5 font-display text-[clamp(40px,6.4vw,80px)] leading-[0.94] tracking-[-0.035em] text-balance">
          {m.hero_title_line1()}
          <br />
          {m.hero_title_line2()}
        </h1>
        <p className="mb-7 max-w-[44ch] text-[clamp(15px,1.3vw,17.5px)] leading-[1.6] text-pretty">
          <RichText message={m.hero_summary} />
        </p>
        <div className="flex flex-wrap items-center gap-3.5">
          <a href="#kontak" className={`${CTA_CLASS} bg-sun`}>
            {m.hero_cta_contact()}
          </a>
          <a href="#pengalaman" className={`${CTA_CLASS} bg-white`}>
            {m.hero_cta_experience()}
          </a>
        </div>
      </div>

      <div className="flex min-w-0 justify-center">
        <div className="relative w-full max-w-[400px]">
          <div className="relative rounded-[22px] border-3 border-ink bg-pink p-[18px] shadow-hard-8">
            <picture>
              <source type="image/avif" srcSet={portraitSrcSet('avif')} sizes={PORTRAIT_SIZES} />
              <source type="image/webp" srcSet={portraitSrcSet('webp')} sizes={PORTRAIT_SIZES} />
              <img
                src="/images/kurnia-portrait-800.jpg"
                srcSet={portraitSrcSet('jpg')}
                sizes={PORTRAIT_SIZES}
                width={800}
                height={1000}
                alt={m.hero_portrait_alt()}
                fetchPriority="high"
                decoding="async"
                className="block aspect-[4/5] w-full rounded-[14px] border-3 border-ink bg-cream object-cover"
              />
            </picture>
          </div>
          <div className="absolute -top-[26px] -left-[22px] -rotate-7 rounded-xl border-3 border-ink bg-teal px-3.5 py-[9px] font-display text-[12.5px] text-white shadow-hard-4">
            HPLC ✓
          </div>
          <div className="absolute top-[34%] -right-[30px] grid size-[74px] animate-float place-items-center rounded-full border-3 border-ink bg-sun text-center font-display text-[15px] leading-none shadow-hard-4">
            GMP
          </div>
          <div className="absolute right-1.5 -bottom-5 rotate-3 rounded-full border-3 border-ink bg-mint px-[15px] py-[9px] text-[12.5px] font-bold shadow-hard-4">
            {m.hero_open_badge()}
          </div>
        </div>
      </div>
    </header>
  )
}
