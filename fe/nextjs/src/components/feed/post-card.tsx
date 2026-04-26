import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";

interface PostCardProps {
  post: any,
}

export function PostCard({
  post,
} : PostCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={post.avatar} />
          <AvatarFallback>{post.author[0]}</AvatarFallback>
        </Avatar>

        <div>
          <p className="font-semibold">{post.author}</p>
          <p className="text-xs text-muted-foreground">{post.createdAt}</p>
        </div>
      </CardHeader>

      <CardContent>
        <p>{post.content}</p>
      </CardContent>
    </Card>
  )
}
