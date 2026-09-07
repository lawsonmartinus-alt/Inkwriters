import { getDb } from "../api/queries/connection";
import { threads, replies } from "./schema";

type Role = "author" | "reader" | "moderator";

interface SeedReply {
  body: string;
  authorName: string;
  authorRole: Role;
  createdAt: Date;
}

interface SeedThread {
  genre: string;
  title: string;
  body: string;
  authorName: string;
  authorRole: Role;
  pinned?: number;
  createdAt: Date;
  replies: SeedReply[];
}

const D = (s: string) => new Date(s.replace(" ", "T") + ":00Z");

const data: SeedThread[] = [
  // ── 2023: the network's early days ─────────────────────────────
  {
    genre: "literary-fiction",
    title: "Welcome to the Inkwriters Network: introduce yourself here",
    body: "This is the pinned welcome thread for the network. If you write or read literary fiction, introduce yourself below: what you are working on, what you are reading, and what you hope to find here. Our moderators read every introduction.",
    authorName: "Trent Marrow",
    authorRole: "moderator",
    pinned: 1,
    createdAt: D("2023-03-14 09:30"),
    replies: [
      {
        body: "Delighted to see this launch. I have a literary novel in revision and I am here mostly to learn how other writers handle second acts. Currently rereading Marilynne Robinson.",
        authorName: "Elena Vasquez",
        authorRole: "author",
        createdAt: D("2023-03-14 14:05"),
      },
      {
        body: "Reader here, not a writer. I joined because I want earlier access to new literary voices. Already following three authors from the spotlight page.",
        authorName: "Margaret Osbourne",
        authorRole: "reader",
        createdAt: D("2023-03-15 10:22"),
      },
      {
        body: "Welcome both. Elena, the craft threads in this genre room will suit you. Margaret, watch the Weekly Spotlight each Monday for new featured authors.",
        authorName: "Claire Bennett",
        authorRole: "moderator",
        createdAt: D("2023-03-15 16:40"),
      },
    ],
  },
  {
    genre: "fantasy",
    title: "Worldbuilding question: how much is too much in chapter one?",
    body: "First-time epic fantasy writer here. My opening chapter currently explains the magic system for about two pages before anything happens. Beta readers are split. How do you balance immersion with momentum?",
    authorName: "Marcus Reid",
    authorRole: "author",
    createdAt: D("2023-06-02 11:15"),
    replies: [
      {
        body: "Cut it to what the character physically needs in the scene. If the magic is not being used or obstructing someone on the page, it does not belong in chapter one.",
        authorName: "Rowan Ashby",
        authorRole: "author",
        createdAt: D("2023-06-02 13:44"),
      },
      {
        body: "Agreed with Rowan. As a reader, I trust a writer who shows me one impossible thing done well more than one who explains ten impossible things.",
        authorName: "Priya Nandakumar",
        authorRole: "reader",
        createdAt: D("2023-06-02 19:08"),
      },
      {
        body: "This is exactly the kind of craft discussion this room is for. Marcus, feel free to post a short excerpt in the feedback thread if you want scene-level notes.",
        authorName: "Daniel Reyes",
        authorRole: "moderator",
        createdAt: D("2023-06-03 09:12"),
      },
    ],
  },
  {
    genre: "romance",
    title: "Slow burn pacing: when should the first kiss land?",
    body: "I am drafting a contemporary romance and my critique partner says the first kiss at 60 percent is too late. Romance readers of the network, what say you?",
    authorName: "Amara Diallo",
    authorRole: "author",
    createdAt: D("2023-09-18 15:20"),
    replies: [
      {
        body: "Romance reader for twenty years. Sixty percent is fine IF the tension is doing work before then. I only get impatient when nothing is escalating.",
        authorName: "Sofia Lindqvist",
        authorRole: "reader",
        createdAt: D("2023-09-18 17:02"),
      },
      {
        body: "Seconded. I put a book down when the leads are kept apart by a misunderstanding that one conversation would fix. Obstacles must be real.",
        authorName: "Hannah Whitaker",
        authorRole: "reader",
        createdAt: D("2023-09-19 08:37"),
      },
    ],
  },
  // ── 2024 ────────────────────────────────────────────────────────
  {
    genre: "mystery-thriller",
    title: "Fair-play clues: how do you hide them in plain sight?",
    body: "Working on my first whodunit. I want readers to kick themselves at the reveal, not feel cheated. How do you plant clues that are visible but not obvious?",
    authorName: "Declan Furey",
    authorRole: "author",
    createdAt: D("2024-02-11 10:05"),
    replies: [
      {
        body: "Attach the clue to an emotion. Readers remember how a scene felt and forget what it contained. Put your critical detail next to a laugh or a shock.",
        authorName: "Vivian Locke",
        authorRole: "author",
        createdAt: D("2024-02-11 12:48"),
      },
      {
        body: "I am one of those readers who rereads immediately after the twist. The best feeling is realizing the answer was in chapter two. Vivian is right: disguise information as atmosphere.",
        authorName: "Graham Pelt",
        authorRole: "reader",
        createdAt: D("2024-02-11 21:30"),
      },
      {
        body: "Moderator note: we have pinned a reading list of fair-play mysteries in this room's resources. Study how the greats distribute their reveals.",
        authorName: "Sarah Whitfield",
        authorRole: "moderator",
        createdAt: D("2024-02-12 09:15"),
      },
    ],
  },
  {
    genre: "self-help",
    title: "Authors: how do you balance story with prescription?",
    body: "My self-help manuscript leans heavily on my own burnout recovery. An early reader said it felt more like memoir. Where is the line between testimony and instruction?",
    authorName: "Dr. Nathan Cole",
    authorRole: "author",
    createdAt: D("2024-05-27 14:10"),
    replies: [
      {
        body: "Rule I use: one story per chapter, and it must illustrate the tool, not replace it. If the reader finishes a chapter moved but with nothing to do on Monday morning, revise.",
        authorName: "June Okafor",
        authorRole: "author",
        createdAt: D("2024-05-27 16:33"),
      },
      {
        body: "As a reader I actually want the memoir woven in. But I want the exercise clearly marked so I can find it again. Design matters more than ratio.",
        authorName: "Teresa Maldonado",
        authorRole: "reader",
        createdAt: D("2024-05-28 07:55"),
      },
    ],
  },
  {
    genre: "business",
    title: "Is there still room for a book on remote-first management?",
    body: "I have ten years of distributed-team experience and a draft proposal. But the shelf feels crowded. Honest opinions: is this space exhausted?",
    authorName: "Kofi Mensah",
    authorRole: "author",
    createdAt: D("2024-10-08 09:42"),
    replies: [
      {
        body: "The generic remote-work book is dead, yes. The specific one is not. What do you know that the existing titles do not? Lead with that gap, not the topic.",
        authorName: "Jonathan Pierce",
        authorRole: "moderator",
        createdAt: D("2024-10-08 11:20"),
      },
      {
        body: "Business reader here. I still buy these, but only when the author has run something real. Your ten years is the hook. Make the book about your scars, not the concept.",
        authorName: "Allison Frye",
        authorRole: "reader",
        createdAt: D("2024-10-08 18:47"),
      },
    ],
  },
  // ── 2025: late last year ────────────────────────────────────────
  {
    genre: "fantasy",
    title: "Romantasy query feedback: is my hook strong enough?",
    body: "Drafting my query for a romantasy: a cartographer who maps magical borders falls for the smuggler who keeps moving them. Comp feels solid but the hook line keeps getting polite silence. Tear it apart, please.",
    authorName: "Isla Marchand",
    authorRole: "author",
    createdAt: D("2025-11-04 13:25"),
    replies: [
      {
        body: "The premise is genuinely good. The problem is it reads as setup, not conflict. What does she LOSE if the borders move? Put the stake in the same sentence as the kiss.",
        authorName: "Marcus Reid",
        authorRole: "author",
        createdAt: D("2025-11-04 15:56"),
      },
      {
        body: "Reader reaction: I would request pages on the premise alone. But Marcus is right, the current line is a movie poster, not a story. Give me the impossible choice.",
        authorName: "Priya Nandakumar",
        authorRole: "reader",
        createdAt: D("2025-11-04 20:11"),
      },
      {
        body: "Isla, try: she is commissioned to hang the smuggler, and he is the only map she wants to keep. Then query the agents on our Submissions page. This one is close.",
        authorName: "Daniel Reyes",
        authorRole: "moderator",
        createdAt: D("2025-11-05 09:03"),
      },
      {
        body: "You are all wonderful. Rewrote it overnight with the stakes up front and my critique group audibly gasped. This network works.",
        authorName: "Isla Marchand",
        authorRole: "author",
        createdAt: D("2025-11-06 08:17"),
      },
    ],
  },
  {
    genre: "memoir",
    title: "How honest is too honest? Writing about living people",
    body: "My memoir covers my addiction years and my brother is a major figure in that story. He is alive, we are close now, and he has not read a word. How have others handled this?",
    authorName: "T. H. Calloway",
    authorRole: "author",
    createdAt: D("2025-12-09 16:40"),
    replies: [
      {
        body: "I gave my sister the chapters where she appears before anyone else saw them. Not for approval, for warning. She asked me to change one detail. I changed it. The book is better and so is Christmas.",
        authorName: "Sofia Lindqvist",
        authorRole: "author",
        createdAt: D("2025-12-09 18:22"),
      },
      {
        body: "Memoirists in this network generally follow three rules: tell your truth, disguise what is not yours to tell, and never publish a surprise. Also speak with your agent about legal review before submission.",
        authorName: "Claire Bennett",
        authorRole: "moderator",
        createdAt: D("2025-12-10 10:05"),
      },
      {
        body: "Thank you both. I have asked him to coffee this weekend. Whatever he says, the book will be kinder than my first draft was.",
        authorName: "T. H. Calloway",
        authorRole: "author",
        createdAt: D("2025-12-10 21:34"),
      },
    ],
  },
  {
    genre: "historical-fiction",
    title: "Research rabbit holes: when do you stop and write?",
    body: "Eight months into researching 1920s Marseille for my novel and I have written maybe 4,000 words. The archives keep giving. Does anyone have a system for calling time on research?",
    authorName: "Beatrice Oyelaran",
    authorRole: "author",
    createdAt: D("2025-12-16 11:30"),
    replies: [
      {
        body: "I set a rule: research only what the current scene needs. Everything else gets a bracket in the draft like [CHECK: tram fares 1924]. Brackets are future-you's problem.",
        authorName: "Aimie Vandermeer",
        authorRole: "author",
        createdAt: D("2025-12-16 14:12"),
      },
      {
        body: "Reader perspective: I can tell when a novel was researched for eight months versus eight years, and honestly? Eight months with a good story beats eight years with a museum exhibit.",
        authorName: "Graham Pelt",
        authorRole: "reader",
        createdAt: D("2025-12-17 09:45"),
      },
    ],
  },
  // ── 2026: this year ─────────────────────────────────────────────
  {
    genre: "literary-fiction",
    title: "Second novelist anxiety: does the sophomore slump fear ever fade?",
    body: "My debut did better than anyone expected and now I am paralyzed. Every sentence of book two feels like it is being graded against a version of me I cannot repeat. How did you get book two written?",
    authorName: "Elena Vasquez",
    authorRole: "author",
    createdAt: D("2026-03-02 10:15"),
    replies: [
      {
        body: "I banned myself from reading reviews of book one while drafting book two. The audience for your draft is you from three years ago, the one who wrote before anyone was watching.",
        authorName: "June Okafor",
        authorRole: "author",
        createdAt: D("2026-03-02 12:40"),
      },
      {
        body: "Elena, I was one of your first readers here in 2023. Write the book that 2023 Elena would want to read. We will still be here when it is done.",
        authorName: "Margaret Osbourne",
        authorRole: "reader",
        createdAt: D("2026-03-02 19:28"),
      },
      {
        body: "This thread is the network at its best. Elena, your agent says the same thing weekly, but perhaps it lands better from June and Margaret.",
        authorName: "Trent Marrow",
        authorRole: "moderator",
        createdAt: D("2026-03-03 08:55"),
      },
    ],
  },
  {
    genre: "mystery-thriller",
    title: "Unreliable narrator in 2026: fresh or finished?",
    body: "Every agent wish list seems to say no more unreliable narrators, yet readers in my circle still devour them. Writing a psychological thriller with a narrator who lies about one specific thing. Am I dead on arrival?",
    authorName: "Nadia Ferreira",
    authorRole: "author",
    createdAt: D("2026-05-19 14:50"),
    replies: [
      {
        body: "The trope is not dead, the lazy version is. One specific lie is a choice, not a gimmick. What matters is what the lie costs the narrator by the end.",
        authorName: "Vivian Locke",
        authorRole: "author",
        createdAt: D("2026-05-19 17:31"),
      },
      {
        body: "Thriller reader here. I am tired of narrators who lie to ME for no reason. I am not tired of narrators who lie to themselves. Big difference. Yours sounds like the second kind.",
        authorName: "Hannah Whitaker",
        authorRole: "reader",
        createdAt: D("2026-05-19 22:14"),
      },
      {
        body: "For the record, our agents still request unreliable-narrator manuscripts when the device serves character. Nadia, finish the draft. The market follows good books, not the reverse.",
        authorName: "Sarah Whitfield",
        authorRole: "moderator",
        createdAt: D("2026-05-20 09:26"),
      },
    ],
  },
  {
    genre: "romance",
    title: "Book club pick discussion: The Last Bookbinder, chapters 1 to 10",
    body: "Official discussion thread for this month's romance book club pick. Spoilers allowed for chapters 1 through 10 only. First prompt: the bookbinder's shop is practically a character itself. Did the setting work for you?",
    authorName: "Claire Bennett",
    authorRole: "moderator",
    pinned: 1,
    createdAt: D("2026-07-06 09:00"),
    replies: [
      {
        body: "The moment she describes the smell of the glue and old leather I was gone. Completely transported. I have never cared about bookbinding in my life and now I am watching restoration videos.",
        authorName: "Hannah Whitaker",
        authorRole: "reader",
        createdAt: D("2026-07-06 12:33"),
      },
      {
        body: "Setting worked, but I want to talk about the sister. Ten chapters in and she is the only one telling the truth. Suspect she becomes important later.",
        authorName: "Teresa Maldonado",
        authorRole: "reader",
        createdAt: D("2026-07-06 18:07"),
      },
      {
        body: "Author of the book here, lurking with permission. Reading your reactions to the shop has genuinely made my month. No spoilers from me, but Teresa, you are very observant.",
        authorName: "Amara Diallo",
        authorRole: "author",
        createdAt: D("2026-07-07 08:44"),
      },
      {
        body: "An author in our discussion thread! This is why this network is different. Okay, Amara, the chapter 9 letter scene: how many drafts did that take?",
        authorName: "Sofia Lindqvist",
        authorRole: "reader",
        createdAt: D("2026-07-07 10:29"),
      },
      {
        body: "Fourteen. My agent made me cut the first version entirely and write it from a different character's doorstep. He was right, and I have forgiven him.",
        authorName: "Amara Diallo",
        authorRole: "author",
        createdAt: D("2026-07-07 13:52"),
      },
    ],
  },
  {
    genre: "self-help",
    title: "Platform before book: what actually moved the needle for you?",
    body: "Agents keep saying nonfiction authors need a platform. I have a small newsletter (900 subscribers) and a day job. For those who got representation in self-help or business: what did your platform look like when you queried?",
    authorName: "Wendell Park",
    authorRole: "author",
    createdAt: D("2026-08-11 15:35"),
    replies: [
      {
        body: "I queried with 1,200 newsletter subscribers and a strong proposal. What mattered was engagement: 60 percent open rate and readers who replied. Agents asked about that, not raw size.",
        authorName: "Dr. Nathan Cole",
        authorRole: "author",
        createdAt: D("2026-08-11 17:02"),
      },
      {
        body: "Moderator answer from the agency side: we look for evidence that people already act on your ideas. Nine hundred engaged readers beats ninety thousand silent followers. Document your open rates and reader responses in the proposal.",
        authorName: "Jonathan Pierce",
        authorRole: "moderator",
        createdAt: D("2026-08-12 08:40"),
      },
      {
        body: "This answer just saved me six months of chasing follower counts. Printing it out and pinning it above my desk.",
        authorName: "Wendell Park",
        authorRole: "author",
        createdAt: D("2026-08-12 10:15"),
      },
    ],
  },
  {
    genre: "historical-fiction",
    title: "Just finished Where the River Remembers: discussion (full spoilers)",
    body: "Full-spoiler discussion for T. H. Calloway's Where the River Remembers. I finished at 2am and I need to talk about the ferry scene. Please tell me someone else has finished it.",
    authorName: "Graham Pelt",
    authorRole: "reader",
    createdAt: D("2026-08-28 23:05"),
    replies: [
      {
        body: "Finished last week and I have been WAITING for this thread. The ferry scene recontextualizes the entire first act. I immediately reread chapters 3 and 4.",
        authorName: "Beatrice Oyelaran",
        authorRole: "author",
        createdAt: D("2026-08-29 07:41"),
      },
      {
        body: "The reveal about the letters destroyed me. Historical fiction rarely earns that kind of ending. This one did.",
        authorName: "Margaret Osbourne",
        authorRole: "reader",
        createdAt: D("2026-08-29 09:18"),
      },
      {
        body: "Author here. The ferry scene was the first scene I wrote, six years ago, and everything else was built backward from it. Thank you for giving it a 2am finish. That is the highest compliment a writer can receive.",
        authorName: "T. H. Calloway",
        authorRole: "author",
        createdAt: D("2026-08-29 12:30"),
      },
    ],
  },
  {
    genre: "business",
    title: "Case studies vs frameworks: what do business readers actually finish?",
    body: "Structuring my chapters and torn between two models: one big case study per chapter, or a framework with short examples sprinkled through. Business readers, which do you actually read to the end?",
    authorName: "Kofi Mensah",
    authorRole: "author",
    createdAt: D("2026-09-01 09:55"),
    replies: [
      {
        body: "Framework with short examples. I read business books on planes and I need to be able to stop and restart without losing a 30-page case study thread.",
        authorName: "Allison Frye",
        authorRole: "reader",
        createdAt: D("2026-09-01 11:22"),
      },
      {
        body: "Counterpoint: the business books I remember years later are the ones with one story told well. Maybe the answer is one anchor case per section, short examples within chapters.",
        authorName: "Wendell Park",
        authorRole: "author",
        createdAt: D("2026-09-01 15:47"),
      },
      {
        body: "Wendell's hybrid is what we usually recommend to business authors. Open each part with a narrative anchor, then run the framework. It is how the bestsellers in this category are actually built.",
        authorName: "Jonathan Pierce",
        authorRole: "moderator",
        createdAt: D("2026-09-02 08:30"),
      },
    ],
  },
];

async function seed() {
  const db = getDb();
  console.log("Seeding Inkwriters Network discussions...");

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
    console.log(`  [${t.genre}] ${t.title} (+${t.replies.length} replies)`);
  }

  console.log("Seed complete.");
  process.exit(0);
}

seed();
