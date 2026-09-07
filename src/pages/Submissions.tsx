import { useState } from 'react';
import { EMAIL, agents } from '../data/content';

const guidelines = [
  {
    title: 'Original, human-written work only',
    body: 'All submissions must be your own original work, written by you. We do not consider manuscripts generated wholly or substantially by AI tools. Technology may assist with spelling or grammar, but the storytelling, craft, and voice must be yours.',
  },
  {
    title: 'Fiction must be complete',
    body: 'Query only when your fiction manuscript is finished and thoroughly revised. Please send the most final draft you have. Do not send updated drafts unless the agent requests them.',
  },
  {
    title: 'Nonfiction requires a proposal',
    body: 'For nonfiction, send a query letter together with a full book proposal, including an overview, chapter outline, sample chapters, author bio, and market analysis.',
  },
  {
    title: 'Query one agent only',
    body: 'Please do not submit to multiple Inkwriters agents simultaneously. Choose the single agent whose list best fits your work. If that agent feels your project suits a colleague better, they will share it internally.',
  },
];

export default function Submissions() {
  const [form, setForm] = useState({ name: '', email: '', agent: '', genre: '', message: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Submission: ${form.genre || 'Manuscript'} from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nAgent: ${form.agent}\nGenre: ${form.genre}\n\nQuery / Synopsis:\n${form.message}\n\n(Attach your manuscript or proposal to this email before sending.)`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const inputCls =
    'w-full border border-line bg-paper px-4 py-3 font-sans text-sm font-light text-ink placeholder:text-ink-muted/60 focus:border-forest focus:outline-none transition-colors';

  return (
    <div>
      <section className="border-b border-line bg-paper">
        <div className="container-ed py-16 md:py-24">
          <p className="eyebrow">Submissions</p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-medium leading-[1.12] tracking-tight text-ink md:text-[52px]">
            We read everything we receive.
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-[15px] font-light leading-relaxed text-ink-soft">
            Inkwriters welcomes submissions from debut and established authors alike. Follow the
            guidelines below. They exist to give your work its fairest reading.
          </p>
        </div>
      </section>

      {/* Guidelines */}
      <section className="bg-paper">
        <div className="container-ed py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-2">
            {guidelines.map((g, i) => (
              <div key={g.title} className="border-t border-ink/15 pt-6">
                <span className="font-serif text-sm italic text-ink-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-3 font-serif text-xl font-medium text-ink">{g.title}</h2>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-ink-soft">
                  {g.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2">
            <div className="bg-cream/60 p-8">
              <h3 className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-forest">
                Response time
              </h3>
              <p className="mt-3 font-serif text-3xl font-medium text-ink">2 to 4 weeks</p>
              <p className="mt-3 font-sans text-sm font-light leading-relaxed text-ink-soft">
                We aim to respond to every submission within two to four weeks of receipt. If four
                weeks have passed, a polite follow-up is always welcome.
              </p>
            </div>
            <div className="bg-cream/60 p-8">
              <h3 className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-forest">
                A note on security
              </h3>
              <p className="mt-3 font-sans text-sm font-light leading-relaxed text-ink-soft">
                We will never ask you to pay reading fees or send money through unofficial channels.
                Legitimate communication from Inkwriters comes only from addresses ending in{' '}
                <span className="font-medium text-forest">@inkwriters.co</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Submission form */}
      <section className="border-t border-line bg-cream/60">
        <div className="container-ed grid gap-12 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-5">
            <p className="eyebrow">Submit Your Manuscript</p>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight text-ink">
              Send your query
            </h2>
            <div className="mt-6 space-y-4 font-sans text-sm font-light leading-relaxed text-ink-soft">
              <p>
                Complete the form and your query will open in your email client, addressed to{' '}
                <a href={`mailto:${EMAIL}`} className="link-underline text-ink">
                  {EMAIL}
                </a>
                . Attach your manuscript or proposal before sending.
              </p>
              <p>
                Prefer to write directly? Email your query letter, synopsis, and the first three
                chapters (fiction) or full proposal (nonfiction) to the same address.
              </p>
            </div>
            <div className="mt-8 overflow-hidden">
              <img
                src="/images/book-stack.jpg"
                alt="A stack of books"
                className="aspect-[3/2] w-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-7">
            <form onSubmit={submit} className="border border-line bg-paper p-8 md:p-10">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                    Full name
                  </label>
                  <input
                    required
                    className={inputCls}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    className={inputCls}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                    Agent
                  </label>
                  <select
                    required
                    className={inputCls}
                    value={form.agent}
                    onChange={(e) => setForm({ ...form, agent: e.target.value })}
                  >
                    <option value="">Choose one agent</option>
                    {agents
                      .filter((a) => a.open)
                      .map((a) => (
                        <option key={a.name} value={a.name}>
                          {a.name}, {a.title}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                    Genre
                  </label>
                  <input
                    required
                    className={inputCls}
                    value={form.genre}
                    onChange={(e) => setForm({ ...form, genre: e.target.value })}
                    placeholder="e.g. Literary fiction"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                  Query letter &amp; synopsis
                </label>
                <textarea
                  required
                  rows={8}
                  className={`${inputCls} resize-y`}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Introduce yourself and your book: title, word count, genre, a brief synopsis, and any relevant background."
                />
              </div>
              <button
                type="submit"
                className="mt-8 w-full border border-ink bg-ink px-8 py-4 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-200 hover:border-forest hover:bg-forest sm:w-auto"
              >
                Submit Your Manuscript
              </button>
              <p className="mt-4 font-sans text-xs font-light text-ink-muted">
                Submitting confirms your work is original and human-written. Please submit to one
                agent only.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
