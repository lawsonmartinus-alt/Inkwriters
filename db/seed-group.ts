import { getDb } from "../api/queries/connection";
import { shelfBooks, polls, pollVotes, libraryPlacements } from "./schema";

const D = (s: string) => new Date(s.replace(" ", "T") + ":00Z");

async function seed() {
  const db = getDb();
  console.log("Seeding group shelves, polls, and library placements...");

  // ── Group bookshelf ──────────────────────────────────────────────
  await db.insert(shelfBooks).values([
    // Currently reading (moderator-set, appears on group homepage)
    { title: "The Last Bookbinder", author: "Amara Diallo", genre: "Romance", shelf: "currently-reading", bg: "#4a2e35", fg: "#f6ece7", accent: "#d9a6a0", addedAt: D("2026-09-01 09:00") },
    // Up next
    { title: "The Quiet Arithmetic", author: "June Okafor", genre: "Book Club Fiction", shelf: "to-read", bg: "#6b4a3a", fg: "#f5efe6", accent: "#e0c9a6", addedAt: D("2026-08-20 10:00") },
    { title: "Winterlight", author: "Sofia Lindqvist", genre: "Memoir", shelf: "to-read", bg: "#2e3d4a", fg: "#ecf1f4", accent: "#a8c4d4", addedAt: D("2026-08-20 10:05") },
    // Read (group reads completed)
    { title: "The Salt Meridian", author: "Elena Vasquez", genre: "Literary Fiction", shelf: "read", bg: "#1e3d2f", fg: "#f5f3ef", accent: "#c9a86a", addedAt: D("2026-03-02 09:00") },
    { title: "A Lantern in the Hollow", author: "Marcus Reid", genre: "Fantasy", shelf: "read", bg: "#22262e", fg: "#ece7dc", accent: "#8fa8c8", addedAt: D("2026-05-04 09:00") },
    { title: "Where the River Remembers", author: "T. H. Calloway", genre: "Historical Fiction", shelf: "read", bg: "#3a4a3f", fg: "#eef0e6", accent: "#b7c4a3", addedAt: D("2026-06-01 09:00") },
    // Book club picks shelf
    { title: "The Last Bookbinder", author: "Amara Diallo", genre: "Romance", shelf: "book-club-picks", bg: "#4a2e35", fg: "#f6ece7", accent: "#d9a6a0", addedAt: D("2026-07-01 09:00") },
    { title: "Where the River Remembers", author: "T. H. Calloway", genre: "Historical Fiction", shelf: "book-club-picks", bg: "#3a4a3f", fg: "#eef0e6", accent: "#b7c4a3", addedAt: D("2026-06-01 09:00") },
    { title: "The Salt Meridian", author: "Elena Vasquez", genre: "Literary Fiction", shelf: "book-club-picks", bg: "#1e3d2f", fg: "#f5f3ef", accent: "#c9a86a", addedAt: D("2026-04-01 09:00") },
  ]);
  console.log("  shelves: 9 entries");

  // ── Polls ────────────────────────────────────────────────────────
  const openPoll = await db.insert(polls).values({
    question: "October Book Club Pick: which title should the network read next?",
    options: JSON.stringify([
      "The Quiet Arithmetic by June Okafor",
      "Winterlight by Sofia Lindqvist",
      "A Lantern in the Hollow (Book Two) by Marcus Reid",
      "The Salt Meridian paperback re-read",
    ]),
    status: "open",
    closesAt: D("2026-09-25 23:59"),
    createdAt: D("2026-09-04 09:00"),
  });
  const openId = Number(openPoll[0].insertId);

  const openVotes: Array<[number, string, string]> = [
    [0, "Hannah Whitaker", "2026-09-04 11:20"], [0, "Priya Nandakumar", "2026-09-04 12:05"],
    [0, "Teresa Maldonado", "2026-09-04 14:31"], [0, "Allison Frye", "2026-09-04 18:44"],
    [0, "Graham Pelt", "2026-09-05 08:12"], [0, "Sofia Lindqvist", "2026-09-05 10:37"],
    [0, "Beatrice Oyelaran", "2026-09-05 15:02"], [0, "Wendell Park", "2026-09-05 19:26"],
    [1, "Margaret Osbourne", "2026-09-04 10:15"], [1, "Isla Marchand", "2026-09-04 16:58"],
    [1, "Declan Furey", "2026-09-05 09:44"], [1, "Nadia Ferreira", "2026-09-05 13:29"],
    [1, "Amara Diallo", "2026-09-05 21:03"], [1, "Vivian Locke", "2026-09-06 08:50"],
    [2, "Rowan Ashby", "2026-09-04 13:12"], [2, "Marcus Reid", "2026-09-04 20:40"],
    [2, "Elena Vasquez", "2026-09-05 11:55"], [2, "Kofi Mensah", "2026-09-06 07:33"],
    [3, "June Okafor", "2026-09-05 17:18"], [3, "Aimie Vandermeer", "2026-09-06 09:01"],
  ];
  for (const [opt, name, date] of openVotes) {
    await db.insert(pollVotes).values({ pollId: openId, optionIndex: opt, voterName: name, createdAt: D(date) });
  }

  const closedPoll = await db.insert(polls).values({
    question: "September Book Club Pick: final vote",
    options: JSON.stringify([
      "The Last Bookbinder by Amara Diallo",
      "The Quiet Arithmetic by June Okafor",
      "Where the River Remembers re-read",
    ]),
    status: "closed",
    closesAt: D("2026-08-28 23:59"),
    createdAt: D("2026-08-21 09:00"),
  });
  const closedId = Number(closedPoll[0].insertId);

  const closedVotes: Array<[number, string]> = [
    [0, "Hannah Whitaker"], [0, "Teresa Maldonado"], [0, "Margaret Osbourne"], [0, "Priya Nandakumar"],
    [0, "Graham Pelt"], [0, "Sofia Lindqvist"], [0, "Allison Frye"], [0, "Beatrice Oyelaran"],
    [0, "Isla Marchand"], [0, "Nadia Ferreira"], [0, "Vivian Locke"], [0, "Declan Furey"],
    [0, "Rowan Ashby"], [0, "Elena Vasquez"], [0, "T. H. Calloway"], [0, "Aimie Vandermeer"],
    [1, "Wendell Park"], [1, "Kofi Mensah"], [1, "June Okafor"], [1, "Marcus Reid"],
    [1, "Dr. Nathan Cole"], [2, "Amara Diallo"], [2, "Claire Bennett"],
  ];
  for (const [opt, name] of closedVotes) {
    await db.insert(pollVotes).values({ pollId: closedId, optionIndex: opt, voterName: name, createdAt: D("2026-08-24 12:00") });
  }
  console.log(`  polls: 2 (${openVotes.length} + ${closedVotes.length} votes)`);

  // ── Library placements ───────────────────────────────────────────
  await db.insert(libraryPlacements).values([
    { bookTitle: "The Salt Meridian", author: "Elena Vasquez", librarySystem: "New York Public Library", location: "New York, USA", placementType: "new-acquisition", branches: 12, placedAt: D("2026-08-18 10:00") },
    { bookTitle: "The Salt Meridian", author: "Elena Vasquez", librarySystem: "Multnomah County Library", location: "Portland, USA", placementType: "staff-pick", branches: 5, placedAt: D("2026-08-25 10:00") },
    { bookTitle: "A Lantern in the Hollow", author: "Marcus Reid", librarySystem: "King County Library System", location: "Seattle, USA", placementType: "featured-display", branches: 8, placedAt: D("2026-07-30 10:00") },
    { bookTitle: "A Lantern in the Hollow", author: "Marcus Reid", librarySystem: "British Library Lending Network", location: "London, UK", placementType: "new-acquisition", branches: 6, placedAt: D("2026-08-05 10:00") },
    { bookTitle: "The Last Bookbinder", author: "Amara Diallo", librarySystem: "Toronto Public Library", location: "Toronto, Canada", placementType: "book-club-kit", branches: 4, placedAt: D("2026-08-12 10:00") },
    { bookTitle: "The Last Bookbinder", author: "Amara Diallo", librarySystem: "Chicago Public Library", location: "Chicago, USA", placementType: "featured-display", branches: 9, placedAt: D("2026-09-02 10:00") },
    { bookTitle: "Where the River Remembers", author: "T. H. Calloway", librarySystem: "State Library of Victoria", location: "Melbourne, Australia", placementType: "book-club-kit", branches: 3, placedAt: D("2026-07-08 10:00") },
    { bookTitle: "Where the River Remembers", author: "T. H. Calloway", librarySystem: "Los Angeles Public Library", location: "Los Angeles, USA", placementType: "new-acquisition", branches: 11, placedAt: D("2026-06-15 10:00") },
    { bookTitle: "Winterlight", author: "Sofia Lindqvist", librarySystem: "Helsinki City Library", location: "Helsinki, Finland", placementType: "staff-pick", branches: 2, placedAt: D("2026-08-22 10:00") },
    { bookTitle: "The Quiet Arithmetic", author: "June Okafor", librarySystem: "Boston Public Library", location: "Boston, USA", placementType: "digital-collection", branches: 1, placedAt: D("2026-09-05 10:00") },
    { bookTitle: "The Quiet Arithmetic", author: "June Okafor", librarySystem: "Edinburgh City Libraries", location: "Edinburgh, UK", placementType: "new-acquisition", branches: 4, placedAt: D("2026-08-29 10:00") },
    { bookTitle: "Winterlight", author: "Sofia Lindqvist", librarySystem: "Denver Public Library", location: "Denver, USA", placementType: "digital-collection", branches: 1, placedAt: D("2026-09-03 10:00") },
  ]);
  console.log("  library placements: 12");
  console.log("Group seed complete.");
  process.exit(0);
}

seed();
