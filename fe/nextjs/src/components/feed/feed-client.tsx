"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { FeedList } from "./feed-list";
import { PostSkeleton } from "./post-skeleton";
import { useEffect } from "react";

export type Post = {
  id: string
  author: string
  avatar?: string
  content: string
  images?: string[]
  createdAt: string
}

export type FeedPage = {
  items: Post[]
  nextCursor: string | null
}

interface FeedClientProps {
  initialPosts: Post[],
}

// async function fetchFeed(cursor?: string) {
//   const url = cursor ? `/api/feed?cursor=${cursor}` : `/api/feed`;
//   const res = await fetch(url);
//   return res.json();
// }

// MOCK implementation (simulate network)
export async function fetchFeed(cursor?: string | null, limit = 10): Promise<FeedPage> {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 400))

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
  })

  // nextCursor: null when no more pages (for demo, stop at 100)
  const nextCursor = start + limit > 100 ? null : String(start + limit)

  return { items, nextCursor }
}

export function FeedClient({
  initialPosts,
} : FeedClientProps) {
  // 1) Build initialData with correct shape: InfiniteData<FeedPage>
  const initialData: InfiniteData<FeedPage> = {
    pages: [{ items: initialPosts, nextCursor: "6" }],
    pageParams: [null],
  }

  // 2) useInfiniteQuery with generics and correct initialData
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery<FeedPage, Error>({
    queryKey: ["feed"],
    queryFn: async ({ pageParam }) => {
      // pageParam is unknown by default; cast to string | null
      console.log("=> feed-client l.77 queryFn: ", pageParam);
      const cursor = (pageParam as string | null) ?? null
      return fetchFeed(cursor, 5)
    },
    initialData, // pass the correctly shaped initialData variable
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
  })

  // 3) Flatten posts from pages
  const posts: Post[] = data?.pages.flatMap((p) => p.items) ?? []

  return (
    <div className="w-full">
      <FeedList
        posts={posts}
        onLoadMore={() => fetchNextPage()}
        hasMore={!!hasNextPage}
      />

      {isFetchingNextPage && (
        <div className="space-y-4 mt-4">
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}

      {status === "error" && (
        <div className="text-red-500 mt-4">Error: {String(error?.message)}</div>
      )}
    </div>
  )
}
