const NAV_LINKS = [
  { href: '#tentang', label: 'Tentang' },
  { href: '#keahlian', label: 'Keahlian' },
  { href: '#pengalaman', label: 'Pengalaman' },
  { href: '#pendidikan', label: 'Pendidikan' },
]

export function Navbar() {
  return (
    <nav className="page-x flex flex-wrap items-center justify-between gap-5 border-b-3 border-ink bg-cream py-5">
      <a href="#atas" className="flex items-center gap-2.5">
        <span className="grid size-[38px] place-items-center rounded-[10px] border-3 border-ink bg-lavender font-display text-[17px] leading-none">
          K
        </span>
        <span className="font-display text-[15px] tracking-[-0.02em]">kurnia.qc</span>
      </a>
      <div className="flex flex-wrap items-center gap-[22px] text-[14.5px] font-semibold">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <a href="#kontak" className="rounded-full border-3 border-ink bg-sun px-[18px] py-[9px] shadow-hard-3">
          Kontak
        </a>
      </div>
    </nav>
  )
}
