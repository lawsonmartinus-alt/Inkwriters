import { useState } from 'react';
import { trpc } from '@/providers/trpc';
import { genreName, boardName, networkGenres } from '../data/network';

function formatDate(date: Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const roleStyle: Record<string, string> = {
  moderator: 'border-forest/40 bg-forest/10 text-forest',
  author: 'border-ink/20 text-ink-soft',
  reader: 'border-line text-ink-muted',
};

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function NetworkThread({ genre, threadId }: { genre: string; threadId: number }) {
  const { data: thread, isLoading } = trpc.network.thread.useQuery({ id: threadId });
  const utils = trpc.useUtils();

  const [form, setForm] = useState({ name: '', body: '' });

  const createReply = trpc.network.createReply.useMutation({
    onSuccess: () => {
      utils.network.thread.invalidate({ id: threadId });
      utils.network.threadsByGenre.invalidate({ genre });
      utils.network.recentActivity.invalidate();
      utils.network.genreStats.invalidate();
      setForm({ name: '', body: '' });
    },
  });

  const inputCls =
    'w-full border border-line bg-paper px-4 py-3 font-sans text-sm font-light text-ink placeholder:text-ink-muted/60 focus:border-forest focus:outline-none transition-colors';

  if (isLoading) {
    return (
      <div className="container-ed py-24 text-center">
        <p className="font-sans text-sm font-light text-ink-muted">Loading discussion&hellip;</p>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="container-ed py-24 text-center">
        <h1 className="font-serif text-3xl font-medium text-ink">Discussion not found</h1>
        <a
          href={`#/network/${genre}`}
          className="link-underline mt-4 inline-block font-sans text-sm text-ink-soft"
        >
          Back to the room
        </a>
      </div>
    );
  }

  return (
    <div>
      <section className="border-b border-line bg-paper">
        <div className="container-ed py-14 md:py-16">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-ink-muted">
            <a href="#/network" className="transition-colors hover:text-forest">
              Inkwriters Network
            </a>
            <span className="mx-2 text-line">/</span>
            <a href={`#/network/${genre}`} className="transition-colors hover:text-forest">
              {networkGenres.some((g) => g.slug === genre) ? genreName(genre) : boardName(genre)}
            </a>
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-3xl font-medium leading-tight tracking-tight text-ink md:text-[40px]">
            {thread.title}
          </h1>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-ed max-w-4xl py-12 md:py-16">
          {/* Original post */}
          <article className="border border-line bg-cream/40 p-7 md:p-9">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-ink/15 bg-paper font-serif text-base font-medium text-ink">
                {initials(thread.authorName)}
              </div>
              <div>
                <p className="font-sans text-sm font-medium text-ink">
                  {thread.authorName}{' '}
                  <span
                    className={`ml-1 inline-block border px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] ${roleStyle[thread.authorRole]}`}
                  >
                    {thread.authorRole}
                  </span>
                </p>
                <p className="mt-0.5 font-sans text-xs font-light text-ink-muted">
                  Original post &middot; {formatDate(thread.createdAt)}
                </p>
              </div>
            </div>
            <p className="mt-6 font-sans text-[15px] font-light leading-relaxed text-ink-soft">
              {thread.body}
            </p>
          </article>

          {/* Replies */}
          <div className="mt-10">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
              {thread.replies.length} {thread.replies.length === 1 ? 'Reply' : 'Replies'}
            </p>
            <div className="mt-4 border-t border-line">
              {thread.replies.map((r) => (
                <article key={r.id} className="border-b border-line py-7">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center border font-serif text-sm font-medium ${
                        r.authorRole === 'moderator'
                          ? 'border-forest/30 bg-forest/10 text-forest'
                          : 'border-ink/15 bg-cream/60 text-ink'
                      }`}
                    >
                      {initials(r.authorName)}
                    </div>
                    <div>
                      <p className="font-sans text-sm font-medium text-ink">
                        {r.authorName}{' '}
                        <span
                          className={`ml-1 inline-block border px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] ${roleStyle[r.authorRole]}`}
                        >
                          {r.authorRole}
                        </span>
                      </p>
                      <p className="mt-0.5 font-sans text-xs font-light text-ink-muted">
                        {formatDate(r.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 pl-14 font-sans text-[15px] font-light leading-relaxed text-ink-soft">
                    {r.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Reply form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createReply.mutate({
                threadId,
                body: form.body,
                authorName: form.name,
                authorRole: 'reader',
              });
            }}
            className="mt-12 border border-line bg-cream/50 p-7 md:p-9"
          >
            <h2 className="font-serif text-xl font-medium text-ink">Join the conversation</h2>
            <p className="mt-1 font-sans text-xs font-light text-ink-muted">
              Your reply appears immediately. Moderators read every thread.
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
                  placeholder="e.g. Avid Reader"
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                Your reply
              </label>
              <textarea
                required
                minLength={2}
                rows={4}
                className={`${inputCls} resize-y`}
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                placeholder="Share your take, answer the question, or offer feedback."
              />
            </div>
            <button
              type="submit"
              disabled={createReply.isPending}
              className="mt-6 border border-ink bg-ink px-7 py-3 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-200 hover:border-forest hover:bg-forest disabled:opacity-50"
            >
              {createReply.isPending ? 'Posting\u2026' : 'Post Reply'}
            </button>
            {createReply.isError && (
              <p className="mt-3 font-sans text-xs text-red-700">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
