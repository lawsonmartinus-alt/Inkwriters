import { NAV } from './Header';
import { EMAIL } from '../data/content';

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="container-ed py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-serif text-2xl font-semibold tracking-tight">Inkwriters</p>
            <p className="mt-3 max-w-xs font-sans text-sm font-light leading-relaxed text-paper/60">
              Professional literary representation for serious authors.
            </p>
          </div>

          <div>
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-paper/40">
              Navigate
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-sans text-sm font-light text-paper/70 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-paper/40">
              Contact
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 inline-block border-b border-paper/30 pb-0.5 font-sans text-sm text-paper/80 transition-colors hover:border-paper hover:text-paper"
            >
              {EMAIL}
            </a>
            <p className="mt-4 max-w-xs font-sans text-xs font-light leading-relaxed text-paper/40">
              The only valid email addresses from our agency end in @inkwriters.co.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-paper/10 pt-6 sm:flex-row sm:items-center">
          <p className="font-sans text-xs font-light text-paper/40">
            &copy; {new Date().getFullYear()} Inkwriters. All rights reserved.
          </p>
          <p className="font-sans text-xs font-light text-paper/40">inkwriters.co</p>
        </div>
      </div>
    </footer>
  );
}
