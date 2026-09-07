export interface Genre {
  slug: string;
  name: string;
  blurb: string;
}

export const networkGenres: Genre[] = [
  { slug: 'literary-fiction', name: 'Literary Fiction', blurb: 'Voice-driven novels, book club fiction, and craft talk.' },
  { slug: 'romance', name: 'Romance', blurb: 'From rom-coms to slow burns, tropes and HEAs.' },
  { slug: 'fantasy', name: 'Fantasy', blurb: 'Worldbuilding, magic systems, and romantasy.' },
  { slug: 'mystery-thriller', name: 'Mystery & Thriller', blurb: 'Twists, fair-play clues, and propulsive plotting.' },
  { slug: 'historical-fiction', name: 'Historical Fiction', blurb: 'Research, period detail, and untold histories.' },
  { slug: 'memoir', name: 'Memoir', blurb: 'True stories, personal stakes, and hard-won craft.' },
  { slug: 'self-help', name: 'Self-Help', blurb: 'Prescriptive nonfiction that changes Monday mornings.' },
  { slug: 'business', name: 'Business', blurb: 'Frameworks, case studies, and expert platforms.' },
];

export const genreName = (slug: string) =>
  networkGenres.find((g) => g.slug === slug)?.name ?? slug;

export interface Board {
  slug: string;
  name: string;
  description: string;
}

export const boards: Board[] = [
  {
    slug: 'general',
    name: 'General & Introductions',
    description: 'New here? Introduce yourself, meet other members, and talk about anything bookish.',
  },
  {
    slug: 'book-club',
    name: 'Book Club & Group Reads',
    description: 'Monthly picks, chapter-by-chapter discussions, and readalong planning.',
  },
  {
    slug: 'library-placement',
    name: 'Library Placement News',
    description: 'Announcements as network titles land in library systems, and requests for your local branch.',
  },
];

export const boardName = (slug: string) => boards.find((b) => b.slug === slug)?.name ?? slug;

export interface Moderator {
  name: string;
  role: string;
  focus: string;
  photo?: string;
}

export const moderators: Moderator[] = [
  {
    name: 'Trent Marrow',
    role: 'Lead Moderator',
    focus: 'Spotlight selection, literary fiction, and memoir rooms.',
    photo: '/images/agents/trent-marrow.jpg',
  },
  {
    name: 'Claire Bennett',
    role: 'Moderator, Reader Programs',
    focus: 'Book club picks, polls, and new member welcomes.',
    photo: '/images/agents/claire-bennett.jpg',
  },
  {
    name: 'Daniel Reyes',
    role: 'Moderator, Genre Rooms',
    focus: 'Fantasy, romance, thriller rooms and query feedback.',
    photo: '/images/agents/daniel-reyes.jpg',
  },
];

export const groupRules = [
  'Be kind. Critique the book, never the reader.',
  'No AI-generated posts or reviews. This is a network of human readers.',
  'Mark spoilers clearly, and keep them out of thread titles.',
  'Self-promotion only in your own feature thread or where a moderator invites it.',
  'No selling, soliciting, or off-platform payment requests. Ever.',
  'Moderators\u2019 decisions are final. Three warnings means removal.',
];

export const pipeline = [
  {
    step: '01',
    name: 'Submission',
    body: 'Authors apply through the agency\u2019s submissions process, indicating interest in network placement. Every application is read by a person.',
  },
  {
    step: '02',
    name: 'Review',
    body: 'Our editorial team assesses the work against three criteria: craft quality, genre fit with our reader base, and demonstrated reader appeal. Most applications do not pass this stage.',
  },
  {
    step: '03',
    name: 'Approval',
    body: 'Accepted authors are onboarded with a positioning session: we define the angle, the target reader, and the feature calendar before anything goes live.',
  },
  {
    step: '04',
    name: 'Feature',
    body: 'The author enters the rotation: a Weekly Spotlight, bookshelf placement, New Releases coverage, and book club consideration, each tracked for engagement.',
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  since: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'I posted my romantasy hook on a Tuesday and had a moderator and two published authors in the thread by Wednesday. The rewrite landed me full requests. Nothing else online works this fast.',
    name: 'Isla Marchand',
    role: 'Fantasy author',
    since: 'Member since 2025',
  },
  {
    quote:
      'I joined as a reader in 2023 to find debut novelists early. Three of the authors I first read in this network are now on my yearly best-of lists. The curation is the difference.',
    name: 'Margaret Osbourne',
    role: 'Reader',
    since: 'Member since 2023',
  },
  {
    quote:
      'The book club threads sold more copies of my historical novel in a month than my launch week did. Readers here actually finish the book and then argue about it at 2am. That is the dream.',
    name: 'T. H. Calloway',
    role: 'Historical fiction author',
    since: 'Member since 2024',
  },
  {
    quote:
      'As a nonfiction author I was told my 900-subscriber newsletter was too small. The moderators showed me how to present engagement instead of size. I signed with an agent two months later.',
    name: 'Wendell Park',
    role: 'Business author',
    since: 'Member since 2026',
  },
];

export interface Review {
  book: string;
  author: string;
  quote: string;
  reviewer: string;
  badge: string;
  rating: number;
}

export const readerReviews: Review[] = [
  {
    book: 'The Salt Meridian',
    author: 'Elena Vasquez',
    quote:
      'A debut that reads like a tenth novel. The tidal imagery never once feels forced. I finished it in two sittings and immediately bought a second copy for my sister.',
    reviewer: 'Margaret Osbourne',
    badge: 'Verified Network Reader',
    rating: 5,
  },
  {
    book: 'A Lantern in the Hollow',
    author: 'Marcus Reid',
    quote:
      'The magic system has rules you can actually learn, and the romance subplot respects the reader. Rare. Book two cannot arrive fast enough.',
    reviewer: 'Priya Nandakumar',
    badge: 'Verified Network Reader',
    rating: 5,
  },
  {
    book: 'Where the River Remembers',
    author: 'T. H. Calloway',
    quote:
      'The ferry scene recontextualizes the entire first act. I reread chapters three and four the moment I finished. Historical fiction rarely earns this kind of ending.',
    reviewer: 'Graham Pelt',
    badge: 'Verified Book Club Member',
    rating: 5,
  },
  {
    book: 'The Last Bookbinder',
    author: 'Amara Diallo',
    quote:
      'Our July book club pick and the discussion ran to five pages. The shop is a character, the sister is a knife, and the letter scene took my breath away.',
    reviewer: 'Hannah Whitaker',
    badge: 'Verified Book Club Member',
    rating: 5,
  },
];

export const trustBadges = [
  {
    title: 'Moderated daily',
    body: 'Three named moderators read every thread. Spam, soliciting, and AI-generated posts are removed.',
  },
  {
    title: 'Curated, never open-call',
    body: 'Authors are featured by editorial review only. No pay-to-post, no self-promotion drive-bys.',
  },
  {
    title: 'Verified reader reviews',
    body: 'Book club reviews come from members with a documented reading history in the network.',
  },
  {
    title: 'Agency-backed',
    body: 'Operated by Inkwriters Literary Agency. The only contact domain is @inkwriters.co.',
  },
];

// ── Spotlight ──────────────────────────────────────────────────────
export interface Spotlight {
  name: string;
  book: string;
  genre: string;
  period: string;
  angle: string;
  body: string;
  excerpt: string;
  excerptNote: string;
  pullQuote: string;
  pullQuoteBy: string;
  discussionPrompts: string[];
  palette: { bg: string; fg: string; accent: string };
  threadGenre: string;
  stats: { label: string; value: string }[];
}

export const currentSpotlight: Spotlight = {
  name: 'Amara Diallo',
  book: 'The Last Bookbinder',
  genre: 'Romance',
  period: 'September 7 to 13, 2026',
  angle:
    'A romance about the people who repair what time breaks, and what happens when the thing worth repairing is a marriage that is not yours.',
  body: 'Diallo\u2019s debut was selected from our review queue for its unusual premise and its discipline: a love story told at the pace of restoration work, where every chapter mends something the last one tore. Her July book club discussion ran five pages, and she joined the thread herself. This week she returns to answer reader questions, and her title just landed as a featured display in the Chicago Public Library system.',
  excerpt:
    'The shop smelled of glue and old leather and, faintly, of rain. Marguerite ran her thumb along the broken spine and thought: everything that comes to me has already failed someone. The trick was never pretending otherwise.',
  excerptNote: 'From chapter one of The Last Bookbinder, shared with the author\u2019s permission.',
  pullQuote: 'The shop is a character, the sister is a knife, and the letter scene took my breath away.',
  pullQuoteBy: 'Hannah Whitaker, Verified Book Club Member',
  discussionPrompts: [
    'The bookbinder\u2019s shop is practically a character itself. Did the setting work for you?',
    'Ten chapters in, the sister is the only one telling the truth. Do you trust her?',
    'The letter scene in chapter nine: did fourteen drafts show? Where did it land for you?',
  ],
  palette: { bg: '#4a2e35', fg: '#f6ece7', accent: '#d9a6a0' },
  threadGenre: 'romance',
  stats: [
    { label: 'Discussion replies', value: '200+' },
    { label: 'Book club finish rate', value: '94%' },
    { label: 'Libraries carrying it', value: '13 branches' },
    { label: 'Reader rating', value: '4.8 / 5' },
  ],
};

export const spotlightArchive: Array<Pick<Spotlight, 'name' | 'book' | 'genre' | 'period' | 'angle' | 'palette'>> = [
  {
    name: 'T. H. Calloway',
    book: 'Where the River Remembers',
    genre: 'Historical Fiction',
    period: 'August 24 to 30, 2026',
    angle: 'Six years of research, one ferry scene written first, and a novel built backward from its own ending.',
    palette: { bg: '#3a4a3f', fg: '#eef0e6', accent: '#b7c4a3' },
  },
  {
    name: 'Marcus Reid',
    book: 'A Lantern in the Hollow',
    genre: 'Fantasy',
    period: 'August 17 to 23, 2026',
    angle: 'A magic system with rules you can actually learn, and a romance that respects the reader.',
    palette: { bg: '#22262e', fg: '#ece7dc', accent: '#8fa8c8' },
  },
  {
    name: 'Elena Vasquez',
    book: 'The Salt Meridian',
    genre: 'Literary Fiction',
    period: 'August 10 to 16, 2026',
    angle: 'The debut that reads like a tenth novel, and the bestseller list debut that followed.',
    palette: { bg: '#1e3d2f', fg: '#f5f3ef', accent: '#c9a86a' },
  },
];

// ── Library placement program ──────────────────────────────────────
export const libraryChannels = [
  {
    title: 'Wholesale acquisition',
    body: 'Network titles are supplied through the major library wholesalers in both print and digital editions, with full cataloging metadata so librarians can order in one step.',
  },
  {
    title: 'Review-journal submissions',
    body: 'Featured titles are submitted to the review journals librarians actually order from, timed so coverage lands before the acquisition window closes.',
  },
  {
    title: 'Book club kits',
    body: 'Multi-copy discussion kits with printed guides and moderator prompts, so a library book club can run a network title with zero preparation.',
  },
  {
    title: 'Digital lending',
    body: 'Ebook and audiobook editions delivered to library digital platforms, including simultaneous-use licensing for book club months.',
  },
];

export const libraryProcess = [
  {
    step: '01',
    name: 'Cataloging-ready files',
    body: 'Every placed title ships with complete metadata, cover assets, and age-appropriate categorization, the unglamorous work that determines whether a librarian says yes.',
  },
  {
    step: '02',
    name: 'System-by-system pitching',
    body: 'We pitch acquisition librarians directly, matching titles to each system\u2019s collection priorities and community demographics rather than blasting one list.',
  },
  {
    step: '03',
    name: 'Placement and activation',
    body: 'Once a title lands, we help it circulate: staff-pick cards, featured-display materials, and discussion guides that keep holds lists moving.',
  },
  {
    step: '04',
    name: 'Reporting to the author',
    body: 'Authors receive a placement report: which systems carry the book, branch counts, and circulation signals where systems share them.',
  },
];

export const placementTypeLabels: Record<string, string> = {
  'new-acquisition': 'New Acquisition',
  'staff-pick': 'Staff Pick',
  'book-club-kit': 'Book Club Kit',
  'featured-display': 'Featured Display',
  'digital-collection': 'Digital Collection',
};

export const networkStats = [
  { value: '439,000+', label: 'Network members' },
  { value: 'Since 2023', label: 'Active and growing' },
  { value: '11', label: 'Discussion boards' },
  { value: 'Weekly', label: 'Author spotlights' },
];
