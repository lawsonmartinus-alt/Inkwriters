// ── Advanced credibility layer: onboarding, archive, engagement display,
//    discovery, reader roles, editorial authority, rhythm, tiers, QC,
//    activity log, feedback loop, institutional framing ──────────────────────

// 1. ONBOARDING EXPERIENCE SYSTEM ───────────────────────────────────────────
export const welcomePathway = [
  {
    day: 'Day 1',
    title: 'Acceptance & positioning session',
    body: 'You receive your acceptance notice and a one-to-one positioning session with a moderator. We define your angle, your target reader, and the feature calendar before anything goes public.',
  },
  {
    day: 'Days 2 to 3',
    title: 'Your feature is drafted',
    body: 'Our editorial team drafts your author feature using the fixed network format: hook, introduction, positioning angle, and discussion prompts. You review and approve every word.',
  },
  {
    day: 'Day 4',
    title: 'Bookshelf & genre room placement',
    body: 'Your title is added to the group bookshelf and your genre room. Readers begin seeing you in discovery sections before your spotlight week.',
  },
  {
    day: 'Day 5',
    title: 'Discussion thread opens',
    body: 'A dedicated, moderated discussion thread opens around your work. You are introduced to the readers already talking in your genre.',
  },
  {
    day: 'Days 6 to 7',
    title: 'Spotlight week begins',
    body: 'Your Weekly Spotlight goes live across the network. You receive your first engagement report: discussion replies, shelf adds, and reader sentiment.',
  },
];

export const featuredMeaning = [
  {
    title: 'A permanent position, not a post',
    body: 'Featured authors hold a lasting place in the archive, the bookshelf, and discovery. Nothing sinks or disappears after launch week.',
  },
  {
    title: 'Editorial framing',
    body: 'Every feature is written and positioned by our editorial team. You are presented to readers at your strongest, not left to promote yourself.',
  },
  {
    title: 'Measured engagement',
    body: 'Every placement is tracked: discussion replies, reader reviews, library requests. You see what your visibility is actually doing.',
  },
];

// 4. CONTENT FORMULA LOCK ───────────────────────────────────────────────────
export const contentFormula = [
  { step: 'Hook', body: 'An emotional or narrative angle that gives a reader a reason to stop scrolling, drawn from the work itself.' },
  { step: 'Author introduction', body: 'Who this writer is and why their voice matters, in two sentences, never a resume.' },
  { step: 'Book positioning', body: 'The specific angle that separates this title from everything else on the shelf this month.' },
  { step: 'Reader prompt', body: 'A direct invitation that tells the reader exactly how to engage: a question, a choice, a scene to react to.' },
  { step: 'Discussion question', body: 'The open thread that carries the feature into the boards, where the real engagement happens.' },
];

// 8. PUBLICATION RHYTHM ENGINE ─────────────────────────────────────────────
export const weeklyRhythm = [
  { day: 'Monday', event: 'Weekly Spotlight goes live', body: 'One author, one week: feature, excerpt, and a moderated discussion thread.' },
  { day: 'Wednesday', event: 'Discussion prompt drop', body: 'Fresh prompts land in the active boards to keep the week\u2019s conversations moving.' },
  { day: 'Friday', event: 'New Releases & placement updates', body: 'The week\u2019s new titles and the latest library placements are posted.' },
  { day: 'Sunday', event: 'Reader digest', body: 'A curated recap of the week\u2019s most discussed threads and what readers responded to.' },
];

export const seasonalCalendar = [
  { season: 'January', theme: 'New Voices Month', body: 'Debut authors take the spotlight for the full month.' },
  { season: 'March', theme: 'Memoir & True Stories', body: 'The nonfiction rooms lead the network calendar.' },
  { season: 'June', theme: 'Romance Season', body: 'Six weeks of romance spotlights, polls, and club reads.' },
  { season: 'October', theme: 'Thriller Week', body: 'A concentrated run of mystery and thriller features.' },
  { season: 'December', theme: 'The Year in Books', body: 'Reader-voted best of the year and the annual archive review.' },
];

// 9. CONTENT HIERARCHY SYSTEM ──────────────────────────────────────────────
export const contentTiers = [
  {
    tier: 'Tier 1',
    name: 'Featured Authors',
    body: 'The network\u2019s highest placement. Full editorial feature, spotlight week, bookshelf position, and library program eligibility. Fewer than one in twenty applicants reach this tier.',
    count: '6 authors currently featured',
  },
  {
    tier: 'Tier 2',
    name: 'Emerging Authors',
    body: 'Strong works in development. Emerging authors receive genre room placement, a discovery listing, and a path to full feature as their readership grows.',
    count: '14 authors in development',
  },
  {
    tier: 'Tier 3',
    name: 'Reader Picks',
    body: 'Network highlights chosen by reader votes and moderator nomination from the most discussed titles in the boards each month.',
    count: 'Refreshed monthly',
  },
];

// 10. QUALITY CONTROL SYSTEM ───────────────────────────────────────────────
export const rejectionCriteria = [
  'Craft that is not yet at publishable standard',
  'Genre fit outside our reader base\u2019s current interests',
  'Work generated wholly or substantially by AI tools',
  'Incomplete fiction manuscripts or thin nonfiction proposals',
  'A positioning angle we cannot credibly champion to readers',
];

export const resubmissionPath =
  'A "not yet" is rarely a "never." Authors who are not selected receive a brief note on the deciding factor, and may revise and resubmit after ninety days. Roughly one in five featured authors was selected on a second submission.';

// 15. INSTITUTIONAL FRAMING LAYER ─────────────────────────────────────────
export const editorialBoard = [
  {
    name: 'Trent Marrow',
    role: 'Editorial Director',
    duty: 'Final approval on all features and spotlight selection.',
    photo: '/images/agents/trent-marrow.jpg',
  },
  {
    name: 'Claire Bennett',
    role: 'Head of Reader Programs',
    duty: 'Book club calendar, polls, and reader engagement standards.',
    photo: '/images/agents/claire-bennett.jpg',
  },
  {
    name: 'Daniel Reyes',
    role: 'Genre Selection Lead',
    duty: 'Genre fit review and emerging author development.',
    photo: '/images/agents/daniel-reyes.jpg',
  },
  {
    name: 'Jonathan Pierce',
    role: 'Nonfiction Standards',
    duty: 'Proposal quality, platform review, and business titles.',
    photo: '/images/agents/jonathan-pierce.jpg',
  },
  {
    name: 'Sarah Whitfield',
    role: 'Network Standards & Review',
    duty: 'Quality control, resubmission review, and the activity log.',
    photo: '/images/agents/sarah-whitfield.jpg',
  },
];

export const networkStandards = [
  'Every feature is read and approved by at least two members of the editorial board.',
  'No author is featured on the strength of a single opinion; selection is by review, not by relationship.',
  'Engagement figures shown on the network are drawn from real discussion and placement records.',
  'Reader reviews marked verified come only from members with a documented reading history.',
  'No placement, feature, or review on this network is ever sold.',
];

// 3. ENGAGEMENT DISPLAY SYSTEM ─────────────────────────────────────────────
export const trendingBooks = [
  { title: 'The Last Bookbinder', author: 'Amara Diallo', replies: 200, saves: 1240, note: 'Book club read' },
  { title: 'Where the River Remembers', author: 'T. H. Calloway', replies: 96, saves: 870, note: 'Full-spoiler thread' },
  { title: 'The Salt Meridian', author: 'Elena Vasquez', replies: 88, saves: 810, note: 'Bestseller debut' },
  { title: 'A Lantern in the Hollow', author: 'Marcus Reid', replies: 74, saves: 690, note: 'Series in development' },
];

export const trendingDiscussions = [
  { title: 'October pick: the poll is open, make your case here', board: 'Book Club & Group Reads', slug: 'book-club', engagement: '20 votes \u00b7 4 replies' },
  { title: 'Unreliable narrator in 2026: fresh or finished?', board: 'Mystery & Thriller', slug: 'mystery-thriller', engagement: '3 replies \u00b7 active this week' },
  { title: 'Platform before book: what actually moved the needle?', board: 'Self-Help', slug: 'self-help', engagement: '3 replies \u00b7 most saved' },
];

// 5. DISCOVERY MECHANISM ───────────────────────────────────────────────────
export const discoveryPairs = [
  {
    because: 'The Salt Meridian',
    like: 'Where the River Remembers',
    reason: 'Sweeping literary storytelling with a devastating structural reveal.',
    genre: 'historical-fiction',
  },
  {
    because: 'The Last Bookbinder',
    like: 'The Quiet Arithmetic',
    reason: 'Tender, character-first fiction about the people who hold families together.',
    genre: 'literary-fiction',
  },
  {
    because: 'A Lantern in the Hollow',
    like: 'The Salt Meridian',
    reason: 'Immersive world-building in service of an emotional, human story.',
    genre: 'literary-fiction',
  },
];

export const readerRoles = [
  {
    role: 'Explorer',
    body: 'Browses shelves and discovery. Suggested action: open one spotlight excerpt and one genre room each visit.',
  },
  {
    role: 'Reviewer',
    body: 'Reads featured titles and leaves verified reviews. Suggested action: rate the current book club pick when you finish it.',
  },
  {
    role: 'Club Member',
    body: 'Votes in polls and takes part in chapter discussions. Suggested action: cast your October vote and answer this week\u2019s prompt.',
  },
  {
    role: 'Silent Reader',
    body: 'Reads everything, posts rarely. Suggested action: none required. The network is built for you too; every read counts.',
  },
];

// 14. FEEDBACK LOOP SYSTEM ────────────────────────────────────────────────
export const readerPulse = {
  month: 'August 2026',
  summary:
    'Readers responded most strongly to structural reveals this month: the ferry scene in Where the River Remembers drove the single most-read discussion of the summer, and spoiler-marked threads outperformed general discussion three to one. Romance engagement is climbing steadily ahead of Romance Season.',
  insights: [
    'Spoiler-marked, chaptered discussions hold readers three times longer than open threads.',
    'Authors who reply inside their own book club threads see measurably higher shelf adds.',
    'Reader requests drove two confirmed library placements this month: Denver and Columbus.',
  ],
};

// 11. PUBLIC ACTIVITY LOG ─────────────────────────────────────────────────
export const activityLog = [
  { date: 'Sep 5, 2026', event: 'Library placement roundup published: 12 systems, 66 branches confirmed.', type: 'Placement' },
  { date: 'Sep 4, 2026', event: 'October Book Club poll opened to all members.', type: 'Poll' },
  { date: 'Sep 2, 2026', event: 'The Last Bookbinder placed as Featured Display across 9 Chicago Public Library branches.', type: 'Placement' },
  { date: 'Sep 1, 2026', event: 'September group read schedule posted; Amara Diallo confirmed for week four discussion.', type: 'Book Club' },
  { date: 'Aug 30, 2026', event: 'T. H. Calloway spotlight week closed: 96 discussion replies, 870 shelf saves.', type: 'Spotlight' },
  { date: 'Aug 28, 2026', event: 'Full-spoiler discussion for Where the River Remembers became the most-read thread of the summer.', type: 'Discussion' },
  { date: 'Aug 25, 2026', event: 'The Salt Meridian named Staff Pick across 5 Multnomah County Library branches.', type: 'Placement' },
  { date: 'Aug 18, 2026', event: 'The Salt Meridian acquired by New York Public Library across 12 branches.', type: 'Placement' },
  { date: 'Aug 11, 2026', event: 'Elena Vasquez spotlight week closed: bestseller list debut confirmed.', type: 'Spotlight' },
  { date: 'Aug 5, 2026', event: 'A Lantern in the Hollow acquired by British Library Lending Network, 6 branches.', type: 'Placement' },
];

// 12. CROSS-ENGAGEMENT LOOP ───────────────────────────────────────────────
export const authorReactions = [
  {
    author: 'Elena Vasquez',
    on: 'Amara Diallo\u2019s The Last Bookbinder',
    quote: 'I read the letter scene on a plane and had to put the book down and stare at the seat in front of me. This is how you write restraint.',
  },
  {
    author: 'Marcus Reid',
    on: 'T. H. Calloway\u2019s Where the River Remembers',
    quote: 'Six years of research and it never once shows off. The structure is the story. I am taking notes.',
  },
  {
    author: 'Amara Diallo',
    on: 'Elena Vasquez\u2019s The Salt Meridian',
    quote: 'The tidal imagery is doing three jobs at once and never announces itself. A debut should not be allowed to be this assured.',
  },
  {
    author: 'T. H. Calloway',
    on: 'Marcus Reid\u2019s A Lantern in the Hollow',
    quote: 'A magic system with rules you can actually learn, and the confidence to let the romance breathe. Rare discipline.',
  },
];
