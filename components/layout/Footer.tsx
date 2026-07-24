import Link from "next/link";
import { footerColumns, socials } from "@/lib/data/site";
import NewsletterForm from "@/components/layout/NewsletterForm";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-surface">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-baseline gap-1.5">
              <span className="font-label text-xl font-bold tracking-[0.3em] text-white">DUBZZ</span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="font-label text-[11px] font-semibold tracking-[0.3em] text-white/50">GROUP</span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-neutral">
              A multi-venture creative and lifestyle ecosystem — five houses, one
              uncompromising standard.
            </p>
            <div className="mt-10">
              <p className="overline-label mb-4 text-white/45">The Inner Circle</p>
              <NewsletterForm />
              <p className="mt-3 text-xs text-white/30">
                A quiet dispatch, a few times a year. No noise.
              </p>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <p className="overline-label mb-5 text-white/45">{col.heading}</p>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} className="text-sm text-white/60 transition-colors duration-300 hover:text-gold">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Socials */}
        <div className="mt-16 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/8 pt-10">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline gap-2"
            >
              <span className="font-label text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40 transition-colors group-hover:text-gold">
                {s.label}
              </span>
              <span className="text-xs text-white/25">{s.handle}</span>
            </a>
          ))}
        </div>

        {/* Legal */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Dubzz Group. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-xs text-white/30 transition-colors hover:text-white/70">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-white/30 transition-colors hover:text-white/70">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
