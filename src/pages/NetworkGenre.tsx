import { useState } from 'react';
import { trpc } from '@/providers/trpc';
import { genreName, networkGenres, boards, boardName } from '../data/network';

function formatDate(date: Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const roleStyle: Record<string, string> = {
  moderator: 'border-forest/40 bg-forest/10 text-forest',
  author: 'border-ink/20 text-ink-soft',
  reader: 'border-line text-ink-muted',
};

const allBoards = [
  ...boards.map((b) => ({ slug: b.slug, name: b.name })),
  ...networkGenres.map((g) => ({ slug: g.slug, name: g.name })),
];

export default function NetworkGenre({ genre }: { genre: string }) {
  const valid = allBoards.some((g) => g.slug === genre);
  const { data: threads, isLoading } = trpc.network.threadsByGenre.useQuery(
    { genre },
    { enabled: valid },
  );
  const utils = trpc.useUtils();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', title: '', body: '' });

  const createThread = trpc.network.createThread.useMutation({
    onSuccess: () => {
      utils.network.threadsByGenre.invalidate({ genre });
      utils.network.recentActivity.invalidate();
      utils.network.genreStats.invalidate();
      setForm({ name: '', title: '', body: '' });
      setShowForm(false);
    },
  });

  if (!valid) {
    return (
      <div className="container-ed py-24 text-center">
        <h1 className="font-serif text-3xl font-medium text-ink">Room not found</h1>
        <a href="#/network" className="link-underline mt-4 inline-block font-sans text-sm text-ink-soft">
          Back to the Network
        </a>
      </div>
    );
  }

  const isSpecialBoard = boards.some((b) => b.slug === genre);
  const name = isSpecialBoard ? boardName(genre) : genreName(genre);
  const inputCls =
    'w-full border border-line bg-paper px-4 py-3 font-sans text-sm font-light text-ink placeholder:text-ink-muted/60 focus:border-forest focus:outline-none transition-colors';

  return (
    <div>
      <section className="border-b border-line bg-paper">
        <div className="container-ed py-14 md:py-20">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-ink-muted">
            <a href="#/network" className="transition-colors hover:text-forest">
              Inkwriters Network
            </a>
            <span className="mx-2 text-line">/</span> Discussion Boards
          </p>
          <h1 className="mt-5 font-serif text-4xl font-medium tracking-tight text-ink md:text-[48px]">
            {name}
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-[15px] font-light leading-relaxed text-ink-soft">
            {isSpecialBoard
              ? boards.find((b) => b.slug === genre)?.description
              : `The ${name.toLowerCase()} room of the Inkwriters Network. Browse discussions below, or start a new thread. New authors are welcome: introduce yourself, ask for feedback, or share what you are reading.`}
          </p>

          {/* Board switcher */}
          <div className="mt-8 flex flex-wrap gap-2">
            {allBoards.map((g) => (
              <a
                key={g.slug}
                href={`#/network/${g.slug}`}
                className={`border px-3.5 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 ${
                  g.slug === genre
                    ? 'border-forest bg-forest text-paper'
                    : 'border-line text-ink-soft hover:border-forest hover:text-forest'
                }`}
              >
                {g.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-ed py-14 md:py-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-sans text-sm font-light text-ink-muted">
              {threads ? `${threads.length} discussions in this room` : 'Loading discussions\u2026'}
            </p>
            <button
              onClick={() => setShowForm(!showForm)}
              className="border border-ink bg-ink px-6 py-3 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-200 hover:border-forest hover:bg-forest"
            >
              {showForm ? 'Cancel' : 'Start a Discussion'}
            </button>
          </div>

          {/* New thread form */}
          {showForm && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createThread.mutate({
                  genre,
                  title: form.title,
                  body: form.body,
                  authorName: form.name,
                  authorRole: 'author',
                });
              }}
              className="mt-8 border border-line bg-cream/50 p-8"
            >
              <h2 className="font-serif text-xl font-medium text-ink">Start a new discussion</h2>
              <p className="mt-1 font-sans text-xs font-light text-ink-muted">
                Your post appears immediately. Moderators review all new threads.
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                    Your name or pen name
                  </label>
                  <input
                    required
                    className={inputCls}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. J. A. Writer"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                    Discussion title
                  </label>
                  <input
                    required
                    minLength={4}
                    className={inputCls}
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="What would you like to discuss?"
                  />
                </div>
              </div>
              <div className="mt-5">
                <label className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                  Your post
                </label>
                <textarea
                  required
                  minLength={10}
                  rows={5}
                  className={`${inputCls} resize-y`}
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  placeholder="Ask a question, share your work-in-progress challenge, or open a topic for readers."
                />
              </div>
              <button
                type="submit"
                disabled={createThread.isPending}
                className="mt-6 border border-ink bg-ink px-7 py-3 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-200 hover:border-forest hover:bg-forest disabled:opacity-50"
              >
                {createThread.isPending ? 'Posting\u2026' : 'Post Discussion'}
              </button>
              {createThread.isError && (
                <p className="mt-3 font-sans text-xs text-red-700">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}

          {/* Thread list */}
          <div className="mt-10 border-t border-line">
            {isLoading && (
              <p className="py-10 font-sans text-sm font-light text-ink-muted">
                Loading discussions&hellip;
              </p>
            )}
            {threads?.map((t) => (
              <a
                key={t.id}
                href={`#/network/${genre}/thread/${t.id}`}
                className="group grid gap-2 border-b border-line py-7 transition-colors duration-200 hover:bg-cream/40 md:grid-cols-12 md:items-baseline md:gap-6"
              >
                <div className="md:col-span-8">
                  <div className="flex flex-wrap items-center gap-2">
                    {t.pinned === 1 && (
                      <span className="border border-ink bg-ink px-1.5 py-0.5 font-sans text-[9px] font-medium uppercase tracking-[0.14em] text-paper">
                        Pinned
                      </span>
                    )}
                    <h2 className="font-serif text-xl font-medium leading-snug text-ink transition-colors group-hover:text-forest">
                      {t.title}
                    </h2>
                  </div>
                  <p className="mt-2 line-clamp-2 max-w-2xl font-sans text-sm font-light leading-relaxed text-ink-soft">
                    {t.body}
                  </p>
                </div>
                <div className="md:col-span-4 md:text-right">
                  <p className="font-sans text-xs font-light text-ink-muted">
                    <span
                      className={`mr-1.5 inline-block border px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] ${roleStyle[t.authorRole]}`}
                    >
                      {t.authorRole}
                    </span>
                    {t.authorName}
                  </p>
                  <p className="mt-1.5 font-sans text-xs font-light text-ink-muted">
                    {t.replyCount} {t.replyCount === 1 ? 'reply' : 'replies'} &middot; started{' '}
                    {formatDate(t.createdAt)}
                  </p>
                </div>
              </a>
            ))}
            {threads?.length === 0 && (
              <p className="py-10 font-sans text-sm font-light text-ink-muted">
                No discussions yet in this room. Be the first to start one.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
