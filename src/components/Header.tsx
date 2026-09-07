import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export const NAV = [
  { label: 'Home', href: '#/' },
  { label: 'About', href: '#/about' },
  { label: 'Agents', href: '#/agents' },
  { label: 'Submissions', href: '#/submissions' },
  { label: 'Recent Deals', href: '#/deals' },
  { label: 'Network', href: '#/network' },
  { label: 'FAQs', href: '#/faqs' },
  { label: 'Contact', href: '#/contact' },
];

export default function Header({ route }: { route: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [route]);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-paper/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? 'border-line shadow-[0_1px_0_0_rgba(22,21,19,0.04)]' : 'border-transparent'
      }`}
    >
      <div className="container-ed flex h-16 items-center justify-between md:h-20">
        <a href="#/" className="group flex items-baseline gap-2">
          <span className="font-serif text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-forest md:text-[26px]">
            Inkwriters
          </span>
          <span className="hidden font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted sm:inline">
            Literary Agency
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const path = item.href.slice(1);
            const active =
              path === '/' ? route === '/' : route === path || route.startsWith(path + '/');
            return (
              <a
                key={item.href}
                href={item.href}
                className={`font-sans text-[13px] tracking-wide transition-colors duration-200 ${
                  active
                    ? 'border-b border-forest pb-0.5 font-medium text-forest'
                    : 'text-ink-soft hover:text-forest'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href="#/submissions"
            className="border border-ink bg-ink px-4 py-2 font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-paper transition-colors duration-200 hover:border-forest hover:bg-forest"
          >
            Submit
          </a>
        </nav>

        <button
          className="p-2 text-ink lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <Menu className="hidden" /> : null}
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-paper lg:hidden">
          <div className="container-ed flex flex-col py-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-line/60 py-3 font-sans text-sm tracking-wide text-ink-soft last:border-0 hover:text-forest"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
