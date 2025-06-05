import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { MOCK_POSTS } from "./mockData";
import { formatDate } from "@/utils/formatter";

interface PostCardProps {
  post: (typeof MOCK_POSTS)[0];
}

function FeedPostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-start p-4">
        {/* Vote controls */}
        <div className="flex flex-col items-center mr-4 space-y-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Upvote"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-up"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </Button>
          <span className="text-sm font-semibold">
            {post.upvotes - post.downvotes}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Downvote"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-down"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </Button>
        </div>

        {/* Post content */}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>
                {post.author.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center">
              <Link
                href={`/profile/${post.author.id}`}
                className="text-sm font-medium hover:underline"
              >
                {post.author.name}
              </Link>
              <Badge variant="outline" className="ml-2 text-xs">
                {post.author.rank}
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground ml-auto">
              {formatDate(post.createdAt)}
            </span>
          </div>

          <Link href={`/post/${post.id}`} className="block hover:underline">
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
          </Link>

          <p className="text-sm text-muted-foreground mb-4">
            {post.content.length > 300
              ? `${post.content.slice(0, 300)}...`
              : post.content}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between border-t pt-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              asChild
            >
              <Link href={`/post/${post.id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {post.commentCount} Comments
              </Link>
            </Button>

            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              Share
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default FeedPostCard;
