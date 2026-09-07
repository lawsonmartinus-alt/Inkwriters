const values = [
  {
    title: 'Relationships first',
    body: 'Publishing is a people business. We build decade-long partnerships with our authors, and with the editors who publish them, because trust is what moves careers forward.',
  },
  {
    title: 'Careers, not just books',
    body: 'A single deal can be luck. A career is strategy. We plan each client\u2019s trajectory across multiple books, formats, and markets, measuring success in years rather than weeks.',
  },
  {
    title: 'Deep industry knowledge',
    body: 'Our team has sat on every side of the table: editorial, rights, contracts, publicity, and bookselling. That 360-degree view shapes every negotiation and every submission list.',
  },
];

export default function About() {
  return (
    <div>
      {/* ── Page header ──────────────────────────────────── */}
      <section className="border-b border-line bg-paper">
        <div className="container-ed py-16 md:py-24">
          <p className="eyebrow">About Inkwriters</p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-medium leading-[1.12] tracking-tight text-ink md:text-[52px]">
            To guide authors from manuscript to long-term success.
          </h1>
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────── */}
      <section className="bg-paper">
        <div className="container-ed grid gap-12 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-5">
            <div className="overflow-hidden">
              <img
                src="/images/writing-desk.jpg"
                alt="A writer's desk with pen and paper"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <p className="mt-3 font-sans text-[11px] font-light uppercase tracking-[0.2em] text-ink-muted">
              Where every career begins: the page
            </p>
          </div>
          <div className="md:col-span-7">
            <h2 className="font-serif text-2xl font-medium tracking-tight text-ink md:text-3xl">
              Our story
            </h2>
            <div className="mt-6 space-y-5 font-sans text-[15px] font-light leading-relaxed text-ink-soft">
              <p>
                Inkwriters was founded by publishing veterans who believed the traditional agency
                model had lost sight of its first obligation: the author. Having spent years inside
                publishing houses acquiring, editing, and marketing books, our founders
                saw how often talented writers were treated as one-book propositions rather than
                careers in the making.
              </p>
              <p>
                The agency was built to be different: deliberately selective, deeply hands-on, and
                oriented toward the long horizon. From the beginning, Inkwriters paired classic
                literary representation, from editorial guidance and shrewd deal-making to rigorous
                contract work, with a modern understanding of how readers actually find books
                in a crowded market.
              </p>
              <p>
                Today, Inkwriters represents authors across literary fiction, romance, fantasy,
                self-help, business, memoir, and inspirational nonfiction, with a rights operation
                reaching more than thirty territories. What has never changed is the founding
                conviction: an agent works for the author, and a career is built one honest
                conversation at a time.
              </p>
            </div>

            <div className="mt-10 border-l-2 border-forest pl-6">
              <p className="font-serif text-xl italic leading-relaxed text-ink">
                &ldquo;Our mission is simple: to guide authors from manuscript to long-term
                success.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────── */}
      <section className="border-t border-line bg-cream/60">
        <div className="container-ed py-16 md:py-24">
          <p className="eyebrow">How We Work</p>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink md:text-[36px]">
            What sets the agency apart
          </h2>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {values.map((v, i) => (
              <div key={v.title} className="border-t border-ink/15 pt-6">
                <span className="font-serif text-sm italic text-ink-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-serif text-xl font-medium text-ink">{v.title}</h3>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-ink-soft">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Image band ───────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <img
          src="/images/open-book.jpg"
          alt="An open book"
          className="h-[320px] w-full object-cover md:h-[420px]"
        />
        <div className="absolute inset-0 bg-ink/30" />
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="bg-paper">
        <div className="container-ed flex flex-col items-center py-16 text-center md:py-20">
          <h2 className="max-w-xl font-serif text-3xl font-medium leading-tight tracking-tight text-ink">
            Meet the people behind the agency.
          </h2>
          <a
            href="#/agents"
            className="mt-8 border border-ink bg-ink px-8 py-3.5 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-200 hover:border-forest hover:bg-forest"
          >
            Meet Our Agents
          </a>
        </div>
      </section>
    </div>
  );
}
