import { useState } from 'react';
import { deals, type Deal } from '../data/content';

const filters: Array<'All' | Deal['type']> = ['All', 'Book Deal', 'Foreign Rights', 'Film/TV'];

export default function Deals() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const shown = filter === 'All' ? deals : deals.filter((d) => d.type === filter);

  return (
    <div>
      <section className="border-b border-line bg-paper">
        <div className="container-ed py-16 md:py-24">
          <p className="eyebrow">Recent Deals</p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-medium leading-[1.12] tracking-tight text-ink md:text-[52px]">
            Recent placements, translations, and adaptations.
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-[15px] font-light leading-relaxed text-ink-soft">
            A selection of recent book deals, foreign rights sales, and film/television options
            negotiated on behalf of Inkwriters clients.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-ed py-14 md:py-20">
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`border px-4 py-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-200 ${
                  filter === f
                    ? 'border-forest bg-forest text-paper'
                    : 'border-line bg-paper text-ink-soft hover:border-forest hover:text-forest'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Deal list */}
          <div className="mt-10 border-t border-line">
            <div className="hidden grid-cols-12 gap-4 border-b border-line py-3 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-ink-muted md:grid">
              <span className="col-span-4">Title</span>
              <span className="col-span-3">Author</span>
              <span className="col-span-3">Publisher / Partner</span>
              <span className="col-span-2">Type</span>
            </div>
            {shown.map((d, i) => (
              <div
                key={`${d.title}-${d.publisher}-${i}`}
                className="grid gap-2 border-b border-line py-6 transition-colors duration-200 hover:bg-cream/40 md:grid-cols-12 md:items-baseline md:gap-4"
              >
                <div className="md:col-span-4">
                  <p className="font-serif text-lg font-medium italic text-ink">{d.title}</p>
                  <p className="mt-1 font-sans text-xs font-light text-ink-muted md:hidden">
                    {d.author} &middot; {d.publisher}
                  </p>
                </div>
                <p className="hidden font-sans text-sm font-light text-ink-soft md:col-span-3 md:block">
                  {d.author}
                </p>
                <div className="hidden md:col-span-3 md:block">
                  <p className="font-sans text-sm font-light text-ink-soft">{d.publisher}</p>
                  <p className="mt-0.5 font-sans text-xs font-light text-ink-muted">{d.detail}</p>
                </div>
                <div className="md:col-span-2">
                  <span
                    className={`inline-block border px-2.5 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.16em] ${
                      d.type === 'Book Deal'
                        ? 'border-forest/30 text-forest'
                        : d.type === 'Foreign Rights'
                          ? 'border-ink/20 text-ink-soft'
                          : 'border-ink bg-ink text-paper'
                    }`}
                  >
                    {d.type}
                  </span>
                  <p className="mt-1.5 font-sans text-xs font-light text-ink-muted md:hidden">
                    {d.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 font-sans text-xs font-light leading-relaxed text-ink-muted">
            Deal announcements represent a selection of recent activity. Many sales are not
            publicly announced at the client&rsquo;s or publisher&rsquo;s request.
          </p>
        </div>
      </section>
    </div>
  );
}
