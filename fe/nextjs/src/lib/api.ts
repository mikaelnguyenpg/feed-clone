import { FeedPage, Post } from "./type"

// async function fetchFeed(cursor?: string) {
//   const url = cursor ? `/api/feed?cursor=${cursor}` : `/api/feed`;
//   const res = await fetch(url);
//   return res.json();
// }

const PHOTO_LINKS = [
  "https://wallpapers.com/images/featured/anime-profile-picture-b3bkt91v6p4vj5xq.jpg",
  "https://thumbs.dreamstime.com/b/anime-cartoon-character-male-vector-art-illustration-stylish-expressive-design-has-sharp-style-hair-bold-facial-384511590.jpg",
  "https://media.craiyon.com/2025-07-12/_4dZ32QVTBSVcgD5FEQ6yg.webp",
  "https://www.shutterstock.com/image-illustration/cool-anime-guy-casual-outfit-600nw-2258372411.jpg",
  "https://m.media-amazon.com/images/I/61DE-30jQUL._AC_UF894,1000_QL80_.jpg",
  "https://pixaii.com/files/preview/960x1713/117105867537ufmbz0kst4gp3910tms3pwbug8atbfssv2qldtxjuo0sxifvbfscgvpsgf133kkcxwdlftqq3hpwuzxlvroxlysxl9h9lqnkwon.jpg",
  "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://img5.thuthuatphanmem.vn/uploads/2021/11/12/hinh-anh-anime-don-gian-hinh-nen-anime-don-gian-ma-dep_092443354.png",
]

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
      // avatar: `/avatar${(start + i) % 5}.png`,
      avatar: PHOTO_LINKS[(start + i) % 7],
      content: `Mock post #${id} — nội dung demo để test infinite scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non lacus in sapien iaculis bibendum. Phasellus iaculis libero sit amet volutpat tincidunt. Aenean porta erat sit amet rutrum vestibulum. Pellentesque enim dolor, pulvinar a purus at, lobortis condimentum tortor. Suspendisse vitae finibus magna. In semper magna tellus, eu imperdiet felis bibendum sed. Quisque porttitor metus at est laoreet, vel finibus velit ultricies. Aenean nec euismod sapien. Vestibulum egestas velit quis libero feugiat rhoncus. Fusce congue enim a pulvinar porttitor. Duis malesuada faucibus facilisis. Donec a pulvinar sem. Vestibulum suscipit mi eget felis porta dignissim. Suspendisse potenti. Donec scelerisque felis ut consequat maximus.`.slice(0, 800 / 7 * ((start + i) % 7) + 1),
      // images: (i % 3 === 0) ? [`/sample${(start + i) % 4}.jpg`] : [],
      images: (i % 2 === 0) ? PHOTO_LINKS.slice((start + i) % 5) : [],
      createdAt: new Date().toISOString(),
    }
  });

  // nextCursor: null when no more pages (for demo, stop at 100)
  const nextCursor = start + limit > 100 ? null : String(start + limit);

  return { items, nextCursor }
}


