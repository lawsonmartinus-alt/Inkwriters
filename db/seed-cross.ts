import { getDb } from "../api/queries/connection";
import { threads, replies } from "./schema";
import { eq } from "drizzle-orm";

const D = (s: string) => new Date(s.replace(" ", "T") + ":00Z");

// Authors engaging on OTHER authors' threads (cross-engagement loop)
const cross: Array<{ threadTitle: string; body: string; authorName: string; createdAt: string }> = [
  {
    threadTitle: "Just finished Where the River Remembers: discussion (full spoilers)",
    body: "T. H., I teach a structure workshop and I am citing the ferry scene for the rest of my career. Building the whole novel backward from one image is the bravest structural choice I have seen in years.",
    authorName: "Elena Vasquez",
    createdAt: "2026-08-29 15:40",
  },
  {
    threadTitle: "Book club pick discussion: The Last Bookbinder, chapters 1 to 10",
    body: "Reading along as a fellow author and taking notes on the pacing. Amara, the discipline in these opening chapters is remarkable. Not one wasted scene.",
    authorName: "T. H. Calloway",
    createdAt: "2026-07-07 16:20",
  },
  {
    threadTitle: "Worldbuilding question: how much is too much in chapter one?",
    body: "Coming back to this thread three years later to say the advice here shaped how I open every book now. The Lantern's first chapter exists because of what Rowan and Priya said below.",
    authorName: "Marcus Reid",
    createdAt: "2026-06-10 11:05",
  },
  {
    threadTitle: "Romantasy query feedback: is my hook strong enough?",
    body: "Isla, the revised version sings. As someone who has been through this network's query gauntlet: the stakes-first rewrite is exactly right. Query with confidence.",
    authorName: "Marcus Reid",
    createdAt: "2025-11-06 14:30",
  },
  {
    threadTitle: "Second novelist anxiety: does the sophomore slump fear ever fade?",
    body: "Elena, from one debut to another: the readers who found you through this network are not comparing you to your first book. We are just glad there is more coming. Write it for us.",
    authorName: "Amara Diallo",
    createdAt: "2026-03-03 12:15",
  },
  {
    threadTitle: "October pick: the poll is open, make your case here",
    body: "For what it is worth from the author of the current pick: The Quiet Arithmetic is the best thing this network has on deck. June writes the family dinner scene I have been trying to write for a decade.",
    authorName: "Amara Diallo",
    createdAt: "2026-09-06 09:30",
  },
];

async function seed() {
  const db = getDb();
  console.log("Seeding cross-engagement replies...");
  for (const c of cross) {
    const t = await db.select().from(threads).where(eq(threads.title, c.threadTitle)).limit(1);
    if (!t[0]) {
      console.log(`  SKIP (not found): ${c.threadTitle}`);
      continue;
    }
    await db.insert(replies).values({
      threadId: t[0].id,
      body: c.body,
      authorName: c.authorName,
      authorRole: "author",
      createdAt: D(c.createdAt),
    });
    console.log(`  + ${c.authorName} on "${c.threadTitle.slice(0, 40)}..."`);
  }
  console.log("Cross-engagement seed complete.");
  process.exit(0);
}

seed();
