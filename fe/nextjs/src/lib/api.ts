import { FeedPage, Post } from "./type"

// async function fetchFeed(cursor?: string) {
//   const url = cursor ? `/api/feed?cursor=${cursor}` : `/api/feed`;
//   const res = await fetch(url);
//   return res.json();
// }

// MOCK implementation (simulate network)
export async function fetchFeed(cursor?: string | null, limit = 10): Promise<FeedPage> {
  console.log(" *** api.ts fetchFeed cursor: ", cursor);

  // Simulate network latency
  await new Promise((r) => setTimeout(r, 400));

  // If cursor is null/undefined -> start from 1
  const start = cursor ? Number(cursor) : 1
  const items: Post[] = Array.from({ length: limit }).map((_, i) => {
    const id = String(start + i)
    return {
      id,
      author: `User ${id}`,
      avatar: `/avatar${(start + i) % 5}.png`,
      content: `Mock post #${id} — nội dung demo để test infinite scroll.`,
      images: (i % 3 === 0) ? [`/sample${(start + i) % 4}.jpg`] : [],
      createdAt: new Date().toISOString(),
    }
  });

  // nextCursor: null when no more pages (for demo, stop at 100)
  const nextCursor = start + limit > 100 ? null : String(start + limit);

  return { items, nextCursor }
}


