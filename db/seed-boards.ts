import { getDb } from "../api/queries/connection";
import { threads, replies } from "./schema";

type Role = "author" | "reader" | "moderator";
const D = (s: string) => new Date(s.replace(" ", "T") + ":00Z");

interface SeedReply { body: string; authorName: string; authorRole: Role; createdAt: Date }
interface SeedThread {
  genre: string; title: string; body: string; authorName: string; authorRole: Role;
  pinned?: number; createdAt: Date; replies: SeedReply[];
}

const data: SeedThread[] = [
  {
    genre: "general",
    title: "Introduce yourself: what are you reading right now?",
    body: "The network's standing introduction thread. Tell us who you are, what you write or love to read, and what is currently on your nightstand. Our moderators read every introduction and will point you to the right rooms.",
    authorName: "Claire Bennett",
    authorRole: "moderator",
    pinned: 1,
    createdAt: D("2023-03-14 09:00"),
    replies: [
      {
        body: "Reader from Portland here, mostly literary fiction and the occasional thriller. Currently halfway through The Salt Meridian and rationing the last hundred pages because I do not want it to end.",
        authorName: "Margaret Osbourne",
        authorRole: "reader",
        createdAt: D("2023-03-15 10:22"),
      },
      {
        body: "Debut fantasy author, unagented but hopeful. Joined to learn how query hooks actually work. Currently reading A Lantern in the Hollow for research and honestly for joy.",
        authorName: "Isla Marchand",
        authorRole: "author",
        createdAt: D("2025-11-02 14:30"),
      },
      {
        body: "Nonfiction writer with a small newsletter and big questions about platform. The self-help room has already been kinder to me than most conferences.",
        authorName: "Wendell Park",
        authorRole: "author",
        createdAt: D("2026-08-11 15:40"),
      },
      {
        body: "Welcome to all three of you. Margaret, pace yourself, the ending rewards it. Isla, the fantasy room's query thread is where you want to be. Wendell, glad the nonfiction rooms are earning their keep.",
        authorName: "Claire Bennett",
        authorRole: "moderator",
        createdAt: D("2026-08-12 08:30"),
      },
    ],
  },
  {
    genre: "general",
    title: "What did the network get you to read this year that you never would have picked up alone?",
    body: "A thread for happy accidents. Mine: I have avoided romance for thirty years and the book club's July pick completely disarmed me. Your turn.",
    authorName: "Graham Pelt",
    authorRole: "reader",
    createdAt: D("2026-08-15 19:20"),
    replies: [
      {
        body: "Memoir. Always thought the genre was navel-gazing until Winterlight proved me wrong in about forty pages. Sofia Lindqvist could make a grocery list devastating.",
        authorName: "Declan Furey",
        authorRole: "author",
        createdAt: D("2026-08-15 21:05"),
      },
      {
        body: "Business books, of all things. The discussions in that room read better than most of the genre itself.",
        authorName: "Priya Nandakumar",
        authorRole: "reader",
        createdAt: D("2026-08-16 09:12"),
      },
    ],
  },
  {
    genre: "book-club",
    title: "September group read: The Last Bookbinder (official schedule)",
    body: "Official schedule for September's group read. Week one: chapters 1 to 10, spoiler-safe thread. Week two: chapters 11 to 20. Week three: finish the book. Week four: full-spoiler discussion with Amara Diallo joining us in the thread. Reading guides are posted in this thread; the poll for October's pick is now open on the group page.",
    authorName: "Claire Bennett",
    authorRole: "moderator",
    pinned: 1,
    createdAt: D("2026-09-01 09:00"),
    replies: [
      {
        body: "Reading along for the first time since joining in 2023. The week-by-week structure is exactly what I needed. Chapter 3 already has me.",
        authorName: "Margaret Osbourne",
        authorRole: "reader",
        createdAt: D("2026-09-02 20:14"),
      },
      {
        body: "Second time through for me, first time with the group. Watching everyone hit chapter 9 for the first time is going to be the highlight of my September.",
        authorName: "Hannah Whitaker",
        authorRole: "reader",
        createdAt: D("2026-09-03 08:47"),
      },
      {
        body: "Looking forward to week four already. I will be here answering everything, including the questions I probably should not answer.",
        authorName: "Amara Diallo",
        authorRole: "author",
        createdAt: D("2026-09-03 11:26"),
      },
    ],
  },
  {
    genre: "book-club",
    title: "October pick: the poll is open, make your case here",
    body: "The October poll is live with four candidates. Campaign for your favorite below. Persuasion is encouraged, spoilers are not.",
    authorName: "Daniel Reyes",
    authorRole: "moderator",
    createdAt: D("2026-09-04 10:00"),
    replies: [
      {
        body: "Voting The Quiet Arithmetic. June Okafor writes family dynamics like nobody else on the list and this group owes itself a proper book club fiction month.",
        authorName: "Teresa Maldonado",
        authorRole: "reader",
        createdAt: D("2026-09-04 14:31"),
      },
      {
        body: "Winterlight, and it is not close. We have done three fiction picks in a row and the memoir room has been patiently waiting its turn.",
        authorName: "Nadia Ferreira",
        authorRole: "author",
        createdAt: D("2026-09-05 13:29"),
      },
      {
        body: "I see the Lantern Book Two campaign is suspiciously quiet. Marcus, say something.",
        authorName: "Graham Pelt",
        authorRole: "reader",
        createdAt: D("2026-09-05 16:40"),
      },
      {
        body: "I am honor-bound not to campaign for my own book, but I will say the second lantern is considerably darker than the first. Vote your conscience.",
        authorName: "Marcus Reid",
        authorRole: "author",
        createdAt: D("2026-09-05 20:40"),
      },
    ],
  },
  {
    genre: "library-placement",
    title: "Placement roundup: where network titles landed this quarter",
    body: "Our standing quarterly roundup of library placements for network titles. Full details on the group page's library section. Highlights: The Salt Meridian is now in twelve New York Public Library branches, A Lantern in the Hollow went into featured display across the King County system, and The Last Bookbinder's book club kits shipped to Toronto Public Library.",
    authorName: "Trent Marrow",
    authorRole: "moderator",
    pinned: 1,
    createdAt: D("2026-09-05 09:00"),
    replies: [
      {
        body: "Requested The Last Bookbinder at my branch in Columbus after the July discussion and it arrived this week. The librarian said three other people had asked for it. This network moves books.",
        authorName: "Allison Frye",
        authorRole: "reader",
        createdAt: D("2026-09-05 12:18"),
      },
      {
        body: "Seeing my book on the New York Public Library's new acquisition list is the moment this year stopped feeling surreal and started feeling real. Thank you to every reader who requested it.",
        authorName: "Elena Vasquez",
        authorRole: "author",
        createdAt: D("2026-09-05 15:52"),
      },
    ],
  },
  {
    genre: "library-placement",
    title: "How to request a network title at your local library (it takes two minutes)",
    body: "Most library systems let cardholders request acquisitions online. Here is how: find your library's suggest-a-purchase page, paste the title and author from our bookshelf, and submit. Every request counts. Systems track demand, and three or four requests is often enough to trigger an order. Post here when you do it so we can track which systems are warming up.",
    authorName: "Sarah Whitfield",
    authorRole: "moderator",
    createdAt: D("2026-08-30 10:30"),
    replies: [
      {
        body: "Did this for Winterlight at Denver Public Library on Monday. Got the hold notification this morning. Two minutes is accurate, maybe ninety seconds.",
        authorName: "Hannah Whitaker",
        authorRole: "reader",
        createdAt: D("2026-09-03 18:22"),
      },
      {
        body: "Hannah's request worked, and Winterlight is now in Denver's digital collection as of this week. Proof of concept, posted above the fold.",
        authorName: "Sarah Whitfield",
        authorRole: "moderator",
        createdAt: D("2026-09-04 09:15"),
      },
    ],
  },
];

async function seed() {
  const db = getDb();
  console.log("Seeding board threads...");
  for (const t of data) {
    const result = await db.insert(threads).values({
      genre: t.genre,
      title: t.title,
      body: t.body,
      authorName: t.authorName,
      authorRole: t.authorRole,
      pinned: t.pinned ?? 0,
      createdAt: t.createdAt,
    });
    const threadId = Number(result[0].insertId);
    for (const r of t.replies) {
      await db.insert(replies).values({
        threadId,
        body: r.body,
        authorName: r.authorName,
        authorRole: r.authorRole,
        createdAt: r.createdAt,
      });
    }
    console.log(`  [${t.genre}] ${t.title} (+${t.replies.length})`);
  }
  console.log("Board seed complete.");
  process.exit(0);
}

seed();
