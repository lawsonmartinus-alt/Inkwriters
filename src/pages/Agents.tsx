import { agents } from '../data/content';

export default function Agents() {
  return (
    <div>
      <section className="border-b border-line bg-paper">
        <div className="container-ed py-16 md:py-24">
          <p className="eyebrow">Our Team</p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-medium leading-[1.12] tracking-tight text-ink md:text-[52px]">
            Agents who read closely and negotiate hard.
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-[15px] font-light leading-relaxed text-ink-soft">
            Every Inkwriters agent keeps a deliberately focused list, so each client gets real
            attention: editorial, strategic, and personal. Below, each agent shares what
            they&rsquo;re currently looking for.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-ed py-16 md:py-20">
          <div className="space-y-0 border-t border-line">
            {agents.map((agent) => (
              <article
                key={agent.name}
                className="grid gap-8 border-b border-line py-12 md:grid-cols-12 md:py-14"
              >
                {/* Headshot */}
                <div className="md:col-span-3">
                  <div className="aspect-[4/5] w-full max-w-[220px] overflow-hidden bg-cream">
                    <img
                      src={agent.photo}
                      alt={`Portrait of ${agent.name}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p
                    className={`mt-3 inline-block border px-2.5 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.18em] ${
                      agent.open
                        ? 'border-forest/30 text-forest'
                        : 'border-line text-ink-muted'
                    }`}
                  >
                    {agent.open ? 'Open to submissions' : 'Closed to submissions'}
                  </p>
                </div>

                <div className="md:col-span-5">
                  <h2 className="font-serif text-2xl font-medium tracking-tight text-ink md:text-[28px]">
                    {agent.name}
                  </h2>
                  <p className="mt-1 font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-forest">
                    {agent.title}
                  </p>
                  <p className="mt-5 font-sans text-[15px] font-light leading-relaxed text-ink-soft">
                    {agent.bio}
                  </p>
                </div>

                <div className="md:col-span-4">
                  <h3 className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
                    What I&rsquo;m looking for
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {agent.seeking.map((s) => (
                      <li
                        key={s}
                        className="flex gap-3 font-sans text-sm font-light leading-relaxed text-ink-soft"
                      >
                        <span className="mt-[9px] h-px w-4 shrink-0 bg-forest/50" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center border border-line bg-cream/50 px-8 py-12 text-center">
            <h2 className="font-serif text-2xl font-medium tracking-tight text-ink md:text-3xl">
              Found an agent who fits your book?
            </h2>
            <p className="mt-3 max-w-lg font-sans text-sm font-light leading-relaxed text-ink-soft">
              Read our guidelines carefully, then submit to the one agent best suited to your work.
            </p>
            <a
              href="#/submissions"
              className="mt-7 border border-ink bg-ink px-8 py-3.5 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-200 hover:border-forest hover:bg-forest"
            >
              Read Submission Guidelines
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
