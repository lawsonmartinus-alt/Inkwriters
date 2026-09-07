import BookCover from '../components/BookCover';
import { featuredBooks, genres, news } from '../data/content';

const services = [
  {
    n: '01',
    title: 'Literary Representation',
    body: 'Full-service representation from manuscript refinement through publication, with an agent who knows your work intimately and advocates for it at every house that matters.',
  },
  {
    n: '02',
    title: 'Career Strategy',
    body: 'We plan in arcs, not in launches, mapping each book to the next so that every publication compounds your readership and your position in the market.',
  },
  {
    n: '03',
    title: 'Publishing Deal Negotiation',
    body: 'Advances, royalties, subrights splits, option clauses: we negotiate the terms that shape an author\u2019s income for years, and we do not leave value on the table.',
  },
  {
    n: '04',
    title: 'Rights Management',
    body: 'Film, foreign translation, and audio rights handled by a dedicated rights operation with co-agent relationships across more than thirty territories.',
  },
  {
    n: '05',
    title: 'Author Branding & Positioning',
    body: 'From jacket copy to public presence, we help authors articulate who they are to readers, and keep that identity consistent across a career.',
  },
];

export default function Home() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <img
          src="/images/hero-library.jpg"
          alt="Library bookshelves"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/70 to-ink/40" />
        <div className="container-ed relative py-24">
          <div className="max-w-2xl">
            <p className="hero-fade font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-paper/70">
              Inkwriters Literary Agency
            </p>
            <h1 className="hero-fade mt-6 font-serif text-[42px] font-medium leading-[1.08] tracking-tight text-paper md:text-[64px]">
              Exceptional Literary Representation for Modern Authors
            </h1>
            <p className="hero-fade-delay mt-6 max-w-xl font-sans text-base font-light leading-relaxed text-paper/80 md:text-lg">
              A forward-thinking literary agency helping authors build lasting careers through
              strategic representation, reader discovery, and long-term positioning.
            </p>
            <div className="hero-fade-delay mt-10 flex flex-wrap gap-4">
              <a
                href="#/submissions"
                className="border border-paper bg-paper px-7 py-3.5 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-200 hover:bg-transparent hover:text-paper"
              >
                Submit Your Work
              </a>
              <a
                href="#/about"
                className="border border-paper/50 px-7 py-3.5 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-200 hover:border-paper hover:bg-paper/10"
              >
                Learn About Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Credibility ──────────────────────────────────── */}
      <section className="border-b border-line bg-paper">
        <div className="container-ed py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="eyebrow">What We Represent</p>
              <h2 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight text-ink md:text-4xl">
                We represent authors across fiction and nonfiction.
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="font-sans text-[15px] font-light leading-relaxed text-ink-soft">
                From debut novelists to established experts, our list spans the categories readers
                return to again and again. If your work tells a true story well, or an invented
                one that feels true, we want to see it.
              </p>
              <ul className="mt-8 flex flex-wrap gap-x-2 gap-y-3">
                {genres.map((g, i) => (
                  <li key={g} className="flex items-center gap-2">
                    <span className="font-serif text-lg italic text-forest">{g}</span>
                    {i < genres.length - 1 && <span className="ml-1 text-line">/</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────── */}
      <section className="bg-cream/60">
        <div className="container-ed py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow">Client Services</p>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight text-ink md:text-[40px]">
              Every stage of an author&rsquo;s career, under one roof.
            </h2>
          </div>

          <div className="mt-14 border-t border-line">
            {services.map((s) => (
              <div
                key={s.n}
                className="group grid gap-3 border-b border-line py-8 transition-colors duration-300 md:grid-cols-12 md:gap-6 md:py-10"
              >
                <div className="md:col-span-2">
                  <span className="font-serif text-sm italic text-ink-muted transition-colors group-hover:text-forest">
                    {s.n}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-serif text-2xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-forest">
                    {s.title}
                  </h3>
                </div>
                <div className="md:col-span-6">
                  <p className="max-w-xl font-sans text-[15px] font-light leading-relaxed text-ink-soft">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Unique Edge ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <img
          src="/images/library-dark.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="container-ed relative py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-paper/50">
              The Inkwriters Edge
            </p>
            <blockquote className="mt-8 font-serif text-2xl font-medium leading-snug tracking-tight md:text-[34px] md:leading-[1.35]">
              &ldquo;Through our extended reader ecosystem and discovery networks, we help books
              reach aligned audiences and maintain visibility beyond initial publication
              cycles.&rdquo;
            </blockquote>
            <div className="mx-auto mt-8 h-px w-16 bg-paper/30" />
            <p className="mt-8 font-sans text-sm font-light leading-relaxed text-paper/60">
              Publication day is the beginning, not the finish line. Our work continues through
              backlist revival, format expansion, and sustained reader discovery.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured Books ───────────────────────────────── */}
      <section className="bg-paper">
        <div className="container-ed py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">From Our List</p>
              <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink md:text-[40px]">
                Featured books &amp; authors
              </h2>
            </div>
            <a href="#/deals" className="link-underline font-sans text-sm text-ink-soft">
              View recent deals
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {featuredBooks.map((b) => (
              <BookCover key={b.title} book={b} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest News ──────────────────────────────────── */}
      <section className="border-t border-line bg-cream/60">
        <div className="container-ed py-20 md:py-28">
          <p className="eyebrow">Latest News</p>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink md:text-[40px]">
            From the agency
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {news.map((item) => (
              <article key={item.title} className="bg-paper p-8 transition-colors duration-300 hover:bg-cream/50">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-forest">
                    {item.tag}
                  </span>
                  <span className="h-px w-6 bg-line" />
                  <span className="font-sans text-[11px] font-light text-ink-muted">{item.date}</span>
                </div>
                <h3 className="mt-4 font-serif text-xl font-medium leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="border-t border-line bg-paper">
        <div className="container-ed flex flex-col items-center py-20 text-center md:py-24">
          <h2 className="max-w-xl font-serif text-3xl font-medium leading-tight tracking-tight text-ink md:text-4xl">
            Have a manuscript that deserves a champion?
          </h2>
          <p className="mt-4 max-w-md font-sans text-[15px] font-light leading-relaxed text-ink-soft">
            We read every submission ourselves and respond within two to four weeks.
          </p>
          <a
            href="#/submissions"
            className="mt-8 border border-ink bg-ink px-8 py-3.5 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-200 hover:border-forest hover:bg-forest"
          >
            Submit Your Work
          </a>
        </div>
      </section>
    </div>
  );
}
