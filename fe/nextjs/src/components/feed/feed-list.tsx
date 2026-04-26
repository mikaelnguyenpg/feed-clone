import { useEffect, useRef, useState } from "react";
import { PostCard } from "./post-card";
import { useVirtualizer } from "@tanstack/react-virtual";

interface FeedListProps {
  posts: any[],
  onLoadMore: () => void,
  hasMore: boolean,
}

export function FeedList({
  posts,
  onLoadMore,
  hasMore,
} : FeedListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: posts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 130,
    overscan: 5,
  });

  useEffect(() => {
    console.log("-> feed-list l.26 hasMore: ", hasMore,
      " - posts.length: ", posts.length,
      " - posts: ", posts,
    );
    const virtualItems = rowVirtualizer.getVirtualItems();
    console.log("-> feed-list l.28 virtualItems: ", virtualItems);
    const [last] = virtualItems.slice(-1);
    console.log("-> feed-list l.30 last: ", last);

    if (last && last.index >= posts.length - 1 && hasMore) {
      onLoadMore();
    }
  }, [rowVirtualizer.getVirtualItems(), hasMore, onLoadMore, posts.length]);

  return (
    <div ref={parentRef} className="h-[calc(100vh-5rem)] overflow-auto p-2">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map(virtualRow => {
        // {[...Array(10).keys()].map(index => {
          const post = posts[virtualRow.index];
          {/* const post = posts[index]; */}

          return (
            <div
              key={post.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`
              }}
            >
              <PostCard post={post} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
