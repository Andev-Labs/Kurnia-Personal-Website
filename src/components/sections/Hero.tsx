const CTA_CLASS =
  'press-sm rounded-[14px] border-3 border-ink px-[26px] py-[15px] font-display text-[15px] shadow-hard-5'

export function Hero() {
  return (
    <header
      id="atas"
      className="page-x grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-10 pt-14 pb-12"
    >
      <div className="min-w-0">
        <p className="mb-[18px] inline-block rounded-full border-3 border-ink bg-white px-3.5 py-[7px] text-[13.5px] font-bold shadow-hard-3">
          Hai, saya Kurnia Dewi Budicantika.
        </p>
        <h1 className="mb-5 font-display text-[clamp(40px,6.4vw,80px)] leading-[0.94] tracking-[-0.035em] text-balance">
          ANALIS QC
          <br />
          KIMIA-FISIKA.
        </h1>
        <p className="mb-7 max-w-[44ch] text-[clamp(15px,1.3vw,17.5px)] leading-[1.6] text-pretty">
          <strong>3+ tahun</strong> menguji bahan baku sampai produk jadi di industri farmasi —{' '}
          <strong>HPLC, GC, AAS, FTIR, ICP-OES, UV-Vis</strong> — dengan standar{' '}
          <strong>GMP, GLP, dan ISO 17025</strong>.
        </p>
        <div className="flex flex-wrap items-center gap-3.5">
          <a href="#kontak" className={`${CTA_CLASS} bg-sun`}>
            Hubungi saya
          </a>
          <a href="#pengalaman" className={`${CTA_CLASS} bg-white`}>
            Lihat pengalaman
          </a>
        </div>
      </div>

      <div className="flex min-w-0 justify-center">
        <div className="relative w-full max-w-[400px]">
          <div className="relative rounded-[22px] border-3 border-ink bg-pink p-[18px] shadow-hard-8">
            <div className="grid aspect-[4/5] place-items-center rounded-[14px] border-3 border-dashed border-ink bg-cream p-5 text-center">
              <div>
                <div className="mx-auto mb-3.5 size-[66px] rounded-full border-3 border-ink bg-lavender" />
                <p className="font-display text-[14px] leading-[1.3]">PLACEHOLDER FOTO</p>
                <p className="mt-1.5 text-[12.5px] leading-[1.4] opacity-65">Taruh foto portrait di sini</p>
              </div>
            </div>
          </div>
          <div className="absolute -top-[26px] -left-[22px] -rotate-7 rounded-xl border-3 border-ink bg-teal px-3.5 py-[9px] font-display text-[12.5px] text-white shadow-hard-4">
            HPLC ✓
          </div>
          <div className="absolute top-[34%] -right-[30px] grid size-[74px] animate-float place-items-center rounded-full border-3 border-ink bg-sun text-center font-display text-[15px] leading-none shadow-hard-4">
            GMP
          </div>
          <div className="absolute right-1.5 -bottom-5 rotate-3 rounded-full border-3 border-ink bg-mint px-[15px] py-[9px] text-[12.5px] font-bold shadow-hard-4">
            Terbuka untuk peluang baru
          </div>
        </div>
      </div>
    </header>
  )
}
