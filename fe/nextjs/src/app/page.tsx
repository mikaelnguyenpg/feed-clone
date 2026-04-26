import { FeedClient } from "@/components/feed/feed-client";

const MOCK_POSTS = [
  {
    id: "1",
    author: "Alice",
    avatar: "/avatar1.png",
    content: "Hôm nay trời đẹp quá, đi dạo quanh hồ Tây 🌅",
    images: ["/sample1.jpg", "/sample2.jpg"],
    createdAt: "2026-04-19 07:00",
  },
  {
    id: "2",
    author: "Bob",
    avatar: "/avatar2.png",
    content: "Đang thử code Next.js + Axum, mọi thứ chạy mượt 😎",
    images: [],
    createdAt: "2026-04-19 06:45",
  },
  {
    id: "3",
    author: "Charlie",
    avatar: "/avatar3.png",
    content: "Cafe sáng cùng team, chuẩn bị sprint mới ☕",
    images: ["/sample3.jpg"],
    createdAt: "2026-04-19 06:30",
  },
  {
    id: "4",
    author: "Diana",
    avatar: "/avatar4.png",
    content: "Đọc sách Rust Programming, thấy nhiều thứ hay ho 📚",
    images: [],
    createdAt: "2026-04-19 06:15",
  },
  {
    id: "5",
    author: "Eve",
    avatar: "/avatar5.png",
    content: "Chạy bộ sáng nay 5km quanh công viên 🌳",
    images: ["/sample4.jpg"],
    createdAt: "2026-04-19 06:00",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full justify-center font-sans bg-white dark:bg-black">
      <FeedClient initialPosts={MOCK_POSTS} />
    </div>
  );
}
