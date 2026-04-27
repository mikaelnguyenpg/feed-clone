import { FeedClient } from "@/components/feed/feed-client";
import { fetchFeed } from "@/lib/api";
import { FeedPage, Post } from "@/lib/type";

async function getInitialFeed(limit = 10): Promise<FeedPage> {
  const data = fetchFeed(null, limit);
  return data;
}

export default async function Home() {
  const initialPage = await getInitialFeed(10);
  const initialPosts: Post[] = initialPage.items;
  const initialCursor = initialPage.nextCursor;

  return (
    <div className="flex flex-col flex-1 w-full justify-center font-sans bg-white dark:bg-black">
      <FeedClient initialPosts={initialPosts} initialCursor={initialCursor} />
    </div>
  );
}
