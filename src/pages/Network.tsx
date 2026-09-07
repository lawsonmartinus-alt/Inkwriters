import { useState } from 'react';
import { trpc } from '@/providers/trpc';
import {
  networkGenres,
  boards,
  boardName,
  genreName,
  moderators,
  groupRules,
  pipeline,
  testimonials,
  readerReviews,
  trustBadges,
  currentSpotlight,
  spotlightArchive,
  libraryChannels,
  libraryProcess,
  placementTypeLabels,
  networkStats,
} from '../data/network';
import {
  welcomePathway,
  featuredMeaning,
  contentFormula,
  weeklyRhythm,
  seasonalCalendar,
  contentTiers,
  rejectionCriteria,
  resubmissionPath,
  editorialBoard,
  networkStandards,
  trendingBooks,
  trendingDiscussions,
  discoveryPairs,
  readerRoles,
  readerPulse,
  activityLog,
  authorReactions,
} from '../data/credibility';

function timeAgo(date: Date): string {
  const d = new Date(date);
  const now = new Date();
  const days = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (days < 1) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days} days ago`;
  if (days < 365) {
    const m = Math.floor(days / 30);
    return `${m} month${m > 1 ? 's' : ''} ago`;
  }
  const y = Math.floor(days / 365);
  return `${y} year${y > 1 ? 's' : ''} ago`;
}

const roleStyle: Record<string, string> = {
  moderator: 'border-forest/40 bg-forest/10 text-forest',
  author: 'border-ink/20 text-ink-soft',
  reader: 'border-line text-ink-muted',
};

function Cover({
  title,
  author,
  genre,
  palette,
  size = 'md',
}: {
  title: string;
  author: string;
  genre: string;
  palette: { bg: string; fg: string; accent: string };
  size?: 'sm' | 'md';
}) {
  return (
    <div
      className={`flex aspect-[2/3] flex-col justify-between shadow-[0_10px_28px_-12px_rgba(22,21,19,0.4)] ${
        size === 'sm' ? 'p-3' : 'p-5'
      }`}
      style={{ backgroundColor: palette.bg }}
    >
      <div>
        <p
          className={`font-sans font-medium uppercase tracking-[0.28em] ${size === 'sm' ? 'text-[7px]' : 'text-[9px]'}`}
          style={{ color: palette.accent }}
        >
          {genre}
        </p>
        <div className="mt-2 h-px w-6" style={{ backgroundColor: palette.accent, opacity: 0.7 }} />
      </div>
      <h4
        className={`font-serif font-medium leading-snug ${size === 'sm' ? 'text-sm' : 'text-lg'}`}
        style={{ color: palette.fg }}
      >
        {title}
      </h4>
      <p
        className={`font-sans font-light uppercase tracking-[0.18em] ${size === 'sm' ? 'text-[8px]' : 'text-[10px]'}`}
        style={{ color: palette.fg, opacity: 0.75 }}
      >
        {author}
      </p>
    </div>
  );
}

export default function Network() {
  const { data: activity } = trpc.network.recentActivity.useQuery({ limit: 6 });
  const { data: stats } = trpc.network.genreStats.useQuery();
  const { data: shelf } = trpc.network.shelfBooks.useQuery();
  const { data: polls } = trpc.network.polls.useQuery();
  const { data: placements } = trpc.network.placements.useQuery();
  const { data: pStats } = trpc.network.placementStats.useQuery();
  const utils = trpc.useUtils();

  const [voterName, setVoterName] = useState('');
  const [votedPolls, setVotedPolls] = useState<Record<number, number>>({});

  const vote = trpc.network.vote.useMutation({
    onSuccess: (_d, vars) => {
      setVotedPolls((v) => ({ ...v, [vars.pollId]: vars.optionIndex }));
      utils.network.polls.invalidate();
    },
  });

  const totalThreads = stats?.reduce((a, s) => a + s.threads, 0) ?? 0;
  const totalReplies = stats?.reduce((a, s) => a + s.replies, 0) ?? 0;

  const currentlyReading = shelf?.filter((b) => b.shelf === 'currently-reading') ?? [];
  const toRead = shelf?.filter((b) => b.shelf === 'to-read') ?? [];
  const groupRead = shelf?.filter((b) => b.shelf === 'read') ?? [];
  const clubPicks = shelf?.filter((b) => b.shelf === 'book-club-picks') ?? [];

  const s = currentSpotlight;

  return (
    <div>
      {/* ── Group masthead ───────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <img
          src="/images/library-dark.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="container-ed relative py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-paper/50">
                A reader group by Inkwriters Literary Agency
              </p>
              <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.08] tracking-tight md:text-[54px]">
                The Inkwriters Network
              </h1>
              <p className="mt-5 max-w-2xl font-serif text-lg italic leading-relaxed text-paper/80 md:text-xl">
                Where selected authors meet serious readers.
              </p>
              <p className="mt-4 max-w-2xl font-sans text-[15px] font-light leading-relaxed text-paper/70">
                A moderated reading group, active since 2023: weekly author spotlights, monthly book
                club picks chosen by member vote, genre discussion rooms, verified reader reviews,
                and a library placement program that puts network titles on real library shelves.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#/network/general"
                  className="border border-paper bg-paper px-7 py-3.5 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-200 hover:bg-transparent hover:text-paper"
                >
                  Enter the Discussion
                </a>
                <a
                  href="#/submissions"
                  className="border border-paper/50 px-7 py-3.5 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-200 hover:border-paper hover:bg-paper/10"
                >
                  Apply for Selection
                </a>
              </div>
            </div>

            {/* Group info card */}
            <div className="md:col-span-4">
              <div className="border border-paper/15 bg-ink/70 p-6 backdrop-blur">
                <p className="font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-paper/40">
                  Group info
                </p>
                <dl className="mt-4 space-y-3">
                  {networkStats.map((st) => (
                    <div key={st.label} className="flex items-baseline justify-between border-b border-paper/10 pb-3 last:border-0 last:pb-0">
                      <dt className="font-sans text-xs font-light text-paper/55">{st.label}</dt>
                      <dd className="font-serif text-lg font-medium text-paper">{st.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 border-t border-paper/10 pt-4 font-sans text-[11px] font-light leading-relaxed text-paper/45">
                  {totalThreads} discussions &middot; {totalReplies} replies &middot; moderated
                  daily by three named moderators
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Currently reading strip (group shelf) ────────── */}
      <section className="border-b border-line bg-cream/60">
        <div className="container-ed py-10">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="eyebrow">The Group Is Reading</p>
              <div className="mt-4 flex gap-4">
                {currentlyReading.map((b) => (
                  <a key={`${b.title}-cr`} href={`#/network/${b.genre === 'Romance' ? 'romance' : 'book-club'}`} className="w-32 shrink-0 transition-transform duration-300 hover:-translate-y-1">
                    <Cover title={b.title} author={b.author} genre={b.genre} palette={{ bg: b.bg, fg: b.fg, accent: b.accent }} size="sm" />
                  </a>
                ))}
                <div className="max-w-xs self-center">
                  <p className="font-sans text-sm font-light leading-relaxed text-ink-soft">
                    September's group read, with weekly chapter threads and the author joining the
                    final discussion.
                  </p>
                  <a href="#/network/book-club" className="link-underline mt-2 inline-block font-sans text-xs text-ink">
                    Follow the schedule
                  </a>
                </div>
              </div>
            </div>
            <div className="md:col-span-7">
              <p className="eyebrow">Up Next, Chosen by Members</p>
              <div className="mt-4 flex flex-wrap items-start gap-4">
                {toRead.map((b) => (
                  <div key={`${b.title}-tr`} className="w-24 shrink-0">
                    <Cover title={b.title} author={b.author} genre={b.genre} palette={{ bg: b.bg, fg: b.fg, accent: b.accent }} size="sm" />
                    <p className="mt-1.5 text-center font-sans text-[10px] font-light text-ink-muted">{b.title}</p>
                  </div>
                ))}
                <div className="max-w-xs self-center">
                  <p className="font-sans text-sm font-light leading-relaxed text-ink-soft">
                    Both titles are leading the October poll. Your vote decides what the whole
                    network reads next month.
                  </p>
                  <a href="#group-polls" className="link-underline mt-2 inline-block font-sans text-xs text-ink">
                    Cast your vote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust badges ─────────────────────────────────── */}
      <section className="border-b border-line bg-paper">
        <div className="container-ed py-12 md:py-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {trustBadges.map((b) => (
              <div key={b.title} className="border-t-2 border-forest pt-5">
                <h3 className="font-serif text-lg font-medium text-ink">{b.title}</h3>
                <p className="mt-2 font-sans text-sm font-light leading-relaxed text-ink-soft">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WEEKLY SPOTLIGHT ═══════════════════════════════ */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="container-ed py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-paper/50">
                This Week&rsquo;s Spotlight &middot; {s.period}
              </p>
              <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight md:text-[44px]">
                {s.name}
              </h2>
            </div>
            <a
              href={`#/network/${s.threadGenre}`}
              className="border border-paper/40 px-5 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-paper transition-colors hover:border-paper hover:bg-paper/10"
            >
              Enter the spotlight discussion
            </a>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            {/* Cover + stats */}
            <div className="lg:col-span-3">
              <Cover title={s.book} author={s.name} genre={s.genre} palette={s.palette} />
              <div className="mt-6 grid grid-cols-2 gap-px bg-paper/15">
                {s.stats.map((st) => (
                  <div key={st.label} className="bg-ink p-4">
                    <p className="font-serif text-lg font-medium text-paper">{st.value}</p>
                    <p className="mt-0.5 font-sans text-[9px] font-light uppercase tracking-[0.18em] text-paper/50">
                      {st.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature body */}
            <div className="lg:col-span-5">
              <p className="font-serif text-xl italic leading-relaxed text-paper/90 md:text-2xl">
                {s.angle}
              </p>
              <p className="mt-5 font-sans text-[15px] font-light leading-relaxed text-paper/70">
                {s.body}
              </p>
              <blockquote className="mt-8 border-l-2 pl-6" style={{ borderColor: s.palette.accent }}>
                <p className="font-serif text-lg italic leading-relaxed text-paper/90">
                  &ldquo;{s.pullQuote}&rdquo;
                </p>
                <cite className="mt-2 block font-sans text-[10px] font-light uppercase tracking-[0.18em] text-paper/50 not-italic">
                  {s.pullQuoteBy}
                </cite>
              </blockquote>
            </div>

            {/* Excerpt + prompts */}
            <div className="lg:col-span-4">
              <div className="border border-paper/15 bg-paper/5 p-7">
                <p className="font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-paper/45">
                  Read an excerpt
                </p>
                <p className="mt-4 font-serif text-[17px] leading-relaxed text-paper/85">
                  &ldquo;{s.excerpt}&rdquo;
                </p>
                <p className="mt-4 font-sans text-[11px] font-light text-paper/45">{s.excerptNote}</p>
              </div>
              <div className="mt-6 border border-paper/15 p-7">
                <p className="font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-paper/45">
                  This week&rsquo;s discussion prompts
                </p>
                <ul className="mt-4 space-y-3">
                  {s.discussionPrompts.map((p, i) => (
                    <li key={i} className="flex gap-3 font-sans text-sm font-light leading-relaxed text-paper/75">
                      <span className="font-serif italic text-paper/40">{String(i + 1).padStart(2, '0')}</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href={`#/network/${s.threadGenre}`}
                  className="link-underline mt-5 inline-block font-sans text-xs text-paper/80"
                >
                  Answer in the {s.genre} room
                </a>
              </div>
            </div>
          </div>

          {/* Editorial authority note */}
          <div className="mt-16 grid gap-8 border border-paper/15 bg-paper/5 p-8 md:grid-cols-12 md:p-10">
            <div className="md:col-span-4">
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-paper/45">
                Editorial Review Note
              </p>
              <h3 className="mt-3 font-serif text-2xl font-medium tracking-tight text-paper">
                Why this book was selected
              </h3>
            </div>
            <div className="md:col-span-8">
              <p className="font-sans text-[15px] font-light leading-relaxed text-paper/75">
                Every feature on this network carries an editorial review note from the board that
                selected it. For <span className="italic">{s.book}</span>: of more than four hundred
                manuscripts reviewed this cycle, Diallo&rsquo;s was the only romance that treated
                its central relationship as restoration work rather than conquest. What stood out
                was restraint: a love story with the confidence to move at the pace of trust.
                Selected unanimously by the editorial board in June 2026.
              </p>
              <p className="mt-4 font-sans text-[11px] font-light uppercase tracking-[0.18em] text-paper/45">
                Selection Review Team &middot; Inkwriters Editorial Board
              </p>
            </div>
          </div>

          {/* Archive */}
          <div className="mt-16 border-t border-paper/15 pt-10">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-paper/45">
              Previous spotlights
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {spotlightArchive.map((a) => (
                <div key={a.book} className="flex gap-4 border border-paper/10 p-5 transition-colors duration-200 hover:border-paper/25">
                  <div className="w-16 shrink-0">
                    <Cover title={a.book} author={a.name} genre={a.genre} palette={a.palette} size="sm" />
                  </div>
                  <div>
                    <p className="font-sans text-[9px] font-medium uppercase tracking-[0.18em] text-paper/40">
                      {a.period}
                    </p>
                    <p className="mt-1 font-serif text-base font-medium leading-snug text-paper">
                      {a.name}
                    </p>
                    <p className="mt-1 font-sans text-xs font-light leading-relaxed text-paper/60">
                      {a.angle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Content hierarchy tiers ──────────────────────── */}
      <section className="border-t border-line bg-paper">
        <div className="container-ed py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow">Content Hierarchy</p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink md:text-[36px]">
              Not all placement is equal. That is the point.
            </h2>
            <p className="mt-4 font-sans text-[15px] font-light leading-relaxed text-ink-soft">
              A three-tier structure keeps the network&rsquo;s highest positions meaningful and
              gives every author a clear path upward.
            </p>
          </div>
          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
            {contentTiers.map((t) => (
              <div key={t.tier} className="bg-paper p-8">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-sm italic text-forest">{t.tier}</span>
                  <span className="font-sans text-[10px] font-light uppercase tracking-[0.16em] text-ink-muted">
                    {t.count}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-xl font-medium text-ink">{t.name}</h3>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-ink-soft">
                  {t.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Discussion boards + sidebar ──────────────────── */}
      <section className="bg-paper">
        <div className="container-ed grid gap-12 py-20 md:grid-cols-12 md:py-24">
          {/* Boards */}
          <div className="md:col-span-7">
            <p className="eyebrow">Discussion Boards</p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink">
              Pick a board, start talking
            </h2>

            {/* Special boards */}
            <div className="mt-8 border-t border-line">
              {boards.map((b) => {
                const st = stats?.find((x) => x.genre === b.slug);
                return (
                  <a
                    key={b.slug}
                    href={`#/network/${b.slug}`}
                    className="group grid gap-1 border-b border-line py-5 transition-colors hover:bg-cream/40 md:grid-cols-12 md:items-baseline md:gap-4"
                  >
                    <div className="md:col-span-4">
                      <h3 className="font-serif text-xl font-medium text-ink transition-colors group-hover:text-forest">
                        {b.name}
                      </h3>
                    </div>
                    <p className="font-sans text-sm font-light leading-relaxed text-ink-soft md:col-span-6">
                      {b.description}
                    </p>
                    <p className="font-sans text-xs font-light text-ink-muted md:col-span-2 md:text-right">
                      {st ? `${st.threads} topics \u00b7 ${st.replies} replies` : ''}
                    </p>
                  </a>
                );
              })}
            </div>

            {/* Genre boards */}
            <p className="eyebrow mt-12">Genre Rooms</p>
            <div className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2">
              {networkGenres.map((g) => {
                const st = stats?.find((x) => x.genre === g.slug);
                return (
                  <a
                    key={g.slug}
                    href={`#/network/${g.slug}`}
                    className="group bg-paper p-5 transition-colors duration-200 hover:bg-cream/60"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-serif text-lg font-medium text-ink transition-colors group-hover:text-forest">
                        {g.name}
                      </h3>
                      {st && (
                        <span className="shrink-0 font-sans text-[11px] font-light text-ink-muted">
                          {st.threads + st.replies} posts
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 font-sans text-[13px] font-light leading-relaxed text-ink-soft">
                      {g.blurb}
                    </p>
                  </a>
                );
              })}
            </div>

            {/* Group rules */}
            <div className="mt-12 border border-line bg-cream/50 p-7">
              <h3 className="font-serif text-xl font-medium text-ink">Group rules</h3>
              <ol className="mt-4 space-y-2.5">
                {groupRules.map((r, i) => (
                  <li key={i} className="flex gap-3 font-sans text-sm font-light leading-relaxed text-ink-soft">
                    <span className="font-serif italic text-ink-muted">{i + 1}.</span>
                    {r}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 md:col-span-5">
            {/* Live activity */}
            <div className="border border-line bg-cream/50 p-7">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-medium text-ink">Recent activity</h3>
                <span className="flex items-center gap-2 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-forest">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-forest" />
                  </span>
                  Live
                </span>
              </div>
              <ul className="mt-6 space-y-5">
                {activity?.map((a) => (
                  <li key={a.id} className="border-b border-line/70 pb-5 last:border-0 last:pb-0">
                    <a href={`#/network/${a.genre}/thread/${a.id}`} className="group">
                      <p className="font-sans text-sm font-normal leading-snug text-ink group-hover:text-forest">
                        {a.title}
                      </p>
                      <p className="mt-1.5 font-sans text-xs font-light text-ink-muted">
                        <span className={`mr-1.5 inline-block border px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] ${roleStyle[a.authorRole]}`}>
                          {a.authorRole}
                        </span>
                        {a.authorName} in {genreName(a.genre) === a.genre ? boardName(a.genre) : genreName(a.genre)} &middot;{' '}
                        {a.replyCount} {a.replyCount === 1 ? 'reply' : 'replies'} &middot; {timeAgo(a.createdAt)}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Moderators with photos */}
            <div className="border border-line bg-paper p-7">
              <h3 className="font-serif text-xl font-medium text-ink">Your moderators</h3>
              <ul className="mt-5 space-y-5">
                {moderators.map((m) => (
                  <li key={m.name} className="flex gap-4">
                    {m.photo ? (
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="h-12 w-12 shrink-0 border border-line object-cover object-top"
                      />
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-forest/25 bg-forest/10 font-serif text-sm font-medium text-forest">
                        {m.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                    )}
                    <div>
                      <p className="font-sans text-sm font-medium text-ink">
                        {m.name}{' '}
                        <span className="ml-1 border border-forest/40 bg-forest/10 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-forest">
                          Mod
                        </span>
                      </p>
                      <p className="mt-0.5 font-sans text-xs font-light leading-relaxed text-ink-muted">
                        {m.role} &middot; {m.focus}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Group shelf: completed reads */}
            <div className="border border-line bg-paper p-7">
              <h3 className="font-serif text-xl font-medium text-ink">Group bookshelf</h3>
              <p className="mt-1 font-sans text-xs font-light text-ink-muted">
                Reads the network has finished together
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {groupRead.map((b) => (
                  <div key={`${b.title}-gr`}>
                    <Cover title={b.title} author={b.author} genre={b.genre} palette={{ bg: b.bg, fg: b.fg, accent: b.accent }} size="sm" />
                  </div>
                ))}
              </div>
              <p className="mt-4 border-t border-line pt-3 font-sans text-[11px] font-light text-ink-muted">
                Book club picks shelf: {clubPicks.map((b) => b.title).join(' \u00b7 ')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Polls ────────────────────────────────────────── */}
      <section id="group-polls" className="border-t border-line bg-cream/60">
        <div className="container-ed py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow">Member Polls</p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink md:text-[36px]">
              The network votes on what we read
            </h2>
            <p className="mt-4 font-sans text-[15px] font-light leading-relaxed text-ink-soft">
              Every book club pick is decided by member vote. Enter your name and cast yours; the
              tally updates live.
            </p>
          </div>

          <div className="mt-8 max-w-md">
            <input
              value={voterName}
              onChange={(e) => setVoterName(e.target.value)}
              placeholder="Your name (shown with your vote)"
              className="w-full border border-line bg-paper px-4 py-3 font-sans text-sm font-light text-ink placeholder:text-ink-muted/60 focus:border-forest focus:outline-none"
            />
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {polls?.map((p) => {
              const myVote = votedPolls[p.id];
              const isOpen = p.status === 'open';
              const leader = Math.max(...p.counts);
              return (
                <div key={p.id} className="border border-line bg-paper p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-xl font-medium leading-snug text-ink">{p.question}</h3>
                    <span
                      className={`shrink-0 border px-2 py-1 font-sans text-[9px] font-medium uppercase tracking-[0.16em] ${
                        isOpen ? 'border-forest/40 bg-forest/10 text-forest' : 'border-line text-ink-muted'
                      }`}
                    >
                      {isOpen ? 'Voting open' : 'Final results'}
                    </span>
                  </div>
                  <p className="mt-2 font-sans text-xs font-light text-ink-muted">
                    {p.totalVotes} votes
                    {p.closesAt && isOpen && ` \u00b7 closes ${new Date(p.closesAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`}
                  </p>

                  <div className="mt-5 space-y-3">
                    {p.options.map((opt, i) => {
                      const pct = p.totalVotes ? Math.round((p.counts[i] / p.totalVotes) * 100) : 0;
                      const voted = myVote === i;
                      return (
                        <button
                          key={i}
                          disabled={!isOpen || voterName.trim().length < 2 || vote.isPending}
                          onClick={() => vote.mutate({ pollId: p.id, optionIndex: i, voterName: voterName.trim() })}
                          className={`relative block w-full border px-4 py-3 text-left transition-colors duration-200 ${
                            voted
                              ? 'border-forest bg-forest/10'
                              : 'border-line hover:border-forest/50 disabled:cursor-not-allowed disabled:opacity-90'
                          }`}
                        >
                          <span
                            className="absolute inset-y-0 left-0 bg-forest/10 transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                          <span className="relative flex items-center justify-between gap-3">
                            <span className="font-sans text-sm font-light text-ink">
                              {opt}
                              {p.counts[i] === leader && p.totalVotes > 0 && (
                                <span className="ml-2 border border-forest/40 px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-[0.14em] text-forest">
                                  Leading
                                </span>
                              )}
                            </span>
                            <span className="shrink-0 font-sans text-xs font-light text-ink-muted">
                              {pct}% ({p.counts[i]})
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {isOpen && voterName.trim().length < 2 && (
                    <p className="mt-3 font-sans text-[11px] font-light text-ink-muted">
                      Enter your name above to vote.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Onboarding pathway ─────────────────────────── */}
      <section className="border-t border-line bg-paper">
        <div className="container-ed py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow">The Welcome Pathway</p>
              <h2 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight text-ink md:text-[36px]">
                What happens after acceptance.
              </h2>
              <p className="mt-5 font-sans text-[15px] font-light leading-relaxed text-ink-soft">
                Selected authors are never left to figure the network out alone. A structured
                seven-day onboarding carries every new feature from acceptance to live spotlight.
              </p>
              <div className="mt-8 space-y-5 border-t border-line pt-8">
                {featuredMeaning.map((f) => (
                  <div key={f.title}>
                    <h3 className="font-serif text-lg font-medium text-ink">{f.title}</h3>
                    <p className="mt-1.5 font-sans text-sm font-light leading-relaxed text-ink-soft">
                      {f.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-8">
              <div className="border-t border-line">
                {welcomePathway.map((w) => (
                  <div key={w.day} className="grid gap-2 border-b border-line py-6 md:grid-cols-12 md:gap-6">
                    <div className="md:col-span-3">
                      <span className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-forest">
                        {w.day}
                      </span>
                      <h3 className="mt-1 font-serif text-lg font-medium leading-snug text-ink">
                        {w.title}
                      </h3>
                    </div>
                    <p className="font-sans text-sm font-light leading-relaxed text-ink-soft md:col-span-9">
                      {w.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Publication rhythm ───────────────────────────── */}
      <section className="border-t border-line bg-ink text-paper">
        <div className="container-ed py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-paper/50">
              The Network Calendar
            </p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight md:text-[40px]">
              A rhythm readers can set their week by.
            </h2>
          </div>
          <div className="mt-12 grid gap-px bg-paper/15 md:grid-cols-4">
            {weeklyRhythm.map((r) => (
              <div key={r.day} className="bg-ink p-7">
                <p className="font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-paper/45">
                  {r.day}
                </p>
                <h3 className="mt-3 font-serif text-lg font-medium leading-snug text-paper">
                  {r.event}
                </h3>
                <p className="mt-2 font-sans text-[13px] font-light leading-relaxed text-paper/60">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t border-paper/15 pt-10">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-paper/45">
              Seasonal collections
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {seasonalCalendar.map((c) => (
                <div key={c.season} className="border border-paper/10 p-5">
                  <p className="font-serif text-base font-medium text-paper">{c.season}</p>
                  <p className="mt-1 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-forest-bright">
                    {c.theme}
                  </p>
                  <p className="mt-2 font-sans text-xs font-light leading-relaxed text-paper/60">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Content formula lock ─────────────────────────── */}
      <section className="border-t border-line bg-cream/60">
        <div className="container-ed py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow">The Feature Format</p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink md:text-[36px]">
              Every feature follows the same disciplined structure.
            </h2>
            <p className="mt-4 font-sans text-[15px] font-light leading-relaxed text-ink-soft">
              Consistency is what makes the network feel curated rather than chaotic. Every author
              feature, without exception, is built from the same five movements.
            </p>
          </div>
          <div className="mt-12 border-t border-line">
            {contentFormula.map((c, i) => (
              <div key={c.step} className="grid gap-2 border-b border-line py-6 md:grid-cols-12 md:gap-6">
                <div className="flex items-baseline gap-4 md:col-span-4">
                  <span className="font-serif text-sm italic text-forest">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-serif text-xl font-medium text-ink">{c.step}</h3>
                </div>
                <p className="font-sans text-sm font-light leading-relaxed text-ink-soft md:col-span-8">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LIBRARY PLACEMENT ══════════════════════════════ */}
      <section className="bg-paper">
        <div className="container-ed py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow">Library Placement Program</p>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight text-ink md:text-[40px]">
              From the network to the public shelf.
            </h2>
            <p className="mt-5 font-sans text-[15px] font-light leading-relaxed text-ink-soft">
              Libraries remain the most trusted way readers discover books. Our placement program
              moves network titles into public library systems, where a single acquisition can put
              an author in front of thousands of new readers who never see a bookstore or an ad.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
            {[
              { v: String(pStats?.systems ?? 0), l: 'Library systems' },
              { v: String(pStats?.branches ?? 0), l: 'Branches carrying titles' },
              { v: String(pStats?.titles ?? 0), l: 'Network titles placed' },
              { v: String(pStats?.placements ?? 0), l: 'Confirmed placements' },
            ].map((st) => (
              <div key={st.l} className="bg-cream/60 px-6 py-7 text-center">
                <p className="font-serif text-3xl font-medium text-ink">{st.v}</p>
                <p className="mt-1 font-sans text-[10px] font-light uppercase tracking-[0.2em] text-ink-muted">
                  {st.l}
                </p>
              </div>
            ))}
          </div>

          {/* How placement happens */}
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="font-serif text-2xl font-medium tracking-tight text-ink">
                How titles reach libraries
              </h3>
              <div className="mt-6 border-t border-line">
                {libraryChannels.map((c) => (
                  <div key={c.title} className="border-b border-line py-5">
                    <h4 className="font-serif text-lg font-medium text-ink">{c.title}</h4>
                    <p className="mt-1.5 font-sans text-sm font-light leading-relaxed text-ink-soft">
                      {c.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-medium tracking-tight text-ink">
                What placement work includes
              </h3>
              <div className="mt-6 border-t border-line">
                {libraryProcess.map((p) => (
                  <div key={p.step} className="grid gap-1 border-b border-line py-5 md:grid-cols-12 md:gap-4">
                    <span className="font-serif text-sm italic text-forest md:col-span-2">{p.step}</span>
                    <div className="md:col-span-10">
                      <h4 className="font-serif text-lg font-medium text-ink">{p.name}</h4>
                      <p className="mt-1.5 font-sans text-sm font-light leading-relaxed text-ink-soft">
                        {p.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live placement ledger */}
          <div className="mt-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="font-serif text-2xl font-medium tracking-tight text-ink">
                Recent placements
              </h3>
              <a href="#/network/library-placement" className="link-underline font-sans text-sm text-ink-soft">
                Discuss placements in the board
              </a>
            </div>
            <div className="mt-6 border-t border-line">
              <div className="hidden grid-cols-12 gap-4 border-b border-line py-3 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-ink-muted md:grid">
                <span className="col-span-3">Title</span>
                <span className="col-span-3">Library system</span>
                <span className="col-span-2">Location</span>
                <span className="col-span-2">Placement</span>
                <span className="col-span-2 text-right">Branches</span>
              </div>
              {placements?.slice(0, 8).map((p) => (
                <div key={p.id} className="grid gap-1 border-b border-line py-4 md:grid-cols-12 md:items-baseline md:gap-4">
                  <p className="font-serif text-base font-medium italic text-ink md:col-span-3">
                    {p.bookTitle}
                    <span className="ml-2 font-sans text-xs font-light not-italic text-ink-muted">
                      {p.author}
                    </span>
                  </p>
                  <p className="font-sans text-sm font-light text-ink-soft md:col-span-3">{p.librarySystem}</p>
                  <p className="font-sans text-sm font-light text-ink-muted md:col-span-2">{p.location}</p>
                  <p className="md:col-span-2">
                    <span className="inline-block border border-forest/30 px-2 py-0.5 font-sans text-[9px] font-medium uppercase tracking-[0.14em] text-forest">
                      {placementTypeLabels[p.placementType]}
                    </span>
                  </p>
                  <p className="font-sans text-sm font-light text-ink-soft md:col-span-2 md:text-right">
                    {p.branches} {p.branches === 1 ? 'branch' : 'branches'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Selection pipeline */}
          <div className="mt-20">
            <p className="eyebrow">How Authors Enter the Program</p>
            <h3 className="mt-4 font-serif text-2xl font-medium tracking-tight text-ink">
              Selection comes first. Everything follows from it.
            </h3>
            <div className="mt-8 grid gap-px border border-line bg-line md:grid-cols-4">
              {pipeline.map((p) => (
                <div key={p.step} className="bg-paper p-6">
                  <span className="font-serif text-sm italic text-forest">{p.step}</span>
                  <h4 className="mt-2 font-serif text-lg font-medium text-ink">{p.name}</h4>
                  <p className="mt-2 font-sans text-[13px] font-light leading-relaxed text-ink-soft">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Engagement display ───────────────────────────── */}
      <section className="border-t border-line bg-cream/60">
        <div className="container-ed py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow">This Week in the Network</p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink md:text-[36px]">
              The engagement is visible, and it is real.
            </h2>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Most discussed books */}
            <div className="border border-line bg-paper p-7">
              <h3 className="font-serif text-xl font-medium text-ink">Most discussed books</h3>
              <div className="mt-5 border-t border-line">
                {trendingBooks.map((b, i) => (
                  <div key={b.title} className="grid grid-cols-12 items-baseline gap-3 border-b border-line py-4">
                    <span className="col-span-1 font-serif text-sm italic text-forest">{i + 1}</span>
                    <div className="col-span-7">
                      <p className="font-serif text-base font-medium italic text-ink">{b.title}</p>
                      <p className="font-sans text-xs font-light text-ink-muted">{b.author} · {b.note}</p>
                    </div>
                    <div className="col-span-4 text-right">
                      <p className="font-sans text-sm font-normal text-ink">{b.replies} replies</p>
                      <p className="font-sans text-xs font-light text-ink-muted">{b.saves} shelf saves</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Trending discussions */}
            <div className="border border-line bg-paper p-7">
              <h3 className="font-serif text-xl font-medium text-ink">Trending reader discussions</h3>
              <div className="mt-5 border-t border-line">
                {trendingDiscussions.map((d) => (
                  <a key={d.title} href={`#/network/${d.slug}`} className="group block border-b border-line py-4">
                    <p className="font-sans text-sm font-normal leading-snug text-ink group-hover:text-forest">
                      {d.title}
                    </p>
                    <p className="mt-1.5 font-sans text-xs font-light text-ink-muted">
                      {d.board} · {d.engagement}
                    </p>
                  </a>
                ))}
              </div>
              <p className="mt-5 border-t border-line pt-4 font-sans text-[11px] font-light leading-relaxed text-ink-muted">
                Engagement counters are drawn from live discussion threads, polls, and placement
                records, and updated as readers interact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Discovery mechanism ──────────────────────────── */}
      <section className="border-t border-line bg-paper">
        <div className="container-ed py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow">Discovery</p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink md:text-[36px]">
              Because you read one, you may love another.
            </h2>
            <p className="mt-4 font-sans text-[15px] font-light leading-relaxed text-ink-soft">
              The network&rsquo;s recommendation layer guides readers from titles they already love
              to their next read, curated by the same editorial team that selected them.
            </p>
          </div>
          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
            {discoveryPairs.map((d) => (
              <a key={d.like} href={`#/network/${d.genre}`} className="group bg-paper p-7 transition-colors hover:bg-cream/50">
                <p className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                  Because you read
                </p>
                <p className="mt-1 font-serif text-base font-medium italic text-ink">{d.because}</p>
                <p className="mt-4 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-forest">
                  You may like
                </p>
                <p className="mt-1 font-serif text-lg font-medium italic text-ink transition-colors group-hover:text-forest">
                  {d.like}
                </p>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-ink-soft">{d.reason}</p>
              </a>
            ))}
          </div>

          {/* Reader roles */}
          <div className="mt-16">
            <p className="eyebrow">How Readers Take Part</p>
            <h3 className="mt-4 font-serif text-2xl font-medium tracking-tight text-ink">
              Four ways to be a reader here
            </h3>
            <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {readerRoles.map((r) => (
                <div key={r.role} className="bg-paper p-6">
                  <h4 className="font-serif text-lg font-medium text-ink">{r.role}</h4>
                  <p className="mt-2 font-sans text-[13px] font-light leading-relaxed text-ink-soft">
                    {r.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cross-engagement loop ────────────────────────── */}
      <section className="border-t border-line bg-cream/60">
        <div className="container-ed py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow">Author Reactions</p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink md:text-[36px]">
              Authors read each other here too.
            </h2>
            <p className="mt-4 font-sans text-[15px] font-light leading-relaxed text-ink-soft">
              The network is dense, not isolated. Featured authors engage inside one another&rsquo;s
              discussions, which is exactly what a living literary network looks like.
            </p>
          </div>
          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2">
            {authorReactions.map((r) => (
              <figure key={r.author} className="bg-paper p-7">
                <blockquote className="font-sans text-[15px] font-light leading-relaxed text-ink-soft">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4">
                  <p className="font-serif text-base font-medium text-ink">{r.author}</p>
                  <p className="mt-0.5 font-sans text-xs font-light text-ink-muted">on {r.on}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quality control + activity log ───────────────── */}
      <section className="border-t border-line bg-paper">
        <div className="container-ed grid gap-14 py-20 md:grid-cols-12 md:py-28">
          {/* QC */}
          <div className="md:col-span-5">
            <p className="eyebrow">Standards &amp; Quality Control</p>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight text-ink md:text-[36px]">
              Most applications are not selected. Here is why.
            </h2>
            <p className="mt-5 font-sans text-[15px] font-light leading-relaxed text-ink-soft">
              Scarcity is what makes a feature mean something. Our review team declines work against
              clear, published criteria.
            </p>
            <ul className="mt-8 space-y-3 border-t border-line pt-8">
              {rejectionCriteria.map((r, i) => (
                <li key={i} className="flex gap-3 font-sans text-sm font-light leading-relaxed text-ink-soft">
                  <span className="mt-[9px] h-px w-4 shrink-0 bg-forest/50" />
                  {r}
                </li>
              ))}
            </ul>
            <div className="mt-8 border-l-2 border-forest pl-5">
              <p className="font-sans text-sm font-light leading-relaxed text-ink-soft">{resubmissionPath}</p>
            </div>
          </div>

          {/* Activity log */}
          <div className="md:col-span-7">
            <div className="border border-line bg-ink p-7 text-paper md:p-9">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-medium">Inkwriters Activity Log</h3>
                <span className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-paper/45">
                  Public record
                </span>
              </div>
              <div className="mt-6 border-t border-paper/15">
                {activityLog.map((e, i) => (
                  <div key={i} className="grid grid-cols-12 items-baseline gap-3 border-b border-paper/10 py-3.5">
                    <span className="col-span-3 font-sans text-[11px] font-light text-paper/50 md:col-span-2">
                      {e.date}
                    </span>
                    <span className="col-span-2 hidden md:block">
                      <span className="border border-paper/25 px-1.5 py-0.5 font-sans text-[8px] font-medium uppercase tracking-[0.14em] text-paper/60">
                        {e.type}
                      </span>
                    </span>
                    <p className="col-span-9 font-sans text-[13px] font-light leading-relaxed text-paper/80 md:col-span-8">
                      {e.event}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feedback loop + editorial board ──────────────── */}
      <section className="border-t border-line bg-cream/60">
        <div className="container-ed py-20 md:py-28">
          {/* Feedback loop */}
          <div className="border border-line bg-paper p-8 md:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-serif text-2xl font-medium tracking-tight text-ink">
                What readers are responding to
              </h2>
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-forest">
                {readerPulse.month}
              </span>
            </div>
            <p className="mt-5 max-w-3xl font-sans text-[15px] font-light leading-relaxed text-ink-soft">
              {readerPulse.summary}
            </p>
            <div className="mt-8 grid gap-px bg-line md:grid-cols-3">
              {readerPulse.insights.map((ins, i) => (
                <div key={i} className="bg-paper p-5">
                  <span className="font-serif text-sm italic text-forest">{String(i + 1).padStart(2, '0')}</span>
                  <p className="mt-2 font-sans text-sm font-light leading-relaxed text-ink-soft">{ins}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial board */}
          <div className="mt-20">
            <div className="max-w-2xl">
              <p className="eyebrow">The Editorial Board</p>
              <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink md:text-[36px]">
                An institution, not a platform.
              </h2>
              <p className="mt-4 font-sans text-[15px] font-light leading-relaxed text-ink-soft">
                The network is governed by a standing editorial board and a published set of
                standards, so every selection is accountable and consistent.
              </p>
            </div>
            <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
              {editorialBoard.map((m) => (
                <div key={m.name} className="bg-paper p-5">
                  <img src={m.photo} alt={m.name} className="aspect-[4/5] w-full object-cover object-top" />
                  <p className="mt-4 font-serif text-base font-medium text-ink">{m.name}</p>
                  <p className="font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-forest">
                    {m.role}
                  </p>
                  <p className="mt-2 font-sans text-xs font-light leading-relaxed text-ink-muted">{m.duty}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 border border-line bg-paper p-8">
              <h3 className="font-serif text-xl font-medium text-ink">Network Standards</h3>
              <ul className="mt-5 grid gap-x-10 gap-y-3 md:grid-cols-2">
                {networkStandards.map((s, i) => (
                  <li key={i} className="flex gap-3 font-sans text-sm font-light leading-relaxed text-ink-soft">
                    <span className="font-serif italic text-forest">{i + 1}.</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Verified reviews ─────────────────────────────── */}
      <section className="border-t border-line bg-cream/60">
        <div className="container-ed py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Verified Reader Reviews</p>
              <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink md:text-[40px]">
                What network readers are saying
              </h2>
            </div>
            <p className="max-w-xs font-sans text-xs font-light leading-relaxed text-ink-muted">
              Reviews marked verified come from members with a documented reading and discussion
              history inside the network.
            </p>
          </div>

          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2">
            {readerReviews.map((r) => (
              <article key={r.book} className="bg-paper p-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-1 text-forest">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                      </svg>
                    ))}
                  </div>
                  <span className="border border-forest/30 bg-forest/5 px-2 py-1 font-sans text-[9px] font-medium uppercase tracking-[0.16em] text-forest">
                    {r.badge}
                  </span>
                </div>
                <p className="mt-4 font-sans text-[15px] font-light leading-relaxed text-ink-soft">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div className="mt-5 border-t border-line pt-4">
                  <p className="font-serif text-base font-medium italic text-ink">{r.book}</p>
                  <p className="mt-0.5 font-sans text-xs font-light text-ink-muted">
                    by {r.author} &middot; reviewed by {r.reviewer}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="bg-ink text-paper">
        <div className="container-ed py-20 md:py-28">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-paper/50">
            Member Testimonials
          </p>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight md:text-[40px]">
            Trusted by authors and readers alike
          </h2>
          <div className="mt-12 grid gap-px bg-paper/15 md:grid-cols-2">
            {testimonials.map((t) => (
              <figure key={t.name} className="bg-ink p-8">
                <blockquote className="font-sans text-[15px] font-light leading-relaxed text-paper/80">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-paper/10 pt-4">
                  <p className="font-serif text-base font-medium">{t.name}</p>
                  <p className="mt-0.5 font-sans text-xs font-light uppercase tracking-[0.18em] text-paper/50">
                    {t.role} &middot; {t.since}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="border-t border-line bg-paper">
        <div className="container-ed flex flex-col items-center py-20 text-center md:py-24">
          <h2 className="max-w-2xl font-serif text-3xl font-medium leading-tight tracking-tight text-ink md:text-4xl">
            Readers: enter the network. Authors: be considered for a place in it.
          </h2>
          <p className="mt-4 max-w-xl font-sans text-[15px] font-light leading-relaxed text-ink-soft">
            Introduce yourself in the General board today, or apply through our selection pipeline
            to be featured.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#/network/general"
              className="border border-ink bg-ink px-8 py-3.5 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-200 hover:border-forest hover:bg-forest"
            >
              Enter the Network
            </a>
            <a
              href="#/submissions"
              className="border border-ink/30 px-8 py-3.5 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-200 hover:border-forest hover:text-forest"
            >
              Apply for Selection
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
