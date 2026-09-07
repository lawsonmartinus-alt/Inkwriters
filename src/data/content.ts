export interface Agent {
  name: string;
  title: string;
  photo: string;
  bio: string;
  seeking: string[];
  open: boolean;
}

export const agents: Agent[] = [
  {
    name: 'Trent Marrow',
    title: 'Founder & Senior Agent',
    photo: '/images/agents/trent-marrow.jpg',
    bio: 'Trent founded Inkwriters after more than a decade on the editorial side of New York publishing, where he acquired and edited bestselling fiction and narrative nonfiction. He built the agency on a simple conviction: that an author\u2019s career is a long game, and that representation should be measured in decades, not deal announcements. He works closely with a select list of debut and established authors across literary and upmarket fiction, memoir, and big-idea nonfiction.',
    seeking: [
      'Literary and book-club fiction with a distinctive voice',
      'Memoir with a remarkable story and a reflective core',
      'Narrative nonfiction that reads like a novel',
      'Big-idea business and self-help from credible experts',
    ],
    open: true,
  },
  {
    name: 'Daniel Reyes',
    title: 'Senior Agent',
    photo: '/images/agents/daniel-reyes.jpg',
    bio: 'Daniel joined Inkwriters from a boutique rights agency in London, bringing deep experience in foreign and film rights. He represents commercial and genre fiction with crossover potential, and is known for positioning authors for international markets from the very first submission. His clients have been translated into more than twenty languages.',
    seeking: [
      'Fantasy and romantasy with fresh world-building',
      'Propulsive thrillers and high-concept suspense',
      'Romance across the spectrum, from rom-com to epic',
      'Stories with strong film and television potential',
    ],
    open: true,
  },
  {
    name: 'Claire Bennett',
    title: 'Literary Agent',
    photo: '/images/agents/claire-bennett.jpg',
    bio: 'Claire began her career as a bookseller before moving into publishing publicity, giving her a ground-level understanding of how readers actually discover books. At Inkwriters she builds a list of voice-driven fiction and practical nonfiction, and leads the agency\u2019s author-branding and positioning work.',
    seeking: [
      'Upmarket women\u2019s fiction and family dramas',
      'Cozy mystery and amateur-sleuth series',
      'Self-help and wellness with an authentic platform',
      'Inspirational and faith-adjacent narratives',
    ],
    open: true,
  },
  {
    name: 'Jonathan Pierce',
    title: 'Literary Agent',
    photo: '/images/agents/jonathan-pierce.jpg',
    bio: 'Jonathan spent eight years as an editor at a university press before turning to agenting. He represents serious nonfiction, including history, science, business, and current affairs, alongside a small list of literary fiction. He is particularly drawn to expert authors translating complex subjects for general readers.',
    seeking: [
      'Business, leadership, and behavioral economics',
      'Accessible science and big-history narratives',
      'Biography and untold historical stories',
      'Literary fiction with intellectual ambition',
    ],
    open: false,
  },
  {
    name: 'Sarah Whitfield',
    title: 'Rights & Contracts Director',
    photo: '/images/agents/sarah-whitfield.jpg',
    bio: 'Sarah oversees Inkwriters\u2019 subsidiary rights operation, covering foreign translation, audio, and film/television, and manages the agency\u2019s contracts and royalty review process. Before joining Inkwriters she ran the contracts department of a mid-size publisher, and she negotiates with an editor\u2019s instincts and a lawyer\u2019s precision.',
    seeking: [
      'Foreign translation rights across the client list',
      'Audio-first and dramatized adaptations',
      'Film and television options for client titles',
    ],
    open: false,
  },
];

export interface Book {
  title: string;
  author: string;
  genre: string;
  palette: { bg: string; fg: string; accent: string };
}

export const featuredBooks: Book[] = [
  {
    title: 'The Salt Meridian',
    author: 'Elena Vasquez',
    genre: 'Literary Fiction',
    palette: { bg: '#1e3d2f', fg: '#f5f3ef', accent: '#c9a86a' },
  },
  {
    title: 'A Lantern in the Hollow',
    author: 'Marcus Reid',
    genre: 'Fantasy',
    palette: { bg: '#22262e', fg: '#ece7dc', accent: '#8fa8c8' },
  },
  {
    title: 'The Quiet Arithmetic',
    author: 'June Okafor',
    genre: 'Book Club Fiction',
    palette: { bg: '#6b4a3a', fg: '#f5efe6', accent: '#e0c9a6' },
  },
  {
    title: 'Where the River Remembers',
    author: 'T. H. Calloway',
    genre: 'Historical Fiction',
    palette: { bg: '#3a4a3f', fg: '#eef0e6', accent: '#b7c4a3' },
  },
  {
    title: 'The Last Bookbinder',
    author: 'Amara Diallo',
    genre: 'Romance',
    palette: { bg: '#4a2e35', fg: '#f6ece7', accent: '#d9a6a0' },
  },
  {
    title: 'Winterlight',
    author: 'Sofia Lindqvist',
    genre: 'Memoir',
    palette: { bg: '#2e3d4a', fg: '#ecf1f4', accent: '#a8c4d4' },
  },
];

export interface Deal {
  title: string;
  author: string;
  publisher: string;
  type: 'Book Deal' | 'Foreign Rights' | 'Film/TV';
  detail: string;
}

export const deals: Deal[] = [
  {
    title: 'The Salt Meridian',
    author: 'Elena Vasquez',
    publisher: 'HarperCollins',
    type: 'Book Deal',
    detail: 'World English rights, two-book deal, at auction',
  },
  {
    title: 'A Lantern in the Hollow',
    author: 'Marcus Reid',
    publisher: 'Orbit',
    type: 'Book Deal',
    detail: 'North American rights, trilogy',
  },
  {
    title: 'The Quiet Arithmetic',
    author: 'June Okafor',
    publisher: 'Penguin Random House',
    type: 'Book Deal',
    detail: 'World rights, preempt',
  },
  {
    title: 'The Salt Meridian',
    author: 'Elena Vasquez',
    publisher: 'Rowohlt Verlag',
    type: 'Foreign Rights',
    detail: 'German translation rights; deals also closed in France, Italy, and Spain',
  },
  {
    title: 'Where the River Remembers',
    author: 'T. H. Calloway',
    publisher: 'CITIC Press',
    type: 'Foreign Rights',
    detail: 'Simplified Chinese rights',
  },
  {
    title: 'The Last Bookbinder',
    author: 'Amara Diallo',
    publisher: 'Editorial Planeta',
    type: 'Foreign Rights',
    detail: 'Spanish-language world rights',
  },
  {
    title: 'A Lantern in the Hollow',
    author: 'Marcus Reid',
    publisher: 'Major streaming studio',
    type: 'Film/TV',
    detail: 'Series option, in development',
  },
  {
    title: 'Winterlight',
    author: 'Sofia Lindqvist',
    publisher: 'Independent film producer',
    type: 'Film/TV',
    detail: 'Feature film option',
  },
];

export interface NewsItem {
  tag: string;
  date: string;
  title: string;
  body: string;
}

export const news: NewsItem[] = [
  {
    tag: 'Bestseller',
    date: 'August 2026',
    title: 'The Salt Meridian debuts on the national bestseller list',
    body: 'Elena Vasquez\u2019s sweeping debut landed on the hardcover fiction list in its first week on sale, following a six-figure auction and early rave reviews.',
  },
  {
    tag: 'Author Spotlight',
    date: 'July 2026',
    title: 'Marcus Reid signs trilogy deal for A Lantern in the Hollow',
    body: 'The fantasy trilogy sold in a competitive preempt, with translation rights already moving in five territories and a streaming series in development.',
  },
  {
    tag: 'Agency News',
    date: 'June 2026',
    title: 'Inkwriters expands its foreign rights operation',
    body: 'The agency has broadened its co-agent network across Europe and Asia, bringing translation representation for client titles to more than thirty territories.',
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: 'Do you charge any fees?',
    a: 'No. Inkwriters never charges reading fees, submission fees, or any upfront costs of any kind. Legitimate literary agents earn a commission on work they sell. That is our only compensation. If anyone claiming to represent Inkwriters asks you for payment, it is not us.',
  },
  {
    q: 'What is your commission?',
    a: 'We charge the industry-standard commission: 15% on domestic sales and 20% on foreign translation and film/television rights (the latter reflecting the involvement of co-agents in those markets).',
  },
  {
    q: 'What genres do you accept?',
    a: 'We represent literary and upmarket fiction, romance, fantasy, thrillers, mystery, historical fiction, memoir, self-help, business, inspirational, and narrative nonfiction. We do not currently represent screenplays, poetry, or picture books.',
  },
  {
    q: 'Do you provide editing?',
    a: 'We offer light editorial guidance to clients whose work we represent, enough to ensure a manuscript is positioned at its strongest before submission to publishers. We do not offer paid editing services, and representation is never contingent on purchasing any service.',
  },
  {
    q: 'How does representation work?',
    a: 'After you submit, the appropriate agent reviews your material. If we offer representation, we work with you to refine the manuscript or proposal, then submit it to editors at publishing houses we believe are the right fit. We negotiate the deal, manage the contract, and advocate for your career across every stage: publication, marketing, subsidiary rights, and beyond.',
  },
  {
    q: 'How long does it take to hear back?',
    a: 'We aim to respond to all submissions within two to four weeks. If you have not heard from us after four weeks, you are welcome to follow up by email.',
  },
];

export const genres = [
  'Literary Fiction',
  'Romance',
  'Fantasy',
  'Self-Help',
  'Business',
  'Memoir',
  'Inspirational',
];

export const EMAIL = 'info@inkwriters.co';
